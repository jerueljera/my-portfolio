import { useState, useEffect } from 'react';
import axios from 'axios';
import { Upload, Link as LinkIcon, Tag, Calendar, Globe, ArrowLeft, Eye, Code, X, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    githubUrl: '',
    liveDemoUrl: '',
    category: 'Frontend',
    date: new Date().toISOString().split('T')[0],
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (showMobilePreview) {
          setShowMobilePreview(false);
        } else {
          navigate(-1);
        }
      }
      if (e.key === 'Enter' && e.ctrlKey) {
        handleSubmit(e);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, showMobilePreview]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title.trim() || !formData.description.trim() || !formData.technologies.trim() || !imageFile) {
      showToast('Please fill all required fields and upload an image', 'error');
      return;
    }
    
    setLoading(true);

    const projectFormData = new FormData();
    projectFormData.append('title', formData.title);
    projectFormData.append('description', formData.description);
    projectFormData.append('technologies', formData.technologies.split(',').map(tech => tech.trim()));
    projectFormData.append('github', formData.githubUrl);
    projectFormData.append('link', formData.liveDemoUrl);
    projectFormData.append('image', imageFile);
    projectFormData.append('date', formData.date);
    projectFormData.append('category', formData.category);

    try {
      await axios.post('/api/projects', projectFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setLoading(false);
      showToast('Project added successfully!', 'success');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        technologies: '',
        githubUrl: '',
        liveDemoUrl: '',
        category: 'Frontend',
        date: new Date().toISOString().split('T')[0],
      });
      setImageFile(null);
      setImagePreview('');
      
      // Navigate back to home after successful submission
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setLoading(false);
      console.error(err);
      showToast(err.response?.data?.message || 'Failed to add project', 'error');
    }
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 3000);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleCategorySelect = (category) => {
    setFormData(prev => ({ ...prev, category }));
  };

  const categories = ['Frontend', 'Backend', 'Full Stack', 'Mobile', 'DevOps', 'Other'];

  return (
    <div className="admin-container">
      <div className="container">
        {/* Header */}
        <div className="admin-header">
          <button 
            className="back-button"
            onClick={handleBack}
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="header-content">
            <h1 className="admin-title">Add New Project</h1>
            <p className="admin-subtitle">Share your project with the community</p>
          </div>
          
          {/* Mobile Preview Button */}
          {isMobile && (formData.title || formData.description || imagePreview) && (
            <button 
              className="mobile-preview-toggle"
              onClick={() => setShowMobilePreview(true)}
              aria-label="Preview project"
            >
              <Eye size={20} />
              <span>Preview</span>
            </button>
          )}
        </div>

        {/* Main Content */}
        <div className="admin-content">
          {/* Form Section */}
          <div className="form-section">
            <div className="form-card">
              <div className="form-header">
                <h2 className="form-title">
                  <Code size={24} />
                  Project Details
                </h2>
                <p className="form-description">Fill in all required fields to add your project</p>
              </div>
              
              <form onSubmit={handleSubmit} className="project-form">
                {/* Image File Input */}
                <div className="form-group">
                  <label className="form-label" htmlFor="image-file">
                    <Upload size={18} />
                    Project Image
                    <span className="required">*</span>
                  </label>
                  <input
                    type="file"
                    id="image-file"
                    name="imageFile"
                    onChange={handleFileChange}
                    className="form-input"
                    required
                    aria-label="Project image"
                    accept="image/*"
                  />
                </div>

                {/* Title and Date */}
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="project-title">
                      <Tag size={18} />
                      Project Title
                      <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="project-title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter project title"
                      className="form-input"
                      required
                      aria-label="Project title"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="project-date">
                      <Calendar size={18} />
                      Completion Date
                      <span className="required">*</span>
                    </label>
                    <input
                      type="date"
                      id="project-date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                      aria-label="Completion date"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="form-group">
                  <label className="form-label" htmlFor="project-description">
                    Description
                    <span className="required">*</span>
                  </label>
                  <textarea
                    id="project-description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your project, features, and what makes it unique..."
                    className="form-textarea"
                    rows={isMobile ? 4 : 6}
                    required
                    aria-label="Project description"
                  />
                  <div className="char-count">
                    {formData.description.length}/1000 characters
                  </div>
                </div>

                {/* Technologies */}
                <div className="form-group">
                  <label className="form-label" htmlFor="project-technologies">
                    Technologies Used
                    <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="project-technologies"
                    name="technologies"
                    value={formData.technologies}
                    onChange={handleInputChange}
                    placeholder="React, Node.js, MongoDB (comma separated)"
                    className="form-input"
                    required
                    aria-label="Technologies used"
                  />
                  <div className="input-hint">
                    Separate technologies with commas
                  </div>
                </div>

                {/* URLs */}
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="github-url">
                      <LinkIcon size={18} />
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      id="github-url"
                      name="githubUrl"
                      value={formData.githubUrl}
                      onChange={handleInputChange}
                      placeholder="https://github.com/username/repo"
                      className="form-input"
                      aria-label="GitHub URL"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="demo-url">
                      <Globe size={18} />
                      Live Demo URL
                    </label>
                    <input
                      type="url"
                      id="demo-url"
                      name="liveDemoUrl"
                      value={formData.liveDemoUrl}
                      onChange={handleInputChange}
                      placeholder="https://project-demo.com"
                      className="form-input"
                      aria-label="Live demo URL"
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="form-group">
                  <label className="form-label">
                    Project Category
                    <span className="required">*</span>
                  </label>
                  <div className="category-selector">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        type="button"
                        className={`category-option ${formData.category === cat ? 'selected' : ''}`}
                        onClick={() => handleCategorySelect(cat)}
                        aria-label={`Select ${cat} category`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form Actions */}
                <div className="form-actions">
                  <button 
                    type="button" 
                    className="btn-secondary"
                    onClick={handleBack}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="spinner small"></div>
                        <span>Adding Project...</span>
                      </>
                    ) : (
                      <>
                        <Plus size={20} />
                        <span>Add Project</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Desktop Preview Section */}
          {!isMobile && (
            <div className="preview-section">
              <div className="preview-card">
                <div className="preview-header">
                  <h2 className="preview-title">
                    <Eye size={24} />
                    Live Preview
                  </h2>
                  <p className="preview-subtitle">See how your project will look</p>
                </div>
                
                <div className="preview-content">
                  {formData.title || formData.description || imagePreview ? (
                    <div className="project-preview">
                      {imagePreview && (
                        <div className="preview-image-container">
                          <img 
                            src={imagePreview} 
                            alt="Project preview" 
                            className="preview-image-full"
                          />
                          <div className="preview-category">{formData.category}</div>
                        </div>
                      )}
                      
                      <div className="preview-details">
                        <h3 className="preview-project-title">
                          {formData.title || 'Project Title'}
                        </h3>
                        <p className="preview-project-date">
                          {formData.date ? new Date(formData.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long'
                          }) : 'Completion Date'}
                        </p>
                        <p className="preview-project-description">
                          {formData.description || 'Project description will appear here...'}
                        </p>
                        
                        {formData.technologies && (
                          <div className="preview-technologies">
                            {formData.technologies.split(',').map((tech, index) => (
                              tech.trim() && (
                                <span key={index} className="preview-tech-tag">
                                  {tech.trim()}
                                </span>
                              )
                            ))}
                          </div>
                        )}
                        
                        {(formData.githubUrl || formData.liveDemoUrl) && (
                          <div className="preview-actions">
                            {formData.githubUrl && (
                              <a 
                                href={formData.githubUrl} 
                                className="preview-action-btn"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <LinkIcon size={16} />
                                <span>GitHub</span>
                              </a>
                            )}
                            {formData.liveDemoUrl && (
                              <a 
                                href={formData.liveDemoUrl} 
                                className="preview-action-btn"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Globe size={16} />
                                <span>Live Demo</span>
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="preview-placeholder">
                      <div className="placeholder-icon">
                        <Eye size={48} />
                      </div>
                      <h3 className="placeholder-title">Preview Area</h3>
                      <p className="placeholder-text">
                        Start filling the form to see a live preview of your project
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Preview Modal */}
      {isMobile && showMobilePreview && (
        <div className="mobile-preview-modal">
          <div className="mobile-preview-header">
            <h3>Project Preview</h3>
            <button 
              className="close-preview-btn"
              onClick={() => setShowMobilePreview(false)}
              aria-label="Close preview"
            >
              <X size={24} />
            </button>
          </div>
          <div className="mobile-preview-content">
            {(formData.title || formData.description || imagePreview) ? (
              <div className="project-preview">
                {imagePreview && (
                  <div className="preview-image-container">
                    <img 
                      src={imagePreview} 
                      alt="Project preview" 
                      className="preview-image-full"
                    />
                    <div className="preview-category">{formData.category}</div>
                  </div>
                )}
                
                <div className="preview-details">
                  <h3 className="preview-project-title">
                    {formData.title || 'Project Title'}
                  </h3>
                  <p className="preview-project-date">
                    {formData.date ? new Date(formData.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long'
                    }) : 'Completion Date'}
                  </p>
                  <p className="preview-project-description">
                    {formData.description || 'Project description will appear here...'}
                  </p>
                  
                  {formData.technologies && (
                    <div className="preview-technologies">
                      {formData.technologies.split(',').map((tech, index) => (
                        tech.trim() && (
                          <span key={index} className="preview-tech-tag">
                            {tech.trim()}
                          </span>
                        )
                      ))}
                    </div>
                  )}
                  
                  {(formData.githubUrl || formData.liveDemoUrl) && (
                    <div className="preview-actions">
                      {formData.githubUrl && (
                        <a 
                          href={formData.githubUrl} 
                          className="preview-action-btn"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <LinkIcon size={16} />
                          <span>GitHub</span>
                        </a>
                      )}
                      {formData.liveDemoUrl && (
                        <a 
                          href={formData.liveDemoUrl} 
                          className="preview-action-btn"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Globe size={16} />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="mobile-preview-empty">
                <Eye size={48} />
                <p>Fill in the form to see a preview</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div className={`toast ${toast.type}`} role="alert">
          {toast.message}
        </div>
      )}

      {/* Mobile Floating Action Button */}
      {isMobile && !showMobilePreview && (
        <div className="mobile-fab-container">
          <button 
            className="mobile-fab"
            onClick={handleSubmit}
            disabled={loading}
            aria-label="Add project"
          >
            <Plus size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Admin;