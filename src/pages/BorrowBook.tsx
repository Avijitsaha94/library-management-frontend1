/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import type { FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetBookByIdQuery } from '../features/books/booksApi';
import { useBorrowBookMutation } from '../features/borrows/borrowsApi';
import { ArrowLeft, BookOpen } from 'lucide-react';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

const BorrowBook = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const { data, isLoading: isFetching } = useGetBookByIdQuery(bookId!);
  const [borrowBook, { isLoading }] = useBorrowBookMutation();

  const [formData, setFormData] = useState({
    quantity: 1,
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 14 days from now
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const book = data?.data;
    if (!book) return;

    if (formData.quantity > book.copies) {
      toast.error(`Only ${book.copies} copies available`);
      return;
    }

    if (formData.quantity < 1) {
      toast.error('Quantity must be at least 1');
      return;
    }

    try {
      await borrowBook({
        book: bookId!,
        quantity: formData.quantity,
        dueDate: formData.dueDate,
      }).unwrap();
      toast.success('Book borrowed successfully!');
      navigate('/borrow-summary');
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to borrow book');
    }
  };

  if (isFetching) return <LoadingSpinner />;

  const book = data?.data;

  if (!book || !book.available) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Book Not Available</h2>
          <button
            onClick={() => navigate('/')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Go back to books
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(`/books/${bookId}`)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Book Details
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Borrow Book</h1>
          <p className="text-gray-600">Fill in the details to borrow this book</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Book Info Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Book Information</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Title</p>
                <p className="text-lg font-semibold text-gray-900">{book.title}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Author</p>
                <p className="text-lg font-semibold text-gray-900">{book.author}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Genre</p>
                <p className="text-lg font-semibold text-gray-900">
                  {book.genre.replace('_', ' ')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">ISBN</p>
                <p className="text-lg font-semibold text-gray-900">{book.isbn}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Available Copies</p>
                <p className="text-lg font-semibold text-green-600">{book.copies}</p>
              </div>
            </div>
          </div>

          {/* Borrow Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Borrow Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  max={book.copies}
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Maximum: {book.copies} {book.copies === 1 ? 'copy' : 'copies'}
                </p>
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Please return the book by this date
                </p>
              </div>

              {/* Warning Message */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> If you borrow all available copies, this book will be
                  marked as unavailable for others.
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate(`/books/${bookId}`)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <BookOpen className="w-5 h-5" />
                  {isLoading ? 'Borrowing...' : 'Borrow Book'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowBook;