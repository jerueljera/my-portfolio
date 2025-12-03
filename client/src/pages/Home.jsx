import { useState, useEffect } from 'react';
import axios from 'axios';
import { Github, ExternalLink, Calendar, Tag, Users, Code, Server, Smartphone, Cloud, Database, Terminal, Layout, Mail, MapPin, Briefcase, Award, ChevronRight, Download, Linkedin, Twitter, Cpu } from 'lucide-react';
import './Home.css';
import portfolioImage from '../assets/portfolio.jpg';

const skillCategories = [
  {
    name: 'Backend',
    icon: <Server size={24} />,
    skills: ['Node.js', 'Express', 'Python', 'Django', 'REST APIs', 'GraphQL', 'Microservices']
  },
  {
    name: 'Database',
    icon: <Database size={24} />,
    skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase', 'Elasticsearch']
  },
  {
    name: 'DevOps',
    icon: <Terminal size={24} />,
    skills: ['Docker', 'AWS', 'CI/CD', 'Git', 'Linux', 'Nginx', 'Kubernetes']
  },
  {
    name: 'Tools',
    icon: <Cpu size={24} />,
    skills: ['GitHub', 'Postman', 'JWT', 'OAuth', 'WebSocket', 'Redis', 'Socket.io']
  }
];

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [activeCategory, setActiveCategory] = useState('Backend');

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/api/projects');
        setProjects(res.data);
      } catch (err) {
        console.error(err);
        // Optionally, set an error state here
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const categories = ['All', 'Backend', 'Full Stack', 'DevOps', 'Database'];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <div className="home-container">
      {/* About Me Section - New */}
      <section className="about-section">
        <div className="container">
          <div className="about-grid">
            {/* Left Side - Profile Picture with Effects */}
            <div className="profile-side">
              <div className="profile-image-wrapper">
                <div className="profile-image-container">
                  <img 
                    src={portfolioImage} 
                    alt="Profile"
                    className="profile-image"
                  />
                  {/* Animated Rings */}
                  <div className="ring ring-1"></div>
                  <div className="ring ring-2"></div>
                  <div className="ring ring-3"></div>
                  {/* Floating Elements */}
                  <div className="floating-element element-1">
                    <Server size={20} />
                  </div>
                  <div className="floating-element element-2">
                    <Database size={20} />
                  </div>
                  <div className="floating-element element-3">
                    <Code size={20} />
                  </div>
                </div>
                
                {/* Quick Stats */}
                <div className="profile-stats">
                  <div className="stat-item">
                    <span className="stat-number">25+</span>
                    <span className="stat-label">Projects</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">3+</span>
                    <span className="stat-label">Years Exp</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">50+</span>
                    <span className="stat-label">Technologies</span>
                  </div>
                </div>
                
                {/* Social Links */}
                <div className="social-links">
                  <a href="https://github.com/jerueljera" target="_blank" rel="noopener noreferrer" className="social-link">
                    <Github size={20} />
                  </a>
                  <a href="https://www.linkedin.com/in/jeruel-almonte-ajera-8786b4372/" target="_blank" rel="noopener noreferrer" className="social-link">
                    <Linkedin size={20} />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                    <Twitter size={20} />
                  </a>
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=jeal.ajera.up@phinmaed.com" target="_blank" rel="noopener noreferrer" className="social-link">
                    <Mail size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side - About Content */}
            <div className="about-content">
              <div className="section-badge">
                <Briefcase size={16} />
                <span>Backend Developer</span>
              </div>
              
              <h1 className="about-title">
                Hello, I'm Jeruel
                <span className="gradient-text"> Backend Developer</span>
              </h1>
              
              <div className="about-description">
                <p>
                  I am an aspiring Backend Developer with a strong foundation in server-side programming, 
                  RESTful API development, and database management. I specialize in building structured, 
                  maintainable, and secure backend systems using modern technologies.
                </p>
                <p>
                  I enjoy breaking down complex problems into simple, efficient solutions. My work focuses 
                  on performance, reliability, and clean architecture. I also value teamwork and communication—making 
                  sure my services integrate smoothly with frontend and mobile applications.
                </p>
                <p>
                  Currently, I am expanding my skills in cloud technologies, authentication workflows, 
                  and scalable backend design as I work toward becoming a full-stack or senior backend engineer.
                </p>
              </div>
              
              {/* Key Expertise */}
              <div className="expertise-grid">
                <div className="expertise-card">
                  <div className="expertise-icon">
                    <Server size={24} />
                  </div>
                  <h3 className="expertise-title">API Development</h3>
                  <p className="expertise-desc">RESTful & GraphQL APIs with proper documentation</p>
                </div>
                <div className="expertise-card">
                  <div className="expertise-icon">
                    <Database size={24} />
                  </div>
                  <h3 className="expertise-title">Database Design</h3>
                  <p className="expertise-desc">Optimized schemas and efficient queries</p>
                </div>
                <div className="expertise-card">
                  <div className="expertise-icon">
                    <Cloud size={24} />
                  </div>
                  <h3 className="expertise-title">Cloud Deployment</h3>
                  <p className="expertise-desc">AWS, Docker, and scalable infrastructure</p>
                </div>
                <div className="expertise-card">
                  <div className="expertise-icon">
                    <Cpu size={24} />
                  </div>
                  <h3 className="expertise-title">System Architecture</h3>
                  <p className="expertise-desc">Microservices and modular design patterns</p>
                </div>
              </div>
              
              {/* Contact Info */}
              <div className="contact-info">
                <div className="contact-item">
                  <Mail size={18} />
                  <span>jeal.ajera.up@phinmaed.com</span>
                </div>
                <div className="contact-item">
                  <Briefcase size={18} />
                  <span>Available for Projects</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">Backend systems and API services I've built</p>
            
            {/* Filter Tabs */}
            <div className="filter-tabs-container">
              <div className="filter-tabs-scroll">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`filter-tab ${filter === category ? 'active' : ''}`}
                    onClick={() => setFilter(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p className="loading-text">Loading projects...</p>
            </div>
          ) : (
            <>
              <div className="projects-grid">
                {filteredProjects.map(project => (
                  <div key={project.id} className="project-card">
                    <div className="project-image">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        loading="lazy"
                      />
                      <div className="project-category">{project.category}</div>
                      <div className="project-date">
                        <Calendar size={14} />
                        {project.date}
                      </div>
                    </div>
                    <div className="project-content">
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-description">{project.description}</p>
                      
                      <div className="technologies">
                        {project.technologies.map(tech => (
                          <span key={tech} className="tech-tag">{tech}</span>
                        ))}
                      </div>

                      <div className="project-actions">
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="action-btn github"
                          aria-label={`View ${project.title} source code`}
                        >
                          <Github size={18} />
                          <span className="action-btn-text">Code</span>
                        </a>
                        <a 
                          href={project.liveDemo} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="action-btn demo"
                          aria-label={`View ${project.title} live demo`}
                        >
                          <ExternalLink size={18} />
                          <span className="action-btn-text">Live Demo</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredProjects.length === 0 && (
                <div className="empty-state">
                  <Users size={48} />
                  <h3 className="empty-state-title">No projects found</h3>
                  <p className="empty-state-text">No projects match the selected filter</p>
                  <button 
                    className="btn-secondary"
                    onClick={() => setFilter('All')}
                  >
                    Clear Filter
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Tech Stack & Skills</h2>
            <p className="section-subtitle">Technologies and tools I work with</p>
          </div>
          
          <div className="skills-categories">
            {skillCategories.map(category => (
              <div 
                key={category.name}
                className={`skill-category ${activeCategory === category.name ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.name)}
              >
                <div className="skill-category-icon">
                  {category.icon}
                </div>
                <h3 className="skill-category-name">{category.name}</h3>
                <div className="skill-category-skills">
                  {category.skills.map(skill => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Build Something Amazing?</h2>
            <p className="cta-text">
              Let's work together to create robust backend systems that scale with your needs.
            </p>
            <div className="cta-actions">
              <a href="/admin" className="btn-primary btn-large">
                Add Your Project
              </a>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=jeal.ajera.up@phinmaed.com" target="_blank" rel="noopener noreferrer" className="btn-secondary btn-large">
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;