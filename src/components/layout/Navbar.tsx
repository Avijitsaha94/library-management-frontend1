import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Plus, History } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-800">Library MS</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                isActive('/')
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">All Books</span>
            </Link>

            <Link
              to="/create-book"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                isActive('/create-book')
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Book</span>
            </Link>

            <Link
              to="/borrow-summary"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                isActive('/borrow-summary')
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <History className="w-4 h-4" />
              <span className="hidden sm:inline">Summary</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;