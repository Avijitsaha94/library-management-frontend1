// Book Types
export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY';
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookInput {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
}

export interface UpdateBookInput {
  title?: string;
  author?: string;
  genre?: string;
  isbn?: string;
  description?: string;
  copies?: number;
  available?: boolean;
}

// Borrow Types
export interface IBorrow {
  _id: string;
  book: string | IBook;
  quantity: number;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface BorrowBookInput {
  book: string;
  quantity: number;
  dueDate: string;
}

export interface BorrowSummaryItem {
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  meta: {
    total: number;
    limit: number;
    page: number;
    totalPages: number;
  };
}

// Query Parameters
export interface BooksQueryParams {
  filter?: string;
  sortBy?: string;
  sort?: 'asc' | 'desc';
  limit?: number;
  page?: number;
}