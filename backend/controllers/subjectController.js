import { getQuestionModel } from "../models/questionModel.js";
import { v4 as uuidv4 } from "uuid"; // Import UUID generator
import {
  setQuizSession,
  getQuizSession,
  getExamSession,
  setExamSession,
} from "../utils/cacheHelpers.js";
import { fisherYatesShuffle } from "../utils/shuffle.js";

export const addQuestion = async (req, res) => {
  const { subject } = req.params;
  const QuestionModel = getQuestionModel(subject);
  try {
    const question = new QuestionModel(req.body);
    await question.save();
    res.status(201).json({ message: "Question added successfully", question });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateQuestion = async (req, res) => {
  const { subject, id } = req.params;
  const updates = req.body;
  const QuestionModel = getQuestionModel(subject);
  try {
    const updatedQuestion = await QuestionModel.findByIdAndUpdate(id, updates, {
      new: true,
    });
    res.json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteQuestion = async (req, res) => {
  const { subject, id } = req.params;
  const QuestionModel = getQuestionModel(subject);
  try {
    const question = await QuestionModel.findByIdAndDelete(id);
    if (!question)
      return res.status(404).json({ message: "Question not found" });
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllQuestions = async (req, res) => {
  const { subject } = req.params;
  const QuestionModel = getQuestionModel(subject);
  try {
    const questions = await QuestionModel.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFirst30Questions = async (req, res) => {
  const { subject } = req.params;
  const QuestionModel = getQuestionModel(subject);
  try {
    const questions = await QuestionModel.find().limit(30);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRandom85Questions = async (req, res) => {
  const { subject } = req.params;
  const QuestionModel = getQuestionModel(subject);
  try {
    const { examSessionId } = req.query;

    // Generate a unique session key by combining subject and examSessionId
    const sessionKey = examSessionId ? `${subject}_${examSessionId}` : null;

    // Check if session data exists in Redis
    if (sessionKey) {
      const cachedQuestions = await getExamSession(sessionKey);
      if (cachedQuestions) {
        return res
          .status(200)
          .json({ examSessionId, questions: cachedQuestions });
      }
    }

    // Fetch random questions using MongoDB aggregation
    const questions = await QuestionModel.aggregate([
      { $sample: { size: 85 } },
    ]);

    // Shuffle the questions using Fisher-Yates algorithm
    const shuffledQuestions = fisherYatesShuffle(questions);

    // Generate a new quiz session ID
    const newExamSessionId = uuidv4();
    const newSessionKey = `${subject}_${newExamSessionId}`;

    // Store questions in Redis with expiration
    await setExamSession(newSessionKey, shuffledQuestions);

    // Respond with the new quiz session ID and questions
    res
      .status(200)
      .json({ examSessionId: newExamSessionId, questions: shuffledQuestions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Fetch all questions in random order, with caching for quiz sessions.
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
// Default pagination parameters
const PAGE_SIZE = 100; // Adjust this based on your needs (e.g., 100 documents per page)

export const getAllQuestionsRandomOrder = async (req, res) => {
  const { subjects, quizSessionId } = req.query;

  if (!subjects) {
    return res.status(400).json({ error: "Subjects parameter is required" });
  }

  const subjectList = subjects.split(",");

  try {
    // Check if session data exists in Redis
    if (quizSessionId) {
      const cachedQuestions = await getQuizSession(quizSessionId);
      if (cachedQuestions) {
        return res
          .status(200)
          .json({ quizSessionId, questions: cachedQuestions });
      }
    }

    // Fetch all questions for all subjects with pagination
    let allQuestions = [];
    for (const subject of subjectList) {
      const QuestionModel = getQuestionModel(subject);

      let page = 1;
      let totalQuestions = await QuestionModel.countDocuments();
      let questions;

      // Fetch questions in pages until all questions are retrieved
      while (questions = await QuestionModel.find()
        .skip((page - 1) * PAGE_SIZE)
        .limit(PAGE_SIZE)) {
        allQuestions.push(...questions);
        if (questions.length < PAGE_SIZE) break; // No more questions left
        page++;
      }
    }

    // Shuffle the merged questions using Fisher-Yates algorithm
    const shuffledQuestions = fisherYatesShuffle(allQuestions);

    // Generate a new quiz session ID
    const newQuizSessionId = uuidv4();

    // Store shuffled questions in Redis with expiration (e.g., 1 hour)
    await setQuizSession(newQuizSessionId, shuffledQuestions, 3600); // Expires in 1 hour

    // Respond with the new quiz session ID and shuffled questions
    res.status(200).json({
      quizSessionId: newQuizSessionId,
      questions: shuffledQuestions,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
