import { apiSlice } from "./apiSlice";
import { GPQuestion_URL } from "../../utils/constants";

export const gPQuestionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addGPQuestion: builder.mutation({
      query: (newQuestion) => ({
        url: `${GPQuestion_URL}/add`,
        method: "POST",
        credentials: "include",
        body: newQuestion,
      }),
      invalidatesTags: ["GPQuestion"],
    }),

    updateGPQuestion: builder.mutation({
      query: ({ questionId, updatedQuestion }) => ({
        url: `${GPQuestion_URL}/update/${questionId}`,
        method: "PUT",
        credentials: "include",
        body: updatedQuestion,
      }),
      invalidatesTags: ["GPQuestion"],
    }),

    deleteGPQuestion: builder.mutation({
      query: (questionId) => ({
        url: `${GPQuestion_URL}/delete/${questionId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["GPQuestion"],
    }),

    fetchGPQuestions: builder.query({
      query: () => ({
        url: `${GPQuestion_URL}/all`,
        credentials: "include",
      }),
      providesTags: ["GPQuestion"],
      keepUnusedDataFor: 5,
    }),

    fetch30GPQuestions: builder.query({
      query: () => ({
        url: `${GPQuestion_URL}/first20`,
        credentials: "include",
      }),
      providesTags: ["GPQuestion"],
      keepUnusedDataFor: 5,
    }),

    fetchRandomGPQuestions: builder.query({
      query: (quizSessionId) => ({
        url: `${GPQuestion_URL}/random85${
          quizSessionId ? `?quizSessionId=${quizSessionId}` : ""
        }`,
        credentials: "include",
      }),
      transformResponse: (response) => ({
        quizSessionId: response.quizSessionId,
        questions: response.questions,
      }),
      providesTags: ["GPQuestion"],
      keepUnusedDataFor: 5,
    }),

    fetchRandom30GPQuestions: builder.query({
      query: (quizSessionId) => ({
        url: `${GPQuestion_URL}/random20${
          quizSessionId ? `?quizSessionId=${quizSessionId}` : ""
        }`,
        credentials: "include",
      }),
      transformResponse: (response) => ({
        quizSessionId: response.quizSessionId,
        questions: response.questions,
      }),
      providesTags: ["GPQuestion"],
      keepUnusedDataFor: 5,
    }),

    fetchGPAllRandomOrderQuestions: builder.query({
      query: (quizSessionId) => ({
        url: `${GPQuestion_URL}/random${
          quizSessionId ? `?quizSessionId=${quizSessionId}` : ""
        }`,
        credentials: "include",
      }),
      transformResponse: (response) => ({
        quizSessionId: response.quizSessionId,
        questions: response.questions,
      }),
      providesTags: ["GPQuestion"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useAddGPQuestionMutation,
  useUpdateGPQuestionMutation,
  useDeleteGPQuestionMutation,
  useFetchGPQuestionsQuery,
  useFetch30GPQuestionsQuery,
  useFetchRandomGPQuestionsQuery,
  useFetchRandom30GPQuestionsQuery,
  useFetchGPAllRandomOrderQuestionsQuery,
} = gPQuestionApiSlice;
