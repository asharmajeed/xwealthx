import { GPQuestion } from "../models/questionModel.js";
import { v4 as uuidv4 } from "uuid"; // Import UUID generator
import { setQuizSession, getQuizSession } from "../utils/cacheHelpers.js";

export const addQuestion = async (req, res) => {
  try {
    const question = new GPQuestion(req.body);
    await question.save();
    res.status(201).json({ message: "Question added successfully", question });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await GPQuestion.findByIdAndUpdate(id, req.body, {
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
    const question = await GPQuestion.findByIdAndDelete(id);
    if (!question)
      return res.status(404).json({ message: "Question not found" });
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const questions = await GPQuestion.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFirst20Questions = async (req, res) => {
  try {
    const questions = await GPQuestion.find().limit(20);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRandom85Questions = async (req, res) => {
  try {
    const { quizSessionId } = req.query;

    if (quizSessionId && quizSessionCache.has(quizSessionId)) {
      return res.status(200).json({
        quizSessionId,
        questions: quizSessionCache.get(quizSessionId),
      });
    }

    const questions = await GPQuestion.aggregate([{ $sample: { size: 85 } }]);
    const newQuizSessionId = uuidv4();

    quizSessionCache.set(newQuizSessionId, questions);
    setTimeout(() => quizSessionCache.delete(newQuizSessionId), 30 * 60 * 1000);

    res.status(200).json({
      quizSessionId: newQuizSessionId,
      questions,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cache duration in milliseconds (30 minutes)
const CACHE_DURATION_MS = 8000 * 60 * 1000;

// Function to get random 20 questions
export const getRandom20Questions = async (req, res) => {
  try {
    const { quizSessionId } = req.query;

    // Check if the session exists in the cache
    if (quizSessionId && quizSessionCache.has(quizSessionId)) {
      return res.status(200).json({
        quizSessionId,
        questions: quizSessionCache.get(quizSessionId),
      });
    }

    // Fetch 20 random questions using MongoDB aggregation
    const questions = await GPQuestion.aggregate([{ $sample: { size: 20 } }]);

    // Generate a new quiz session ID
    const newQuizSessionId = uuidv4();

    // Store the questions in the cache with the new session ID
    quizSessionCache.set(newQuizSessionId, questions);

    // Set a timeout to clear the session cache after 30 minutes
    setTimeout(() => quizSessionCache.delete(newQuizSessionId), 30 * 60 * 1000);

    // Respond with the new quiz session ID and questions
    res.status(200).json({
      quizSessionId: newQuizSessionId,
      questions,
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// export const getRandom85Questions = async (req, res) => {
//   try {
//     const questions = await GPQuestion.aggregate([{ $sample: { size: 85 } }]);
//     res.status(200).json(questions);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

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
    const totalQuestions = await GPQuestion.countDocuments();
    const questions = await GPQuestion.aggregate([
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
