import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  IBook,
  CreateBookInput,
  UpdateBookInput,
  ApiResponse,
  PaginatedResponse,
  BooksQueryParams,
} from '../../types';

const API_BASE_URL = 'http://localhost:5000/api';

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ['Books'],
  endpoints: (builder) => ({
    // Get all books with pagination, filter, sort
    getBooks: builder.query<PaginatedResponse<IBook>, BooksQueryParams | void>({
      query: (params = {}) => {
        const queryString = new URLSearchParams();
        
        // Type guard to check if params is not void
        if (params && typeof params === 'object') {
          if (params.filter) queryString.append('filter', params.filter);
          if (params.sortBy) queryString.append('sortBy', params.sortBy);
          if (params.sort) queryString.append('sort', params.sort);
          if (params.limit) queryString.append('limit', params.limit.toString());
          if (params.page) queryString.append('page', params.page.toString());
        }
        
        return `/books?${queryString.toString()}`;
      },
      providesTags: ['Books'],
    }),

    // Get single book by ID
    getBookById: builder.query<ApiResponse<IBook>, string>({
      query: (id) => `/books/${id}`,
      providesTags: (result, error, id) => [{ type: 'Books', id }],
    }),

    // Create new book
    createBook: builder.mutation<ApiResponse<IBook>, CreateBookInput>({
      query: (book) => ({
        url: '/books',
        method: 'POST',
        body: book,
      }),
      invalidatesTags: ['Books'],
    }),

    // Update book
    updateBook: builder.mutation<ApiResponse<IBook>, { id: string; data: UpdateBookInput }>({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Books', id }, 'Books'],
    }),

    // Delete book
    deleteBook: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Books'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApi;