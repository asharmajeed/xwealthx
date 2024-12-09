import {
  useFetchQuestionsBySubjectQuery,
  useFetch30QuestionsQuery,
  useFetch85QuestionsQuery,
  useFetchRandomQuestionsQuery,
} from "../redux/api/subjectApiSlice";

export const fetchQuestions = (type, subject, sessionId) => {
  switch (type) {
    case "exam":
      return useFetch85QuestionsQuery({ subject, examSessionId: sessionId });
    case "revision":
      return useFetchRandomQuestionsQuery({
        subject,
        quizSessionId: sessionId,
      });
    case "subjectQuizFree":
      return useFetch30QuestionsQuery(subject);
    case "subjectQuiz":
      return useFetchQuestionsBySubjectQuery(subject);
    default:
      throw new Error(`Invalid fetch type: ${type}`);
  }
};
