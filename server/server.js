const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// 1. Load config
dotenv.config();

// 2. Connect to Database
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// --- UPDATE THIS SECTION ---
// Mount the routes
app.use('/api/projects', require('./routes/projectRoutes'));

// Test Route (You can keep or remove this)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// 6. Listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});