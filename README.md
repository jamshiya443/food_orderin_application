# TastyCart – Online Food Ordering Application

TastyCart is a full-stack food ordering web application built using the MERN stack. It allows customers to browse food products, manage their cart, place orders, and track their order history. Administrators can manage products and customer orders through an admin dashboard.

## Live Application

- **Frontend:** https://tastycart-theta.vercel.app/
- **Backend API:** https://food-ordering-backend-773w.onrender.com

## Features

### Customer Features
- User registration and login
- Secure authentication using JWT
- Browse available food products
- Filter products by category
- Add and remove products from cart
- Update product quantities
- Place food orders
- View order history

### Admin Features
- Admin dashboard
- Add new products
- Edit existing products
- Delete products
- Manage customer orders
- Update order statuses

### Additional Features
- Responsive user interface
- Protected routes based on user roles
- MongoDB database integration
- Password hashing for secure storage

## Technology Stack

**Frontend**
- React.js
- React Router
- Redux Toolkit
- CSS

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs

**Deployment**
- Vercel – Frontend hosting
- Render – Backend hosting
- MongoDB Atlas – Cloud database

## Project Structure

```text
food_orderin_application/
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── README.md
│
└── backend/
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── server.js
    └── package.json
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/jamshiya443/food_orderin_application.git
```

### 2. Navigate to the Frontend

```bash
cd food_orderin_application/frontend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the frontend folder:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 5. Start the Frontend

```bash
npm start
```

The frontend will run at:

http://localhost:3000

## Backend Setup

The backend is maintained in a separate repository.

```bash
git clone https://github.com/jamshiya443/food_ordering_backend.git
cd food_ordering_backend
npm install
```

Configure the backend environment variables in a private `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
```

Start the backend:

```bash
npm run start
```

The backend API will run at:

http://localhost:5000

**Important:** Never upload `.env` files or expose database credentials and JWT secrets to GitHub.

## Author

**Fathima Jamshiya**

Full-Stack Development Project

---

*TastyCart – Making food ordering simple and convenient.*