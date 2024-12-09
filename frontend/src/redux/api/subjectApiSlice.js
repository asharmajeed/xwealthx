import { apiSlice } from "./apiSlice";
import { SUBJECTS_URL } from "../../constants";

export const subjectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchQuestionsBySubject: builder.query({
      query: (subject) => ({
        url: `${SUBJECTS_URL}/${subject}`,
        credentials: "include",
      }),
    }),

    updateQuestion: builder.mutation({
      query: ({ subject, id, updates }) => ({
        url: `${SUBJECTS_URL}/${subject}/${id}`,
        method: "PUT",
        credentials: "include",
        body: updates,
      }),
    }),

    addQuestion: builder.mutation({
      query: ({ subject, data }) => ({
        url: `${SUBJECTS_URL}/${subject}`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),

    deleteQuestion: builder.mutation({
      query: ({ subject, id }) => ({
        url: `${SUBJECTS_URL}/${subject}/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),

    fetch30Questions: builder.query({
      query: (subject) => ({
        url: `${SUBJECTS_URL}/limited/${subject}`,
        credentials: "include",
      }),
    }),

    fetch85Questions: builder.query({
      query: ({ subject, examSessionId }) => ({
        url: `${SUBJECTS_URL}/random85/${subject}${
          examSessionId ? `?examSessionId=${examSessionId}` : ""
        }`,
        credentials: "include",
      }),
    }),

    fetchRandomQuestions: builder.query({
      query: ({ subjects, quizSessionId }) => ({
        url: `${SUBJECTS_URL}/random?subjects=${subjects.join(",")}${
          quizSessionId ? `&quizSessionId=${quizSessionId}` : ""
        }`,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useFetchQuestionsBySubjectQuery,
  useUpdateQuestionMutation,
  useAddQuestionMutation,
  useDeleteQuestionMutation,
  useFetch30QuestionsQuery,
  useFetch85QuestionsQuery,
  useFetchRandomQuestionsQuery,
} = subjectApiSlice;
