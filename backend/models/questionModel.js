import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswerIndex: { type: Number, required: true },
  explanation: { type: String },
});

// Dynamic model creation function
export const getQuestionModel = (collectionName) => {
  // Check if the model for the given collection name already exists
  return (
    mongoose.models[collectionName] ||
    mongoose.model(collectionName, questionSchema, collectionName)
  );
};
