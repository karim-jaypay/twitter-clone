import { IFirstSignup } from "./../types";
import { createApi } from "@reduxjs/toolkit/query/react";
import { BaseQuery } from "../utils";

// Define a service using a base URL and expected endpoints
export const AuthApi = createApi({
  reducerPath: "AuthApi",
  baseQuery: BaseQuery,
  endpoints: builder => ({
    firstSignUp: builder.mutation<void, IFirstSignup>({
      query: data => ({
        url: `register/create`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useFirstSignUpMutation } = AuthApi;
