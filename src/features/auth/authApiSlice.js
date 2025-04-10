import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5002/api/users",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  keepUnusedDataFor: 60, 
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (userData) => ({
        url: "/signup",
        method: "POST",
        body: userData,
      }),
      transformErrorResponse: (response) => {
        console.error("Signup error response:", {
          status: response.status,
          data: response.data,
        });

        let errorMessage = "Signup failed";

        if (response.status === 500) {
          errorMessage = "Server error occurred. Please try again later.";
        } else if (response.data?.message) {
          errorMessage = response.data.message;
        } else if (response.data?.error) {
          errorMessage = response.data.error;
        }

        return {
          status: response.status,
          data: response.data,
          message: errorMessage,
        };
      },
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
        return response;
      },
      transformErrorResponse: (response) => {
        console.error("Login error response:", {
          status: response.status,
          data: response.data,
        });

        let errorMessage = "Login failed";

        if (response.status === 401) {
          errorMessage = "Invalid email or password";
        } else if (response.status === 500) {
          errorMessage = "Server error occurred. Please try again later.";
        } else if (response.data?.message) {
          errorMessage = response.data.message;
        }

        return {
          status: response.status,
          data: response.data,
          message: errorMessage,
        };
      },
    }),
  }),
});

export const { useSignupMutation, useLoginMutation } = authApiSlice;
