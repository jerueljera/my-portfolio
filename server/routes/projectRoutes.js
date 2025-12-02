const express = require('express');
const router = express.Router();
const { getProjects, createProject } = require('../controllers/projectController');

// This defines the route for "/"
// Because we will link this to "/api/projects" in server.js, 
// this actually corresponds to "localhost:5000/api/projects"
router.route('/').get(getProjects).post(createProject);

module.exports = router;