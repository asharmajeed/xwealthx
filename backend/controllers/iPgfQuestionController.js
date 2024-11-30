import { IPgfQuestion } from "../models/questionModel.js";
import { v4 as uuidv4 } from "uuid"; // Import UUID generator

const quizSessionCache = new Map(); // Temporary in-memory storage

export const addQuestion = async (req, res) => {
  try {
    const question = new IPgfQuestion(req.body);
    await question.save();
    res.status(201).json({ message: "Question added successfully", question });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await IPgfQuestion.findByIdAndUpdate(id, req.body, {
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
    const question = await IPgfQuestion.findByIdAndDelete(id);
    if (!question)
      return res.status(404).json({ message: "Question not found" });
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const questions = await IPgfQuestion.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFirst20Questions = async (req, res) => {
  try {
    const questions = await IPgfQuestion.find().limit(20);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRandom85Questions = async (req, res) => {
  try {
    const questions = await IPgfQuestion.aggregate([{ $sample: { size: 85 } }]);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cache duration in milliseconds (30 minutes)
const CACHE_DURATION_MS = 8000 * 60 * 1000;

export const getAllQuestionsRandomOrder = async (req, res) => {
  try {
    const { quizSessionId } = req.query;

    // Check if the session exists in the cache
    if (quizSessionId && quizSessionCache.has(quizSessionId)) {
      return res.status(200).json({
        quizSessionId,
        questions: quizSessionCache.get(quizSessionId),
      });
    }

    // Fetch all random questions using MongoDB aggregation
    const questions = await IPgfQuestion.aggregate([
      { $sample: { size: await IPgfQuestion.countDocuments() } },
    ]);

    // Generate a new quiz session ID
    const newQuizSessionId = uuidv4();

    // Store the questions in the cache with the new session ID
    quizSessionCache.set(newQuizSessionId, questions);

    // Set a timeout to clear the session cache after 30 minutes
    setTimeout(() => quizSessionCache.delete(newQuizSessionId), CACHE_DURATION_MS);

    // Respond with the new quiz session ID and questions
    res.status(200).json({
      quizSessionId: newQuizSessionId,
      questions,
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
