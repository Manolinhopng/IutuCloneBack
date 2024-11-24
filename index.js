import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./app/routes/auth.routes.js";
import videoRoutes from "./app/routes/videos.routes.js";

import { connectToDatabase } from "./app/config/mongodb.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectToDatabase();

app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
// Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
