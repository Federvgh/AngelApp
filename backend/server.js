// File: backend/server.js

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // To use environment variables from a .env file

const app = express();

// === MIDDLEWARE ===
// Enable Cross-Origin Resource Sharing for your React app
app.use(cors({ origin: 'http://localhost:3000' }));
// Parse incoming JSON requests
app.use(express.json());

// === SECURE USER "DATABASE" ===
// In a real app, this would be a real database (like PostgreSQL or MongoDB).
// Passwords are NOT stored directly. They are "hashed".
// I've pre-hashed 'admin123' and 'carpintero123' for you.
const users = [
  {
    id: 1,
    name: 'Administrador',
    email: 'admin@proyectoangel.com',
    type: 'administrador',
    // Hashed password for "admin123"
    passwordHash: '$2a$10$f/O4N1o2eaTNC/LgZ3T.iOitAkeUVEw72uW9my7zXy2GRmE5B4SgW' 
  },
  {
    id: 2,
    name: 'Juan Pérez',
    email: 'carpintero@proyectoangel.com',
    type: 'carpintero',
    // Hashed password for "carpintero123"
    passwordHash: '$2a$10$z7g6hJd/3jL8nB/GKfH.W.pE8c7bZ2I.u5d9FmZ/p9mO2C8a7s4nS'
  }
];

// === API ENDPOINTS ===
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  // 1. Find the user by email
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Credenciales incorrectas' });
  }

  // 2. Securely compare the provided password with the stored hash
  const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordCorrect) {
    return res.status(401).json({ message: 'Credenciales incorrectas' });
  }
  
  // 3. If password is correct, create a secure token (JWT)
  // The token contains user info but is signed to prevent tampering.
  const token = jwt.sign(
    { id: user.id, type: user.type }, 
    process.env.JWT_SECRET, // The secret key MUST be in a .env file
    { expiresIn: '1h' } // Token expires in 1 hour
  );
  
  // 4. Send back user data (without the password hash) and the token
  res.status(200).json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      type: user.type
    },
    token
  });
});


// === START THE SERVER ===
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Secure authentication server running on http://localhost:${PORT}`);
});

// To generate new password hashes, you can use a helper function like this:
// async function hashPassword(password) {
//   const salt = await bcrypt.genSalt(10);
//   const hash = await bcrypt.hash(password, salt);
//   console.log(hash);
// }
// hashPassword('some_new_password');