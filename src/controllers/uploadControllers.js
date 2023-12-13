import { v2 as cloudinary } from "cloudinary";
import FileUploadModel from "../models/FileUploadModel.js";
import config from "../config/config.js";

cloudinary.config(config.cloudinaryConfig);

class UploadController {
  async uploadFile(req, res) {
    try {
      const imageFile = req?.file;

      if (!imageFile) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const { originalname, mimetype, buffer } = imageFile;

      // Upload file to Cloudinary
      const b64 = Buffer.from(buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      const result = await cloudinary.uploader.upload(dataURI, {
        resource_type: "auto",
      });

      const { public_id, secure_url } = result;

      const data = {
        name: originalname,
        type: mimetype,
        url: secure_url,
        public_id: public_id,
      };

      try {
        const imageId = await FileUploadModel.create(data);
        if (imageId) {
          // Return the Cloudinary response
          return res.status(200).json({
            message: "File uploaded successfully",
            data: result,
            imageId,
          });
        }
      } catch (error) {
        console.error("Error saving file in database:", error);
        return res.status(500).json({
          message: "Error saving file in database",
          error: error.message,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Upload failed", error: error.message });
    }
  }

  async index(req, res) {
    // Here we fetch from cloudinary
    try {
      const files = await cloudinary.api.resources();

      return res.status(200).json(files);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error fetching files from Cloudinary" });
    }
  }

  async getFromDb(req, res) {
    try {
      const files = await FileUploadModel.findAll();

      return res.status(200).json(files);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error fetching files from the database" });
    }
  }
}

export default new UploadController();
