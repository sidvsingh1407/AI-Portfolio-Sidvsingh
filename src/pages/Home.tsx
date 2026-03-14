
import React from 'react';
import { Link } from 'react-router-dom';
import PromptImprover from '../components/PromptImprover';
import FloatingParticles from '../components/FloatingParticles';
import { contentData as content } from '../content';

const Home: React.FC = () => {
  const { projects } = content;
  const featuredProjects = projects.filter(p => p.category === 'agentic-systems');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden bg-teal text-off-white">
        <FloatingParticles />
        <div className="absolute inset-0 cinematic-gradient pointer-events-none" />
        <div className="relative z-10 max-w-5xl">
          <span className="text-gold font-bold uppercase tracking-[0.4em] text-xs mb-8 block animate-in fade-in slide-in-from-bottom-2 duration-1000">
            Siddharth Vikram Singh
          </span>
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            The <span className="text-gold italic font-serif">Strategist</span> <br/> for AI Systems.
          </h1>
          <div className="w-24 h-1 bg-gold mx-auto mb-12 animate-in fade-in zoom-in duration-1000 delay-500" />
          <p className="text-xl md:text-2xl text-off-white/80 max-w-2xl mx-auto leading-relaxed mb-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
            I architect intelligent workflows that translate complex business logic into scalable, automated impact.
          </p>
          <div className="flex flex-wrap justify-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
            <Link to="/agentic-systems" className="px-10 py-5 bg-red text-off-white font-bold rounded-none hover:scale-105 transition-all shadow-2xl glitch-hover uppercase tracking-widest text-sm">
              Explore Systems
            </Link>
            <Link to="/about" className="px-10 py-5 bg-transparent text-off-white border border-off-white/30 font-bold rounded-none hover:bg-off-white/10 transition-all uppercase tracking-widest text-sm">
              The Process
            </Link>
          </div>
        </div>
      </section>

      {/* Project Highlights Section - Projects Rhythm (Charcoal) */}
      <section className="py-32 px-4 bg-charcoal text-off-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-gold mb-4">Selected Works</h2>
              <p className="text-4xl md:text-5xl font-bold">Agentic Systems in Action.</p>
            </div>
            <Link to="/agentic-systems" className="text-gold font-bold hover:text-red transition-colors flex items-center gap-2 uppercase tracking-widest text-xs">
              View all projects <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {featuredProjects.map((project, idx) => (
              <div key={project.id} className="group cursor-pointer">
                <div className="aspect-[16/10] overflow-hidden rounded-none mb-10 relative bg-teal">
                  <div className="absolute inset-0 bg-red/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  <img 
                    src={project.images?.[0]?.src || `https://picsum.photos/seed/${project.slug}/1200/800`} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-all duration-700 scale-105 group-hover:scale-100"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-3xl font-bold mb-8 text-off-white group-hover:text-gold transition-colors">{project.title}</h3>
                <div className="space-y-6 border-l border-gold/20 pl-8">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold/60">Problem</span>
                    <p className="text-off-white/70 text-sm leading-relaxed">{project.problem}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold/60">Solution</span>
                    <p className="text-off-white/70 text-sm leading-relaxed">{project.approach}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold/60">Result</span>
                    <p className="text-gold text-sm font-bold tracking-wide">{project.outcome}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prompt Engineering Showcase */}
      <section className="py-32 px-4 bg-teal/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-red mb-4">Interactive</h2>
            <p className="text-4xl md:text-5xl font-bold text-charcoal max-w-2xl mx-auto">Prompt Engineering Showcase</p>
            <p className="text-charcoal/60 mt-6 max-w-xl mx-auto text-sm">Interactive demonstration of how structured prompt engineering transforms generic AI output into precise business logic.</p>
          </div>
          <PromptImprover />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8 tracking-tighter text-charcoal">Let's build something <span className="text-red italic font-serif">intelligent</span>.</h2>
          <p className="text-charcoal/60 mb-16 leading-relaxed">Whether you need a custom automation or are exploring AI possibilities, I'm here to translate your vision into code.</p>
          
          <form className="space-y-6 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="Name" className="w-full bg-off-white border border-charcoal/10 rounded-none p-5 text-charcoal focus:border-red outline-none transition-all text-sm" />
              <input type="email" placeholder="Email" className="w-full bg-off-white border border-charcoal/10 rounded-none p-5 text-charcoal focus:border-red outline-none transition-all text-sm" />
            </div>
            <textarea placeholder="Message" className="w-full h-40 bg-off-white border border-charcoal/10 rounded-none p-5 text-charcoal focus:border-red outline-none resize-none transition-all text-sm"></textarea>
            <button type="button" className="w-full py-5 bg-red text-off-white font-bold uppercase tracking-[0.3em] text-xs rounded-none hover:scale-105 transition-all shadow-2xl glitch-hover">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
