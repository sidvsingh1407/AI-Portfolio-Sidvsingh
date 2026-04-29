
import React, { useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import mermaid from 'mermaid';
import { motion } from 'motion/react';
import { contentData as content } from '../content';
import { Calendar, Clock, ChevronLeft, Share2 } from 'lucide-react';

// Initialize Mermaid
mermaid.initialize({
  startOnLoad: true,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'Inter, system-ui, sans-serif',
  themeVariables: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: '20px',
    nodePadding: 45,
    mainBkg: '#1a1a1a',
    nodeBorder: '#ffcc00',
    clusterBkg: '#1a1a1a',
    clusterBorder: '#333',
    lineColor: '#ffcc00',
    edgeLabelBackground: '#1a1a1a',
    tertiaryColor: '#1a1a1a',
    primaryColor: '#ffcc00',
    primaryTextColor: '#fff',
    secondaryColor: '#cc3300',
    secondaryTextColor: '#fff',
  },
  flowchart: {
    htmlLabels: true,
    curve: 'basis',
    nodeSpacing: 120,
    rankSpacing: 140,
    padding: 40,
    useMaxWidth: false,
  },
});

const MermaidChart: React.FC<{ chart: string }> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderChart = async () => {
      if (containerRef.current) {
        try {
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
          const cleanedChart = chart.trim();
          const { svg } = await mermaid.render(id, cleanedChart);
          if (containerRef.current) {
            containerRef.current.innerHTML = svg;
            const svgElement = containerRef.current.querySelector('svg');
            if (svgElement) {
              svgElement.removeAttribute('width');
              svgElement.removeAttribute('height');
              
              svgElement.style.width = '100%';
              svgElement.style.minWidth = '800px';
              svgElement.style.height = 'auto';
              svgElement.style.maxWidth = '1200px';
              svgElement.style.margin = '0 auto';
              svgElement.style.display = 'block';
              svgElement.style.overflow = 'visible';
              
              const texts = svgElement.querySelectorAll('text, tspan, div, span');
              texts.forEach((t: any) => {
                t.style.fill = '#ffffff';
                t.style.color = '#ffffff';
                t.style.fontWeight = '600';
                t.style.fontSize = '18px';
              });

              const nodes = svgElement.querySelectorAll('.node rect, .node circle, .node polygon, .node path');
              nodes.forEach((n: any) => {
                n.style.stroke = '#ffcc00';
                n.style.strokeWidth = '3px';
                n.style.fill = '#111111';
              });

              const edges = svgElement.querySelectorAll('.edgePath path');
              edges.forEach((e: any) => {
                e.style.stroke = '#ffcc00';
                e.style.strokeWidth = '2.5px';
              });

              const markers = svgElement.querySelectorAll('marker path');
              markers.forEach((m: any) => {
                m.style.fill = '#ffcc00';
              });
            }
          }
        } catch (err) {
          console.error('Mermaid render error:', err);
        }
      }
    };

    const timer = setTimeout(renderChart, 150);
    return () => clearTimeout(timer);
  }, [chart]);

  return (
    <div className="my-24 bg-teal/5 border-y border-gold/10 relative group/mermaid overflow-x-auto overflow-y-visible -mx-6 md:-mx-24 lg:-mx-40">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-20 flex flex-col gap-12 items-center min-w-[900px]">
        <div className="w-full flex items-center justify-between border-b border-gold/10 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-red rounded-none animate-pulse" />
            <span className="text-sm font-bold uppercase tracking-[0.4em] text-gold">Architecture Visualization</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-off-white/20">System Failure Mapping</span>
        </div>
        <div ref={containerRef} className="w-full flex justify-center mermaid-render-container overflow-visible" />
        <div className="w-full pt-6 border-t border-gold/5 italic text-xs text-off-white/30 text-center tracking-widest uppercase">
          Mapping probabilistic system failure patterns (2024-2026 Archive)
        </div>
      </div>
    </div>
  );
};

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = content.blogs.find(b => b.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="bg-charcoal min-h-screen text-off-white pt-24 md:pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            to="/blog"
            className="mb-12 flex items-center gap-3 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-off-white/40 hover:text-gold transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Insights
          </Link>

          <header className="mb-12 md:mb-20 space-y-8 md:space-y-12">
            <div className="flex flex-wrap items-center gap-6">
              <span className="px-3 py-1 bg-gold text-charcoal text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
                {post.category}
              </span>
              <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-off-white/40">
                <span className="flex items-center gap-2 italic">
                  <Calendar className="w-4 h-4 text-gold" /> {post.date}
                </span>
                <span className="flex items-center gap-2 italic">
                  <Clock className="w-4 h-4 text-gold" /> {post.readTime}
                </span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter leading-[0.95] text-white">
              {post.title}
            </h1>
          </header>

          <div className="prose prose-invert prose-gold max-w-none 
            prose-headings:tracking-tighter prose-headings:font-bold 
            prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:border-l-4 prose-h2:border-gold prose-h2:pl-6 prose-h2:my-12
            prose-h3:text-xl md:prose-h3:text-2xl prose-h3:text-gold prose-h3:mt-16
            prose-p:text-base md:prose-p:text-lg prose-p:leading-relaxed prose-p:text-off-white/80
            prose-li:text-base md:prose-li:text-lg prose-li:text-off-white/70
            prose-strong:text-gold prose-strong:font-bold
            prose-code:text-gold prose-code:bg-off-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-sm prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-off-white/5 prose-pre:border prose-pre:border-off-white/10 prose-pre:p-8 md:prose-pre:p-12 prose-pre:rounded-none
            prose-blockquote:border-red prose-blockquote:bg-red/5 prose-blockquote:py-2 prose-blockquote:px-8 prose-blockquote:italic prose-blockquote:font-serif"
          >
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  const isMermaid = match && match[1] === 'mermaid';
                  
                  if (isMermaid) {
                    return <MermaidChart chart={String(children).replace(/\n$/, '')} />;
                  }
                  
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                }
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          <footer className="mt-20 md:mt-32 pt-12 border-t border-off-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-none bg-red/10 flex items-center justify-center border border-red/20 font-serif italic text-xl text-red">S</div>
              <div>
                <p className="text-sm font-bold text-off-white tracking-widest uppercase">Siddharth Vikram Singh</p>
                <p className="text-xs text-off-white/40">AI Strategist & Architect</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: post.title,
                      text: post.excerpt,
                      url: window.location.href,
                    }).catch(console.error);
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 bg-off-white/5 border border-off-white/10 text-[10px] font-bold uppercase tracking-widest hover:border-gold/50 transition-colors"
              >
                <Share2 className="w-3 h-3" /> Share Insights
              </button>
              <a 
                href={`mailto:vikramsiddharth14@gmail.com?subject=Discussing Strategy: ${post.title}`}
                className="flex items-center gap-2 px-4 py-2 bg-red text-off-white text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
              >
                Discuss Strategy
              </a>
            </div>
          </footer>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPost;
