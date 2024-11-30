import { apiSlice } from "./apiSlice";
import { RMQuestion_URL } from "../../utils/constants";

export const rMQuestionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addRMQuestion: builder.mutation({
      query: (newQuestion) => ({
        url: `${RMQuestion_URL}/add`,
        method: "POST",
        credentials: "include",
        body: newQuestion,
      }),
      invalidatesTags: ["RMQuestion"],
    }),

    updateRMQuestion: builder.mutation({
      query: ({ questionId, updatedQuestion }) => ({
        url: `${RMQuestion_URL}/update/${questionId}`,
        method: "PUT",
        credentials: "include",
        body: updatedQuestion,
      }),
      invalidatesTags: ["RMQuestion"],
    }),

    deleteRMQuestion: builder.mutation({
      query: (questionId) => ({
        url: `${RMQuestion_URL}/delete/${questionId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["RMQuestion"],
    }),

    fetchRMQuestions: builder.query({
      query: () => ({
        url: `${RMQuestion_URL}/all`,
        credentials: "include",
      }),
      providesTags: ["RMQuestion"],
      keepUnusedDataFor: 5,
    }),

    fetch20RMQuestions: builder.query({
      query: () => ({
        url: `${RMQuestion_URL}/first20`,
        credentials: "include",
      }),
      providesTags: ["RMQuestion"],
      keepUnusedDataFor: 5,
    }),

    fetchRandomRMQuestions: builder.query({
      query: () => ({
        url: `${RMQuestion_URL}/random85`,
        credentials: "include",
      }),
      providesTags: ["RMQuestion"],
      keepUnusedDataFor: 5,
    }),

    fetchRMAllRandomOrderQuestions: builder.query({
      query: (quizSessionId) => ({
        url: `${RMQuestion_URL}/random${
          quizSessionId ? `?quizSessionId=${quizSessionId}` : ""
        }`,
        credentials: "include",
      }),
      transformResponse: (response) => ({
        quizSessionId: response.quizSessionId,
        questions: response.questions,
      }),
      providesTags: ["RMQuestion"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useAddRMQuestionMutation,
  useUpdateRMQuestionMutation,
  useDeleteRMQuestionMutation,
  useFetchRMQuestionsQuery,
  useFetch20RMQuestionsQuery,
  useFetchRandomRMQuestionsQuery,
  useFetchRMAllRandomOrderQuestionsQuery,
} = rMQuestionApiSlice;
