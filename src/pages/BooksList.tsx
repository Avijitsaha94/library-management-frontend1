/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetBooksQuery, useDeleteBookMutation } from '../features/books/booksApi';
import { Search, Edit2, Trash2, Eye, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import toast from 'react-hot-toast';

const BooksList = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [filter, setFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sort, setSort] = useState<'asc' | 'desc'>('desc');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading, isFetching } = useGetBooksQuery({
    page,
    limit,
    filter: filter || undefined,
    sortBy,
    sort,
  });

  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

  const books = data?.data || [];
  const meta = data?.meta;

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteBook(deleteId).unwrap();
      toast.success('Book deleted successfully!');
      setDeleteId(null);
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to delete book');
    }
  };

  const filteredBooks = books.filter((book) => {
    const search = searchTerm.toLowerCase();
    return (
      book.title.toLowerCase().includes(search) ||
      book.author.toLowerCase().includes(search) ||
      book.isbn.toLowerCase().includes(search)
    );
  });

  const genres = ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Books</h1>
          <p className="text-gray-600">Browse and manage your library collection</p>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, author, or ISBN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Genre Filter */}
            <select
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setPage(1);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre.replace('_', ' ')}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={`${sortBy}-${sort}`}
              onChange={(e) => {
                const [newSortBy, newSort] = e.target.value.split('-');
                setSortBy(newSortBy);
                setSort(newSort as 'asc' | 'desc');
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
              <option value="author-asc">Author (A-Z)</option>
              <option value="author-desc">Author (Z-A)</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {/* Books Grid */}
            {filteredBooks.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No books found</h3>
                <p className="text-gray-500 mb-6">
                  {searchTerm || filter
                    ? 'Try adjusting your filters or search terms'
                    : 'Start by adding your first book'}
                </p>
                <Link
                  to="/create-book"
                  className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Add Your First Book
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredBooks.map((book) => (
                  <div
                    key={book._id}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
                  >
                    {/* Book Header */}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2">
                            {book.title}
                          </h3>
                          <p className="text-sm text-gray-600">{book.author}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            book.available
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {book.available ? 'Available' : 'Unavailable'}
                        </span>
                      </div>

                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Genre:</span>{' '}
                          {book.genre.replace('_', ' ')}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">ISBN:</span> {book.isbn}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Copies:</span> {book.copies}
                        </p>
                      </div>

                      {book.description && (
                        <p className="text-sm text-gray-500 line-clamp-3 mb-4">
                          {book.description}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="bg-gray-50 px-6 py-4 flex gap-2">
                      <Link
                        to={`/books/${book._id}`}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </Link>
                      <Link
                        to={`/edit-book/${book._id}`}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </Link>
                      {book.available && (
                        <Link
                          to={`/borrow/${book._id}`}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                        >
                          <BookOpen className="w-4 h-4" />
                          Borrow
                        </Link>
                      )}
                      <button
                        onClick={() => setDeleteId(book._id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                        disabled={isDeleting}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {meta && meta.totalPages > 1 && (
              <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing {(page - 1) * limit + 1} to{' '}
                  {Math.min(page * limit, meta.total)} of {meta.total} books
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1 || isFetching}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="px-4 py-2 font-medium">
                    Page {page} of {meta.totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
                    disabled={page === meta.totalPages || isFetching}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Book"
        message="Are you sure you want to delete this book? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default BooksList;