import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswerIndex: { type: Number, required: true },
  explanation: { type: String, required: true },
});

export const GPQuestion = mongoose.model("GPQuestion", questionSchema);
export const RMQuestion = mongoose.model("RMQuestion", questionSchema);
export const IPQuestion = mongoose.model("IPQuestion", questionSchema);
export const TPQuestion = mongoose.model("TPQuestion", questionSchema);
export const RSQuestion = mongoose.model("RSQuestion", questionSchema);
export const EPQuestion = mongoose.model("EPQuestion", questionSchema);

const questionSchemaGF = new mongoose.Schema({
  text: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswerIndex: { type: Number, required: true },
});

export const GPgfQuestion = mongoose.model("GPgfQuestion", questionSchemaGF);
export const RMgfQuestion = mongoose.model("RMgfQuestion", questionSchemaGF);
export const IPgfQuestion = mongoose.model("IPgfQuestion", questionSchemaGF);
export const TPgfQuestion = mongoose.model("TPgfQuestion", questionSchemaGF);
export const RSgfQuestion = mongoose.model("RSgfQuestion", questionSchemaGF);
export const EPgfQuestion = mongoose.model("EPgfQuestion", questionSchemaGF);
