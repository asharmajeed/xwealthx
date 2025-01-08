import express from "express";
import multer from "multer";
import File from "../models/fileModel.js";
import path from "path";
import fs from "fs";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/uploads/");
  },

  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    const fileName = path.parse(file.originalname).name;
    cb(null, `${fileName}-${Date.now()}${extname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /pdf|docx?/;
  const mimetypes =
    /application\/pdf|application\/msword|application\/vnd.openxmlformats-officedocument.wordprocessingml.document/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Not the valid file type"), false);
  }
};

const upload = multer({ storage, fileFilter });
const uploadSingleFile = upload.single("file");

router.post("/upload", (req, res) => {
  uploadSingleFile(req, res, async (err) => {
    if (err) {
      res.status(400).send({ error: err.message });
    } else if (req.file) {
      const fileName = path.parse(req.file.originalname).name;
      const file = new File({
        message: "File uploaded successfully!",
        name: fileName,
        url: `${req.protocol}://${req.get("host")}/backend/uploads/${
          req.file.filename
        }`,
      });
      await file.save();
      res.status(201).json(file);
    } else {
      res.status(400).send({ error: "No file provided" });
    }
  });
});

// Route to Fetch All Files
router.get("/", async (req, res) => {
  try {
    const files = await File.find();
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch files" });
  }
});

// Route to Delete a File
router.delete("/:id", async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    const filePath = path.resolve("backend/uploads", path.basename(file.url));

    // Delete the file from the filesystem
    fs.unlink(filePath, async (err) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Failed to delete file from server" });
      }

      // Delete the file entry from MongoDB
      await File.findByIdAndDelete(req.params.id);

      res.json({ message: "File deleted successfully" });
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete file" });
  }
});

export default router;
