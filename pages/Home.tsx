
import React from 'react';
import { Link } from 'react-router-dom';
import PromptImprover from '../components/PromptImprover';
import content from '../content.json';

const Home: React.FC = () => {
  const { agentStack, projects } = content;
  const featuredProjects = projects.filter(p => p.category === 'agentic-systems');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden bg-teal text-off-white">
        <div className="absolute inset-0 cinematic-gradient pointer-events-none" />
        <div className="z-10 max-w-5xl">
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

      {/* AI Agent Stack Section - About Rhythm (White) */}
      <section className="py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-red mb-4">The Toolkit</h2>
            <p className="text-4xl md:text-5xl font-bold text-charcoal max-w-2xl mx-auto">Specialized AI agents built for precision.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {agentStack.map((agent, idx) => (
              <div key={idx} className="bg-off-white p-10 rounded-none border border-charcoal/5 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-0 bg-red group-hover:h-full transition-all duration-500" />
                <div className="w-14 h-14 bg-teal/10 rounded-none flex items-center justify-center mb-8 group-hover:bg-teal group-hover:text-off-white transition-all duration-500">
                  {agent.icon === 'sales' && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>}
                  {agent.icon === 'voice' && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>}
                  {agent.icon === 'research' && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>}
                  {agent.icon === 'workflow' && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>}
                </div>
                <h3 className="text-xl font-bold mb-3 text-charcoal">{agent.title}</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">{agent.description}</p>
              </div>
            ))}
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
                    src={`https://picsum.photos/seed/${project.slug}/1200/800`} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                    referrerPolicy="no-referrer"
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
      <section className="py-24 px-4 bg-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Prompt Engineering Showcase</h2>
            <p className="text-ink/60 max-w-xl mx-auto">Interactive demonstration of how structured prompt engineering transforms generic AI output into precise business logic.</p>
          </div>
          <PromptImprover />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Let's build something intelligent.</h2>
          <p className="text-ink/60 mb-12">Whether you need a custom automation or are exploring AI possibilities, I'm here to translate your vision into code.</p>
          
          <form className="space-y-4 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Name" className="w-full bg-background border border-primary/10 rounded-xl p-4 text-ink focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
              <input type="email" placeholder="Email" className="w-full bg-background border border-primary/10 rounded-xl p-4 text-ink focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
            </div>
            <textarea placeholder="Message" className="w-full h-32 bg-background border border-primary/10 rounded-xl p-4 text-ink focus:ring-2 focus:ring-primary/20 outline-none resize-none transition-all"></textarea>
            <button type="button" className="w-full py-4 bg-primary text-white font-bold uppercase tracking-widest rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
