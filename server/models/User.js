const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: function() { return !this.googleId; }, // Password not required if Google login
  },
  role: {
    type: String,
    enum: ['Customer', 'Driver', 'Admin'],
    default: 'Customer',
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  googleId: {
    type: String,
    sparse: true,
    unique: true,
  },
  avatar: {
    type: String,
    default: '',
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
