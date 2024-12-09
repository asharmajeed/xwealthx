import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../../constants";
import { setCredentials } from "../features/authSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (code) => ({
        url: `${USERS_URL}/google?code=${code}`,
        method: "POST",
        credentials: "include",
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
        credentials: "include",
      }),
    }),

    getCurrentUser: builder.query({
      query: () => ({
        url: USERS_URL,
        credentials: "include",
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
      onQueryStarted: async (arg, { dispatch, getState, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled; // Get user data from the fulfilled query
          const currentState = getState().auth.userInfo; // Get the current user info from global state

          // Merge the previous state with the new data if the user exists
          if (currentState) {
            const mergedData = { ...currentState, ...data }; // Merge logic
            dispatch(setCredentials(mergedData)); // Dispatch the updated user data to Redux state
          }
        } catch (error) {
          console.error("Error fetching current user:", error);
        }
      },
    }),

    // ADMIN ROUTES
    getUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}/all-users`,
        credentials: "include",
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApiSlice;
