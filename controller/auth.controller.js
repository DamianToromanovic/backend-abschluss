import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken } from "../middleware/auth.middleware";

export const registerUser = async (req, res) => {
  try {
    const { name, password, role, contactPerson } = req.body;
    const email = req.body.trim().toLowerCase();

    if (!name || !email || !password) {
      res.status(400).json({ error: "Alle Felder sind erforderlich." });
      return;
    }

    const existingUser = await UserModel.findOne({
      email,
    });
    if (existingUser) {
      res.status(409).json({ error: "E-Mail ist bereits registriert." });
      return;
    }

    const saltRounds = 12;
    const hashedPW = await bcrypt.hash(password, saltRounds);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPW,
      role,
      contactPerson,
    });

    const verificationToken = generateToken(user, "30m");

    res.status(201).json({
      message: "Registrierung erfolgreich.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Registration Error" });
  }
};

export const verifyUser = async (req, res, next) => {
  const { token } = req.query;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.userID) {
      res.status(403).json({ error: "Ungültiges Token." });
      return;
    }
    const user = await UserModel.findByIdAndUpdate(
      decoded.userID,
      { role: "user" },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    const newToken = generateToken(user);

    res.cookie("token", newToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 2 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "E-Mail erfolgreich verifiziert.",
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res) => {
  const { email, password, authMethod } = req.body;

  // in einem select können nur positive Felder stehen .select("username +passwort")
  // oder nur negativ .select("-email -username")
  const userFromDB = await UserModel.findOne({ email: email }).select(
    "+password"
  );

  const isLogedIn = await bcrypt.compare(password, userFromDB.password);

  if (!isLogedIn) {
    return res.status(402).json({ error: "Email oder Passwort falsch" });
  }

  // const user = userFromDB.toObject({ virtuals: false });
  const user = userFromDB.toObject();
  delete user.password;
  delete user.__v;
  delete user.id;
  console.log(user);

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
