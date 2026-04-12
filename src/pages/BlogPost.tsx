
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Markdown from 'react-markdown';
import { motion } from 'motion/react';
import { contentData as content } from '../content';
import { Calendar, Clock, ChevronLeft, Share2 } from 'lucide-react';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = content.blogs.find(b => b.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="bg-white min-h-screen text-charcoal">
      {/* Hero Header */}
      <header className="relative h-[60vh] min-h-[400px] bg-charcoal overflow-hidden">
        {post.image && (
          <img 
            src={post.image} 
            alt={post.title} 
            className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale"
            referrerPolicy="no-referrer"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-6 pb-20 w-full">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <Link 
                to="/blog"
                className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.4em] text-gold hover:text-off-white transition-colors"
              >
                <ChevronLeft className="w-3 h-3" /> Back to Insights
              </Link>
              
              <div className="space-y-4">
                <span className="px-3 py-1 bg-gold text-charcoal text-[10px] font-bold uppercase tracking-widest">
                  {post.category}
                </span>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-off-white leading-tight">
                  {post.title}
                </h1>
              </div>

              <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-off-white/60">
                <span className="flex items-center gap-2">
                  <Calendar className="w-3 h-3 text-gold" /> {post.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-gold" /> {post.readTime}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Main Content */}
          <div className="flex-1">
            <div className="markdown-body prose prose-lg prose-charcoal max-w-none">
              <Markdown>{post.content}</Markdown>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-64 space-y-12">
            <div className="p-8 bg-off-white border border-charcoal/5 space-y-6">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-red">Share Logic</h3>
              <div className="flex gap-4">
                <button className="p-3 bg-charcoal text-off-white hover:bg-red transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-red">Author</h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal rounded-none flex items-center justify-center text-off-white font-bold">
                  S.
                </div>
                <div>
                  <p className="text-sm font-bold">Siddharth V. Singh</p>
                  <p className="text-[10px] text-charcoal/40 uppercase tracking-widest">AI Strategist</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </article>

      {/* Footer CTA */}
      <section className="bg-charcoal py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto space-y-10">
          <h2 className="text-3xl md:text-4xl font-bold text-off-white tracking-tight">
            Interested in implementing <span className="text-gold italic font-serif">agentic systems</span>?
          </h2>
          <Link 
            to="/#contact"
            className="inline-block px-10 py-5 bg-red text-off-white font-bold uppercase tracking-widest text-sm hover:scale-105 transition-all"
          >
            Let's Collaborate
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
