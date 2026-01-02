
import React from 'react';

interface VerticalScaleProps {
  anchor: number;
  current: number;
}

const VerticalScale: React.FC<VerticalScaleProps> = ({ anchor, current }) => {
  const max = Math.max(anchor, current, 100);
  const anchorHeight = (anchor / max) * 100;
  const currentHeight = (current / max) * 100;

  return (
    <div className="w-full h-64 bg-slate-200/20 rounded-xl relative overflow-hidden border border-slate-300 flex items-end justify-around p-4">
      {/* Anchor Weight */}
      <div className="flex flex-col items-center gap-2 w-1/3 h-full justify-end">
        <div 
          className="w-full bg-slate-800 rounded-t-lg transition-all duration-700 relative"
          style={{ height: `${anchorHeight}%` }}
        >
          <div className="absolute top-2 left-0 right-0 text-center text-[10px] text-slate-400 uppercase font-bold">Anchor</div>
        </div>
        <span className="text-xs font-bold text-slate-500">$ {anchor.toLocaleString()}</span>
      </div>

      {/* User Build Balloon */}
      <div className="flex flex-col items-center gap-2 w-1/3 h-full justify-end">
        <div 
          className="w-full bg-blue-500 rounded-t-lg transition-all duration-700 shadow-lg shadow-blue-200 relative"
          style={{ height: `${currentHeight}%` }}
        >
          <div className="absolute top-2 left-0 right-0 text-center text-[10px] text-blue-100 uppercase font-bold">Your Value</div>
        </div>
        <span className="text-xs font-bold text-blue-600">$ {current.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default VerticalScale;
