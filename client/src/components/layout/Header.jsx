// Header layoutimport { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, LogOut, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/Button';
import { useAuth } from '../../hooks/useAuth.js';
import { useDispatch } from 'react-redux';
import { logOut } from '../../store/slices/authSlice.js';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    navigate('/login');
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-50 w-full border-b border-gray/10 bg-dark-accent/50 backdrop-blur-lg"
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link to="/" className="text-2xl font-bold text-primary tracking-wider">
          NET
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                `text-light transition-colors hover:text-primary relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 ${isActive ? 'text-primary after:w-full' : 'after:w-0'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          {isAuthenticated && (
            <NavLink to="/dashboard" className={({ isActive }) => `flex items-center text-light transition-colors hover:text-primary ${isActive ? 'text-primary' : ''}`}>
              <LayoutDashboard className="mr-2 h-4 w-4"/> Dashboard
            </NavLink>
          )}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <Button variant="secondary" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 text-light hover:text-primary transition-colors">Login</Link>
              <Button onClick={() => navigate('/register')}>Register</Button>
            </>
          )}
        </div>
        
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-light"><Menu size={24} /></button>
      </div>

      {/* Mobile Menu (You can expand this similarly) */}
    </motion.header>
  );
}