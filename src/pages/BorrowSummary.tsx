import { useGetBorrowSummaryQuery } from '../features/borrows/borrowsApi';
import { BookOpen, TrendingUp, Hash } from 'lucide-react';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const BorrowSummary = () => {
  const { data, isLoading } = useGetBorrowSummaryQuery();

  const summaryData = data?.data?.data || [];
  const totalBorrowed = summaryData.reduce((sum, item) => sum + item.totalQuantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Borrow Summary</h1>
          <p className="text-gray-600">Overview of all borrowed books and their quantities</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <BookOpen className="w-8 h-8 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Books Borrowed</p>
                <p className="text-2xl font-bold text-gray-900">{summaryData.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Quantity</p>
                <p className="text-2xl font-bold text-gray-900">{totalBorrowed}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Hash className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Average per Book</p>
                <p className="text-2xl font-bold text-gray-900">
                  {summaryData.length > 0 ? (totalBorrowed / summaryData.length).toFixed(1) : 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Table */}
        {isLoading ? (
          <LoadingSpinner />
        ) : summaryData.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Borrowed Books</h3>
            <p className="text-gray-500">There are currently no books borrowed from the library.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Book Title
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ISBN
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Quantity Borrowed
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {summaryData.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-indigo-600" />
                          <span className="text-sm font-medium text-gray-900">
                            {item.book.title}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.book.isbn}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-indigo-100 text-indigo-800">
                          {item.totalQuantity} {item.totalQuantity === 1 ? 'copy' : 'copies'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BorrowSummary;