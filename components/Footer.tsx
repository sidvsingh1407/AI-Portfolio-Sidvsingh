
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal text-off-white py-24 px-6 border-t border-off-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="md:col-span-2 space-y-8">
          <Link to="/" className="text-3xl font-bold tracking-tighter text-off-white">
            SVS<span className="text-gold">.</span>
          </Link>
          <p className="text-off-white/50 max-w-sm leading-relaxed">
            Architecting the future of business through intelligent agentic systems and human-centered AI design.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gold hover:text-red transition-colors font-bold uppercase tracking-widest text-[10px]">LinkedIn</a>
            <a href="#" className="text-gold hover:text-red transition-colors font-bold uppercase tracking-widest text-[10px]">Twitter</a>
            <a href="#" className="text-gold hover:text-red transition-colors font-bold uppercase tracking-widest text-[10px]">GitHub</a>
          </div>
        </div>
        
        <div className="space-y-6">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Navigation</h4>
          <nav className="flex flex-col gap-4">
            <Link to="/agentic-systems" className="text-sm text-off-white/60 hover:text-off-white transition-colors">Agentic Systems</Link>
            <Link to="/vibe-coding" className="text-sm text-off-white/60 hover:text-off-white transition-colors">Vibe Coding</Link>
            <Link to="/about" className="text-sm text-off-white/60 hover:text-off-white transition-colors">About Me</Link>
          </nav>
        </div>

        <div className="space-y-6">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Contact</h4>
          <p className="text-sm text-off-white/60">Lucknow, India</p>
          <p className="text-sm text-off-white/60">hello@svs.ai</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-off-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-off-white/30">
          © {new Date().getFullYear()} Siddharth Vikram Singh. All rights reserved.
        </p>
        <p className="text-[10px] font-bold uppercase tracking-widest text-off-white/30">
          Built with <span className="text-red">Precision</span> & AI.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
