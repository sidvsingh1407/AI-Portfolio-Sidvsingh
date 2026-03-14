
import React, { useState } from 'react';
import { improvePrompt, ImprovedPromptResult } from '../services/gemini';

const PromptImprover: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ImprovedPromptResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await improvePrompt(prompt);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Failed to improve prompt. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="bg-off-white rounded-none border border-charcoal/5 p-8 md:p-16 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6">
            <div className="flex items-center gap-2 text-red animate-pulse">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              <span className="text-[10px] font-bold uppercase tracking-widest">Fast AI Active</span>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-charcoal tracking-tighter">AI Prompt <span className="text-red italic font-serif">Improver</span></h2>
          <p className="text-charcoal/60 mb-12 text-sm leading-relaxed max-w-xl">
            Experience the speed of low-latency engineering. Enter a basic prompt and watch the agent refine it in real-time using <span className="text-red font-bold">Fast AI Responses</span>.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Write a blog post about AI."
                className="w-full h-40 bg-white border border-charcoal/10 rounded-none p-6 text-charcoal focus:border-red outline-none transition-all resize-none text-sm"
              />
              <div className="absolute bottom-4 right-4 text-[10px] font-bold text-charcoal/20 uppercase tracking-widest">
                Input Buffer
              </div>
            </div>
            <button
              type="submit"
              disabled={loading || !prompt}
              className={`w-full py-5 rounded-none font-bold uppercase tracking-[0.3em] text-xs transition-all glitch-hover ${
                loading ? 'bg-charcoal/10 text-charcoal/40 cursor-not-allowed' : 'bg-red text-off-white shadow-2xl'
              }`}
            >
              {loading ? 'Processing...' : 'Optimize Prompt'}
            </button>
          </form>

          {error && (
            <div className="mt-10 p-6 bg-red/5 border border-red/20 rounded-none text-red text-xs font-bold uppercase tracking-widest">
              {error}
            </div>
          )}

          {result && (
            <div className="mt-20 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-charcoal/40">Raw Input</h4>
                  <div className="p-8 bg-white border border-charcoal/5 text-charcoal/60 text-sm leading-relaxed italic">
                    "{prompt}"
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-red">Refined Output</h4>
                  <div className="p-8 bg-teal/5 border border-teal/20 text-charcoal text-sm font-medium leading-relaxed shadow-sm relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-teal" />
                    {result.improvedPrompt}
                  </div>
                </div>
              </div>

              <div className="space-y-6 pt-12 border-t border-charcoal/5">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-charcoal/40">Strategic Rationale</h4>
                <p className="text-charcoal/70 text-sm leading-relaxed border-l-2 border-gold/30 pl-8">
                  {result.explanation}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PromptImprover;
