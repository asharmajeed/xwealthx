import { apiSlice } from "./apiSlice";
import { IPQuestion_URL } from "../../utils/constants";

export const iPQuestionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addIPQuestion: builder.mutation({
      query: (newQuestion) => ({
        url: `${IPQuestion_URL}/add`,
        method: "POST",
        credentials: "include",
        body: newQuestion,
      }),
      invalidatesTags: ["IPQuestion"],
    }),

    updateIPQuestion: builder.mutation({
      query: ({ questionId, updatedQuestion }) => ({
        url: `${IPQuestion_URL}/update/${questionId}`,
        method: "PUT",
        credentials: "include",
        body: updatedQuestion,
      }),
      invalidatesTags: ["IPQuestion"],
    }),

    deleteIPQuestion: builder.mutation({
      query: (questionId) => ({
        url: `${IPQuestion_URL}/delete/${questionId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["IPQuestion"],
    }),

    fetchIPQuestions: builder.query({
      query: () => ({
        url: `${IPQuestion_URL}/all`,
        credentials: "include",
      }),
      providesTags: ["IPQuestion"],
      keepUnusedDataFor: 5,
    }),

    fetch20IPQuestions: builder.query({
      query: () => ({
        url: `${IPQuestion_URL}/first20`,
        credentials: "include",
      }),
      providesTags: ["IPQuestion"],
      keepUnusedDataFor: 5,
    }),

    fetchRandomIPQuestions: builder.query({
      query: () => ({
        url: `${IPQuestion_URL}/random85`,
        credentials: "include",
      }),
      providesTags: ["IPQuestion"],
      keepUnusedDataFor: 5,
    }),

    fetchIPAllRandomOrderQuestions: builder.query({
      query: (quizSessionId) => ({
        url: `${IPQuestion_URL}/random${
          quizSessionId ? `?quizSessionId=${quizSessionId}` : ""
        }`,
        credentials: "include",
      }),
      transformResponse: (response) => ({
        quizSessionId: response.quizSessionId,
        questions: response.questions,
      }),
      providesTags: ["IPQuestion"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useAddIPQuestionMutation,
  useUpdateIPQuestionMutation,
  useDeleteIPQuestionMutation,
  useFetchIPQuestionsQuery,
  useFetch20IPQuestionsQuery,
  useFetchRandomIPQuestionsQuery,
  useFetchIPAllRandomOrderQuestionsQuery
} = iPQuestionApiSlice;
