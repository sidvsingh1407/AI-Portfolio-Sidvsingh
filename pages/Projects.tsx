
import React from 'react';
import { useLocation } from 'react-router-dom';
import { contentData } from '../content';

const Projects: React.FC = () => {
  const location = useLocation();
  const category = location.pathname.includes('agentic-systems') ? 'agentic-systems' : 'vibe-coding';
  
  const filteredProjects = contentData.projects.filter(p => p.category === category);
  const title = category === 'agentic-systems' ? 'Agentic Systems' : 'Vibe Coding';
  const subtitle = category === 'agentic-systems' 
    ? "Deploying autonomous AI agents to handle complex, repetitive tasks."
    : "Experimental projects at the intersection of human intuition and LLM logic.";

  return (
    <div className="bg-charcoal min-h-screen text-off-white">
      <div className="max-w-7xl mx-auto px-6 py-32">
        <header className="mb-32 space-y-8 max-w-3xl">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {title}<span className="text-gold">.</span>
          </h1>
          <p className="text-xl md:text-2xl text-off-white/60 leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            {subtitle}
          </p>
          <div className="w-24 h-1 bg-gold animate-in fade-in zoom-in duration-1000 delay-400" />
        </header>

        <div className="space-y-48">
          {filteredProjects.map((project, idx) => (
            <article key={project.id} className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start group">
              <div className="lg:col-span-5 space-y-12">
                <div className="space-y-4">
                  <span className="text-gold font-bold text-xs uppercase tracking-[0.4em] opacity-60">Project {idx + 1}</span>
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight group-hover:text-gold transition-colors duration-500">{project.title}</h2>
                </div>

                <div className="space-y-10 border-l border-gold/20 pl-10">
                  {project.problem && (
                    <div className="space-y-3">
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold/60">The Problem</h3>
                      <p className="text-off-white/70 text-sm leading-relaxed">{project.problem}</p>
                    </div>
                  )}

                  {project.approach && (
                    <div className="space-y-3">
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold/60">The Approach</h3>
                      <p className="text-off-white/70 text-sm leading-relaxed">{project.approach}</p>
                    </div>
                  )}

                  {project.outcome && (
                    <div className="p-8 bg-teal/20 border border-gold/10 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-red" />
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-red mb-4">The Outcome</h3>
                      <p className="text-off-white text-sm leading-relaxed font-bold tracking-wide">{project.outcome}</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-10 border-t border-off-white/5">
                  {project.toolkit?.map((group, gIdx) => (
                    <div key={gIdx} className="space-y-4">
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold/40">{group.group}</h4>
                      <ul className="flex flex-wrap gap-3">
                        {group.tools.map((tool, tIdx) => (
                          <li key={tIdx} className="px-3 py-1.5 bg-off-white/5 border border-off-white/10 text-[10px] font-bold text-off-white/60 uppercase tracking-widest">
                            {tool}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7 space-y-10">
                {project.images?.map((img, iIdx) => (
                  <div key={iIdx} className="relative group/img overflow-hidden">
                    <div className="absolute inset-0 bg-red/10 opacity-0 group-hover/img:opacity-100 transition-opacity duration-700 z-10" />
                    <img 
                      src={img.src} 
                      alt={img.alt} 
                      className="w-full h-auto grayscale group-hover/img:grayscale-0 transition-all duration-1000 scale-105 group-hover/img:scale-100"
                    />
                  </div>
                ))}
                {!project.images && (
                  <div className="w-full aspect-[16/10] bg-teal/10 border border-dashed border-off-white/10 flex items-center justify-center text-off-white/30 italic uppercase tracking-widest text-xs">
                    Visual representation coming soon
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
