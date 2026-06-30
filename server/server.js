const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes and middleware
const binRoutes = require('./routes/binRoutes');
const userRoutes = require('./routes/userRoutes');
const logger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger); // Custom logger middleware

// Routes
app.use('/bins', binRoutes);
app.use('/users', userRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/smart_waste_db')
  .then(() => {
    console.log('Connected to MongoDB successfully');
    
    // Start Server only after DB connection
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });
