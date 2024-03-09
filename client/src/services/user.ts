import { showMessage } from "../utils/help";
import apiSlice from "./apiSlice";

export const userAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<any, any>({
      query: (formData) => ({
        url: "/auth/user/register",
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
    updateUser: builder.mutation<any, any>({
      query: ({ id, formData }) => ({
        url: `/auth/user/update/${id}`,
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
      invalidatesTags: ["UserAuth"],
    }),
    getUsers: builder.query<any, void>({
      query: () => "/auth/user",
      transformResponse: (resp: any) => {
        return resp?.data;
      },
      transformErrorResponse(baseQueryReturnValue: any) {
        return baseQueryReturnValue?.data;
      },
      providesTags: ["UserAuth"],
    }),
    deleteUser: builder.mutation<any, any>({
      query: (id) => ({
        url: `/auth/user/delete/${id}`,
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
      invalidatesTags: ["UserAuth"],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useRegisterUserMutation,
  useUpdateUserMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
} = userAPI;
