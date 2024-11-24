import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    idNumber: {
      type: String,
      required: true,
      unique: true, // Asegura que cada número de identificación sea único
    },
    email: {
      type: String,
      required: true,
      unique: true, // Asegura que el correo electrónico sea único
      lowercase: true, // Convierte el correo electrónico a minúsculas
      trim: true, // Elimina espacios innecesarios
    },
    cell: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Se crea 'createdAt' y 'updatedAt' automáticamente
    versionKey: false, // Opcional, desactiva el __v (versión del documento) en MongoDB
  }
);

// Crea y exporta el modelo "User"
const User = mongoose.model("User", userSchema);

export default User;
