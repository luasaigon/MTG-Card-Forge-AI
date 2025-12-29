
import React from 'react';

interface ManaSymbolProps {
  symbol: string;
}

const ManaSymbol: React.FC<ManaSymbolProps> = ({ symbol }) => {
  // Extract content between braces
  const content = symbol.replace(/[{}]/g, '').toUpperCase();
  
  const getColorClasses = () => {
    switch (content) {
      case 'W': return 'bg-[#f8f6d8] text-black shadow-[inset_0_0_2px_rgba(0,0,0,0.5)]';
      case 'U': return 'bg-[#c1d7e9] text-black shadow-[inset_0_0_2px_rgba(0,0,0,0.5)]';
      case 'B': return 'bg-[#bab1ab] text-white shadow-[inset_0_0_2px_rgba(0,0,0,0.5)]';
      case 'R': return 'bg-[#e49977] text-black shadow-[inset_0_0_2px_rgba(0,0,0,0.5)]';
      case 'G': return 'bg-[#a3c095] text-black shadow-[inset_0_0_2px_rgba(0,0,0,0.5)]';
      default: return 'bg-[#ccc2c0] text-black shadow-[inset_0_0_2px_rgba(0,0,0,0.5)]';
    }
  };

  return (
    <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold border border-black/30 leading-none mr-0.5 ${getColorClasses()}`}>
      {content}
    </span>
  );
};

export const ManaCost: React.FC<{ cost: string }> = ({ cost }) => {
  const symbols = cost.match(/\{[^}]+\}/g) || [];
  return (
    <div className="flex items-center">
      {symbols.map((s, i) => (
        <ManaSymbol key={i} symbol={s} />
      ))}
    </div>
  );
};
