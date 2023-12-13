import { Router } from "express";
import multer from "multer";

import uploadControllers from "../controllers/uploadControllers.js";

export const routes = new Router();

// Multer configuration for file upload
const storage = new multer.memoryStorage();
const upload = multer({ storage });

// Add routes
routes.post("/upload", upload.single("myfile"), uploadControllers.uploadFile);
routes.get("/uploads", uploadControllers.getFromDb);

export default routes;
