import { apiSlice } from "./apiSlice";
import { EPQuestion_URL } from "../../utils/constants";

export const ePQuestionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addEPQuestion: builder.mutation({
      query: (newQuestion) => ({
        url: `${EPQuestion_URL}/add`,
        method: "POST",
        credentials: "include",
        body: newQuestion,
      }),
      invalidatesTags: ["EPQuestion"],
    }),

    updateEPQuestion: builder.mutation({
      query: ({ questionId, updatedQuestion }) => ({
        url: `${EPQuestion_URL}/update/${questionId}`,
        method: "PUT",
        credentials: "include",
        body: updatedQuestion,
      }),
      invalidatesTags: ["EPQuestion"],
    }),

    deleteEPQuestion: builder.mutation({
      query: (questionId) => ({
        url: `${EPQuestion_URL}/delete/${questionId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["EPQuestion"],
    }),

    fetchEPQuestions: builder.query({
      query: () => ({
        url: `${EPQuestion_URL}/all`,
        credentials: "include",
      }),
      providesTags: ["EPQuestion"],
      keepUnusedDataFor: 5,
    }),

    fetch30EPQuestions: builder.query({
      query: () => ({
        url: `/api/quiz-data/ep-questions/first20`,
        credentials: "include",
      }),
      providesTags: ["EPQuestion"],
      keepUnusedDataFor: 5,
    }),

    fetchRandomEPQuestions: builder.query({
      query: () => ({
        url: `${EPQuestion_URL}/random85`,
        credentials: "include",
      }),
      providesTags: ["EPQuestion"],
      keepUnusedDataFor: 5,
    }),

    fetchEPAllRandomOrderQuestions: builder.query({
      query: (quizSessionId) => ({
        url: `${EPQuestion_URL}/random${
          quizSessionId ? `?quizSessionId=${quizSessionId}` : ""
        }`,
        credentials: "include",
      }),
      transformResponse: (response) => ({
        quizSessionId: response.quizSessionId,
        questions: response.questions,
      }),
      providesTags: ["EPQuestion"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useAddEPQuestionMutation,
  useUpdateEPQuestionMutation,
  useDeleteEPQuestionMutation,
  useFetchEPQuestionsQuery,
  useFetch30EPQuestionsQuery,
  useFetchRandomEPQuestionsQuery,
  useFetchEPAllRandomOrderQuestionsQuery,
} = ePQuestionApiSlice;
