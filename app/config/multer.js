import multer from "multer";
import multerS3 from "multer-s3";
import s3 from "./s3.js";

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME, // Nombre de tu bucket
    acl: "public-read", // Permitir acceso público
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      cb(null, `videos/${Date.now()}_${file.originalname}`); // Carpeta + nombre único
    },
  }),
  limits: { fileSize: 100 * 1024 * 1024 }, // Límite de 100MB
});

export default upload;
