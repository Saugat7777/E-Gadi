import { showMessage } from "../utils/help";
import apiSlice from "./apiSlice";

// Define authentication API using RTK Query's injectEndpoints function
export const authAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<any, string>({
      query: (formData) => ({
        url: "/auth/login",
        method: "POST",
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
      invalidatesTags: ["UserAuth"],
    }),
    // login with Google endpoint
    loginWithGoogle: builder.mutation<any, any>({
      query: (formData) => ({
        url: "/auth/login/google",
        method: "POST",
        body: formData,
      }),
      transformResponse: (resp: any) => {
        showMessage("success", resp?.message);
        return resp;
      },
      transformErrorResponse(baseQueryReturnValue: any) {
        showMessage("error", baseQueryReturnValue?.data?.message);
        return baseQueryReturnValue?.data;
      },
      invalidatesTags: ["UserAuth"],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useLoginWithGoogleMutation } = authAPI;
