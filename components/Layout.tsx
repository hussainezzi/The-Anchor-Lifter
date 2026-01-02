
import React from 'react';
import { Step } from '../types.ts';
import { Anchor, Waves } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  step: Step;
}

const Layout: React.FC<LayoutProps> = ({ children, step }) => {
  const isHeavy = step === Step.STICKER_SHOCK || step === Step.PULLING_ANCHOR;

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${isHeavy ? 'sea-gradient text-white' : 'sky-gradient text-slate-800'}`}>
      <header className="p-6 flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center gap-2">
          <Anchor className={`w-8 h-8 ${isHeavy ? 'text-blue-400' : 'text-blue-600'}`} />
          <h1 className="text-2xl font-bold tracking-tight">The Anchor Lifter</h1>
        </div>
        <div className="flex items-center gap-2 text-sm opacity-60">
          <Waves className="w-4 h-4" />
          <span>Negotiation Mastery</span>
        </div>
      </header>
      <main className="max-w-4xl mx-auto p-6 flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
        {children}
      </main>
    </div>
  );
};

export default Layout;
