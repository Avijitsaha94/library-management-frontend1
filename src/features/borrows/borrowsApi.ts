import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ApiResponse, BorrowBookInput, IBorrow, BorrowSummaryItem } from '../../types';

const API_BASE_URL = 'http://localhost:5000/api';

export const borrowsApi = createApi({
  reducerPath: 'borrowsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ['Borrows', 'Books'],
  endpoints: (builder) => ({
    // Borrow a book
    borrowBook: builder.mutation<ApiResponse<IBorrow>, BorrowBookInput>({
      query: (data) => ({
        url: '/borrows',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Borrows', 'Books'],
    }),

    // Get borrow summary
    getBorrowSummary: builder.query<ApiResponse<{ data: BorrowSummaryItem[] }>, void>({
      query: () => '/borrows/summary',
      providesTags: ['Borrows'],
    }),
  }),
});

export const {
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = borrowsApi;