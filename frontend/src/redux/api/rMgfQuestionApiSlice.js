import { apiSlice } from "./apiSlice";
import { RMgfQuestion_URL } from "../../utils/constants";

export const rMgfQuestionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addRMgfQuestion: builder.mutation({
      query: (newQuestion) => ({
        url: `${RMgfQuestion_URL}/add`,
        method: "POST",
        credentials: "include",
        body: newQuestion,
      }),
      invalidatesTags: ["RMgfQuestion"],
    }),

    updateRMgfQuestion: builder.mutation({
      query: ({ questionId, updatedQuestion }) => ({
        url: `${RMgfQuestion_URL}/update/${questionId}`,
        method: "PUT",
        credentials: "include",
        body: updatedQuestion,
      }),
      invalidatesTags: ["RMgfQuestion"],
    }),

    deleteRMgfQuestion: builder.mutation({
      query: (questionId) => ({
        url: `${RMgfQuestion_URL}/delete/${questionId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["RMgfQuestion"],
    }),

    fetchRMgfQuestions: builder.query({
      query: () => ({
        url: `${RMgfQuestion_URL}/all`,
        credentials: "include",
      }),
      providesTags: ["RMgfQuestion"],
      keepUnusedDataFor: 5,
    }),

    fetch20RMgfQuestions: builder.query({
      query: () => ({
        url: `${RMgfQuestion_URL}/first20`,
        credentials: "include",
      }),
      providesTags: ["RMgfQuestion"],
      keepUnusedDataFor: 5,
    }),

    fetchRandomRMgfQuestions: builder.query({
      query: () => ({
        url: `${RMgfQuestion_URL}/random85`,
        credentials: "include",
      }),
      providesTags: ["RMgfQuestion"],
      keepUnusedDataFor: 5,
    }),

    fetchRMgfAllRandomOrderQuestions: builder.query({
      query: (quizSessionId) => ({
        url: `${RMgfQuestion_URL}/random${
          quizSessionId ? `?quizSessionId=${quizSessionId}` : ""
        }`,
        credentials: "include",
      }),
      transformResponse: (response) => ({
        quizSessionId: response.quizSessionId,
        questions: response.questions,
      }),
      providesTags: ["RMgfQuestion"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useAddRMgfQuestionMutation,
  useUpdateRMgfQuestionMutation,
  useDeleteRMgfQuestionMutation,
  useFetchRMgfQuestionsQuery,
  useFetch20RMgfQuestionsQuery,
  useFetchRandomRMgfQuestionsQuery,
  useFetchRMgfAllRandomOrderQuestionsQuery,
} = rMgfQuestionApiSlice;
