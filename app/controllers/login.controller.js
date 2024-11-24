import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import User from "../models/users.models.js";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || "miClaveSuperSecreta";
const JWT_SECRET = process.env.JWT_SECRET || "miClaveJwtSuperSecreta";

// Función para crear el hash de la contraseña con SHA-256
const hashPassword = (password) => {
  return CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64); // El hash será en formato Base64
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario por email
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado." });
    }

    // Crear el hash de la contraseña ingresada
    const hashedPassword = hashPassword(password);

    // Comparar el hash de la contraseña ingresada con el hash almacenado
    if (hashedPassword !== user.password) {
      return res
        .status(401)
        .json({ success: false, message: "Contraseña incorrecta." });
    }

    // Generar token JWT
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Establecer la cookie HTTP-only con el token JWT
    res.cookie("token", token, {
      httpOnly: true, // La cookie no puede ser accedida por JavaScript
      secure: process.env.NODE_ENV === "production", // Solo se envía en HTTPS en producción
      sameSite: "Strict", // Protege contra ataques CSRF
      maxAge: 1 * 60 * 60 * 1000, // Expira en 1 hora
    });

    // Responder con los datos básicos del usuario
    res.status(200).json({
      success: true,
      message: "Inicio de sesión exitoso.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        city: user.city,
      },
    });
  } catch (error) {
    console.error("Error en el login:", error);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor." });
  }
};
