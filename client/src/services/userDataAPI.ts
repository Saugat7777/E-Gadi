// Need to use the React-specific entry point to allow generating React hooks

import apiSlice from "./apiSlice";

export const userDataAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query<any, void>({
      query: () => "/user/current-user",
      transformResponse: (resp: any) => {
        return resp?.data;
      },
      transformErrorResponse(baseQueryReturnValue: any) {
        return baseQueryReturnValue?.data;
      },
    }),
    getCurrentUserAllData: builder.query<any, void>({
      query: () => "/user/current-user-allData",
      transformResponse: (resp: any) => {
        return resp?.data;
      },
      transformErrorResponse(baseQueryReturnValue: any) {
        return baseQueryReturnValue?.data;
      },
      providesTags: ["UserAuth"],
    }),
  }),
});

export const { useGetCurrentUserQuery, useGetCurrentUserAllDataQuery } =
  userDataAPI;
