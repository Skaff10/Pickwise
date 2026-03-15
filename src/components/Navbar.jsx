import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navbar.css';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/games', label: 'Games' },
  { path: '/movies', label: 'Movies' },
  { path: '/series', label: 'Series' },
  { path: '/about', label: 'About' },
];

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        <NavLink to="/" className="navbar-logo">
          PICKWISE
        </NavLink>
        <ul className="navbar-links">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `navbar-link ${isActive ? 'active' : ''}`
                }
                end={item.path === '/'}
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <motion.span
                        className="navbar-underline"
                        layoutId="navbar-underline"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
