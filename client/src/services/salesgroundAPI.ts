// Need to use the React-specific entry point to allow generating React hooks

import apiSlice from "./apiSlice";

export const salesgroundAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSalesgroundUsedCars: builder.query<any, void>({
      query: () => "/salesground/used-car/all",
      transformResponse: (resp: any) => {
        return resp?.data;
      },
      transformErrorResponse(baseQueryReturnValue: any) {
        return baseQueryReturnValue?.data;
      },
      providesTags: ["UsedCars"],
    }),
    getSalesgroundUsedCarById: builder.query<any, string>({
      query: (id) => `/salesground/used-car/get-by-id/${id}`,
      transformResponse: (resp: any) => {
        return resp?.data;
      },
      transformErrorResponse(baseQueryReturnValue: any) {
        return baseQueryReturnValue?.data;
      },
      providesTags: ["UsedCars"],
    }),
    getSalesgroundNewCars: builder.query<any, void>({
      query: () => "/salesground/new-car/all",
      transformResponse: (resp: any) => {
        return resp?.data;
      },
      transformErrorResponse(baseQueryReturnValue: any) {
        return baseQueryReturnValue?.data;
      },
      providesTags: ["NewCars"],
    }),
    getSalesgroundNewCarById: builder.query<any, string>({
      query: (id) => `/salesground/new-car/get-by-id/${id}`,
      transformResponse: (resp: any) => {
        return resp?.data;
      },
      transformErrorResponse(baseQueryReturnValue: any) {
        return baseQueryReturnValue?.data;
      },
      providesTags: ["NewCars"],
    }),
  }),
});

export const {
  useGetSalesgroundUsedCarsQuery,
  useGetSalesgroundUsedCarByIdQuery,
  useGetSalesgroundNewCarsQuery,
  useGetSalesgroundNewCarByIdQuery,
} = salesgroundAPI;
