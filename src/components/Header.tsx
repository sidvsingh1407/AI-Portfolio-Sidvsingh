
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;
  const isAboutPage = location.pathname === '/about';

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-teal/90 backdrop-blur-md py-4 shadow-xl' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className={`text-2xl font-bold tracking-tighter group transition-colors ${!isScrolled && isAboutPage ? 'text-charcoal' : 'text-off-white'}`}>
          SVS<span className="text-gold group-hover:text-red transition-colors">.</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-10">
          <Link to="/agentic-systems" className={`text-xs font-bold uppercase tracking-widest transition-colors ${isActive('/agentic-systems') ? 'text-gold' : (!isScrolled && isAboutPage ? 'text-charcoal/70 hover:text-gold' : 'text-off-white/70 hover:text-gold')}`}>Systems</Link>
          <Link to="/vibe-coding" className={`text-xs font-bold uppercase tracking-widest transition-colors ${isActive('/vibe-coding') ? 'text-gold' : (!isScrolled && isAboutPage ? 'text-charcoal/70 hover:text-gold' : 'text-off-white/70 hover:text-gold')}`}>Vibes</Link>
          <a href="https://docs.google.com/spreadsheets/d/174wU7GSwfhoq58QaHDURwO8QXLnnclStokCs9o5dywQ/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className={`text-xs font-bold uppercase tracking-widest transition-colors ${!isScrolled && isAboutPage ? 'text-charcoal/70 hover:text-gold' : 'text-off-white/70 hover:text-gold'}`}>TOOLKIT</a>
          <Link to="/about" className={`text-xs font-bold uppercase tracking-widest transition-colors ${isActive('/about') ? 'text-gold' : (!isScrolled && isAboutPage ? 'text-charcoal/70 hover:text-gold' : 'text-off-white/70 hover:text-gold')}`}>About</Link>
          <Link to="/about" className="px-6 py-2 bg-red text-off-white text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all">Contact</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
