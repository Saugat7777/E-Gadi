// Need to use the React-specific entry point to allow generating React hooks

import apiSlice from "./apiSlice";

export const compareCarAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompareCarList: builder.query<any, void>({
      query: () => "/compare-car/car-list/all",
      transformResponse: (resp: any) => {
        return resp?.data;
      },
      transformErrorResponse(baseQueryReturnValue: any) {
        return baseQueryReturnValue?.data;
      },
    }),
    postCompareCarIdentity: builder.mutation<any, any>({
      query: (body) => ({
        url: "/compare-car/compare",
        method: "POST",
        body,
      }),
      transformResponse: (resp: any) => {
        return resp?.data;
      },
      transformErrorResponse(baseQueryReturnValue: any) {
        return baseQueryReturnValue?.data;
      },
    }),
  }),
});

export const { useGetCompareCarListQuery, usePostCompareCarIdentityMutation } =
  compareCarAPI;
