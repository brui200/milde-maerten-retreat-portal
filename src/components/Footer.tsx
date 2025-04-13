
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-hotel-charcoal text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <Link to="/" className="text-2xl font-playfair tracking-tight">
              Milde Maerten
            </Link>
            <p className="mt-4 text-hotel-taupe text-sm">
              A monumental experience in the heart of Middelburg.
            </p>
            <div className="flex mt-6 space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-hotel-taupe hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-hotel-taupe hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-hotel-taupe hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Contact information */}
          <div className="col-span-1">
            <h3 className="text-lg font-playfair mb-4">Contact</h3>
            <ul className="space-y-3 text-hotel-taupe">
              <li className="flex items-start gap-2">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span>{t('footer.address')}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="flex-shrink-0" />
                <a href="tel:+31123456789" className="hover:text-white transition-colors">
                  +31 123 456 789
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="flex-shrink-0" />
                <a href="mailto:info@mildemaerten.nl" className="hover:text-white transition-colors">
                  info@mildemaerten.nl
                </a>
              </li>
            </ul>
          </div>
          
          {/* Quick links */}
          <div className="col-span-1">
            <h3 className="text-lg font-playfair mb-4">Quick Links</h3>
            <ul className="space-y-2 text-hotel-taupe">
              <li>
                <Link to="/suites" className="hover:text-white transition-colors">
                  {t('nav.suites')}
                </Link>
              </li>
              <li>
                <Link to="/amenities" className="hover:text-white transition-colors">
                  {t('nav.amenities')}
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-white transition-colors">
                  {t('nav.events')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                <Link to="/booking" className="hover:text-white transition-colors">
                  {t('nav.book')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="text-lg font-playfair mb-4">Stay Updated</h3>
            <p className="text-hotel-taupe text-sm mb-4">
              Subscribe to our newsletter for special offers and updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 bg-hotel-brown text-white placeholder:text-hotel-taupe focus:outline-none flex-grow"
              />
              <button className="bg-white text-hotel-charcoal px-4 py-2 font-medium hover:bg-hotel-cream transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom footer */}
        <div className="mt-16 pt-6 border-t border-hotel-brown flex flex-col md:flex-row justify-between text-hotel-taupe text-sm">
          <div>
            © {currentYear} Milde Maerten Hotel. {t('footer.rights')}.
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
