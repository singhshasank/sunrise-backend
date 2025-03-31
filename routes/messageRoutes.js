
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Get all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new message (from user)
router.post('/', async (req, res) => {
  const message = new Message({
    message: req.body.message,
    user: req.body.user || 'Guest',
    isBot: false
  });

  try {
    const newMessage = await message.save();
    
    // Create a bot response
    const botResponse = new Message({
      message: `Thanks for your message! Our team will get back to you soon..`,
      isBot: true
    });
    
    await botResponse.save();
    res.status(201).json({ userMessage: newMessage, botResponse });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
