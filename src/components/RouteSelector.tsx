import React from 'react';
import type { Biome } from '../types';
import { Trees, Factory, Waves, CloudLightning, ChevronRight } from 'lucide-react';
import { sfx } from '../utils/audio';

export interface RouteOption {
  biome: Biome;
  title: string;
  description: string;
  potentialLoot: string;
  dangerLevel: 'Baixo' | 'Médio' | 'Alto' | 'Extremo';
}

interface RouteSelectorProps {
  currentCardIndex: number;
  totalCards: number;
  routes: RouteOption[];
  onSelectRoute: (selected: RouteOption) => void;
  onRetreat: () => void;
  lastDeadBiome?: string;
}

const BIOME_CONFIG: Record<Biome, { icon: React.ReactNode; border: string; accent: string }> = {
  selva: {
    icon: <Trees size={22} className="text-[#9bb37a]" />,
    border: 'border-[#3f5236]',
    accent: 'text-[#9bb37a]',
  },
  ruinas: {
    icon: <Factory size={22} className="text-[#4a8270]" />,
    border: 'border-[#2d473e]',
    accent: 'text-[#4a8270]',
  },
  rio: {
    icon: <Waves size={22} className="text-[#649fa0]" />,
    border: 'border-[#2c4747]',
    accent: 'text-[#649fa0]',
  },
  tempestade: {
    icon: <CloudLightning size={22} className="text-[#d4af37]" />,
    border: 'border-[#544826]',
    accent: 'text-[#d4af37]',
  },
  noite: {
    icon: <Trees size={22} className="text-[#7f6fb0]" />,
    border: 'border-[#3d335c]',
    accent: 'text-[#7f6fb0]',
  },
  fenda: {
    icon: <Trees size={22} className="text-[#a4fca2]" />,
    border: 'border-[#a4fca2]',
    accent: 'text-[#a4fca2]',
  },
};

export function RouteSelector({
  currentCardIndex,
  totalCards,
  routes,
  onSelectRoute,
  onRetreat,
  lastDeadBiome,
}: RouteSelectorProps) {
  return (
    <div className="w-full flex flex-col items-center select-none py-2 animate-in fade-in zoom-in-95 duration-200">
      <div className="text-center mb-3">
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#4a8270]">
          Bifurcação no Terreno ({currentCardIndex}/{totalCards})
        </span>
        <h3 className="text-base font-bold text-[#e0d8c3] mt-0.5">Qual trilha a patrulha vai seguir?</h3>
        <p className="text-xs text-[#857f70]">Escolha o caminho com base nas ferramentas que você carrega na mochila.</p>
      </div>

      <div className="w-full space-y-2.5">
        {routes.map((route, idx) => {
          const config = BIOME_CONFIG[route.biome] || BIOME_CONFIG.selva;
          return (
            <div
              key={idx}
              onClick={() => {
                sfx.cardSwipe();
                onSelectRoute(route);
              }}
              className={`w-full bg-[#182017] border-2 ${config.border} hover:border-[#769466] rounded-2xl p-3.5 cursor-pointer shadow-lg transition-all transform hover:-translate-y-0.5`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-[#121612] rounded-xl border border-[#232f20]">
                    {config.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#e0d8c3]">{route.title}</h4>
                    <span className="text-[11px] font-mono text-[#857f70]">Bioma: {route.biome.toUpperCase()}</span>
                    {lastDeadBiome === route.biome && (
                      <span className="block mt-1 text-[10px] text-[#ffb0b0] font-mono">🎒 Mochila de Baixa</span>
                    )}
                  </div>
                </div>

                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                    route.dangerLevel === 'Alto' || route.dangerLevel === 'Extremo'
                      ? 'bg-[#331c1c] text-[#ff8e8e] border-[#5e2b2b]'
                      : 'bg-[#1b2b1e] text-[#8fd16a] border-[#2c4731]'
                  }`}
                >
                  Perigo {route.dangerLevel}
                </span>
              </div>

              <p className="text-xs text-[#c5bfae] mt-2.5 leading-relaxed">{route.description}</p>

              <div className="mt-3 pt-2 border-t border-[#232f20] flex items-center justify-between text-xs">
                <span className="text-[11px] text-[#857f70]">
                  Recursos prováveis: <b className="text-[#e0d8c3]">{route.potentialLoot}</b>
                </span>
                <span className="flex items-center gap-1 text-[#e57a3b] font-semibold text-xs">
                  Entrar na rota <ChevronRight size={14} />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Opção de recuo tático */}
      <button
        onClick={() => {
          sfx.click();
          onRetreat();
        }}
        className="w-full mt-4 py-2.5 bg-[#1e1c16] border border-[#3b3324] hover:bg-[#2b251b] text-[#857f70] hover:text-[#e0d8c3] rounded-xl text-xs transition"
      >
        Cancelar avanço e retornar com o saque atual
      </button>
    </div>
  );
}
