import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { handleLogout } from "../features/authSlice";
import { RootState } from "../store";

const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
> = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (header, { getState }) => {
    const { accessToken, loginMethod } = (getState() as RootState).auth;
    if (accessToken) {
      if (loginMethod === "GOOGLE")
        return header.set("google-auth-token", accessToken);
      if (loginMethod === "SERVER")
        return header.set("x-auth-token", accessToken);
    }

    return header;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    api.dispatch(handleLogout());
  }
  return result;
};

const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["NewCars", "UserAuth", "UsedCars"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});

export default apiSlice;
