
import React from 'react';
import content from '../content.json';

const About: React.FC = () => {
  const { aboutPage } = content;

  return (
    <div className="flex flex-col">
      {/* Header Bio - White Background */}
      <section className="bg-white py-32 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-16">
          <div className="w-full md:w-1/3">
            <div className="relative group">
              <div className="absolute -inset-4 bg-red/10 rounded-none blur-xl group-hover:bg-red/20 transition-all duration-700" />
              <img 
                src={aboutPage.avatar.src} 
                alt={aboutPage.avatar.alt} 
                className="relative w-full h-auto rounded-none object-cover border border-charcoal/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <p className="text-[10px] text-charcoal/40 mt-6 text-center uppercase tracking-[0.4em] font-bold">{aboutPage.avatar.hint}</p>
          </div>
          <div className="flex-1 space-y-10">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-charcoal leading-tight">
              I build systems that create <span className="text-red italic font-serif">clarity</span>.
            </h1>
            <div className="space-y-8 border-l-2 border-red/20 pl-10">
              <p className="text-2xl text-charcoal/80 leading-relaxed font-medium">
                {aboutPage.bio}
              </p>
              <p className="text-xl text-charcoal/50 leading-relaxed italic font-serif">
                {aboutPage.passion}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline - Teal Background */}
      <section className="bg-teal py-32 px-4 text-off-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-gold mb-6">The Evolution</h2>
            <p className="text-4xl md:text-5xl font-bold">A timeline of strategic growth.</p>
          </div>
          <div className="space-y-16 relative before:absolute before:left-0 md:before:left-1/2 before:top-0 before:bottom-0 before:w-px before:bg-off-white/10">
            {aboutPage.journey.map((item, index) => (
              <div key={index} className={`flex flex-col md:flex-row items-center gap-12 relative ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-3 h-3 rounded-none bg-gold border-4 border-teal" />
                <div className="w-full md:w-[45%] p-10 bg-off-white/5 border border-off-white/10 hover:border-gold/30 transition-all group">
                  <span className="text-gold text-xs font-bold mb-4 block uppercase tracking-widest">{item.year}</span>
                  <h3 className="text-2xl font-bold mb-2 text-off-white group-hover:text-gold transition-colors">{item.title}</h3>
                  <h4 className="text-sm text-off-white/40 mb-6 font-medium">{item.organization}</h4>
                  <p className="text-off-white/60 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Competencies - White Background */}
      <section className="bg-white py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-red mb-6">Core Competencies</h2>
            <p className="text-4xl font-bold text-charcoal">Strategic blending of business and tech.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {aboutPage.competencies.map((c, i) => (
              <div key={i} className="space-y-6 p-10 bg-off-white border border-charcoal/5 shadow-sm hover:shadow-xl transition-all relative group">
                <div className="absolute top-0 left-0 w-full h-1 bg-red scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <h3 className="text-xl font-bold text-charcoal">{c.title}</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Driven by a Mission - Charcoal Background */}
      <section className="bg-charcoal py-32 px-4 text-off-white">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-gold">The Mission</h2>
          <div className="text-off-white/70 text-2xl leading-relaxed space-y-8 text-left whitespace-pre-line font-light">
            {aboutPage.mission}
          </div>
        </div>
      </section>

      {/* Credentials & Recognition - White Background */}
      <section className="bg-white py-32 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24">
          <div className="space-y-12">
            <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-red border-b border-red/10 pb-6">Global Recognition</h2>
            <div className="space-y-10">
              {aboutPage.recognition.map((r, i) => (
                <div key={i} className="flex items-start gap-6 group">
                  <div className="w-2 h-2 rounded-none bg-red mt-2 shrink-0 group-hover:scale-150 transition-transform" />
                  <div>
                    <h3 className="text-xl font-bold text-charcoal mb-1">{r.title}</h3>
                    <p className="text-sm text-charcoal/40 font-medium">{r.organization} • {r.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-12">
            <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-red border-b border-red/10 pb-6">Certifications & Growth</h2>
            <ul className="space-y-6">
              {aboutPage.certifications.map((c, i) => (
                <li key={i} className="flex items-center gap-4 text-charcoal/70 text-sm group">
                  <span className="w-1.5 h-1.5 rounded-none bg-charcoal/20 group-hover:bg-red shrink-0 transition-colors" />
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
