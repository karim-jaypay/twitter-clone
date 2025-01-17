import { IFirstSignup, ISecondSignup, IActivateUser, ILogin } from "./../types";
import { createApi } from "@reduxjs/toolkit/query/react";
import { BaseQuery } from "../utils";

// Define a service using a base URL and expected endpoints
export const AuthApi = createApi({
  reducerPath: "AuthApi",
  baseQuery: BaseQuery,
  endpoints: builder => ({
    // first sign up modal api
    firstSignUp: builder.mutation<any, IFirstSignup>({
      query: data => ({
        url: `auth/create`,
        method: "POST",
        body: data,
      }),
    }),
    // second sign up modal api
    secondSignUp: builder.mutation<any, ISecondSignup>({
      query: data => ({
        url: `auth/update`,
        method: "POST",
        body: data,
      }),
    }),
    // activate user
    activateUser: builder.mutation<any, IActivateUser>({
      query: data => ({
        url: `auth/activate`,
        method: "POST",
        body: data,
      }),
    }),
    // Login
    Login: builder.mutation<any, ILogin>({
      query: data => ({
        url: `auth/login`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useFirstSignUpMutation,
  useSecondSignUpMutation,
  useActivateUserMutation,
  useLoginMutation,
} = AuthApi;
