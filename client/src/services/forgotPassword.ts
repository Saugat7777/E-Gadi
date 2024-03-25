// Need to use the React-specific entry point to allow generating React hooks

import { showMessage } from "../utils/help";
import apiSlice from "./apiSlice";

export const forgotPasswordAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postGenerateOTP: builder.mutation<any, any>({
      query: (body) => ({
        url: "/otp/generate-otp",
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
    postVerifyOTP: builder.mutation<any, any>({
      query: (body) => ({
        url: "/otp/verify-otp",
        method: "POST",
        body,
      }),
      transformResponse: (resp: any) => {
        showMessage("success", resp?.message);
        return resp?.data;
      },
      transformErrorResponse(baseQueryReturnValue: any) {
        showMessage("error", baseQueryReturnValue?.data?.message);
        return baseQueryReturnValue?.data;
      },
    }),
  }),
});

export const { usePostGenerateOTPMutation, usePostVerifyOTPMutation } =
  forgotPasswordAPI;
