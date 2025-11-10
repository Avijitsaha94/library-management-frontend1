import { useParams, useNavigate, Link } from 'react-router-dom';
import { useGetBookByIdQuery } from '../features/books/booksApi';
import { ArrowLeft, Edit2, BookOpen, Calendar, Hash, BookMarked } from 'lucide-react';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetBookByIdQuery(id!);

  if (isLoading) return <LoadingSpinner />;

  if (error || !data?.data) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Book Not Found</h2>
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

  const book = data.data;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Books
          </button>
        </div>

        {/* Book Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
                <p className="text-indigo-100 text-lg">{book.author}</p>
              </div>
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  book.available
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                }`}
              >
                {book.available ? 'Available' : 'Unavailable'}
              </span>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Genre */}
              <div className="flex items-start gap-3">
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <BookMarked className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Genre</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {book.genre.replace('_', ' ')}
                  </p>
                </div>
              </div>

              {/* ISBN */}
              <div className="flex items-start gap-3">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Hash className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">ISBN</p>
                  <p className="text-lg font-semibold text-gray-900">{book.isbn}</p>
                </div>
              </div>

              {/* Copies */}
              <div className="flex items-start gap-3">
                <div className="p-3 bg-green-100 rounded-lg">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Available Copies</p>
                  <p className="text-lg font-semibold text-gray-900">{book.copies}</p>
                </div>
              </div>

              {/* Created Date */}
              <div className="flex items-start gap-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Added On</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(book.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            {book.description && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed">{book.description}</p>
              </div>
            )}

            {/* Last Updated */}
            <div className="border-t pt-6">
              <p className="text-sm text-gray-500">
                Last updated:{' '}
                {new Date(book.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-8">
              <Link
                to={`/edit-book/${book._id}`}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <Edit2 className="w-5 h-5" />
                Edit Book
              </Link>
              {book.available && (
                <Link
                  to={`/borrow/${book._id}`}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  <BookOpen className="w-5 h-5" />
                  Borrow Book
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;