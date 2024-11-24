import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, //Elimina espacios innecesarios
    },
    description: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true, //Aquí se almacena la URL del video en S3
    },
    thumbnailUrl: {
      type: String, //URL de la miniatura del video, opcional
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //Relaciona con el usuario que sube el video
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, //Fecha de subida
    },
    updatedAt: {
      type: Date,
      default: Date.now, //Fecha de última actualización
    },
    views: {
      type: Number,
      default: 0, //Contador de vistas
    },
  },
  {
    timestamps: true, //Se gestionan automáticamente 'createdAt' y 'updatedAt'
  }
);

const Video = mongoose.model("Video", videoSchema);

export default Video;
