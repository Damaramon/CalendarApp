# Calendar Application

Full-stack TypeScript application with authentication, CRUD operations, and email notifications.

## Tech Stack

### Backend
- Node.js + Express
- TypeScript
- MongoDB with Mongoose
- JWT Authentication
- Nodemailer for email

### Frontend
- React 18
- TypeScript
- Vite
- Axios

## Project Structure

```
mongo/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.ts
│   │   │   └── email.ts
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   └── calendarController.ts
│   │   ├── middleware/
│   │   │   └── auth.ts
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   └── CalendarEntry.ts
│   │   ├── routes/
│   │   │   ├── authRoutes.ts
│   │   │   └── calendarRoutes.ts
│   │   ├── services/
│   │   │   └── emailService.ts
│   │   └── server.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── api/
    │   │   ├── axios.ts
    │   │   ├── authService.ts
    │   │   └── calendarService.ts
    │   ├── components/
    │   │   ├── LoginForm.tsx
    │   │   ├── RegisterForm.tsx
    │   │   ├── CreateModal.tsx
    │   │   ├── EditModal.tsx
    │   │   └── CalendarList.tsx
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── index.css
    ├── package.json
    ├── tsconfig.json
    └── .env.example
```

## Features

### 1. Authentication
- User registration with email and password
- Login with JWT token
- Logout functionality
- Login and logout timestamps saved to database

### 2. CRUD Operations
- Create calendar entries with email, date, and description
- Read all entries for authenticated user
- Update existing entries
- Delete entries

### 3. Email Notifications
- Automatic email sent when new entry is created
- Email template with "Hi Salam kenal" greeting
- Includes entry details: email, date, and description

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB installed and running locally
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from example:
```bash
copy .env.example .env
```

4. Configure `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/calendar_db
JWT_SECRET=your_secure_random_string_here

SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_USER=your_ethereal_username
SMTP_PASS=your_ethereal_password
EMAIL_FROM=noreply@calendar.com
```

5. Start MongoDB:
```bash
mongod
```

6. Run backend development server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from example:
```bash
copy .env.example .env
```

4. Configure `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

5. Run frontend development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3001`

## MongoDB Setup

### Option 1: Local MongoDB

1. Install MongoDB Community Edition from https://www.mongodb.com/try/download/community

2. Start MongoDB service:
```bash
mongod
```

3. Database will be created automatically when the application runs

### Option 2: MongoDB Atlas (Cloud)

1. Create free account at https://www.mongodb.com/cloud/atlas

2. Create a cluster and get connection string

3. Update `.env` in backend:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/calendar_db
```

## Email Testing Setup

### Option 1: Ethereal Email 

1. Visit https://ethereal.email/

2. Click "Create Ethereal Account"

3. Copy credentials to backend `.env`:
```env
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_USER=your_ethereal_username
SMTP_PASS=your_ethereal_password
```

4. Check sent emails at https://ethereal.email/messages

### Option 2: Mailtrap

1. Create account at https://mailtrap.io/

2. Get SMTP credentials from inbox settings

3. Update backend `.env`:
```env
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_mailtrap_username
SMTP_PASS=your_mailtrap_password
```

### Option 3: Gmail (Production)

1. Enable 2-factor authentication on Gmail

2. Generate app password at https://myaccount.google.com/apppasswords

3. Update backend `.env`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
EMAIL_FROM=your_email@gmail.com
```

## Testing the Application

### 1. Register a New User

1. Open `http://localhost:3001`
2. Click "Register"
3. Enter email and password
4. Click "Register" button

### 2. Login

1. Enter registered email and password
2. Click "Login" button
3. Login timestamp will be saved to database

### 3. Create Entry

1. Click "Create" button
2. Fill in the form:
   - Email: recipient email address
   - Date: select a date (YYYY-MM-DD format)
   - Description: enter description
3. Click "Submit"
4. Email will be sent automatically
5. Entry will appear in the list

### 4. Edit Entry

1. Click "Edit" button on any entry
2. Modify the fields
3. Click "Update"

### 5. Delete Entry

1. Click "Delete" button on any entry
2. Confirm deletion

### 6. Logout

1. Click "Logout" button
2. Logout timestamp will be saved to database

## Dummy User Account


```
Email: test@example.com
Password: test123456
```

Mr/Pak yulianto can use this account to test the application or create new user.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user (requires auth)

### Calendar Entries
- `GET /api/calendar` - Get all entries (requires auth)
- `POST /api/calendar` - Create entry (requires auth)
- `PUT /api/calendar/:id` - Update entry (requires auth)
- `DELETE /api/calendar/:id` - Delete entry (requires auth)

## Database Schema

### User Collection
```typescript
{
  email: string;
  password: string;
  loginHistory: Date[];
  logoutHistory: Date[];
  createdAt: Date;
  updatedAt: Date;
}
```

### CalendarEntry Collection
```typescript
{
  email: string;
  date: Date;
  description: string;
  userId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
```

## Building for Production

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- Verify MongoDB is accessible on port 27017

### Email Not Sending
- Verify SMTP credentials in `.env`
- Check Ethereal/Mailtrap inbox
- Ensure no firewall blocking SMTP ports

### CORS Error
- Verify backend is running on port 5000
- Check `VITE_API_URL` in frontend `.env`
- Ensure CORS is enabled in backend

### Authentication Error
- Clear browser localStorage
- Verify JWT_SECRET is set in backend `.env`
- Check token expiration (default: 7 days)

## License

MIT
