<<<<<<< HEAD
# 🍬 Sweet Shop - Full Stack Application

A modern full-stack e-commerce application for managing a sweet shop with user authentication, inventory management, and admin controls.

## 🏗️ Architecture

- **Backend**: NestJS with TypeScript, MongoDB, JWT Authentication
- **Frontend**: React with TypeScript, Vite

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (running locally or connection string)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/sweetshop
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d
```

4. Start the backend server:
```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3001`

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Sweets (Protected - requires JWT token)
- `GET /api/sweets` - Get all sweets
- `GET /api/sweets/search?name=&category=&minPrice=&maxPrice=` - Search sweets
- `GET /api/sweets/:id` - Get a single sweet
- `POST /api/sweets` - Create a new sweet (Admin only)
- `PUT /api/sweets/:id` - Update a sweet (Admin only)
- `DELETE /api/sweets/:id` - Delete a sweet (Admin only)
- `POST /api/sweets/:id/purchase` - Purchase a sweet (decreases quantity)
- `POST /api/sweets/:id/restock` - Restock a sweet (Admin only)

## 🔐 Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## ✨ Features

### User Features
- User registration and login
- Browse all available sweets
- Search and filter sweets by name, category, and price range
- Purchase sweets (quantity decreases automatically)
- View stock availability

### Admin Features
- All user features
- Add new sweets
- Edit existing sweets
- Delete sweets
- Restock inventory

## 🎨 Design

The application features a modern, responsive design with:
- Beautiful gradient backgrounds
- Smooth animations and transitions
- Card-based layout
- Mobile-friendly responsive design
- Intuitive user interface

## 📝 Notes

- First registered user is a regular user (not admin)
- To create an admin user, you can:
  1. Use the script: `cd backend && npm run create-admin`
  2. Or manually update MongoDB: `db.users.updateOne({email: "admin@sweetshop.com"}, {$set: {isAdmin: true}})`
- All passwords are hashed using bcrypt
- JWT tokens expire after 7 days (configurable)

## 👨‍💼 Admin Panel Access

See `ADMIN_GUIDE.md` for detailed instructions on:
- Creating an admin user
- Accessing the admin panel
- Adding, editing, and deleting sweets
- Managing inventory

=======
# SweetShop
>>>>>>> 416feffced5338782db6e28d14ff6f8b2f4bf46e
