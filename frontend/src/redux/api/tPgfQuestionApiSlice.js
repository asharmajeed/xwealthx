import { apiSlice } from "./apiSlice";
import { TPgfQuestion_URL } from "../../utils/constants";

export const tPgfQuestionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addTPgfQuestion: builder.mutation({
      query: (newQuestion) => ({
        url: `${TPgfQuestion_URL}/add`,
        method: "POST",
        credentials: "include",
        body: newQuestion,
      }),
      invalidatesTags: ["TPgfQuestion"],
    }),

    updateTPgfQuestion: builder.mutation({
      query: ({ questionId, updatedQuestion }) => ({
        url: `${TPgfQuestion_URL}/update/${questionId}`,
        method: "PUT",
        credentials: "include",
        body: updatedQuestion,
      }),
      invalidatesTags: ["TPgfQuestion"],
    }),

    deleteTPgfQuestion: builder.mutation({
      query: (questionId) => ({
        url: `${TPgfQuestion_URL}/delete/${questionId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["TPgfQuestion"],
    }),

    fetchTPgfQuestions: builder.query({
      query: () => ({
        url: `${TPgfQuestion_URL}/all`,
        credentials: "include",
      }),
      providesTags: ["TPgfQuestion"],
      keepUnusedDataFor: 5,
    }),

    fetch30TPgfQuestions: builder.query({
      query: () => ({
        url: `${TPgfQuestion_URL}/first20`,
        credentials: "include",
      }),
      providesTags: ["TPgfQuestion"],
      keepUnusedDataFor: 5,
    }),

    fetchRandomTPgfQuestions: builder.query({
      query: (examSessionId) => ({
        url: `${TPgfQuestion_URL}/random85${
          examSessionId ? `?examSessionId=${examSessionId}` : ""
        }`,
        credentials: "include",
      }),
      providesTags: ["TPgfQuestion"],
      keepUnusedDataFor: 5,
    }),

    fetchTPgfAllRandomOrderQuestions: builder.query({
      query: (quizSessionId) => ({
        url: `${TPgfQuestion_URL}/random${
          quizSessionId ? `?quizSessionId=${quizSessionId}` : ""
        }`,
        credentials: "include",
      }),
      transformResponse: (response) => ({
        quizSessionId: response.quizSessionId,
        questions: response.questions,
      }),
      providesTags: ["TPgfQuestion"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useAddTPgfQuestionMutation,
  useUpdateTPgfQuestionMutation,
  useDeleteTPgfQuestionMutation,
  useFetchTPgfQuestionsQuery,
  useFetch30TPgfQuestionsQuery,
  useFetchRandomTPgfQuestionsQuery,
  useFetchTPgfAllRandomOrderQuestionsQuery,
} = tPgfQuestionApiSlice;
