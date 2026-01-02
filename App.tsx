
import React, { useState, useMemo } from 'react';
import { Step, AppState, ValueBlock } from './types.ts';
import Layout from './components/Layout.tsx';
import VerticalScale from './components/VerticalScale.tsx';
import { calculateIntrinsicValue, getAdvice } from './services/anchorEngine.ts';
import { 
  ArrowRight, 
  Trash2, 
  Plus, 
  RefreshCcw, 
  Ship, 
  Wind,
  ShieldCheck,
  Zap,
  Star,
  Anchor,
  Edit3
} from 'lucide-react';

const PRESET_LABELS = ['Basic Utility', 'Convenience', 'Brand/Style', 'Longevity/Warranty'];

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    step: Step.STICKER_SHOCK,
    anchorValue: 0,
    components: []
  });

  const [anchorInput, setAnchorInput] = useState<string>('');
  const [liftingActive, setLiftingActive] = useState(false);
  
  const [customName, setCustomName] = useState('');
  const [customValue, setCustomValue] = useState('');

  const reset = () => {
    setState({
      step: Step.STICKER_SHOCK,
      anchorValue: 0,
      components: []
    });
    setAnchorInput('');
    setLiftingActive(false);
    setCustomName('');
    setCustomValue('');
  };

  const handleSetAnchor = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(anchorInput);
    if (isNaN(val) || val <= 0) return;
    setState(prev => ({ ...prev, anchorValue: val, step: Step.PULLING_ANCHOR }));
  };

  const liftAnchor = () => {
    setLiftingActive(true);
    setTimeout(() => {
      setState(prev => ({ ...prev, step: Step.COMPONENT_BUILD }));
      setLiftingActive(false);
    }, 1500);
  };

  const addComponent = (label: string, value: number) => {
    const newComp: ValueBlock = {
      id: Math.random().toString(36).substr(2, 9),
      label,
      value
    };
    setState(prev => ({
      ...prev,
      components: [...prev.components, newComp]
    }));
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(customValue);
    if (customName.trim() && !isNaN(val)) {
      addComponent(customName.trim(), val);
      setCustomName('');
      setCustomValue('');
    }
  };

  const removeComponent = (id: string) => {
    setState(prev => ({
      ...prev,
      components: prev.components.filter(c => c.id !== id)
    }));
  };

  const updateComponentValue = (id: string, newValue: string) => {
    const val = parseFloat(newValue) || 0;
    setState(prev => ({
      ...prev,
      components: prev.components.map(c => c.id === id ? { ...c, value: val } : c)
    }));
  };

  const totalValue = useMemo(() => calculateIntrinsicValue(state.components), [state.components]);

  return (
    <Layout step={state.step}>
      <div className="w-full max-w-2xl">
        
        {state.step === Step.STICKER_SHOCK && (
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-bold leading-tight">The Sticker Shock</h2>
              <p className="text-slate-400 text-lg max-w-md mx-auto">
                What is the "Original Price" or "First Offer" you were presented with? Don't let it sit heavy.
              </p>
            </div>
            <form onSubmit={handleSetAnchor} className="relative max-w-sm mx-auto">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl text-blue-400 font-bold">$</div>
              <input 
                type="number" 
                value={anchorInput}
                onChange={(e) => setAnchorInput(e.target.value)}
                placeholder="0.00"
                autoFocus
                className="w-full bg-slate-800/50 border-2 border-slate-700 rounded-2xl py-6 pl-12 pr-6 text-3xl font-bold focus:border-blue-500 focus:outline-none transition-all shadow-2xl"
              />
              <button 
                type="submit"
                className="mt-6 w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 group"
              >
                Drop the Anchor
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        )}

        {state.step === Step.PULLING_ANCHOR && (
          <div className="text-center space-y-12">
            <div className="relative overflow-hidden h-48 flex items-center justify-center">
              <div className={`transition-all duration-1000 transform ${liftingActive ? '-translate-y-[200%] opacity-0' : 'translate-y-0 opacity-100'}`}>
                <div className="text-slate-500 uppercase tracking-widest text-sm mb-2 font-bold">The Initial Anchor</div>
                <div className="text-7xl md:text-9xl font-black text-white drop-shadow-2xl">
                  ${state.anchorValue.toLocaleString()}
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <p className="text-slate-400 text-lg italic">
                "Anchoring biases your judgment. To see clearly, we must pull the weight away."
              </p>
              <button 
                onClick={liftAnchor}
                disabled={liftingActive}
                className="bg-white text-slate-900 font-black px-12 py-6 rounded-full text-xl hover:bg-blue-50 transition-all flex items-center gap-3 mx-auto shadow-xl disabled:opacity-50"
              >
                <Ship className={`w-6 h-6 ${liftingActive ? 'animate-bounce' : ''}`} />
                {liftingActive ? 'LIFTING...' : 'LIFT ANCHOR'}
              </button>
            </div>
          </div>
        )}

        {state.step === Step.COMPONENT_BUILD && (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-blue-600 font-bold uppercase tracking-tighter text-sm">
                <Wind className="w-4 h-4" />
                Airy & Unbiased
              </div>
              <h2 className="text-4xl font-bold text-slate-800">Build Your Fair Price</h2>
              <p className="text-slate-500">Forget the old number. What is this actually worth, piece by piece?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold flex items-center gap-2 text-slate-700">
                      <Plus className="w-4 h-4 text-blue-500" />
                      Standard Value Blocks
                    </h3>
                    <div className="space-y-3">
                      {PRESET_LABELS.map(label => {
                        const existing = state.components.find(c => c.label === label);
                        return (
                          <div key={label} className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">{label}</label>
                            <div className="relative group">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                              <input 
                                type="number"
                                placeholder="0"
                                value={existing ? existing.value : ''}
                                onChange={(e) => {
                                  if (existing) {
                                    updateComponentValue(existing.id, e.target.value);
                                  } else {
                                    addComponent(label, parseFloat(e.target.value) || 0);
                                  }
                                }}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-7 pr-3 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <form onSubmit={handleAddCustom} className="pt-4 border-t border-slate-100 space-y-3">
                    <h3 className="text-lg font-bold flex items-center gap-2 text-slate-700">
                      <Edit3 className="w-4 h-4 text-blue-500" />
                      Add Custom Piece
                    </h3>
                    <div className="flex gap-2">
                      <input 
                        type="text"
                        placeholder="Name"
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-sm outline-none focus:border-blue-400"
                      />
                      <div className="relative w-24">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                        <input 
                          type="number"
                          placeholder="0"
                          value={customValue}
                          onChange={(e) => setCustomValue(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-6 pr-2 text-sm outline-none focus:border-blue-400"
                        />
                      </div>
                    </div>
                    <button 
                      type="submit"
                      disabled={!customName || !customValue}
                      className="w-full py-2 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-600 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
                    >
                      Add Component
                    </button>
                  </form>
                </div>
                
                <div className="bg-blue-600 text-white p-8 rounded-3xl shadow-xl space-y-1">
                  <div className="text-blue-200 text-xs font-bold uppercase">Current Value</div>
                  <div className="text-5xl font-black">${totalValue.toLocaleString()}</div>
                  <button 
                    onClick={() => setState(prev => ({ ...prev, step: Step.VERDICT }))}
                    disabled={totalValue === 0}
                    className="w-full mt-6 bg-white text-blue-600 py-3 rounded-xl font-bold shadow-md hover:bg-blue-50 transition-colors disabled:opacity-50"
                  >
                    Analyze Final Value
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 min-h-[400px] flex flex-col">
                  <div className="flex-1 space-y-2 overflow-y-auto max-h-[500px]">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Itemized Value</h4>
                    {state.components.filter(c => c.value > 0).length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-slate-300 text-center p-8 italic">
                        Enter values on the left<br/>to build your estimate.
                      </div>
                    ) : (
                      state.components.filter(c => c.value > 0).map(comp => (
                        <div key={comp.id} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl group hover:border-blue-200 transition-all shadow-sm">
                          <div className="flex-1">
                            <div className="text-sm font-bold text-slate-800">{comp.label}</div>
                            <div className="text-xs text-slate-400">$ {comp.value.toLocaleString()}</div>
                          </div>
                          {!PRESET_LABELS.includes(comp.label) && (
                            <button 
                              onClick={() => removeComponent(comp.id)}
                              className="text-slate-300 hover:text-red-500 p-2 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {state.step === Step.VERDICT && (
          <div className="space-y-10">
            <div className="text-center space-y-2">
              <h2 className="text-4xl font-bold text-slate-800">The Verdict</h2>
              <p className="text-slate-500">The scales are balanced. Logic meets Anchoring.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <VerticalScale anchor={state.anchorValue} current={totalValue} />
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center">
                    <div className="text-xs font-bold text-slate-400 uppercase">Original Anchor</div>
                    <div className="text-2xl font-black text-slate-800">${state.anchorValue.toLocaleString()}</div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-sm text-center">
                    <div className="text-xs font-bold text-blue-400 uppercase">Your Valuation</div>
                    <div className="text-2xl font-black text-blue-600">${totalValue.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 text-white p-8 rounded-[40px] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Anchor className="w-24 h-24" />
                </div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <ShieldCheck className="text-blue-400 w-6 h-6" />
                  Strategic Insight
                </h3>
                <p className="text-slate-300 leading-relaxed text-lg italic">
                  "{getAdvice(state.anchorValue, totalValue)}"
                </p>
                <button 
                  onClick={reset}
                  className="mt-8 w-full border-2 border-slate-700 hover:border-blue-500 hover:bg-blue-600/10 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all"
                >
                  <RefreshCcw className="w-5 h-5" />
                  Restart
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
};

export default App;
