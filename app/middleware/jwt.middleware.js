import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "miClaveJwtSuperSecreta";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(403)
      .json({ success: false, message: "Token no proporcionado." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Token inválido o expirado." });
  }
};
