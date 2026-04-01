
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import PromptImprover from '../components/PromptImprover';
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
  const featuredProjects = projects.filter(p => p.category === 'agentic-systems');

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
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden bg-teal text-off-white">
        <div className="absolute inset-0 cinematic-gradient pointer-events-none" />
        <FloatingParticles />
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
              <Link key={project.id} to={`/agentic-systems#${project.id}`} className="group cursor-pointer block p-12 bg-off-white/5 border border-off-white/10 hover:border-gold/30 transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </div>
                <h3 className="text-3xl font-bold mb-8 text-off-white group-hover:text-gold transition-colors">{project.title}</h3>
                <div className="space-y-6 border-l border-gold/20 pl-8">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold/60">Problem</span>
                    <p className="text-off-white/70 text-sm leading-relaxed line-clamp-3">{project.problem}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold/60">Solution</span>
                    <p className="text-off-white/70 text-sm leading-relaxed line-clamp-3">{project.approach}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold/60">Result</span>
                    <p className="text-gold text-sm font-bold tracking-wide">{project.outcome}</p>
                  </div>
                </div>
              </Link>
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
      <section id="contact" className="py-32 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8 tracking-tighter text-charcoal">Let's build something <span className="text-red italic font-serif">intelligent</span>.</h2>
          <p className="text-charcoal/60 mb-8 leading-relaxed">Whether you need a custom automation or are exploring AI possibilities, I'm here to translate your vision into code.</p>
          
          <div className="flex flex-col md:flex-row justify-center gap-8 mb-16 text-sm font-bold uppercase tracking-widest">
            <a href="mailto:vikramsiddharth14@gmail.com" className="text-charcoal hover:text-red transition-colors flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
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
