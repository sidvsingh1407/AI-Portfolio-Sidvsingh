
import React, { useState } from 'react';
import { improvePrompt, ImprovedPromptResponse } from '../services/gemini';

const PromptImprover: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ImprovedPromptResponse | null>(null);
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
    <section className="py-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl border border-primary/10 p-8 md:p-12 shadow-sm">
          <h2 className="text-2xl font-bold mb-2 text-primary">AI Prompt Improver</h2>
          <p className="text-ink/60 mb-8 text-sm">Test my prompt engineering logic. Enter a basic prompt below and let the agent refine it.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Write a blog post about AI."
              className="w-full h-32 bg-background border border-primary/10 rounded-2xl p-4 text-ink focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
            />
            <button
              type="submit"
              disabled={loading || !prompt}
              className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all ${
                loading ? 'bg-primary/20 text-primary/40 cursor-not-allowed' : 'bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/10'
              }`}
            >
              {loading ? 'Optimizing...' : 'Improve Prompt'}
            </button>
          </form>

          {error && (
            <div className="mt-8 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm">
              {error}
            </div>
          )}

          {result && (
            <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary/40">Original Prompt</h4>
                  <div className="p-6 bg-background rounded-2xl border border-primary/5 text-ink/60 text-sm leading-relaxed">
                    {prompt}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary">Improved Prompt</h4>
                  <div className="p-6 bg-accent/10 rounded-2xl border border-accent/30 text-primary text-sm leading-relaxed shadow-sm">
                    {result.improvedPrompt}
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-8 border-t border-primary/5">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary/40">Engineering Rationale</h4>
                <p className="text-ink/70 text-sm leading-relaxed">
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
