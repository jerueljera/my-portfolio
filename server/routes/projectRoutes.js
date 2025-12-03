const express = require('express');
const router = express.Router();
const { getProjects, createProject } = require('../controllers/projectController');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append extension
  }
});

const upload = multer({ storage: storage });

// This defines the route for "/"
// Because we will link this to "/api/projects" in server.js, 
// this actually corresponds to "localhost:5000/api/projects"
router.route('/').get(getProjects).post(upload.single('image'), createProject);

module.exports = router;