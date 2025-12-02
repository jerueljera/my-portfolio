import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import { Menu, X, User, Home, FolderPlus } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: <Home size={20} /> },
    { path: '/admin', label: 'Add Project', icon: <FolderPlus size={20} /> },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isOpen ? 'menu-open' : ''}`}>
        <div className="container">
          <div className="nav-container">
            <Link to="/" className="nav-logo" aria-label="Portfolio Home">
              <User size={28} />
              <span className="logo-text">My Portfolio</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="nav-links">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                >
                  <span className="nav-link-icon">{item.icon}</span>
                  <span className="nav-link-text">{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="mobile-menu-overlay" onClick={() => setIsOpen(false)}></div>
        )}

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
          <div className="mobile-menu-header">
            <User size={32} />
            <h3 className="mobile-menu-title">My Portfolio</h3>
          </div>
          
          <div className="mobile-menu-items">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                <span className="mobile-nav-icon">{item.icon}</span>
                <span className="mobile-nav-text">{item.label}</span>
              </Link>
            ))}
          </div>
          
          <div className="mobile-menu-footer">
            <p className="mobile-menu-copyright">© {new Date().getFullYear()} My Portfolio</p>
          </div>
        </div>
      </nav>
      
      {/* Spacer to prevent content from being hidden under fixed navbar */}
      <div className="navbar-spacer"></div>
    </>
  );
};

export default Navbar;