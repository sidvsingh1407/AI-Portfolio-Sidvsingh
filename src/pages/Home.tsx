
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import FloatingParticles from '../components/FloatingParticles';
import { contentData as content } from '../content';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

const Home: React.FC = () => {
  const { projects } = content;
  const featuredProjects = projects.filter(p => p.category === 'systems');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { placeholder, value } = e.target;
    const field = placeholder.toLowerCase() as keyof typeof formData;
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFirestoreError = (error: unknown, operationType: OperationType, path: string | null) => {
    // We don't have access to auth here easily without importing it, but we can get it from the db app
    const auth = (db as any).app.auth?.(); // This is a bit hacky, let's just import it if needed
    // Actually, let's just use a simpler version or import auth
    const errInfo: FirestoreErrorInfo = {
      error: error instanceof Error ? error.message : String(error),
      authInfo: {
        userId: undefined, // Simplified for now
        email: undefined,
        emailVerified: undefined,
        isAnonymous: undefined,
        tenantId: undefined,
        providerInfo: []
      },
      operationType,
      path
    };
    console.error('Firestore Error: ', JSON.stringify(errInfo));
    throw new Error(JSON.stringify(errInfo));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const path = 'messages';
      await addDoc(collection(db, path), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        createdAt: serverTimestamp()
      });
      
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err: any) {
      console.error("Submission error:", err);
      setError('Something went wrong. Please try again.');
      // If it's a permission error, it will be logged by the rules engine if we use the helper
      // but here we are catching it.
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-12 relative overflow-hidden bg-teal text-off-white py-24 md:py-32">
        <div className="absolute inset-0 cinematic-gradient pointer-events-none" />
        <div className="shiny-aura" />
        <FloatingParticles 
          particleCount={600} 
          speed={0.4} 
          opacity={0.6} 
          minSize={1.5} 
          maxSize={4.5} 
        />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-gold font-bold uppercase tracking-[0.5em] text-xs md:text-sm mb-8 md:mb-12 block text-glow-gold"
          >
            Siddharth Vikram Singh
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] font-bold tracking-tight mb-10 md:mb-16 leading-[0.9] text-off-white"
          >
            AI <span className="shimmer-text italic font-serif px-2 md:px-4">Enthusiast</span> <br className="hidden sm:block"/> 
            <span className="text-xl sm:text-3xl md:text-5xl lg:text-6xl block mt-4 md:mt-8 opacity-80 font-medium tracking-normal text-gold/90">for Modern AI Business Problems.</span>
          </motion.h1>
          
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-24 md:w-40 h-1.5 bg-gold mx-auto mb-12 md:mb-20 shadow-[0_0_15px_rgba(212,183,106,0.5)] origin-center" 
          />
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-2xl lg:text-3xl text-off-white/90 max-w-4xl mx-auto leading-tight mb-12 md:mb-20 font-medium tracking-tight px-4 md:px-0"
          >
            Investigating the operational consequences and systems-level behavior of modern AI to deconstruct the friction of real-world deployment.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8"
          >
            <Link to="/systems" className="w-full sm:w-auto px-10 md:px-16 py-5 md:py-7 bg-red text-off-white font-bold rounded-none hover:scale-110 transition-all shadow-[0_20px_50px_rgba(178,58,36,0.3)] glitch-hover uppercase tracking-widest text-xs md:text-sm">
              Explore Systems
            </Link>
            <Link to="/prototypes" className="w-full sm:w-auto px-10 md:px-16 py-5 md:py-7 bg-transparent text-off-white border-2 border-off-white/40 font-bold rounded-none hover:bg-off-white/10 hover:border-off-white transition-all uppercase tracking-widest text-xs md:text-sm text-center">
              Prototypes
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Project Highlights Section - Projects Rhythm (Charcoal) */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-charcoal text-off-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-24 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-gold mb-4">Systems</h2>
              <p className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight">Operational Analysis in Action.</p>
            </div>
            <Link to="/systems" className="text-gold font-bold hover:text-red transition-colors flex items-center gap-2 uppercase tracking-widest text-[9px] md:text-[10px] group">
              View all systems 
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            {featuredProjects.map((project, idx) => (
              <Link key={project.id} to={`/systems#${project.id}`} className="group cursor-pointer block p-8 md:p-14 bg-off-white/5 border border-off-white/10 hover:border-gold/30 transition-all duration-500 relative overflow-hidden lg:min-h-[450px] flex flex-col">
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </div>
                <div className="mb-8">
                  <span className="text-[10px] font-bold text-gold/40 block mb-2">0{idx + 1}</span>
                  <h3 className="text-xl md:text-3xl font-bold text-off-white group-hover:text-gold transition-colors leading-tight">{project.title}</h3>
                </div>
                <div className="space-y-8 border-l border-gold/20 pl-8 flex-grow">
                  <div className="space-y-3">
                    <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] font-bold text-gold/60">Investigative Problem</span>
                    <p className="text-off-white/70 text-xs md:text-sm leading-relaxed line-clamp-3 md:line-clamp-4">{project.problem}</p>
                  </div>
                  <div className="space-y-3">
                    <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] font-bold text-gold/60">Analytical Approach</span>
                    <p className="text-off-white/70 text-xs md:text-sm leading-relaxed line-clamp-3 md:line-clamp-4">{project.approach}</p>
                  </div>
                  <div className="pt-4 border-t border-off-white/5 mt-auto">
                    <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] font-bold text-gold/60 block mb-2">Result</span>
                    <p className="text-gold text-sm md:text-base font-bold tracking-wide">{project.outcome}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Prompt Engineering Showcase Removed */}

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-40 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-10 tracking-tighter text-charcoal leading-none">
            Let's build something <br className="hidden sm:block"/><span className="text-red italic font-serif">intelligent</span>.
          </h2>
          <p className="text-base md:text-lg text-charcoal/60 mb-12 md:mb-20 leading-relaxed max-w-2xl mx-auto">
            Whether you need a systems audit or are exploring operational friction in AI deployment, I'm here to analyze and deconstruct the logic.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-12 mb-16 md:mb-24 text-[10px] md:text-xs font-bold uppercase tracking-widest">
            <a href="mailto:vikramsiddharth14@gmail.com" className="text-charcoal hover:text-red transition-colors flex items-center justify-center gap-3 py-4 border-b border-charcoal/5 sm:border-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              vikramsiddharth14@gmail.com
            </a>
          </div>
          
          <div className="relative min-h-[400px]">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="contact-form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onSubmit={handleSubmit} 
                  className="space-y-6 text-left"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input 
                      type="text" 
                      placeholder="Name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-off-white border border-charcoal/10 rounded-none p-5 text-charcoal focus:border-red outline-none transition-all text-sm" 
                    />
                    <input 
                      type="email" 
                      placeholder="Email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-off-white border border-charcoal/10 rounded-none p-5 text-charcoal focus:border-red outline-none transition-all text-sm" 
                    />
                  </div>
                  <textarea 
                    placeholder="Message" 
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full h-40 bg-off-white border border-charcoal/10 rounded-none p-5 text-charcoal focus:border-red outline-none resize-none transition-all text-sm"
                  ></textarea>
                  
                  {error && (
                    <p className="text-red text-xs font-bold uppercase tracking-widest">{error}</p>
                  )}

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`w-full py-5 font-bold uppercase tracking-[0.3em] text-xs rounded-none transition-all shadow-2xl glitch-hover ${
                      isSubmitting ? 'bg-charcoal/20 text-charcoal/40 cursor-not-allowed' : 'bg-red text-off-white hover:scale-[1.02]'
                    }`}
                  >
                    {isSubmitting ? 'Architecting Message...' : 'Send Message'}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-teal/5 border border-teal/20 p-16 text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-teal text-off-white rounded-full flex items-center justify-center mx-auto mb-8">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <h3 className="text-3xl font-bold text-charcoal tracking-tighter">Transmission Successful.</h3>
                  <p className="text-charcoal/60 text-sm max-w-md mx-auto leading-relaxed">
                    Your message has been received. I'll review the logic and get back to you within 24 hours.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-red font-bold uppercase tracking-widest text-[10px] hover:underline pt-4"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
