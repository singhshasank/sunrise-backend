const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const contactRoutes = require('./routes/contactRoutes');
const messageRoutes = require('./routes/messageRoutes');

dotenv.config();

const app = express();

app.use(cors({
  origin: "https://www.sunrisemediahouse.com",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
// CORS (extra safety)


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
