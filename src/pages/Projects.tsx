
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { contentData } from '../content';
import { ChevronDown, ChevronUp, X, ChevronLeft, ChevronRight } from 'lucide-react';

const Projects: React.FC = () => {
  const location = useLocation();
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ projectId: string, index: number } | null>(null);
  
  const category = location.pathname.includes('agentic-systems') ? 'agentic-systems' : 'vibe-coding';
  
  const filteredProjects = contentData.projects.filter(p => p.category === category);
  const title = category === 'agentic-systems' ? 'Agentic Systems' : 'Vibe Coding';
  const subtitle = category === 'agentic-systems' 
    ? "Multi-step AI pipelines engineered for research, outreach, and business intelligence."
    : "Experimental projects at the intersection of human intuition and LLM logic.";

  const toggleExpand = (projectId: string) => {
    setExpandedProjectId(prev => prev === projectId ? null : projectId);
  };

  const navigateProject = (direction: 'next' | 'prev') => {
    if (!expandedProjectId) return;
    const currentIndex = filteredProjects.findIndex(p => p.id === expandedProjectId);
    if (currentIndex === -1) return;

    const nextIndex = direction === 'next' 
      ? (currentIndex + 1) % filteredProjects.length
      : (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
    
    const nextProject = filteredProjects[nextIndex];
    setExpandedProjectId(nextProject.id);
    
    // Scroll to the project after a short delay to allow state update/render
    setTimeout(() => {
      const element = document.getElementById(nextProject.id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const closeLightbox = () => setLightbox(null);

  const navigateLightbox = useCallback((direction: 'next' | 'prev') => {
    if (!lightbox) return;
    const project = filteredProjects.find(p => p.id === lightbox.projectId);
    if (!project || !project.images) return;

    const newIndex = direction === 'next' 
      ? (lightbox.index + 1) % project.images.length
      : (lightbox.index - 1 + project.images.length) % project.images.length;
    
    setLightbox({ ...lightbox, index: newIndex });
  }, [lightbox, filteredProjects]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightbox) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigateLightbox('next');
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox, navigateLightbox]);

  return (
    <div className="bg-charcoal min-h-screen text-off-white">
      {/* Lightbox Modal */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-charcoal/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
          <button 
            onClick={closeLightbox}
            className="absolute top-8 right-8 text-off-white/60 hover:text-gold transition-colors p-2 z-[110]"
            aria-label="Close gallery"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
            {/* Navigation Buttons */}
            <button 
              onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
              className="absolute left-0 md:-left-16 text-off-white/40 hover:text-gold transition-colors p-4 z-[110]"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <div className="relative group w-full h-full flex items-center justify-center overflow-hidden">
              {filteredProjects.find(p => p.id === lightbox.projectId)?.images?.[lightbox.index] && (
                <img 
                  src={filteredProjects.find(p => p.id === lightbox.projectId)!.images![lightbox.index].src}
                  alt={filteredProjects.find(p => p.id === lightbox.projectId)!.images![lightbox.index].alt}
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-full object-contain animate-in zoom-in-95 duration-500"
                />
              )}
              
              {/* Image Counter */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 py-4 text-[10px] font-bold uppercase tracking-[0.4em] text-gold/60">
                {lightbox.index + 1} / {filteredProjects.find(p => p.id === lightbox.projectId)?.images?.length}
              </div>
            </div>

            <button 
              onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
              className="absolute right-0 md:-right-16 text-off-white/40 hover:text-gold transition-colors p-4 z-[110]"
              aria-label="Next image"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          </div>
          
          {/* Backdrop click to close */}
          <div className="absolute inset-0 -z-10" onClick={closeLightbox} />
        </div>
      )}

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
          {filteredProjects.map((project, idx) => {
            const isExpanded = expandedProjectId === project.id;
            const hasMultipleImages = (project.images?.length || 0) > 1;
            const displayImages = isExpanded ? project.images : project.images?.slice(0, 1);

            return (
              <article id={project.id} key={project.id} className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start group">
                <div className="lg:col-span-5 space-y-12">
                  <div className="space-y-4">
                    <span className="text-gold font-bold text-xs uppercase tracking-[0.4em] opacity-60">Project {idx + 1}</span>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight group-hover:text-gold transition-colors duration-500">
                      {project.title}
                      {project.status && (
                        <span className="ml-4 inline-block px-3 py-1 bg-gold text-charcoal text-[10px] font-bold uppercase tracking-widest align-middle">
                          {project.status}
                        </span>
                      )}
                    </h2>
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

                    {project.context && (
                      <div className="space-y-3">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold/60">Execution Detail</h3>
                        <p className="text-off-white/70 text-sm leading-relaxed">{project.context}</p>
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

                  {hasMultipleImages && (
                    <div className="space-y-6">
                      <button 
                        onClick={() => toggleExpand(project.id)}
                        className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-gold hover:text-off-white transition-colors group/btn"
                      >
                        {isExpanded ? (
                          <>Collapse Gallery <ChevronUp className="w-4 h-4 group-hover/btn:-translate-y-1 transition-transform" /></>
                        ) : (
                          <>View Full Gallery ({project.images?.length}) <ChevronDown className="w-4 h-4 group-hover/btn:translate-y-1 transition-transform" /></>
                        )}
                      </button>

                      {isExpanded && filteredProjects.length > 1 && (
                        <div className="flex items-center gap-8 pt-6 border-t border-off-white/5 animate-in fade-in slide-in-from-left-4 duration-500">
                          <button 
                            onClick={() => navigateProject('prev')}
                            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.4em] text-gold/40 hover:text-gold transition-colors group/nav"
                          >
                            <ChevronLeft className="w-3 h-3 group-hover/nav:-translate-x-1 transition-transform" /> Previous Project
                          </button>
                          <button 
                            onClick={() => navigateProject('next')}
                            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.4em] text-gold/40 hover:text-gold transition-colors group/nav"
                          >
                            Next Project <ChevronRight className="w-3 h-3 group-hover/nav:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div 
                  className={`lg:col-span-7 ${isExpanded ? 'grid grid-cols-1 sm:grid-cols-2 gap-6' : 'space-y-10'} ${project.images && project.images.length > 0 ? 'cursor-pointer' : ''}`}
                  onClick={() => {
                    if (project.images && project.images.length > 0) {
                      setLightbox({ projectId: project.id, index: 0 });
                    }
                  }}
                >
                  {displayImages?.map((img, iIdx) => (
                    <div 
                      key={iIdx} 
                      className="relative group/img overflow-hidden"
                      onClick={(e) => {
                        if (isExpanded) {
                          e.stopPropagation();
                          setLightbox({ projectId: project.id, index: iIdx });
                        }
                      }}
                    >
                      <div className="absolute inset-0 bg-red/10 opacity-0 group-hover/img:opacity-100 transition-opacity duration-700 z-10" />
                      <img 
                        src={img.src} 
                        alt={img.alt} 
                        loading="lazy"
                        referrerPolicy="no-referrer"
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Projects;
