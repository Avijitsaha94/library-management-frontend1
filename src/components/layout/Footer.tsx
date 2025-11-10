import { BookOpen, Github, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6 text-indigo-400" />
              <span className="text-xl font-bold text-white">Library MS</span>
            </div>
            <p className="text-sm text-gray-400">
              A modern library management system built with React, TypeScript, and Redux Toolkit.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-sm hover:text-indigo-400 transition">
                  All Books
                </a>
              </li>
              <li>
                <a href="/create-book" className="text-sm hover:text-indigo-400 transition">
                  Add New Book
                </a>
              </li>
              <li>
                <a href="/borrow-summary" className="text-sm hover:text-indigo-400 transition">
                  Borrow Summary
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-400 flex items-center justify-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500" fill="currentColor" /> for learning
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
