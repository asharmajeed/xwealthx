import { apiSlice } from "./apiSlice";
import { EPgfQuestion_URL } from "../../utils/constants";

export const ePgfQuestionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addEPgfQuestion: builder.mutation({
      query: (newQuestion) => ({
        url: `${EPgfQuestion_URL}/add`,
        method: "POST",
        credentials: "include",
        body: newQuestion,
      }),
      invalidatesTags: ["EPgfQuestion"],
    }),

    updateEPgfQuestion: builder.mutation({
      query: ({ questionId, updatedQuestion }) => ({
        url: `${EPgfQuestion_URL}/update/${questionId}`,
        method: "PUT",
        credentials: "include",
        body: updatedQuestion,
      }),
      invalidatesTags: ["EPgfQuestion"],
    }),

    deleteEPgfQuestion: builder.mutation({
      query: (questionId) => ({
        url: `${EPgfQuestion_URL}/delete/${questionId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["EPgfQuestion"],
    }),

    fetchEPgfQuestions: builder.query({
      query: () => ({
        url: `${EPgfQuestion_URL}/all`,
        credentials: "include",
      }),
      providesTags: ["EPgfQuestion"],
      keepUnusedDataFor: 5,
    }),

    fetch30EPgfQuestions: builder.query({
      query: () => ({
        url: `${EPgfQuestion_URL}/first20`,
        credentials: "include",
      }),
      providesTags: ["EPgfQuestion"],
      keepUnusedDataFor: 5,
    }),

    fetchRandomEPgfQuestions: builder.query({
      query: (examSessionId) => ({
        url: `${EPgfQuestion_URL}/random85${
          examSessionId ? `?examSessionId=${examSessionId}` : ""
        }`,
        credentials: "include",
      }),
      providesTags: ["EPgfQuestion"],
      keepUnusedDataFor: 5,
    }),

    fetchEPgfAllRandomOrderQuestions: builder.query({
      query: (quizSessionId) => ({
        url: `${EPgfQuestion_URL}/random${
          quizSessionId ? `?quizSessionId=${quizSessionId}` : ""
        }`,
        credentials: "include",
      }),
      transformResponse: (response) => ({
        quizSessionId: response.quizSessionId,
        questions: response.questions,
      }),
      providesTags: ["EPgfQuestion"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useAddEPgfQuestionMutation,
  useUpdateEPgfQuestionMutation,
  useDeleteEPgfQuestionMutation,
  useFetchEPgfQuestionsQuery,
  useFetch30EPgfQuestionsQuery,
  useFetchRandomEPgfQuestionsQuery,
  useFetchEPgfAllRandomOrderQuestionsQuery,
} = ePgfQuestionApiSlice;
