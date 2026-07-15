const mongoose = require('mongoose');

const binSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
    trim: true
  },
  area: {
    type: String,
    required: true,
    trim: true
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  },
  fillLevel: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
    default: 0
  },
  status: {
    type: String,
    required: true,
    enum: ['Empty', 'Half Full', 'Full'],
    default: 'Empty'
  },
  lastCollected: {
    type: Date,
    default: Date.now
  },
  qrCode: {
    type: String,
    unique: true,
    sparse: true
  },
  imageUrl: {
    type: String,
    default: ''
  },
  collectionHistory: [
    {
      driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      collectedAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
}, { timestamps: true });

const Bin = mongoose.model('Bin', binSchema);

module.exports = Bin;
