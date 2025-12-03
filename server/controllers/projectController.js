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
    // The text fields are in req.body
    const { title, description, technologies, github, link, date, category } = req.body;
    
    // The file is in req.file
    const image = req.file ? req.file.path.replace(/\\/g, "/") : '';

    const newProject = new Project({
      title,
      description,
      technologies: technologies.split(','), // Assuming technologies is a comma-separated string
      github,
      link,
      date,
      category,
      image: `/${image}` // Store the path to be served statically
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getProjects,
  createProject,
};