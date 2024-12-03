import { apiSlice } from "./apiSlice";
import { TPQuestion_URL } from "../../utils/constants";

export const tPQuestionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addTPQuestion: builder.mutation({
      query: (newQuestion) => ({
        url: `${TPQuestion_URL}/add`,
        method: "POST",
        credentials: "include",
        body: newQuestion,
      }),
      invalidatesTags: ["TPQuestion"],
    }),

    updateTPQuestion: builder.mutation({
      query: ({ questionId, updatedQuestion }) => ({
        url: `${TPQuestion_URL}/update/${questionId}`,
        method: "PUT",
        credentials: "include",
        body: updatedQuestion,
      }),
      invalidatesTags: ["TPQuestion"],
    }),

    deleteTPQuestion: builder.mutation({
      query: (questionId) => ({
        url: `${TPQuestion_URL}/delete/${questionId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["TPQuestion"],
    }),

    fetchTPQuestions: builder.query({
      query: () => ({
        url: `${TPQuestion_URL}/all`,
        credentials: "include",
      }),
      providesTags: ["TPQuestion"],
      keepUnusedDataFor: 5,
    }),

    fetch30TPQuestions: builder.query({
      query: () => ({
        url: `${TPQuestion_URL}/first20`,
        credentials: "include",
      }),
      providesTags: ["TPQuestion"],
      keepUnusedDataFor: 5,
    }),

    fetchRandomTPQuestions: builder.query({
      query: () => ({
        url: `${TPQuestion_URL}/random85`,
        credentials: "include",
      }),
      providesTags: ["TPQuestion"],
      keepUnusedDataFor: 5,
    }),

    fetchTPAllRandomOrderQuestions: builder.query({
      query: (quizSessionId) => ({
        url: `${TPQuestion_URL}/random${
          quizSessionId ? `?quizSessionId=${quizSessionId}` : ""
        }`,
        credentials: "include",
      }),
      transformResponse: (response) => ({
        quizSessionId: response.quizSessionId,
        questions: response.questions,
      }),
      providesTags: ["TPQuestion"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useAddTPQuestionMutation,
  useUpdateTPQuestionMutation,
  useDeleteTPQuestionMutation,
  useFetchTPQuestionsQuery,
  useFetch30TPQuestionsQuery,
  useFetchRandomTPQuestionsQuery,
  useFetchTPAllRandomOrderQuestionsQuery,
} = tPQuestionApiSlice;
