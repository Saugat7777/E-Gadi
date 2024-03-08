// Need to use the React-specific entry point to allow generating React hooks

import { showMessage } from "../utils/help";
import apiSlice from "./apiSlice";

export const usedCarAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsedCars: builder.query<any, void>({
      query: () => "/car/used-car/all",
      transformResponse: (resp: any) => {
        return resp?.data;
      },
      transformErrorResponse(baseQueryReturnValue: any) {
        return baseQueryReturnValue?.data;
      },
      providesTags: ["UsedCars"],
    }),
    getUsedCarByCurrentUser: builder.query<any, void>({
      query: () => "/car/used-car/get-by-current-user",
      transformResponse: (resp: any) => {
        return resp?.data;
      },
      transformErrorResponse(baseQueryReturnValue: any) {
        return baseQueryReturnValue?.data;
      },
      providesTags: ["UsedCars", "UserAuth"],
    }),
    postUsedCar: builder.mutation<any, any>({
      query: (body) => ({
        url: "/car/used-car/add",
        method: "POST",
        body,
      }),
      transformResponse: (resp: any) => {
        showMessage("success", resp?.message);
        return resp;
      },
      transformErrorResponse(baseQueryReturnValue: any) {
        console.log(baseQueryReturnValue, "bbb");
        showMessage("error", baseQueryReturnValue?.data?.message);
        return baseQueryReturnValue?.data;
      },
      invalidatesTags: ["UsedCars"],
    }),
    updateUsedCar: builder.mutation<any, any>({
      query: ({ formData, id }) => ({
        url: `/car/used-car/update/${id}`,
        method: "PUT",
        body: formData,
      }),
      transformResponse: (resp: any) => {
        showMessage("success", resp?.message);
        return resp;
      },
      transformErrorResponse(baseQueryReturnValue: any) {
        console.log(baseQueryReturnValue, "bbb");
        showMessage("error", baseQueryReturnValue?.data?.message);
        return baseQueryReturnValue?.data;
      },
      invalidatesTags: ["UsedCars"],
    }),
    deleteUsedCar: builder.mutation<any, any>({
      query: (id) => ({
        url: `/car/used-car/delete/${id}`,
        method: "DELETE",
        body: id,
      }),
      transformResponse: (resp: any) => {
        showMessage("success", resp?.message);
        return resp;
      },
      transformErrorResponse(baseQueryReturnValue: any) {
        console.log(baseQueryReturnValue, "bbb");
        showMessage("error", baseQueryReturnValue?.data?.message);
        return baseQueryReturnValue?.data;
      },
      invalidatesTags: ["UsedCars"],
    }),
  }),
});

export const {
  useGetUsedCarsQuery,
  useGetUsedCarByCurrentUserQuery,
  usePostUsedCarMutation,
  useUpdateUsedCarMutation,
  useDeleteUsedCarMutation,
} = usedCarAPI;
