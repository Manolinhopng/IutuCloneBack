import aws from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

// Configuración de AWS S3
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION, // Región de tu bucket (ejemplo: us-east-1)
});

export default s3;
