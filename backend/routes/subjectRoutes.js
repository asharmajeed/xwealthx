import express from "express";
import { verifyJWT, authorizeAdmin } from "../middleware/authMiddleware.js";
import { getQuestionModel } from "../models/questionModel.js";

const router = express.Router();

// Dynamic route for fetching/updating questions by subject
router.get("/:subject", verifyJWT, authorizeAdmin, async (req, res) => {
  const { subject } = req.params;
  const Model = getQuestionModel(subject);
  try {
    const questions = await Model.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});

router.put("/:subject/:id", verifyJWT, authorizeAdmin, async (req, res) => {
  const { subject, id } = req.params;
  const updates = req.body;
  const Model = getQuestionModel(subject);
  try {
    const updatedQuestion = await Model.findByIdAndUpdate(id, updates, {
      new: true,
    });
    res.json(updatedQuestion);
  } catch (err) {
    res.status(500).json({ error: "Failed to update question" });
  }
});

export default router;
