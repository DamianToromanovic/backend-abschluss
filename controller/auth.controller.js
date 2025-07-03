import bcrypt from "bcrypt";

import { generateToken } from "../middleware/auth.middleware.js";
import User from "../models/userSchema.js";

export const registerUser = async (req, res) => {
  try {
    const { name, password, role, contactPerson } = req.body;
    const email = req.body.email?.trim().toLowerCase();

    if (!name || !email || !password) {
      res.status(400).json({ error: "Alle Felder sind erforderlich." });
      return;
    }
    if (
      password.length < 10 ||
      !password.match(/[A-Z]/) ||
      !password.match(/[a-z]/) ||
      !password.match(/[\W_]/)
    ) {
      res.status(400).json({
        error:
          "The password should be at least 10 characters long, contain at least one uppercase letter, one lowercase letter, and one special character.",
      });
      return;
    }

    const existingUser = await User.findOne({
      email,
    });
    if (existingUser) {
      res.status(409).json({ error: "E-Mail ist bereits registriert." });
      return;
    }

    const saltRounds = 12;
    const hashedPW = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      name: name.trim(),
      email,
      password: hashedPW,
      role,
      contactPerson,
    });

    res.status(201).json({
      message: "Registrierung erfolgreich.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Registration Error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password, authMethod } = req.body;

  const userFromDB = await User.findOne({ email: email }).select("+password");
  if (!userFromDB) {
    res.status(401).json({ error: "Email oder Passwort falsch" });
    return;
  }

  const isLogedIn = await bcrypt.compare(password, userFromDB.password);

  if (!isLogedIn) {
    return res.status(401).json({ error: "Email oder Passwort falsch" });
  }

  const user = userFromDB.toObject();
  delete user.password;

  // jwt
  const userToken = generateToken(user);

  if (authMethod) {
    return res.status(200).json({ token: userToken });
  }

  // Cookie
  // mit Cookies und JWT
  res.cookie("token", userToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    // Cookie Lebensdauer 2h
    maxAge: 2 * 60 * 60 * 1000,
  });

  res.status(200).json({ message: "Login erfolgreich", data: user });
};
