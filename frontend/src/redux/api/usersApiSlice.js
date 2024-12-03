import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../../utils/constants";
import { setCredentials } from "../features/authSlice";
import socket from "../../socket/socket";

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
      async onQueryStarted(arg, { dispatch, getState, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const currentState = getState().auth.userInfo;
          if (currentState?._id === data._id) {
            dispatch(setCredentials({ ...data, token: currentState.token }));
          } // Update Redux state
          socket.emit("userUpdated", data); // Emit WebSocket event
        } catch (error) {
          console.error("Error updating user:", error);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApiSlice;
