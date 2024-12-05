import { apiSlice } from "./apiSlice";
import { SUBJECTS_URL } from "../../utils/constants";

export const subjectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchQuestionsBySubject: builder.query({
      query: (subject) => ({
        url: `${SUBJECTS_URL}/${subject}`,
        credentials: "include",
      }),
    }),
    updateQuestion: builder.mutation({
      query: ({ subject, id, updates }) => ({
        url: `${SUBJECTS_URL}/${subject}/${id}`,
        method: "PUT",
        credentials: "include",
        body: updates,
      }),
    }),
  }),
});

export const { useFetchQuestionsBySubjectQuery, useUpdateQuestionMutation } =
  subjectApiSlice;
