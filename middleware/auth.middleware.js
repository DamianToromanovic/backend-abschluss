import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (user, expirationTime = "2h") => {
  const token = jwt.sign(
    { userID: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: expirationTime }
  );
  return token;
};

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ error: "Zugriff verweigert. Kein Token bereitgestellt." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    console.error("Token-Verifizierung fehlgeschlagen:", err);
    return res.status(403).json({ error: "Ungültiges Token." });
  }
};
