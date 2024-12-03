import { apiSlice } from "./apiSlice";
import { GPgfQuestion_URL } from "../../utils/constants";

export const gPgfQuestionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addGPgfQuestion: builder.mutation({
      query: (newQuestion) => ({
        url: `${GPgfQuestion_URL}/add`,
        method: "POST",
        credentials: "include",
        body: newQuestion,
      }),
      invalidatesTags: ["GPgfQuestion"],
    }),

    updateGPgfQuestion: builder.mutation({
      query: ({ questionId, updatedQuestion }) => ({
        url: `${GPgfQuestion_URL}/update/${questionId}`,
        method: "PUT",
        credentials: "include",
        body: updatedQuestion,
      }),
      invalidatesTags: ["GPgfQuestion"],
    }),

    deleteGPgfQuestion: builder.mutation({
      query: (questionId) => ({
        url: `${GPgfQuestion_URL}/delete/${questionId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["GPgfQuestion"],
    }),

    fetchGPgfQuestions: builder.query({
      query: () => ({
        url: `${GPgfQuestion_URL}/all`,
        credentials: "include",
      }),
      providesTags: ["GPgfQuestion"],
      keepUnusedDataFor: 5,
    }),

    fetch30GPgfQuestions: builder.query({
      query: () => ({
        url: `${GPgfQuestion_URL}/first20`,
        credentials: "include",
      }),
      providesTags: ["GPgfQuestion"],
      keepUnusedDataFor: 5,
    }),

    fetchRandomGPgfQuestions: builder.query({
      query: (examSessionId) => ({
        url: `${GPgfQuestion_URL}/random85${
          examSessionId ? `?examSessionId=${examSessionId}` : ""
        }`,
        credentials: "include",
      }),
      providesTags: ["GPgfQuestion"],
      keepUnusedDataFor: 5,
    }),

    fetchGPgfAllRandomOrderQuestions: builder.query({
      query: (quizSessionId) => ({
        url: `${GPgfQuestion_URL}/random${
          quizSessionId ? `?quizSessionId=${quizSessionId}` : ""
        }`,
        credentials: "include",
      }),
      transformResponse: (response) => ({
        quizSessionId: response.quizSessionId,
        questions: response.questions,
      }),
      providesTags: ["GPgfQuestion"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useAddGPgfQuestionMutation,
  useUpdateGPgfQuestionMutation,
  useDeleteGPgfQuestionMutation,
  useFetchGPgfQuestionsQuery,
  useFetch30GPgfQuestionsQuery,
  useFetchRandomGPgfQuestionsQuery,
  useFetchGPgfAllRandomOrderQuestionsQuery,
} = gPgfQuestionApiSlice;
