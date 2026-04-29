
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;
  const isAboutPage = location.pathname === '/about';

  const navLinks = [
    { to: "/agentic-systems", label: "Systems" },
    { to: "/vibe-coding", label: "Vibes" },
    { to: "/blog", label: "Insights" },
    { to: "/about", label: "About" },
  ];

  const toolkitLink = "https://docs.google.com/spreadsheets/d/174wU7GSwfhoq58QaHDURwO8QXLnnclStokCs9o5dywQ/edit?usp=sharing";

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled || isMobileMenuOpen ? 'bg-teal/95 backdrop-blur-md py-4 shadow-xl' : 'bg-transparent py-6 md:py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className={`text-2xl font-bold tracking-tighter group transition-colors ${!isScrolled && !isMobileMenuOpen && isAboutPage ? 'text-charcoal' : 'text-off-white'}`}>
          SVS<span className="text-gold group-hover:text-red transition-colors">.</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.to}
              to={link.to} 
              className={`text-[10px] xl:text-xs font-bold uppercase tracking-widest transition-colors ${isActive(link.to) ? 'text-gold' : (!isScrolled && isAboutPage ? 'text-charcoal/70 hover:text-gold' : 'text-off-white/70 hover:text-gold')}`}
            >
              {link.label}
            </Link>
          ))}
          <a 
            href={toolkitLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`text-[10px] xl:text-xs font-bold uppercase tracking-widest transition-colors ${!isScrolled && isAboutPage ? 'text-charcoal/70 hover:text-gold' : 'text-off-white/70 hover:text-gold'}`}
          >
            TOOLKIT
          </a>
          <Link to="/#footer" className="px-5 xl:px-6 py-2 bg-red text-off-white text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all">Contact</Link>
        </nav>

        {/* Mobile Nav Toggle */}
        <button 
          className={`lg:hidden p-2 transition-colors ${!isScrolled && !isMobileMenuOpen && isAboutPage ? 'text-charcoal' : 'text-off-white'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-teal/98 border-t border-off-white/5 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.to}
                  to={link.to} 
                  className={`text-sm font-bold uppercase tracking-[0.2em] transition-colors ${isActive(link.to) ? 'text-gold' : 'text-off-white/70'}`}
                >
                  {link.label}
                </Link>
              ))}
              <a 
                href={toolkitLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm font-bold uppercase tracking-[0.2em] text-off-white/70"
              >
                TOOLKIT
              </a>
              <Link to="/#footer" className="inline-block px-6 py-3 bg-red text-off-white text-xs font-bold uppercase tracking-widest text-center shadow-xl">
                Contact
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
