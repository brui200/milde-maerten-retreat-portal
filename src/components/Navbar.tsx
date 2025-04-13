import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';
const Navbar = () => {
  const {
    t
  } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Dropdown items for About menu
  const aboutDropdownItems = [{
    to: '/suites',
    label: 'Suites'
  }, {
    to: '/amenities',
    label: 'Amenities'
  }, {
    to: '/events',
    label: 'Events'
  }, {
    to: '/history',
    label: 'History'
  }];
  return <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 glass-effect shadow-sm">
      <div className="container-custom py-4 md:py-5">
        <div className="flex items-center justify-between">
          {/* Logo and Hotel Name */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/lovable-uploads/07743ccd-b02f-4593-b880-e975652ce383.png" alt="Hotel Logo" className="h-16 w-16 object-contain" />
            </Link>
            <Link to="/" className="text-xl md:text-2xl font-medium tracking-tight text-black dark:text-white font-playfair whitespace-nowrap">
              Hotel de Milde Maerten
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Home */}
                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      {t('navbar.home')}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                {/* About Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="">
                    About
                    <ChevronDown className="ml-2 h-4 w-4 transition duration-200 group-data-[state=open]:rotate-180" />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-white/70 backdrop-blur-md border border-gray-100 shadow-lg rounded-lg">
                    <ul className="grid w-[200px] gap-2 p-2">
                      {aboutDropdownItems.map(item => <li key={item.to}>
                          <Link to={item.to} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100">
                            <div className="text-sm font-medium">{item.label}</div>
                          </Link>
                        </li>)}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                {/* Contact */}
                <NavigationMenuItem>
                  <Link to="/contact">
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      {t('navbar.contact')}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            {/* Language Switcher and Book Now Button */}
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <Link to="/booking">
                <Button className="btn-primary btn-hover-effect">{t('navbar.booking')}</Button>
              </Link>
            </div>
          </div>
          
          {/* Mobile menu toggle */}
          <div className="flex items-center md:hidden gap-4">
            <LanguageSwitcher />
            <button onClick={toggleMenu} className="text-black focus:outline-none transition-transform duration-200 hover:scale-110" aria-label="Toggle menu">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile dropdown menu */}
        {isMenuOpen && <nav className="md:hidden pt-6 pb-4 flex flex-col space-y-4 glass-effect mt-2">
            <Link to="/" className="text-lg text-black/80 py-2 transition-colors duration-300 hover:text-black hover:pl-1" onClick={() => setIsMenuOpen(false)}>
              {t('navbar.home')}
            </Link>
            
            {/* About section in mobile */}
            <div className="space-y-2">
              <div className="text-lg text-black/80 font-medium">About</div>
              <div className="pl-4 space-y-2">
                {aboutDropdownItems.map(item => <Link key={item.to} to={item.to} className="block text-lg text-black/80 py-1 transition-colors duration-300 hover:text-black hover:pl-1" onClick={() => setIsMenuOpen(false)}>
                    {item.label}
                  </Link>)}
              </div>
            </div>
            
            <Link to="/contact" className="text-lg text-black/80 py-2 transition-colors duration-300 hover:text-black hover:pl-1" onClick={() => setIsMenuOpen(false)}>
              {t('navbar.contact')}
            </Link>
            
            <Link to="/booking" onClick={() => setIsMenuOpen(false)}>
              <Button className="btn-primary w-full mt-2 btn-hover-effect">{t('navbar.booking')}</Button>
            </Link>
          </nav>}
      </div>
    </header>;
};
export default Navbar;