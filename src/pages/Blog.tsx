
import React from 'react';

const Blog: React.FC = () => {
  return (
    <div className="bg-charcoal min-h-screen text-off-white flex items-center justify-center">
      <div className="text-center space-y-8">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter animate-in fade-in slide-in-from-bottom-4 duration-1000">
          COMING SOON<span className="text-gold">.</span>
        </h1>
        <p className="text-xl md:text-2xl text-off-white/60 leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
          Strategic thoughts on AI engineering and the future of automated workflows are on their way.
        </p>
        <div className="w-24 h-1 bg-gold mx-auto animate-in fade-in zoom-in duration-1000 delay-400" />
      </div>
    </div>
  );
};

export default Blog;
