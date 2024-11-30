import { apiSlice } from "./apiSlice";
import { IPgfQuestion_URL } from "../../utils/constants";

export const iPgfQuestionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addIPgfQuestion: builder.mutation({
      query: (newQuestion) => ({
        url: `${IPgfQuestion_URL}/add`,
        method: "POST",
        credentials: "include",
        body: newQuestion,
      }),
      invalidatesTags: ["IPgfQuestion"],
    }),

    updateIPgfQuestion: builder.mutation({
      query: ({ questionId, updatedQuestion }) => ({
        url: `${IPgfQuestion_URL}/update/${questionId}`,
        method: "PUT",
        credentials: "include",
        body: updatedQuestion,
      }),
      invalidatesTags: ["IPgfQuestion"],
    }),

    deleteIPgfQuestion: builder.mutation({
      query: (questionId) => ({
        url: `${IPgfQuestion_URL}/delete/${questionId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["IPgfQuestion"],
    }),

    fetchIPgfQuestions: builder.query({
      query: () => ({
        url: `${IPgfQuestion_URL}/all`,
        credentials: "include",
      }),
      providesTags: ["IPgfQuestion"],
      keepUnusedDataFor: 5,
    }),

    fetch20IPgfQuestions: builder.query({
      query: () => ({
        url: `${IPgfQuestion_URL}/first20`,
        credentials: "include",
      }),
      providesTags: ["IPgfQuestion"],
      keepUnusedDataFor: 5,
    }),

    fetchRandomIPgfQuestions: builder.query({
      query: () => ({
        url: `${IPgfQuestion_URL}/random85`,
        credentials: "include",
      }),
      providesTags: ["IPgfQuestion"],
      keepUnusedDataFor: 5,
    }),

    fetchIPgfAllRandomOrderQuestions: builder.query({
      query: (quizSessionId) => ({
        url: `${IPgfQuestion_URL}/random${
          quizSessionId ? `?quizSessionId=${quizSessionId}` : ""
        }`,
        credentials: "include",
      }),
      transformResponse: (response) => ({
        quizSessionId: response.quizSessionId,
        questions: response.questions,
      }),
      providesTags: ["IPgfQuestion"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useAddIPgfQuestionMutation,
  useUpdateIPgfQuestionMutation,
  useDeleteIPgfQuestionMutation,
  useFetchIPgfQuestionsQuery,
  useFetch20IPgfQuestionsQuery,
  useFetchRandomIPgfQuestionsQuery,
  useFetchIPgfAllRandomOrderQuestionsQuery,
} = iPgfQuestionApiSlice;
