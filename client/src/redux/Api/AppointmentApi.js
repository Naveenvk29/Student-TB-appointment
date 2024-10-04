import { APPOINTMENT_URL } from "../constant";
import { apiSlice } from "./apiSlice";

const appointmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAppointments: builder.query({
      query: () => ({
        url: `${APPOINTMENT_URL}`,
        method: "GET",
      }),
    }),
    getAppointmentById: builder.query({
      query: (id) => ({
        url: `${APPOINTMENT_URL}/${id}`,
        method: "GET",
      }),
    }),
    createAppointment: builder.mutation({
      query: (data) => ({
        url: `${APPOINTMENT_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    updateAppointment: builder.mutation({
      query: (id, data) => ({
        url: `${APPOINTMENT_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteAppointment: builder.mutation({
      query: (id) => ({
        url: `${APPOINTMENT_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    // getAllAppointmentsByStudentId
    // getAppointmentsByTeacherId
    // approveStatus
  }),
});

export const {
  useGetAppointmentsQuery,
  useGetAppointmentByIdQuery,
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
} = appointmentApi;
