// Need to use the React-specific entry point to allow generating React hooks

import { showMessage } from "../utils/help";
import apiSlice from "./apiSlice";

export const newCarAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNewCars: builder.query<any, void>({
      query: () => "/car/new-car/all",
      transformResponse: (resp: any) => {
        return resp?.data;
      },
      transformErrorResponse(baseQueryReturnValue: any) {
        return baseQueryReturnValue?.data;
      },
      providesTags: ["NewCars"],
    }),
    postNewCar: builder.mutation<any, any>({
      query: (body) => ({
        url: "/car/new-car/add",
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
      invalidatesTags: ["NewCars"],
    }),
    updateNewCar: builder.mutation<any, any>({
      query: ({ formData, id }) => ({
        url: `/car/new-car/update/${id}`,
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
      invalidatesTags: ["NewCars"],
    }),
    deleteNewCar: builder.mutation<any, any>({
      query: (id) => ({
        url: `/car/new-car/delete/${id}`,
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
      invalidatesTags: ["NewCars"],
    }),
  }),
});

export const {
  useGetNewCarsQuery,
  usePostNewCarMutation,
  useUpdateNewCarMutation,
  useDeleteNewCarMutation,
} = newCarAPI;
