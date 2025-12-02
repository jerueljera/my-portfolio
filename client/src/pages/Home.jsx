import { useState, useEffect } from 'react';
import { Github, ExternalLink, Calendar, Tag, Users, Code, Server, Smartphone, Cloud, Database, Terminal, Layout } from 'lucide-react';
import './Home.css';

// Mock data
const mockProjects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-featured online shopping platform with cart, checkout, and payment integration.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    github: 'https://github.com',
    liveDemo: 'https://example.com',
    date: '2024-01',
    category: 'Full Stack'
  },
  {
    id: 2,
    title: 'Weather Dashboard',
    description: 'Real-time weather forecasting application with interactive maps and charts.',
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=400&h=250&fit=crop',
    technologies: ['JavaScript', 'OpenWeather API', 'Chart.js'],
    github: 'https://github.com',
    liveDemo: 'https://example.com',
    date: '2023-11',
    category: 'Frontend'
  },
  {
    id: 3,
    title: 'Task Management App',
    description: 'Collaborative project management tool with real-time updates and team collaboration.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop',
    technologies: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
    github: 'https://github.com',
    liveDemo: 'https://example.com',
    date: '2024-02',
    category: 'Full Stack'
  },
  {
    id: 4,
    title: 'Mobile Fitness Tracker',
    description: 'Cross-platform mobile app for tracking workouts and fitness progress.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
    technologies: ['React Native', 'Firebase', 'Redux'],
    github: 'https://github.com',
    liveDemo: 'https://example.com',
    date: '2023-12',
    category: 'Mobile'
  },
];

const skillCategories = [
  {
    name: 'Frontend',
    icon: <Layout size={24} />,
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux']
  },
  {
    name: 'Backend',
    icon: <Server size={24} />,
    skills: ['Node.js', 'Express', 'Python', 'Django', 'REST APIs']
  },
  {
    name: 'Database',
    icon: <Database size={24} />,
    skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase']
  },
  {
    name: 'DevOps',
    icon: <Terminal size={24} />,
    skills: ['Docker', 'AWS', 'CI/CD', 'Git', 'Linux']
  }
];

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [activeCategory, setActiveCategory] = useState('Frontend');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProjects(mockProjects);
      setLoading(false);
    }, 1000);
  }, []);

  const categories = ['All', 'Frontend', 'Full Stack', 'Backend', 'Mobile'];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                <span className="hero-title-line">Crafting Digital</span>
                <span className="hero-title-line gradient-text">Experiences</span>
              </h1>
              <p className="hero-subtitle">
                Full Stack Developer passionate about creating elegant solutions to complex problems with modern web technologies.
              </p>
              
              <div className="hero-actions">
                <a href="#projects" className="btn-primary">
                  View Projects
                </a>
                <a href="/admin" className="btn-secondary">
                  Add Project
                </a>
              </div>
            </div>
            
            <div className="hero-stats">
              <div className="stat-card">
                <div className="stat-number">25+</div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">3+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">100%</div>
                <div className="stat-label">Client Satisfaction</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">50+</div>
                <div className="stat-label">Technologies Used</div>
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
            <p className="section-subtitle">A showcase of my recent work and technical contributions</p>
            
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
            <h2 className="cta-title">Ready to Start Your Next Project?</h2>
            <p className="cta-text">
              Let's work together to bring your ideas to life with modern web technologies.
            </p>
            <div className="cta-actions">
              <a href="/admin" className="btn-primary btn-large">
                Add Your Project
              </a>
              <a href="mailto:contact@example.com" className="btn-secondary btn-large">
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