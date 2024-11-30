import { apiSlice } from "./apiSlice";
import { RSgfQuestion_URL } from "../../utils/constants";

export const rSgfQuestionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addRSgfQuestion: builder.mutation({
      query: (newQuestion) => ({
        url: `${RSgfQuestion_URL}/add`,
        method: "POST",
        credentials: "include",
        body: newQuestion,
      }),
      invalidatesTags: ["RSgfQuestion"],
    }),

    updateRSgfQuestion: builder.mutation({
      query: ({ questionId, updatedQuestion }) => ({
        url: `${RSgfQuestion_URL}/update/${questionId}`,
        method: "PUT",
        credentials: "include",
        body: updatedQuestion,
      }),
      invalidatesTags: ["RSgfQuestion"],
    }),

    deleteRSgfQuestion: builder.mutation({
      query: (questionId) => ({
        url: `${RSgfQuestion_URL}/delete/${questionId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["RSgfQuestion"],
    }),

    fetchRSgfQuestions: builder.query({
      query: () => ({
        url: `${RSgfQuestion_URL}/all`,
        credentials: "include",
      }),
      providesTags: ["RSgfQuestion"],
      keepUnusedDataFor: 5,
    }),

    fetch20RSgfQuestions: builder.query({
      query: () => ({
        url: `${RSgfQuestion_URL}/first20`,
        credentials: "include",
      }),
      providesTags: ["RSgfQuestion"],
      keepUnusedDataFor: 5,
    }),

    fetchRandomRSgfQuestions: builder.query({
      query: () => ({
        url: `${RSgfQuestion_URL}/random85`,
        credentials: "include",
      }),
      providesTags: ["RSgfQuestion"],
      keepUnusedDataFor: 5,
    }),

    fetchRSgfAllRandomOrderQuestions: builder.query({
      query: (quizSessionId) => ({
        url: `${RSgfQuestion_URL}/random${
          quizSessionId ? `?quizSessionId=${quizSessionId}` : ""
        }`,
        credentials: "include",
      }),
      transformResponse: (response) => ({
        quizSessionId: response.quizSessionId,
        questions: response.questions,
      }),
      providesTags: ["RSgfQuestion"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useAddRSgfQuestionMutation,
  useUpdateRSgfQuestionMutation,
  useDeleteRSgfQuestionMutation,
  useFetchRSgfQuestionsQuery,
  useFetch20RSgfQuestionsQuery,
  useFetchRandomRSgfQuestionsQuery,
  useFetchRSgfAllRandomOrderQuestionsQuery,
} = rSgfQuestionApiSlice;
