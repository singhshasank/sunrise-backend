const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const contactRoutes = require('./routes/contactRoutes');
const messageRoutes = require('./routes/messageRoutes');

// Load environment variables
dotenv.config();

const app = express();

// Required for Render/proxies
app.set('trust proxy', 1);

// Configure CORS — allow known frontend origins and handle preflight
// Use CORS_ORIGINS (comma-separated) in production or CORS_ALLOW_ALL=true for permissive testing
const defaultOrigins = [
  'https://sunrisemedia.com',
  'https://www.sunrisemediahouse.com',
  'https://www.sunrisemedia.com',
  'http://localhost:5173',
  'http://localhost:8080'
];

const envOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map(s => s.trim()).filter(Boolean)
  : [];

const allowedOrigins = envOrigins.length ? envOrigins : defaultOrigins;

app.use(cors({
  origin: function(origin, callback) {
    if (process.env.CORS_ALLOW_ALL === 'true') return callback(null, true);
    // Allow non-browser requests (like curl) with no origin
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests
app.options('*', cors());

// Fallback middleware: echo the request origin when allowed and ensure
// Access-Control headers are present even if other middleware/error paths run.
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (process.env.CORS_ALLOW_ALL === 'true') {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
  } else if (origin && allowedOrigins.indexOf(origin) !== -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  // If this is a preflight request, end early with 204
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// Body parser
app.use(express.json());

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/messages', messageRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('Welcome to Sunrise Media House API');
});

// MongoDB (optional) — only connect if MONGODB_URI is provided
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB error:', err));
} else {
  console.log('ℹ️  No MONGODB_URI set — skipping MongoDB connection (local CORS testing)');
}

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
