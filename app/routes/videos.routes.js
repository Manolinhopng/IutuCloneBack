import express from "express";
import {
  uploadVideo,
  getAllVideos,
  getVideosByUser,
} from "../controllers/videos.controller.js";
import multer from "multer";
import { verifyToken } from "../middleware/jwt.middleware.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Rutas de videos
router.post("/upload", verifyToken, upload.single("video"), uploadVideo);
router.get("/", getAllVideos);
router.get("/my-videos", verifyToken, getVideosByUser);

export default router;
