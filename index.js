const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const contactRoutes = require('./routes/contactRoutes');
const messageRoutes = require('./routes/messageRoutes');

dotenv.config();

const app = express();

// 🔥 HARD FIX FOR BROWSER PREFLIGHT
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// CORS (extra safety)
app.use(cors());

// Body parser
app.use(express.json());

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/messages', messageRoutes);

// Root
app.get('/', (req, res) => {
  res.send('API running');
});

// DB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(console.error);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));
