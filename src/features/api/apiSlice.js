// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EGORAS_PAY_URL } from "../../core/constants";

export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "api",

  baseQuery: fetchBaseQuery({ baseUrl: EGORAS_PAY_URL }),

  endpoints: (builder) => ({
    getPost: builder.query({
      query: () => "/posts",
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetPostsQuery } = apiSlice;
