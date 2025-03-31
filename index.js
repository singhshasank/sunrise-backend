
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const contactRoutes = require('./routes/contactRoutes');
const messageRoutes = require('./routes/messageRoutes');

// Load environment variables
dotenv.config({ path: '.env.example' });

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/messages', messageRoutes);
console.log("MongoDB URI:", process.env.MONGODB_URI);


// Base route
app.get('/', (req, res) => {
  res.send('Welcome to Sunrise Media House API');
});
const cors = require('cors');
const express = require('express');


// Allow requests from the frontend
app.use(cors({
    origin: 'https://sunrise-frontend-11.onrender.com'  // Replace with your frontend URL
}));

// Your routes
app.post('/api/contact', (req, res) => {
    // handle contact form submission
});

app.listen(3000, () => console.log('Server running on port 3000'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB server server'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log ('running');
});
