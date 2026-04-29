
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

      <div className="max-w-7xl mx-auto px-6 py-20 md:py-40">
        <header className="mb-20 md:mb-32 space-y-6 md:space-y-10 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter animate-in fade-in slide-in-from-bottom-4 duration-1000 leading-[0.9]">
            {title}<span className="text-gold">.</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-off-white/60 leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200 lg:max-w-3xl">
            {subtitle}
          </p>
          <div className="w-16 md:w-24 h-1 bg-gold animate-in fade-in zoom-in duration-1000 delay-400" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-16 md:gap-y-32">
          {filteredProjects.map((project, idx) => {
            const isExpanded = expandedProjectId === project.id;

            return (
              <article 
                id={project.id} 
                key={project.id} 
                className={`group bg-off-white/5 border border-off-white/10 p-6 md:p-10 transition-all duration-500 flex flex-col h-fit hover:border-gold/30 hover:bg-off-white/[0.07] hover:-translate-y-1 shadow-2xl ${isExpanded ? 'md:col-span-2 border-gold/20 bg-off-white/[0.08] -translate-y-0' : ''}`}
              >
                {/* Image Preview */}
                <div 
                  className="aspect-video overflow-hidden bg-charcoal/40 mb-8 md:mb-12 cursor-pointer relative border border-off-white/5 group/img"
                  onClick={() => project.images && project.images.length > 0 && setLightbox({ projectId: project.id, index: 0 })}
                >
                  <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 z-10" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 z-20 transition-opacity">
                    <span className="px-4 py-2 bg-charcoal/80 text-gold text-[10px] font-bold uppercase tracking-widest border border-gold/30">View Gallery</span>
                  </div>
                  {project.images?.[0] ? (
                    <img 
                      src={project.images[0].src} 
                      alt={project.images[0].alt} 
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 transition-all duration-1000 scale-105 group-hover/img:scale-100"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-off-white/20 space-y-4">
                      <div className="w-16 h-px bg-off-white/10" />
                      <span className="italic text-xs tracking-[0.3em] uppercase">Visual documentation pending</span>
                      <div className="w-16 h-px bg-off-white/10" />
                    </div>
                  )}
                </div>

                {/* Header */}
                <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
                  <div className="flex justify-between items-start">
                    <span className="text-gold font-bold text-[10px] md:text-xs uppercase tracking-[0.4em] opacity-40">Section {idx + 1}</span>
                    {project.status && (
                      <span className="px-3 py-1 bg-gold text-charcoal text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
                        {project.status}
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight group-hover:text-gold transition-colors duration-500 leading-tight">
                    {project.title}
                  </h2>
                </div>

                {/* Problem Statement */}
                <div className="space-y-4 mb-10 md:mb-16">
                  <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-gold/40">The Problem</h3>
                  <p className={`text-off-white/70 text-sm md:text-base lg:text-lg leading-relaxed ${isExpanded ? '' : 'line-clamp-3 md:line-clamp-4'}`}>
                    {project.problem}
                  </p>
                </div>

                {/* View Details Link */}
                <button 
                  onClick={() => toggleExpand(project.id)}
                  className="mt-auto flex items-center gap-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] text-gold hover:text-off-white transition-all group/btn py-4 border-t border-off-white/5 w-full touch-manipulation"
                >
                  <span className="relative overflow-hidden inline-block flex-1 text-left">
                    <span className="inline-block transition-transform duration-300 group-hover/btn:-translate-y-full">
                      {isExpanded ? 'Collapse Architecture' : 'Examine Architecture'}
                    </span>
                    <span className="absolute top-0 left-0 inline-block translate-y-full transition-transform duration-300 group-hover/btn:translate-y-0 text-off-white">
                      {isExpanded ? 'Collapse Architecture' : 'Examine Architecture'}
                    </span>
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 group-hover/btn:-translate-y-1 transition-transform" />
                  ) : (
                    <ChevronDown className="w-5 h-5 group-hover/btn:translate-y-1 transition-transform" />
                  )}
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="mt-12 pt-12 md:mt-20 md:pt-20 border-t border-off-white/10 gap-y-12 md:gap-y-24 grid grid-cols-1 animate-in fade-in slide-in-from-top-6 duration-700">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                      <div className="space-y-12 md:space-y-20">
                        {project.approach && (
                          <div className="space-y-4 md:space-y-6">
                            <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-gold/60">The Engineering Approach</h3>
                            <p className="text-off-white/70 text-sm md:text-base leading-relaxed">{project.approach}</p>
                          </div>
                        )}
                        {project.context && (
                          <div className="space-y-4 md:space-y-6">
                            <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-gold/60">Deployment Context</h3>
                            <p className="text-off-white/70 text-sm md:text-base leading-relaxed">{project.context}</p>
                          </div>
                        )}
                      </div>
                      <div className="space-y-12 md:space-y-20">
                        {project.outcome && (
                          <div className="p-8 md:p-12 bg-teal/20 border border-gold/10 relative overflow-hidden group/outcome">
                            <div className="absolute top-0 left-0 w-1 md:w-2 h-full bg-red transform origin-bottom scale-y-100 group-hover/outcome:scale-y-110 transition-transform duration-700" />
                            <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-red mb-6">Strategic Outcome</h3>
                            <p className="text-off-white text-base md:text-xl font-bold tracking-tight leading-tight">{project.outcome}</p>
                          </div>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-16">
                          {project.toolkit?.map((group, gIdx) => (
                            <div key={gIdx} className="space-y-6">
                              <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-gold/40 border-b border-gold/10 pb-2">{group.group}</h4>
                              <ul className="flex flex-wrap gap-2 md:gap-3">
                                {group.tools.map((tool, tIdx) => (
                                  <li key={tIdx} className="px-3 py-1.5 bg-off-white/5 border border-off-white/10 text-[9px] md:text-[10px] font-bold text-off-white/70 uppercase tracking-widest hover:border-gold/40 transition-colors cursor-default">
                                    {tool}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Full Gallery */}
                    {project.images && project.images.length > 1 && (
                      <div className="space-y-8 md:space-y-12">
                        <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-gold/60 border-l-2 border-gold/20 pl-6">Technical Documentation</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                          {project.images.map((img, iIdx) => (
                            <div 
                              key={iIdx} 
                              className="aspect-square overflow-hidden cursor-pointer relative group/thumb border border-off-white/5"
                              onClick={() => setLightbox({ projectId: project.id, index: iIdx })}
                            >
                              <div className="absolute inset-0 bg-gold/30 opacity-0 group-hover/thumb:opacity-100 transition-opacity z-10 flex items-center justify-center">
                                <span className="text-[8px] font-bold uppercase tracking-widest text-charcoal bg-gold px-2 py-1">View</span>
                              </div>
                              <img 
                                src={img.src} 
                                alt={img.alt} 
                                loading="lazy"
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover grayscale group-hover/thumb:grayscale-0 transition-all duration-700"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Project Navigation */}
                    {filteredProjects.length > 1 && (
                      <div className="flex items-center gap-8 pt-8 border-t border-off-white/5">
                        <button 
                          onClick={() => navigateProject('prev')}
                          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.4em] text-gold/40 hover:text-gold transition-colors group/nav"
                        >
                          <ChevronLeft className="w-3 h-3 group-hover/nav:-translate-x-1 transition-transform" /> Previous
                        </button>
                        <button 
                          onClick={() => navigateProject('next')}
                          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.4em] text-gold/40 hover:text-gold transition-colors group/nav"
                        >
                          Next <ChevronRight className="w-3 h-3 group-hover/nav:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Projects;
