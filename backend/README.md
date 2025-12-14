# Sweet Shop Backend

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the backend directory with the following content:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/sweetshop
JWT_SECRET=your-secret-key-change-in-production-make-it-long-and-random
JWT_EXPIRES_IN=7d
```

   See `ENV_SETUP.md` for detailed configuration instructions.

3. Make sure MongoDB is running on your system.
   - For local MongoDB: Ensure MongoDB service is running
   - For MongoDB Atlas: Your connection string should be in the `.env` file

4. Start the development server:
```bash
npm run start:dev
```

   This will start the server in watch mode (auto-restarts on file changes).

   **Alternative commands:**
   - `npm start` - Start in production mode (requires build first)
   - `npm run start:debug` - Start with debug mode
   - `npm run build` - Build for production first, then use `npm run start:prod`

5. You should see output like:
   ```
   Application is running on: http://localhost:3000
   ```

The API will be available at `http://localhost:3000`

## Troubleshooting

- **Port already in use**: Change `PORT` in `.env` to a different port (e.g., 3001)
- **MongoDB connection error**: Verify MongoDB is running and the `MONGODB_URI` is correct
- **Module not found**: Run `npm install` again

## API Endpoints

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

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

