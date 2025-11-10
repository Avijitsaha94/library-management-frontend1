# 📚 Library Management System

A modern, full-stack library management system built with React, TypeScript, Redux Toolkit Query, and Express.js. This application provides a comprehensive solution for managing books, tracking borrowing activities, and generating detailed reports.

![Library Management System](https://img.shields.io/badge/React-18.x-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue) ![Node.js](https://img.shields.io/badge/Node.js-20.x-green) ![MongoDB](https://img.shields.io/badge/MongoDB-7.x-green)

## ✨ Features

### 📖 Book Management
- **CRUD Operations**: Create, read, update, and delete books
- **Advanced Search**: Search by title, author, or ISBN
- **Genre Filtering**: Filter books by genres (Fiction, Non-Fiction, Science, History, Biography, Fantasy)
- **Sorting Options**: Sort by title, author, or creation date
- **Pagination**: Efficient pagination for large book collections
- **Availability Tracking**: Real-time tracking of available copies

### 📊 Borrowing System
- **Borrow Books**: Simple interface for borrowing books with quantity validation
- **Due Date Management**: Set and track return due dates
- **Availability Updates**: Automatic availability updates based on copies
- **Borrow Summary**: Aggregated view of all borrowed books with statistics

### 🎨 User Interface
- **Modern Design**: Clean and intuitive UI with Tailwind CSS
- **Responsive Layout**: Fully responsive design for mobile, tablet, and desktop
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: Smooth loading indicators and skeleton screens
- **Confirmation Dialogs**: Safe deletion with confirmation prompts

### 🚀 Technical Features
- **Type Safety**: Full TypeScript implementation
- **State Management**: Redux Toolkit Query for efficient data fetching and caching
- **Optimistic Updates**: Instant UI updates with automatic cache invalidation
- **API Integration**: RESTful API with proper error handling
- **Form Validation**: Client-side validation with user-friendly error messages

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18.x
- **Language**: TypeScript 5.x
- **State Management**: Redux Toolkit + RTK Query
- **Routing**: React Router DOM 6.x
- **Styling**: Tailwind CSS 3.x
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Build Tool**: Vite

### Backend
- **Runtime**: Node.js 20.x
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Validation**: Zod
- **CORS**: Enabled for cross-origin requests

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v20.x or higher)
- npm (v9.x or higher)
- MongoDB (v7.x or higher) or MongoDB Atlas account
- Git (optional, for cloning)

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Avijitsaha94/Library-Management-API.git
cd Library-Management-API
```

### 2. Backend Setup
```bash
# Navigate to backend directory (if separate)
cd backend

# Install dependencies
npm install

# Create .env file
touch .env
```

**Configure `.env` file:**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

**Start the backend server:**
```bash
npm run dev
```
Backend will run at: `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal window:
```bash
# Create frontend project
npm create vite@latest library-management-frontend -- --template react-ts
cd library-management-frontend

# Install dependencies
npm install

# Install additional packages
npm install @reduxjs/toolkit react-redux react-router-dom
npm install lucide-react react-hot-toast
npm install -D tailwindcss postcss autoprefixer

# Initialize Tailwind CSS
npx tailwindcss init -p
```

**Configure Tailwind CSS:**

Update `tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Update `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}
```

**Start the frontend server:**
```bash
npm run dev
```
Frontend will run at: `http://localhost:3000`

## 📂 Project Structure
```
library-management-system/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── book.controller.ts
│   │   │   └── borrow.controller.ts
│   │   ├── models/
│   │   │   ├── book.model.ts
│   │   │   └── borrow.model.ts
│   │   ├── routes/
│   │   │   ├── book.route.ts
│   │   │   └── borrow.route.ts
│   │   ├── middleware/
│   │   ├── validators/
│   │   └── app.ts
│   ├── .env
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── app/
    │   │   └── store.ts
    │   ├── features/
    │   │   ├── books/
    │   │   │   └── booksApi.ts
    │   │   └── borrows/
    │   │       └── borrowsApi.ts
    │   ├── types/
    │   │   └── index.ts
    │   ├── components/
    │   │   ├── layout/
    │   │   │   ├── Navbar.tsx
    │   │   │   └── Footer.tsx
    │   │   └── ui/
    │   │       ├── LoadingSpinner.tsx
    │   │       └── ConfirmDialog.tsx
    │   ├── pages/
    │   │   ├── BooksList.tsx
    │   │   ├── CreateBook.tsx
    │   │   ├── EditBook.tsx
    │   │   ├── BookDetails.tsx
    │   │   ├── BorrowBook.tsx
    │   │   └── BorrowSummary.tsx
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── index.css
    ├── index.html
    ├── tailwind.config.js
    ├── vite.config.ts
    └── package.json
```

## 🔌 API Endpoints

### Books
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/books` | Create a new book |
| GET | `/api/books` | Get all books (with pagination, filter, sort) |
| GET | `/api/books/:bookId` | Get a single book by ID |
| PATCH | `/api/books/:bookId` | Update a book |
| DELETE | `/api/books/:bookId` | Delete a book |

### Borrows
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/borrows` | Borrow a book |
| GET | `/api/borrows/summary` | Get borrow summary (aggregated) |

## 📸 Screenshots

### Books List
![Books List](screenshots/books-list.png)

### Book Details
![Book Details](screenshots/book-details.png)

### Borrow Summary
![Borrow Summary](screenshots/borrow-summary.png)

## 🧪 Usage Examples

### Creating a Book
```json
POST /api/books
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "genre": "SCIENCE",
  "isbn": "978-0132350884",
  "description": "A handbook of agile software craftsmanship",
  "copies": 5
}
```

### Borrowing a Book
```json
POST /api/borrows
{
  "book": "book_id_here",
  "quantity": 2,
  "dueDate": "2025-12-31"
}
```

## 🔧 Configuration

### Environment Variables

**Backend `.env`:**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/library-management
NODE_ENV=development
```

**Frontend API Base URL:**
Update in `src/features/books/booksApi.ts` and `src/features/borrows/borrowsApi.ts`:
```typescript
const API_BASE_URL = 'http://localhost:5000/api';
```

## 🐛 Troubleshooting

### CORS Issues
Ensure CORS is enabled in backend `app.ts`:
```typescript
import cors from 'cors';
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

### MongoDB Connection Issues
- Check MongoDB is running
- Verify connection string in `.env`
- Ensure IP is whitelisted in MongoDB Atlas

### Port Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000

# Kill process on port 3000
npx kill-port 3000
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Avijit Saha**
- GitHub: [@Avijitsaha94](https://github.com/Avijitsaha94)
  
- Email: avijitsh94@gmail.com

## 🙏 Acknowledgments

- [React Documentation](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)



---

⭐ **Star this repository if you find it helpful!**
