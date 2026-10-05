import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import type { CardDef, ItemInstance } from '../types';
import { CardArt } from './CardArt';
import { ITEM_CATALOG } from '../data/items';
import { Sparkles, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';
import { sfx } from '../utils/audio';

interface SwipeableCardProps {
  card: CardDef;
  pack: ItemInstance[];
  calculateChance: (option: any) => number;
  onChoose: (optionIndex: number) => void;
  disabled: boolean;
  expeditionFood: number;
}

export function SwipeableCard({
  card,
  pack,
  calculateChance,
  onChoose,
  disabled,
  expeditionFood,
}: SwipeableCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-180, 180], [-15, 15]);

  // Transições de opacidade suaves dos banners de ação superior
  const opacityLeft = useTransform(x, [-140, -20], [1, 0]);
  const opacityRight = useTransform(x, [20, 140], [0, 1]);
  const opacityUp = useTransform(y, [-120, -25], [1, 0]);

  const [draggedDir, setDraggedDir] = useState<'left' | 'right' | 'up' | null>(null);

  // Mapeamento das opções disponíveis para o jogador
  const availableOptions = card.options
    .map((opt, idx) => ({ ...opt, originalIndex: idx }))
    .filter(opt => {
      if (!opt.reqTag) return true;
      return pack.some(i => ITEM_CATALOG[i.id].tags?.includes(opt.reqTag!));
    });

  // Opção com item especial (se houver, mapeia para UP)
  const specialOption = availableOptions.find(o => o.reqTag);
  const otherOptions = availableOptions.filter(o => o !== specialOption);

  // Opções para Esquerda e Direita
  const leftOption = otherOptions[0] || card.options[0];
  const rightOption = otherOptions[1] || card.options[1] || otherOptions[0];
  const upOption = specialOption || otherOptions[2] || null;

  const isAffordable = (opt: any) => {
    if (!opt) return false;
    const foodCost = opt.successEffect?.food && opt.successEffect.food < 0 ? Math.abs(opt.successEffect.food) : 0;
    return expeditionFood >= foodCost;
  };

  const handleDragEnd = (_: any, info: any) => {
    if (disabled) return;
    const thresholdX = 80;
    const thresholdY = -70;

    if (info.offset.y < thresholdY && upOption && isAffordable(upOption)) {
      sfx.cardSwipe();
      onChoose(upOption.originalIndex);
    } else if (info.offset.x < -thresholdX && leftOption && isAffordable(leftOption)) {
      sfx.cardSwipe();
      onChoose(leftOption.originalIndex);
    } else if (info.offset.x > thresholdX && rightOption && isAffordable(rightOption)) {
      sfx.cardSwipe();
      onChoose(rightOption.originalIndex);
    }
    setDraggedDir(null);
  };

  return (
    <div className="relative w-full flex flex-col items-center select-none touch-none">
      {/* BANNER SUPERIOR 100% NEUTRO (Identidade idêntica para esquerda e direita, sem viés) */}
      <div className="w-full h-14 relative flex items-center justify-center overflow-hidden mb-1">
        {/* Banner Esquerdo (Tom neutro grafite/pergaminho) */}
        <motion.div
          style={{ opacity: opacityLeft }}
          className="absolute inset-0 bg-[#1c2419] border-2 border-[#546b48] text-[#e0d8c3] px-3 py-2 rounded-xl flex items-center justify-between shadow-xl"
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-left pr-2 leading-tight">
            <ArrowLeft size={16} className="text-[#e0d8c3] shrink-0" />
            <span>{leftOption?.text}</span>
          </div>
          <span className="shrink-0 px-2 py-0.5 rounded bg-[#2b3924] text-[#e0d8c3] text-xs font-mono font-bold border border-[#3e5235]">
            {leftOption?.reqTag || leftOption?.isGuaranteed ? 'Certeiro' : `${calculateChance(leftOption)}%`}
          </span>
        </motion.div>

        {/* Banner Direito (Tom idêntico ao da esquerda: neutro grafite/pergaminho) */}
        <motion.div
          style={{ opacity: opacityRight }}
          className="absolute inset-0 bg-[#1c2419] border-2 border-[#546b48] text-[#e0d8c3] px-3 py-2 rounded-xl flex items-center justify-between shadow-xl"
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-left pr-2 leading-tight">
            <span>{rightOption?.text}</span>
            <ArrowRight size={16} className="text-[#e0d8c3] shrink-0" />
          </div>
          <span className="shrink-0 px-2 py-0.5 rounded bg-[#2b3924] text-[#e0d8c3] text-xs font-mono font-bold border border-[#3e5235]">
            {rightOption?.reqTag || rightOption?.isGuaranteed ? 'Certeiro' : `${calculateChance(rightOption)}%`}
          </span>
        </motion.div>

        {/* Banner Cima (Item ou 3ª opção) */}
        {upOption && (
          <motion.div
            style={{ opacity: opacityUp }}
            className="absolute inset-0 bg-[#1f291c] border-2 border-[#769466] text-[#e0d8c3] px-3 py-2 rounded-xl flex items-center justify-between shadow-xl z-10"
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-left pr-2 leading-tight">
              <ArrowUp size={16} className="text-[#e0d8c3] shrink-0 animate-bounce" />
              <span>{upOption.text}</span>
            </div>
            <span className="shrink-0 px-2 py-0.5 rounded bg-[#2b3924] text-[#e0d8c3] text-xs font-mono font-bold border border-[#3e5235]">
              {upOption.reqTag || upOption.isGuaranteed ? 'Certeiro' : `${calculateChance(upOption)}%`}
            </span>
          </motion.div>
        )}

        {/* Indicador neutro quando a carta está parada */}
        <div
          className={`text-xs text-[#857f70] transition-opacity duration-200 flex items-center gap-1.5 ${
            draggedDir ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <span>← Arraste para os lados {upOption ? 'ou cima ↑' : ''} →</span>
        </div>
      </div>

      {/* A CARTA ARRASTÁVEL (Borda neutra e consistente) */}
      <motion.div
        drag={disabled ? false : true}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.65}
        onDrag={(_, info) => {
          if (info.offset.y < -35 && upOption) setDraggedDir('up');
          else if (info.offset.x < -15) setDraggedDir('left');
          else if (info.offset.x > 15) setDraggedDir('right');
          else setDraggedDir(null);
        }}
        onDragEnd={handleDragEnd}
        style={{ x, y, rotate }}
        whileTap={{ cursor: 'grabbing' }}
        className={`w-full bg-[#182017] border-2 ${
          draggedDir
            ? 'border-[#769466] shadow-[0_0_24px_rgba(118,148,102,0.2)]'
            : 'border-[#2d3b27]'
        } rounded-2xl p-4 text-center shadow-2xl cursor-grab transition-colors`}
      >
        <div className="flex justify-center mb-3 pointer-events-none">
          <CardArt biome={card.biome} silhouette={card.silhouette} />
        </div>
        <h3 className="text-base font-bold text-[#e0d8c3] mb-1">{card.title}</h3>
        <p className="text-xs text-[#c5bfae] leading-relaxed">{card.desc}</p>
      </motion.div>

      {/* BOTÕES CLICÁVEIS DE OPÇÃO (Totalmente neutros e idênticos) */}
      <div className="w-full space-y-1.5 mt-2.5">
        {availableOptions.map((opt) => {
          const isItem = !!opt.reqTag;
          const isGuaranteed = opt.reqTag || opt.isGuaranteed;
          const chance = calculateChance(opt);
          const afford = isAffordable(opt);

          return (
            <button
              key={opt.originalIndex}
              disabled={disabled || !afford}
              onClick={() => onChoose(opt.originalIndex)}
              className={`w-full text-left p-3 rounded-xl border text-xs transition flex justify-between items-center ${
                !afford
                  ? 'bg-[#121612] border-[#24301f] text-[#555] opacity-60 cursor-not-allowed'
                  : isItem
                  ? 'bg-[#1e281b] border-[#4b6140] hover:bg-[#273423] text-[#e0d8c3] font-semibold'
                  : 'bg-[#1c2419] border-[#2b3924] hover:bg-[#253022] text-[#e0d8c3]'
              }`}
            >
              <span className="flex items-center gap-1.5 pr-2 leading-snug">
                {isItem && <Sparkles size={14} className="text-[#a4c794] shrink-0" />}
                <span>{opt.text}</span>
              </span>
              <span className={`shrink-0 font-bold font-mono ${!afford ? 'text-[#555]' : 'text-[#a4c794]'}`}>
                {isGuaranteed ? 'Certeiro' : `${chance}%`}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
