const Project = require('../models/project');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find(); // Find all projects in DB
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new project
// @route   POST /api/projects
// @access  Public (We will protect this later)
const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body); // Create project from JSON body
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getProjects,
  createProject,
};