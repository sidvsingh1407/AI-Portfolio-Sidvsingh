
import React from 'react';
import { contentData as content } from '../content';

const About: React.FC = () => {
  const { aboutPage } = content;

  return (
    <div className="flex flex-col">
      {/* Header Bio - White Background */}
      <section className="bg-white py-20 md:py-40 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-24">
          <div className="w-full max-w-sm lg:w-1/3 shrink-0">
            <div className="relative group">
              <div className="absolute -inset-4 bg-red/10 rounded-none blur-xl group-hover:bg-red/20 transition-all duration-700" />
              <img 
                src={aboutPage.avatar.src} 
                alt={aboutPage.avatar.alt} 
                referrerPolicy="no-referrer"
                className="relative w-full aspect-[4/5] object-cover border border-charcoal/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <p className="text-[10px] text-charcoal/40 mt-8 text-center uppercase tracking-[0.4em] font-bold">{aboutPage.avatar.hint}</p>
          </div>
          <div className="flex-1 space-y-10 md:space-y-16 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-charcoal leading-[0.95]">
              I build systems that create <span className="text-red italic font-serif">clarity</span>.
            </h1>
            <div className="space-y-8 lg:border-l-2 lg:border-red/20 lg:pl-12 max-w-3xl mx-auto lg:mx-0">
              <p className="text-lg md:text-xl lg:text-2xl text-charcoal/80 leading-snug font-medium">
                {aboutPage.bio}
              </p>
              <p className="text-base md:text-lg text-charcoal/50 leading-relaxed italic font-serif">
                {aboutPage.passion}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline - Teal Background */}
      <section className="bg-teal py-20 md:py-40 px-6 md:px-12 text-off-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 md:mb-32">
            <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] text-gold mb-6">The Evolution</h2>
            <p className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight">A timeline of strategic growth.</p>
          </div>
          <div className="space-y-12 md:space-y-24 relative before:absolute before:left-4 md:before:left-1/2 before:top-0 before:bottom-0 before:w-px before:bg-off-white/10">
            {aboutPage.journey.map((item, index) => (
              <div key={index} className={`flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 relative ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="absolute left-4 md:left-1/2 top-4 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-2 h-2 md:w-3 md:h-3 bg-gold border-[3px] md:border-4 border-teal z-10" />
                <div className={`w-full md:w-[45%] pl-12 md:pl-0 p-8 md:p-12 bg-off-white/5 border border-off-white/10 hover:border-gold/30 transition-all group lg:min-h-[280px] flex flex-col justify-center`}>
                  <span className="text-gold text-[10px] md:text-xs font-bold mb-4 block uppercase tracking-widest">{item.year}</span>
                  <h3 className="text-lg md:text-2xl font-bold mb-2 text-off-white group-hover:text-gold transition-colors leading-tight">{item.title}</h3>
                  <h4 className="text-[10px] md:text-sm text-off-white/40 mb-6 font-medium">{item.organization}</h4>
                  <p className="text-off-white/60 text-xs leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Competencies - White Background */}
      <section className="bg-white py-20 md:py-40 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 md:mb-32 max-w-3xl">
            <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] text-red mb-6">Core Competencies</h2>
            <p className="text-2xl sm:text-3xl md:text-5xl font-bold text-charcoal tracking-tight">Strategic blending of business and tech.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {aboutPage.competencies.map((c, i) => (
              <div key={i} className="space-y-6 p-8 md:p-12 bg-off-white border border-charcoal/5 shadow-sm hover:shadow-2xl transition-all relative group">
                <div className="absolute top-0 left-0 w-full h-1 bg-red scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <span className="text-red/20 font-serif italic text-3xl block mb-4">0{i + 1}</span>
                <h3 className="text-xl font-bold text-charcoal group-hover:text-red transition-colors">{c.title}</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Driven by a Mission - Charcoal Background */}
      <section className="bg-charcoal py-20 md:py-40 px-6 md:px-12 text-off-white overflow-hidden">
        <div className="max-w-5xl mx-auto relative">
          <div className="absolute -top-20 -left-20 text-[20vw] font-bold text-off-white/[0.02] pointer-events-none select-none uppercase tracking-tighter">Mission</div>
          <div className="relative z-10 space-y-12 md:space-y-20">
            <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] text-gold">The Perspective</h2>
            <div className="text-off-white/80 text-lg sm:text-xl md:text-2xl leading-snug space-y-10 font-light tracking-tight">
              {aboutPage.mission.split('\n').map((line, i) => (
                <p key={i} className="max-w-4xl">{line}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Credentials & Recognition - White Background */}
      <section className="bg-white py-20 md:py-40 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-32">
          <div className="lg:col-span-7 space-y-12 md:space-y-20">
            <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] text-red border-b border-red/10 pb-8 flex items-center justify-between">
              Global Recognition
              <span className="w-12 h-px bg-red/20"></span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
              {aboutPage.recognition.map((r, i) => (
                <div key={i} className="flex flex-col gap-4 group">
                  <span className="w-6 h-px bg-red group-hover:w-12 transition-all duration-500"></span>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-charcoal mb-2 leading-tight">{r.title}</h3>
                    <p className="text-[10px] md:text-xs text-charcoal/40 font-bold uppercase tracking-widest">{r.organization} • {r.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-12 md:space-y-20">
            <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] text-red border-b border-red/10 pb-8 flex items-center justify-between">
              Certifications & Growth
              <span className="w-12 h-px bg-red/20"></span>
            </h2>
            <ul className="grid grid-cols-1 gap-6">
              {aboutPage.certifications.map((c, i) => (
                <li key={i} className="flex items-center gap-6 text-charcoal/70 text-sm group p-4 hover:bg-off-white transition-colors border-l border-transparent hover:border-red">
                  <span className="w-2 h-2 bg-charcoal/10 group-hover:bg-red shrink-0 transition-colors" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
