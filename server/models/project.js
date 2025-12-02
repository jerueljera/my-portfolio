const mongoose = require('mongoose');

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a project title'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    image: {
      type: String,
      required: false, // Optional: URL to an image of the project
    },
    technologies: {
      type: [String], // Array of strings, e.g., ["React", "Node.js"]
      required: false,
    },
    link: {
      type: String, // Link to the live demo
      required: false,
    },
    github: {
      type: String, // Link to the source code
      required: false,
    },
  },
  {
    timestamps: true, // Automatically creates 'createdAt' and 'updatedAt' fields
  }
);

module.exports = mongoose.model('Project', projectSchema);