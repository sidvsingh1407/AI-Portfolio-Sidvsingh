
import React from 'react';
import { Link } from 'react-router-dom';
import FloatingParticles from './FloatingParticles';

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-charcoal text-off-white py-20 px-6 md:px-12 border-t border-off-white/5 relative overflow-hidden">
      <FloatingParticles 
        particleCount={80} 
        speed={0.2} 
        opacity={0.2} 
        minSize={1.2} 
        maxSize={3.5}
        colors={['#2D4A53', '#D4B76A']} // Teal and Gold highlights
      />
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 relative z-10">
        <div className="sm:col-span-2 space-y-8">
          <Link to="/" className="text-2xl md:text-3xl font-bold tracking-tighter text-off-white">
            SVS<span className="text-gold">.</span>
          </Link>
          <p className="text-off-white/50 max-w-sm leading-relaxed text-sm md:text-base">
            Analyzing the operational consequences and systems-level behavior of modern AI.
          </p>
          <div className="flex gap-8">
            <a href="https://www.linkedin.com/in/siddharth-vikram-singh-90751b190/" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-red transition-colors font-bold uppercase tracking-[0.2em] text-[10px]">LinkedIn</a>
            <a href="https://github.com/sidvsingh1407" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-red transition-colors font-bold uppercase tracking-[0.2em] text-[10px]">GitHub</a>
          </div>
        </div>
        
        <div className="space-y-8">
          <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-gold border-b border-gold/10 pb-4">Insights</h4>
          <nav className="flex flex-col gap-5">
            <Link to="/systems" className="text-xs md:text-sm text-off-white/60 hover:text-off-white transition-all hover:translate-x-1 decoration-transparent hover:decoration-gold underline underline-offset-8">Systems</Link>
            <Link to="/prototypes" className="text-xs md:text-sm text-off-white/60 hover:text-off-white transition-all hover:translate-x-1 decoration-transparent hover:decoration-gold underline underline-offset-8">Prototypes</Link>
            <Link to="/insights" className="text-xs md:text-sm text-off-white/60 hover:text-off-white transition-all hover:translate-x-1 decoration-transparent hover:decoration-gold underline underline-offset-8">Insights</Link>
            <Link to="/about" className="text-xs md:text-sm text-off-white/60 hover:text-off-white transition-all hover:translate-x-1 decoration-transparent hover:decoration-gold underline underline-offset-8">About</Link>
          </nav>
        </div>

        <div className="space-y-8">
          <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-gold border-b border-gold/10 pb-4">Nexus</h4>
          <div className="space-y-5">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-off-white/30 mb-1">HQ</p>
              <p className="text-xs md:text-sm text-off-white/60 leading-relaxed">Uttar Pradesh, <br/> Lucknow, IN</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-off-white/30 mb-1">Direct</p>
              <a href="mailto:vikramsiddharth14@gmail.com" className="block text-xs md:text-sm text-off-white/60 hover:text-gold transition-colors break-words">vikramsiddharth14@gmail.com</a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-off-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
        <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-off-white/20">
          © {new Date().getFullYear()} Siddharth Vikram Singh. Strategic IP.
        </p>
        <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-off-white/20 flex items-center gap-2">
          Handcrafted with <span className="text-gold">Logic</span> & <span className="text-red">Precision</span>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
