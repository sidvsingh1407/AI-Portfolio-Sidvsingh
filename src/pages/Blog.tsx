
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Clock, Calendar, ChevronRight } from 'lucide-react';
import { contentData } from '../content';

const Blog: React.FC = () => {
  const blogs = contentData.blogs;

  return (
    <div className="bg-charcoal min-h-screen text-off-white pt-24 md:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-20 md:space-y-32">
          <header className="space-y-6 md:space-y-10 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9]">
              Insights<span className="text-gold">.</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-off-white/60 leading-relaxed lg:max-w-3xl">
              Strategic observations at the intersection of AI architecture, business logic, and human-centered systems.
            </p>
            <div className="w-16 md:w-24 h-1 bg-gold" />
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
            {blogs.map((post, idx) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col h-full bg-off-white/5 border border-off-white/10 hover:border-gold/30 transition-all duration-500 overflow-hidden shadow-2xl p-8 md:p-12"
              >
                <div className="flex flex-col flex-grow space-y-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 bg-gold/10 text-gold text-[9px] md:text-[10px] font-bold uppercase tracking-widest border border-gold/20">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-off-white/20">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" /> {post.date}
                      </span>
                    </div>
                  </div>

                  <h2 className="text-xl md:text-3xl font-bold tracking-tight group-hover:text-gold transition-colors duration-500 leading-tight">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p className="text-off-white/60 text-sm md:text-base leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  <Link 
                    to={`/blog/${post.slug}`}
                    className="mt-auto pt-8 flex items-center gap-3 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-gold group-hover:text-off-white transition-all"
                  >
                    Examine Intel <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
