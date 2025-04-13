import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/suites', label: t('nav.suites') },
    { to: '/amenities', label: t('nav.amenities') },
    { to: '/events', label: t('nav.events') },
    { to: '/contact', label: t('nav.contact') },
  ];
  
  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'glass-effect shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container-custom py-4 md:py-5">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl md:text-2xl font-medium tracking-tight text-black dark:text-white font-playfair">
            Hotel de Milde Maerten
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.to} 
                to={link.to} 
                className="text-sm text-black/80 hover:text-black transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <LanguageSwitcher />
            <Link to="/booking">
              <Button className="btn-primary">{t('nav.book')}</Button>
            </Link>
          </nav>
          
          <div className="flex items-center md:hidden gap-4">
            <LanguageSwitcher />
            <button 
              onClick={toggleMenu}
              className="text-black focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <nav className="md:hidden pt-6 pb-4 flex flex-col space-y-4 glass-effect mt-2">
            {navLinks.map((link) => (
              <Link 
                key={link.to} 
                to={link.to} 
                className="text-lg text-black/80 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/booking" onClick={() => setIsMenuOpen(false)}>
              <Button className="btn-primary w-full mt-2">{t('nav.book')}</Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
