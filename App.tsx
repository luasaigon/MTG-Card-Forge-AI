
import React, { useState } from 'react';
import { generateMTGCard } from './services/geminiService';
import { CardState } from './types';
import MTGCard from './components/MTGCard';

const App: React.FC = () => {
  const [theme, setTheme] = useState('');
  const [state, setState] = useState<CardState>({
    data: null,
    imageUrl: null,
    loading: false,
    error: null,
  });

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!theme.trim()) return;

    setState({ ...state, loading: true, error: null });

    try {
      const result = await generateMTGCard(theme);
      setState({
        data: result.data,
        imageUrl: result.imageUrl,
        loading: false,
        error: null,
      });
    } catch (err: any) {
      console.error(err);
      setState({
        ...state,
        loading: false,
        error: "Failed to ignite the spark. Please check your prompt and try again.",
      });
    }
  };

  const loadingMessages = [
    "Channeling Aether...",
    "Consulting the Elder Dragons...",
    "Shuffling the Multiverse...",
    "Igniting the Spark...",
    "Summoning the Great Creator...",
    "Forging Artifacts in the Blind Eternities...",
  ];

  const [loadingMessageIdx, setLoadingMessageIdx] = useState(0);

  React.useEffect(() => {
    let interval: any;
    if (state.loading) {
      interval = setInterval(() => {
        setLoadingMessageIdx((prev) => (prev + 1) % loadingMessages.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [state.loading]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 md:p-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-mtg-title font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">
          MYTHIC FORGE
        </h1>
        <p className="text-slate-400 max-w-lg mx-auto text-lg italic">
          Forge unique cards from the multiverse using advanced AI alchemy.
        </p>
      </div>

      {/* Control Panel */}
      <div className="w-full max-w-2xl bg-slate-800/50 backdrop-blur-xl p-8 rounded-3xl border border-slate-700 shadow-2xl mb-12">
        <form onSubmit={handleGenerate} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="theme" className="text-sm font-semibold text-slate-300 uppercase tracking-widest ml-1">
              Enter Card Concept
            </label>
            <textarea
              id="theme"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="e.g. A Cyberpunk Dragon that steals artifacts, or A Gothic Vampire that feeds on memories..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all min-h-[100px] resize-none"
              disabled={state.loading}
            />
          </div>

          <button
            type="submit"
            disabled={state.loading || !theme.trim()}
            className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 disabled:from-slate-700 disabled:to-slate-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-amber-900/20 transform transition-all active:scale-95 disabled:cursor-not-allowed uppercase tracking-widest text-lg"
          >
            {state.loading ? 'Crafting...' : 'Forge New Card'}
          </button>
        </form>

        {state.error && (
          <div className="mt-4 p-4 bg-red-900/20 border border-red-900/50 rounded-lg text-red-200 text-center text-sm">
            {state.error}
          </div>
        )}
      </div>

      {/* Card Display Area */}
      <div className="w-full flex items-center justify-center min-h-[500px]">
        {state.loading ? (
          <div className="flex flex-col items-center gap-6">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-4 border-amber-500/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-t-amber-500 rounded-full animate-spin"></div>
            </div>
            <p className="text-xl font-mtg-title text-amber-200 animate-pulse">
              {loadingMessages[loadingMessageIdx]}
            </p>
          </div>
        ) : state.data && state.imageUrl ? (
          <div className="flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <MTGCard card={state.data} imageUrl={state.imageUrl} />
            
            <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700 max-w-xl text-center">
              <h3 className="text-amber-400 font-mtg-title text-xl mb-2">Designer Notes</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                This card was generated with a focus on "{theme}". The visual art was specifically crafted to match its {state.data.colorIdentity} identity and mechanics.
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center text-slate-600">
             <div className="w-32 h-44 border-2 border-dashed border-slate-700 rounded-xl mx-auto mb-4 opacity-30"></div>
             <p className="font-mtg-title uppercase tracking-widest">Awaiting Creation</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-24 pb-12 text-slate-500 text-xs text-center max-w-2xl px-4">
        <p className="mb-2">Powered by Gemini & Imagen 4</p>
        <p>NOT AN OFFICIAL MAGIC: THE GATHERING PRODUCT. ALL TRADEMARKS BELONG TO WIZARDS OF THE COAST. CREATED FOR ARTISTIC AND EXPLORATORY PURPOSES.</p>
      </footer>
    </div>
  );
};

export default App;
