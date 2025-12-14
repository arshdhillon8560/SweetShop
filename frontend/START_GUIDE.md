# Frontend Startup Guide

## Quick Start

### Step 1: Navigate to Frontend Directory
```bash
cd frontend
```

### Step 2: Install Dependencies (if not already done)
```bash
npm install
```

### Step 3: Start the Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3001`

## What You'll See

After running `npm run dev`, you should see output like:
```
  VITE v4.4.9  ready in 500 ms

  ➜  Local:   http://localhost:3001/
  ➜  Network: use --host to expose
```

## Important Notes

1. **Backend Must Be Running**: Make sure the backend server is running on `http://localhost:3000` before using the frontend.

2. **First Time Setup**: 
   - Register a new account
   - Or login if you already have an account
   - To get admin access, use the backend script: `cd backend && npm run create-admin`

3. **Development Mode**: 
   - The dev server runs in watch mode (auto-reloads on file changes)
   - Hot module replacement (HMR) is enabled

## Available Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server (port 3001) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

## Troubleshooting

### Port Already in Use
If port 3001 is already in use, Vite will automatically try the next available port (3002, 3003, etc.)

### Cannot Connect to Backend
- Verify backend is running on `http://localhost:3000`
- Check browser console for CORS errors
- Verify `.env` file in backend has correct configuration

### Module Not Found
Run `npm install` again to ensure all dependencies are installed.

## Stopping the Server

Press `Ctrl + C` in the terminal where the server is running.

