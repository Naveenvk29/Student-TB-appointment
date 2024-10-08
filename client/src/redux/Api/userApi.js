import { USER_URL } from "../constant";
import { apiSlice } from "./apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: `${USER_URL}/profile`,
      }),
    }),
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: `${USER_URL}`,
      }),
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `${USER_URL}/user/${id}`,
      }),
    }),
    approveStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `${USER_URL}/user/${id}`,
        method: "PUT",
        body: { status },
      }),
    }),
    addTeacher: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/teacher/addnew`,
        method: "POST",
        body: data,
      }),
    }),
    getMyAppointments: builder.query({
      query: () => ({
        url: `${USER_URL}/appointments`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useApproveStatusMutation,
  useAddTeacherMutation,
  useGetMyAppointmentsQuery,
} = userApi;
