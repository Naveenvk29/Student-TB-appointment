import { MESSAGE_URL } from "../constant";
import { apiSlice } from "./apiSlice";

const messageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMessages: builder.query({
      query: () => ({
        url: `${MESSAGE_URL}`,
        method: "GET",
      }),
    }),
    sendMessage: builder.mutation({
      query: (data) => ({
        url: `${MESSAGE_URL}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllMessagesQuery, useSendMessageMutation } = messageApi;
