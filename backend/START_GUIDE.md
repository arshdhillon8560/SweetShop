# Backend Startup Guide

## Quick Start (After .env Setup)

### Step 1: Navigate to Backend Directory
```bash
cd backend
```

### Step 2: Install Dependencies (if not already done)
```bash
npm install
```

### Step 3: Verify .env File Exists
Make sure you have a `.env` file in the `backend` directory with:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/sweetshop
JWT_SECRET=your-secret-key-change-in-production-make-it-long-and-random
JWT_EXPIRES_IN=7d
```

### Step 4: Ensure MongoDB is Running
- **Local MongoDB**: Make sure MongoDB service is running on your system
- **MongoDB Atlas**: Verify your connection string is correct in `.env`

### Step 5: Start the Server

**For Development (Recommended):**
```bash
npm run start:dev
```

This command:
- Starts the server in watch mode
- Automatically restarts when you make code changes
- Shows detailed error messages
- Runs on the port specified in `.env` (default: 3000)

**Other Options:**

Production mode (requires build first):
```bash
npm run build
npm run start:prod
```

Debug mode:
```bash
npm run start:debug
```

### Step 6: Verify Server is Running

You should see output like:
```
[Nest] Starting Nest application...
[Nest] Application successfully started
Application is running on: http://localhost:3000
```

### Step 7: Test the API

Open your browser or use a tool like Postman/curl to test:
```bash
# Test health (if you have a health endpoint)
curl http://localhost:3000

# Or test registration
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
```

## Common Issues

### Port Already in Use
**Error**: `EADDRINUSE: address already in use :::3000`

**Solution**: 
1. Change the `PORT` in `.env` to a different port (e.g., `PORT=3001`)
2. Or stop the process using port 3000

### MongoDB Connection Error
**Error**: `MongoServerError` or connection timeout

**Solutions**:
1. Verify MongoDB is running: `mongosh` or check MongoDB service
2. Check `MONGODB_URI` in `.env` is correct
3. For MongoDB Atlas: Ensure your IP is whitelisted and credentials are correct

### Module Not Found
**Error**: `Cannot find module '@nestjs/...'`

**Solution**: 
```bash
npm install
```

### JWT Secret Warning
**Warning**: Using default JWT secret

**Solution**: Change `JWT_SECRET` in `.env` to a secure random string

## Next Steps

After the backend is running:
1. Start the frontend (in a new terminal): `cd frontend && npm run dev`
2. Create an admin user: `npm run create-admin`
3. Test the API endpoints using Postman or the frontend

## Stopping the Server

Press `Ctrl + C` in the terminal where the server is running.

