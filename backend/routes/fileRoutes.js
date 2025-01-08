import path from "path";
import express from "express";
import multer from "multer";
import { Client } from "filestack-js";
import File from "../models/fileModel.js";
import crypto from "crypto";

const router = express.Router();

// Filestack API Key
const filestackClient = new Client(process.env.FILESTACK_API_KEY);

// Multer Storage Configuration
const multerStorage = multer.memoryStorage(); // Use memory storage to keep files in memory temporarily
const fileFilter = (req, file, cb) => {
  const filetypes = /pdf|docx?/;
  const mimetypes =
    /application\/pdf|application\/msword|application\/vnd.openxmlformats-officedocument.wordprocessingml.document/;

  const extname = file.originalname.toLowerCase();
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Not a valid file type"), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter });
const uploadSingleFile = upload.single("file");

// Route to Upload File
router.post("/upload", (req, res) => {
  uploadSingleFile(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (req.file) {
      try {
        // Upload file to Filestack
        const result = await filestackClient.upload(req.file.buffer);

        const fileName = path.parse(req.file.originalname).name;
        const file = new File({
          message: "File uploaded successfully!",
          name: fileName,
          url: result.url,
        });

        await file.save();
        res.status(201).json(file);
      } catch (error) {
        res.status(500).json({ error: "Failed to upload file to Filestack" });
      }
    } else {
      res.status(400).json({ error: "No file provided" });
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

// Helper Function to Generate Filestack Policy and Signature
function generatePolicyAndSignature(handle) {
  const policy = {
    expiry: Math.floor(Date.now() / 1000) + 3600, // Policy valid for 1 hour
    call: ["remove"],
    handle,
  };

  const policyBase64 = Buffer.from(JSON.stringify(policy)).toString("base64");
  const signature = crypto
    .createHmac("sha256", process.env.FILESTACK_SECRET) // Use your Filestack secret key
    .update(policyBase64)
    .digest("hex");

  return { policy: policyBase64, signature };
}

// Route to Delete a File
router.delete("/:id", async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    const fileHandle = file.url.split("/").pop(); // Extract file handle from URL
    const { policy, signature } = generatePolicyAndSignature(fileHandle);

    // Delete the file from Filestack
    await filestackClient.remove(fileHandle, { policy, signature });

    // Delete the file entry from MongoDB
    await File.findByIdAndDelete(req.params.id);

    res.json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("File Deletion Error:", error);
    res.status(500).json({ error: "Failed to delete file" });
  }
});

export default router;
