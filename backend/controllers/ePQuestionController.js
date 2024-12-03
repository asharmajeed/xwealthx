import { EPQuestion } from "../models/questionModel.js";
import { v4 as uuidv4 } from "uuid"; // Import UUID generator
import { setQuizSession, getQuizSession } from "../utils/cacheHelpers.js";

export const addQuestion = async (req, res) => {
  try {
    const question = new EPQuestion(req.body);
    await question.save();
    res.status(201).json({ message: "Question added successfully", question });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await EPQuestion.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!question)
      return res.status(404).json({ message: "Question not found" });
    res
      .status(200)
      .json({ message: "Question updated successfully", question });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await EPQuestion.findByIdAndDelete(id);
    if (!question)
      return res.status(404).json({ message: "Question not found" });
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const questions = await EPQuestion.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFirst30Questions = async (req, res) => {
  try {
    const questions = await EPQuestion.find().limit(30);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRandom85Questions = async (req, res) => {
  try {
    const questions = await EPQuestion.aggregate([{ $sample: { size: 85 } }]);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Fetch all questions in random order, with caching for quiz sessions.
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const getAllQuestionsRandomOrder = async (req, res) => {
  try {
    const { quizSessionId } = req.query;

    // Check if session data exists in Redis
    if (quizSessionId) {
      const cachedQuestions = await getQuizSession(quizSessionId);
      if (cachedQuestions) {
        return res
          .status(200)
          .json({ quizSessionId, questions: cachedQuestions });
      }
    }

    // Fetch random questions using MongoDB aggregation
    const totalQuestions = await EPQuestion.countDocuments();
    const questions = await EPQuestion.aggregate([
      { $sample: { size: totalQuestions } },
    ]);

    // Generate a new quiz session ID
    const newQuizSessionId = uuidv4();

    // Store questions in Redis with expiration
    await setQuizSession(newQuizSessionId, questions);

    // Respond with the new quiz session ID and questions
    res.status(200).json({ quizSessionId: newQuizSessionId, questions });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
