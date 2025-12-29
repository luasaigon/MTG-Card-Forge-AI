
import React from 'react';
import { MTGCardData, CardColor, CardRarity } from '../types';
import { ManaCost } from './ManaSymbol';

interface MTGCardProps {
  card: MTGCardData;
  imageUrl: string;
}

const MTGCard: React.FC<MTGCardProps> = ({ card, imageUrl }) => {
  const getFrameColors = () => {
    switch (card.colorIdentity) {
      case CardColor.WHITE: return 'bg-[#f2f1e6] border-[#d9d5c1] text-gray-900';
      case CardColor.BLUE: return 'bg-[#d1e4f3] border-[#92b2ca] text-gray-900';
      case CardColor.BLACK: return 'bg-[#3e3e3e] border-[#1a1a1a] text-gray-100';
      case CardColor.RED: return 'bg-[#f4d9c9] border-[#d3947b] text-gray-900';
      case CardColor.GREEN: return 'bg-[#d8e5d1] border-[#9eb793] text-gray-900';
      case CardColor.MULTICOLOR: return 'bg-gradient-to-br from-[#e5d098] to-[#c9a75d] border-[#b08e42] text-gray-900';
      case CardColor.COLORLESS: return 'bg-[#d8d9da] border-[#a0a1a3] text-gray-900';
      default: return 'bg-[#f2f1e6] border-[#d9d5c1] text-gray-900';
    }
  };

  const getRarityIconColor = () => {
    switch (card.rarity) {
      case CardRarity.COMMON: return 'text-black';
      case CardRarity.UNCOMMON: return 'text-slate-400';
      case CardRarity.RARE: return 'text-amber-500';
      case CardRarity.MYTHIC: return 'text-orange-600';
      default: return 'text-black';
    }
  };

  const frameClasses = getFrameColors();

  return (
    <div className={`relative w-80 h-[448px] rounded-[18px] p-3 shadow-2xl border-8 ${frameClasses} transition-all duration-500 hover:scale-105 group overflow-hidden`}>
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/cardboard-flat.png')]"></div>
      
      {/* Inner Card Frame */}
      <div className="relative h-full flex flex-col gap-1.5">
        
        {/* Name & Mana Cost */}
        <div className="flex justify-between items-center bg-white/40 px-2 py-1 rounded border border-black/10 backdrop-blur-sm shadow-sm min-h-[32px]">
          <h2 className="font-mtg-title text-sm font-bold tracking-tight truncate max-w-[180px] leading-none">
            {card.name}
          </h2>
          <ManaCost cost={card.manaCost} />
        </div>

        {/* Art Frame */}
        <div className="relative flex-grow border-2 border-black/80 rounded-sm overflow-hidden shadow-inner bg-black">
          <img 
            src={imageUrl} 
            alt={card.name} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Type Line */}
        <div className="flex justify-between items-center bg-white/40 px-2 py-1 rounded border border-black/10 backdrop-blur-sm shadow-sm min-h-[28px]">
          <span className="font-mtg-title text-[11px] font-bold leading-none">
            {card.typeLine}
          </span>
          <div className={`${getRarityIconColor()} text-xs font-bold leading-none`}>
            {card.rarity === CardRarity.MYTHIC ? 'M' : card.rarity[0]}
          </div>
        </div>

        {/* Text Box */}
        <div className="h-32 bg-white/60 p-2 border border-black/20 rounded-sm overflow-hidden flex flex-col gap-1.5 shadow-inner">
          <p className="font-mtg-rules text-[13px] leading-[1.1] text-gray-900 whitespace-pre-line">
            {card.rulesText}
          </p>
          {card.flavorText && (
            <p className="font-mtg-rules italic text-[12px] leading-[1.1] text-gray-700 mt-auto opacity-80 border-t border-black/5 pt-1">
              {card.flavorText}
            </p>
          )}
        </div>

        {/* Power / Toughness Box */}
        {(card.power || card.toughness) && (
          <div className="absolute bottom-[-6px] right-[-6px] bg-white/80 px-3 py-1.5 border-2 border-black/80 rounded-md font-mtg-title font-bold text-sm shadow-md min-w-[50px] text-center">
            {card.power}/{card.toughness}
          </div>
        )}
      </div>

      {/* Hologram for Rare/Mythic */}
      {(card.rarity === CardRarity.RARE || card.rarity === CardRarity.MYTHIC) && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-4 bg-gradient-to-r from-blue-300 via-purple-300 to-green-300 opacity-60 rounded-full blur-[1px] mix-blend-color-dodge"></div>
      )}
    </div>
  );
};

export default MTGCard;
