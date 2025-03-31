
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  user: {
    type: String,
    default: 'Guest',
    trim: true
  },
  message: {
    type: String,
    required: true
  },
  isBot: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Message', MessageSchema);
