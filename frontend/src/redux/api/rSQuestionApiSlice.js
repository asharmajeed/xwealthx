import { apiSlice } from "./apiSlice";
import { RSQuestion_URL } from "../../utils/constants";

export const rSQuestionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addRSQuestion: builder.mutation({
      query: (newQuestion) => ({
        url: `${RSQuestion_URL}/add`,
        method: "POST",
        credentials: "include",
        body: newQuestion,
      }),
      invalidatesTags: ["RSQuestion"],
    }),

    updateRSQuestion: builder.mutation({
      query: ({ questionId, updatedQuestion }) => ({
        url: `${RSQuestion_URL}/update/${questionId}`,
        method: "PUT",
        credentials: "include",
        body: updatedQuestion,
      }),
      invalidatesTags: ["RSQuestion"],
    }),

    deleteRSQuestion: builder.mutation({
      query: (questionId) => ({
        url: `${RSQuestion_URL}/delete/${questionId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["RSQuestion"],
    }),

    fetchRSQuestions: builder.query({
      query: () => ({
        url: `${RSQuestion_URL}/all`,
        credentials: "include",
      }),
      providesTags: ["RSQuestion"],
      keepUnusedDataFor: 5,
    }),

    fetch30RSQuestions: builder.query({
      query: () => ({
        url: `${RSQuestion_URL}/first20`,
        credentials: "include",
      }),
      providesTags: ["RSQuestion"],
      keepUnusedDataFor: 5,
    }),

    fetchRandomRSQuestions: builder.query({
      query: () => ({
        url: `${RSQuestion_URL}/random85`,
        credentials: "include",
      }),
      providesTags: ["RSQuestion"],
      keepUnusedDataFor: 5,
    }),

    fetchRSAllRandomOrderQuestions: builder.query({
      query: (quizSessionId) => ({
        url: `${RSQuestion_URL}/random${
          quizSessionId ? `?quizSessionId=${quizSessionId}` : ""
        }`,
        credentials: "include",
      }),
      transformResponse: (response) => ({
        quizSessionId: response.quizSessionId,
        questions: response.questions,
      }),
      providesTags: ["RSQuestion"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useAddRSQuestionMutation,
  useUpdateRSQuestionMutation,
  useDeleteRSQuestionMutation,
  useFetchRSQuestionsQuery,
  useFetch30RSQuestionsQuery,
  useFetchRandomRSQuestionsQuery,
  useFetchRSAllRandomOrderQuestionsQuery,
} = rSQuestionApiSlice;
