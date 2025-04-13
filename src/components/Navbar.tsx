
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const navLinks = [
    { to: '/', label: t('navbar.home') },
    { to: '/suites', label: t('navbar.suites') },
    { to: '/amenities', label: t('navbar.amenities') },
    { to: '/events', label: t('navbar.events') },
    { to: '/contact', label: t('navbar.contact') },
  ];
  
  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 glass-effect shadow-sm`}
    >
      <div className="container-custom py-4 md:py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/07743ccd-b02f-4593-b880-e975652ce383.png" 
                alt="Hotel Logo" 
                className="h-10 w-10 object-contain"
              />
            </Link>
            <Link to="/" className="text-xl md:text-2xl font-medium tracking-tight text-black dark:text-white font-playfair">
              Hotel de Milde Maerten
            </Link>
          </div>
          
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
              <Button className="btn-primary">{t('navbar.booking')}</Button>
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
              <Button className="btn-primary w-full mt-2">{t('navbar.booking')}</Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
