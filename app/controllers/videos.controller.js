import Video from "../models/videos.models.js"; // Importar modelo de videos
import s3 from "../config/s3.js"; // Importar configuración de S3

// Subir un video
export const uploadVideo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id; // ID del usuario autenticado (desde JWT)

    // Validar que se envió un archivo
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No se subió ningún archivo." });
    }

    // Subir a S3
    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `videos/${Date.now()}_${req.file.originalname}`,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    const uploadResult = await s3.upload(params).promise();

    // Crear el video en la base de datos
    const video = await Video.create({
      title,
      description,
      videoUrl: uploadResult.Location,
      userId,
    });

    res
      .status(201)
      .json({ success: true, message: "Video subido exitosamente.", video });
  } catch (error) {
    console.error("Error al subir el video:", error);
    res
      .status(500)
      .json({ success: false, message: "Error al subir el video." });
  }
};

// Obtener todos los videos
export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate("userId", "name email");
    res.status(200).json({ success: true, videos });
  } catch (error) {
    console.error("Error al obtener los videos:", error);
    res
      .status(500)
      .json({ success: false, message: "Error al obtener los videos." });
  }
};

// Obtener videos por usuario
export const getVideosByUser = async (req, res) => {
  try {
    const userId = req.user.id; // ID del usuario autenticado (desde JWT)
    const videos = await Video.find({ userId });
    res.status(200).json({ success: true, videos });
  } catch (error) {
    console.error("Error al obtener los videos del usuario:", error);
    res
      .status(500)
      .json({ success: false, message: "Error al obtener los videos." });
  }
};
