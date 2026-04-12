
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { contentData as content } from '../content';
import { Calendar, Clock, ChevronRight } from 'lucide-react';

const Blog: React.FC = () => {
  const { blogs } = content;

  return (
    <div className="bg-charcoal min-h-screen text-off-white">
      <div className="max-w-7xl mx-auto px-6 py-32">
        <header className="mb-32 space-y-8 max-w-3xl">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Insights<span className="text-gold">.</span>
          </h1>
          <p className="text-xl md:text-2xl text-off-white/60 leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            Strategic thoughts on AI engineering, business analysis, and the future of automated workflows.
          </p>
          <div className="w-24 h-1 bg-gold animate-in fade-in zoom-in duration-1000 delay-400" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {blogs.map((post, idx) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-off-white/5 border border-off-white/10 hover:border-gold/30 transition-all duration-500 overflow-hidden flex flex-col"
            >
              <Link to={`/blog/${post.slug}`} className="block aspect-[16/9] overflow-hidden relative">
                <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                {post.image ? (
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full bg-teal/20 flex items-center justify-center">
                    <span className="text-gold/20 font-serif italic text-4xl">S.</span>
                  </div>
                )}
                <div className="absolute top-6 left-6 z-20">
                  <span className="px-3 py-1 bg-gold text-charcoal text-[10px] font-bold uppercase tracking-widest">
                    {post.category}
                  </span>
                </div>
              </Link>

              <div className="p-10 flex-1 flex flex-col">
                <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gold/60 mb-6">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" /> {post.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </span>
                </div>

                <h2 className="text-3xl font-bold tracking-tight mb-6 group-hover:text-gold transition-colors duration-500">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                <p className="text-off-white/60 text-sm leading-relaxed mb-10 line-clamp-3">
                  {post.excerpt}
                </p>

                <Link 
                  to={`/blog/${post.slug}`}
                  className="mt-auto flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-gold hover:text-off-white transition-all group/btn"
                >
                  Read Article
                  <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
