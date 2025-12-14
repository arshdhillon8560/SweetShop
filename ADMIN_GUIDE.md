# Admin Panel Guide - Adding Sweets (Dishes)

## Step 1: Create an Admin User

You need to create an admin user to access the admin panel. There are two ways:

### Method 1: Using the Script (Recommended)

1. Make sure your backend is running (or at least MongoDB is running)

2. Open a new terminal and navigate to the backend directory:
```bash
cd backend
```

3. Run the admin creation script:
```bash
npm run create-admin
```

4. You'll be prompted to enter:
   - **Email**: Your admin email (e.g., `admin@example.com`)
   - **Password**: Your admin password
   - **Name**: Your admin name (e.g., `Admin User`)

5. If the email already exists, it will be upgraded to admin. Otherwise, a new admin user will be created.

### Method 2: Manual MongoDB Update

If you already have a user account, you can make it admin by updating MongoDB directly:

1. Connect to MongoDB:
```bash
mongosh
```

2. Switch to the database:
```javascript
use sweetshop
```

3. Update the user to admin:
```javascript
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { isAdmin: true } }
)
```

## Step 2: Login as Admin

1. Make sure both backend and frontend are running:
   - Backend: `cd backend && npm run start:dev` (port 3000)
   - Frontend: `cd frontend && npm run dev` (port 3001)

2. Open your browser and go to: `http://localhost:3001`

3. Click on "Register" or "Login"

4. Login with your admin credentials

5. You should see "(Admin)" next to your name in the header

## Step 3: Access the Admin Panel

1. Once logged in as admin, you'll see a **"Show Admin"** button in the top right of the dashboard

2. Click the **"Show Admin"** button to reveal the admin panel

3. The admin panel will appear at the top of the page with a form to add new sweets

## Step 4: Add New Sweets (Dishes)

In the admin panel, you'll see a form with the following fields:

1. **Name**: Enter the name of the sweet (e.g., "Chocolate Cake")
2. **Category**: Enter the category (e.g., "Cakes", "Candies", "Cookies")
3. **Price**: Enter the price (e.g., 5.99)
4. **Quantity**: Enter the initial stock quantity (e.g., 50)
5. **Image URL** (Optional): Enter a URL to an image (e.g., `https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400`)

6. Click **"Add Sweet"** button to create the sweet

7. The new sweet will immediately appear in the sweets list below with the image displayed (if provided)

**Note**: Images added by admins will be visible to all users (both admin and regular customers) when they view the sweets.

## Admin Features Available

Once you're logged in as admin, you have access to:

### On Each Sweet Card:
- **Edit Button**: Click to edit the sweet's details (name, category, price, quantity)
- **Delete Button**: Click to delete the sweet (with confirmation)
- **Restock Section**: 
  - Enter a quantity in the restock input field
  - Click "Restock" to add more inventory

### Admin Panel:
- **Add New Sweet**: Use the form at the top to add new sweets

## Troubleshooting

### "Show Admin" Button Not Visible
- Make sure you're logged in with an admin account
- Check that your user has `isAdmin: true` in the database
- Try logging out and logging back in

### Cannot Add Sweets
- Verify the backend is running on port 3000
- Check browser console for errors
- Make sure you're logged in (check for JWT token in localStorage)

### Permission Denied Errors
- Verify your user account has admin privileges
- Check the JWT token includes `isAdmin: true`
- Try creating a new admin user using the script

## Quick Reference

```bash
# Create admin user
cd backend
npm run create-admin

# Start backend (if not running)
npm run start:dev

# Start frontend (if not running)
cd ../frontend
npm run dev
```

## Example Workflow

1. **Create Admin**: `cd backend && npm run create-admin`
   - Email: `admin@sweetshop.com`
   - Password: `admin123`
   - Name: `Admin User`

2. **Start Servers**:
   - Backend: `cd backend && npm run start:dev`
   - Frontend: `cd frontend && npm run dev` (in another terminal)

3. **Login**: Go to `http://localhost:3001` and login with admin credentials

4. **Show Admin Panel**: Click "Show Admin" button

5. **Add Sweet**:
   - Name: "Chocolate Chip Cookie"
   - Category: "Cookies"
   - Price: 2.50
   - Quantity: 100
   - Click "Add Sweet"

6. **Edit/Restock**: Use the buttons on each sweet card to manage inventory

