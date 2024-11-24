import CryptoJS from "crypto-js";
import User from "../models/users.models.js";

const SECRET_KEY = process.env.SECRET_KEY || "miClaveSuperSecreta";

// Función para crear el hash de la contraseña con SHA-256
const hashPassword = (password) => {
  return CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64); // El hash será en formato Base64
};

export const register = async (req, res) => {
  const { name, birthDate, idNumber, email, cell, password, city } = req.body;

  try {
    // Crear el hash de la contraseña con SHA-256
    const hashedPassword = hashPassword(password);

    // Crear un nuevo usuario con el hash de la contraseña
    const newUser = new User({
      name,
      birthDate,
      idNumber,
      email,
      cell,
      password: hashedPassword, // Almacenar el hash de la contraseña
      city,
    });

    // Guardar en la base de datos
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Usuario registrado exitosamente.",
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res
      .status(500)
      .json({ success: false, message: "Error al registrar el usuario." });
  }
};
