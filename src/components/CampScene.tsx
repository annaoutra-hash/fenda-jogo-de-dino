import type { GameState, ItemInstance } from '../types';

interface CampSceneProps {
  buildings: GameState['buildings'];
  survivors: number;
  stash: ItemInstance[];
  incubatorQueue?: GameState['incubatorQueue'];
}

// Cena viva do acampamento: estática no geral, com fogo tremulando,
// fumaça subindo e estruturas que aparecem conforme são construídas.
export function CampScene({ buildings, survivors, stash, incubatorQueue }: CampSceneProps) {
  const people = Math.min(survivors, 4);
  const seats = [
    { x: 150, y: 172 },
    { x: 250, y: 172 },
    { x: 128, y: 186 },
    { x: 272, y: 186 },
  ];

  return (
    <svg viewBox="0 0 400 220" className="w-full rounded-xl border border-[#253320] shadow-xl" role="img" aria-label="Acampamento">
      <style>{`
        @keyframes smoke { 0% { transform: translate(0,0) scale(.6); opacity:.55 } 100% { transform: translate(-14px,-70px) scale(1.8); opacity:0 } }
        @keyframes flicker { 0%,100% { transform: scaleY(1) } 50% { transform: scaleY(1.18) } }
        @keyframes glow { 0%,100% { opacity:.22 } 50% { opacity:.34 } }
        @keyframes blink { 0%,92%,100% { opacity:1 } 95% { opacity:.2 } }
        @keyframes sway { 0%,100% { transform: rotate(-1.5deg) } 50% { transform: rotate(1.5deg) } }
        @keyframes wave { 0%,100% { transform: scale(1); opacity:.5 } 100% { transform: scale(2.2); opacity:0 } }
        .smoke { transform-box: fill-box; transform-origin: center; animation: smoke 4s linear infinite; }
        .flame { transform-box: fill-box; transform-origin: bottom center; animation: flicker .35s ease-in-out infinite; }
        .glow { animation: glow 1.6s ease-in-out infinite; }
        .blink { animation: blink 3s infinite; }
        .sway { transform-box: fill-box; transform-origin: bottom center; animation: sway 6s ease-in-out infinite; }
        .wave { transform-box: fill-box; transform-origin: center; animation: wave 2.4s ease-out infinite; }
      `}</style>

      {/* Céu e lua */}
      <rect width="400" height="220" fill="#0e1410" />
      <circle cx="340" cy="38" r="14" fill="#e0d8c3" opacity="0.12" />
      {/* Montanhas e selva ao fundo */}
      <polygon points="0,140 50,90 100,125 160,70 220,120 280,80 340,115 400,85 400,220 0,220" fill="#151d16" />
      <g className="sway">
        <polygon points="0,160 20,105 40,150 65,95 90,155 0,170" fill="#1c2719" />
      </g>
      <g className="sway" style={{ animationDelay: '-3s' }}>
        <polygon points="310,155 335,100 355,150 380,92 400,150 400,170" fill="#1c2719" />
      </g>
      {/* Chão */}
      <rect x="0" y="165" width="400" height="55" fill="#121812" />

      {/* Paliçada de troncos */}
      {Array.from({ length: 22 }).map((_, i) => (
        <polygon key={i} points={`${i * 19},168 ${i * 19 + 8},148 ${i * 19 + 16},168`} fill="#0a0e0a" />
      ))}

      {/* Fuselagem/abrigo central (sempre presente) */}
      <path d="M 165,165 Q 170,128 235,128 L 240,165 Z" fill="#0a0e0a" stroke="#4a8270" strokeWidth="1.2" />
      <rect x="182" y="140" width="7" height="8" rx="2" fill="#e57a3b" opacity="0.5" className="blink" />
      <rect x="198" y="140" width="7" height="8" rx="2" fill="#1c241b" />
      <rect x="214" y="140" width="7" height="8" rx="2" fill="#1c241b" />

      {/* Bancada (nível 1 sempre; nível 2 ganha bigorna e ferramentas) */}
      <g>
        <rect x="40" y="170" width="46" height="5" fill="#0a0e0a" />
        <rect x="43" y="175" width="4" height="14" fill="#0a0e0a" />
        <rect x="79" y="175" width="4" height="14" fill="#0a0e0a" />
        <line x1="50" y1="170" x2="58" y2="160" stroke="#e0d8c3" strokeWidth="1.5" />
        {buildings.bancada >= 2 && (
          <>
            <path d="M 62,170 L 64,162 L 82,162 L 78,166 L 74,166 L 74,170 Z" fill="#0a0e0a" stroke="#4a8270" strokeWidth="1" />
            <circle cx="70" cy="160" r="1.5" fill="#e57a3b" className="blink" />
          </>
        )}
      </g>

      {/* Defumador */}
      {buildings.defumador > 0 && (
        <g>
          <rect x="300" y="150" width="24" height="38" fill="#0a0e0a" stroke="#4a8270" strokeWidth="1" />
          <polygon points="296,150 312,138 328,150" fill="#0a0e0a" />
          <line x1="304" y1="160" x2="320" y2="160" stroke="#e57a3b" strokeWidth="1" opacity="0.6" />
          <line x1="304" y1="168" x2="320" y2="168" stroke="#e57a3b" strokeWidth="1" opacity="0.6" />
          {[0, 1.3, 2.6].map((d) => (
            <circle key={d} cx="312" cy="134" r="5" fill="#8a8a80" className="smoke" style={{ animationDelay: `-${d}s` }} />
          ))}
        </g>
      )}

      {/* Enfermaria (tenda com cruz) */}
      {buildings.enfermaria > 0 && (
        <g>
          <polygon points="95,188 120,150 145,188" fill="#0a0e0a" stroke="#4a8270" strokeWidth="1" />
          <rect x="116" y="164" width="8" height="2.5" fill="#e0d8c3" />
          <rect x="118.75" y="161.25" width="2.5" height="8" fill="#e0d8c3" />
        </g>
      )}

      {/* Incubadora (Poço termal) */}
      {buildings.incubadora > 0 && (
        <g>
          <ellipse cx="280" cy="180" rx="20" ry="8" fill="#1c1212" stroke="#e57a3b" strokeWidth="1" />
          {(incubatorQueue?.some(q => q.eggId === 'ovo_raptor') || stash.some(s => s.id === 'ovo_raptor')) && <ellipse cx="275" cy="178" rx="4" ry="5" fill="#4a8270" />}
          {(incubatorQueue?.some(q => q.eggId === 'ovo_trico') || stash.some(s => s.id === 'ovo_trico')) && <ellipse cx="286" cy="179" rx="5" ry="6" fill="#8fd16a" />}
          <path d="M 270,180 Q 280,170 290,180" fill="none" stroke="#e57a3b" strokeWidth="1.5" className="wave" opacity="0.4" />
        </g>
      )}

      {/* Mascotes (Dormindo no acampamento) */}
      {stash.some(s => s.id === 'pet_raptor') && (
        <g>
          {/* Filhote de Raptor enrolado dormindo */}
          <ellipse cx="315" cy="184" rx="10" ry="5" fill="#3d4d34" />
          <ellipse cx="314" cy="182" rx="9" ry="4" fill="#4a8270" />
          <circle cx="308" cy="179" r="4.5" fill="#2c3826" />
          {/* Cauda envolta */}
          <path d="M 322,184 Q 330,184 332,179 Q 330,181 322,182" fill="#4a8270" />
          {/* Olho fechado (risquinho) */}
          <path d="M 306,179 Q 308,180 309,178" fill="none" stroke="#e0d8c3" strokeWidth="0.8" strokeLinecap="round" />
          <text x="312" y="170" fill="#857f70" fontSize="8" className="smoke">z</text>
        </g>
      )}
      
      {stash.some(s => s.id === 'mount_trico') && (
        <g>
          {/* Triceratops dormindo (Design Melhorado) */}
          {/* Corpo Base */}
          <ellipse cx="110" cy="178" rx="16" ry="10" fill="#3d4d34" />
          <ellipse cx="108" cy="175" rx="15" ry="9" fill="#4a8270" />
          
          {/* Patas recolhidas */}
          <ellipse cx="100" cy="183" rx="5" ry="3" fill="#2c3826" />
          <ellipse cx="118" cy="183" rx="5" ry="3" fill="#2c3826" />
          
          {/* Escudo/Coroa (Frill) */}
          <ellipse cx="88" cy="165" rx="10" ry="14" transform="rotate(25, 88, 165)" fill="#2c3826" stroke="#8fd16a" strokeWidth="1" />
          
          {/* Cabeça/Focinho */}
          <polygon points="85,160 65,180 85,185" fill="#4a8270" />
          
          {/* Bico */}
          <polygon points="65,180 60,185 70,185" fill="#e57a3b" />
          
          {/* Chifre do Nariz */}
          <polygon points="68,177 65,170 70,175" fill="#e0d8c3" />
          
          {/* Chifres da Cabeça (com profundidade) */}
          <path d="M 83,161 Q 70,150 60,152 Q 72,158 85,165" fill="#c5bfae" />
          <path d="M 80,165 Q 65,155 55,160 Q 70,165 80,170" fill="#e0d8c3" />
          
          {/* Olho fechado sereno */}
          <path d="M 73,173 Q 76,175 78,172" fill="none" stroke="#121612" strokeWidth="1.2" strokeLinecap="round" />
          
          <text x="110" y="155" fill="#857f70" fontSize="10" className="smoke">Z</text>
        </g>
      )}

      {/* Torre de rádio */}
      {buildings.radio > 0 && (
        <g>
          <line x1="360" y1="190" x2="370" y2="95" stroke="#0a0e0a" strokeWidth="3" />
          <line x1="380" y1="190" x2="370" y2="95" stroke="#0a0e0a" strokeWidth="3" />
          <line x1="363" y1="155" x2="377" y2="155" stroke="#4a8270" strokeWidth="1.5" />
          <line x1="366" y1="125" x2="374" y2="125" stroke="#4a8270" strokeWidth="1.5" />
          <circle cx="370" cy="93" r="3" fill="#e57a3b" className="blink" />
          <circle cx="370" cy="93" r="6" fill="none" stroke="#e57a3b" strokeWidth="1" className="wave" />
        </g>
      )}

      {/* Torre de Vigia */}
      {buildings.torre > 0 && (
        <g>
          {/* Estrutura de madeira */}
          <line x1="20" y1="165" x2="30" y2="70" stroke="#0a0e0a" strokeWidth="3.5" />
          <line x1="50" y1="165" x2="40" y2="70" stroke="#0a0e0a" strokeWidth="3.5" />
          <line x1="23" y1="130" x2="47" y2="130" stroke="#1c2719" strokeWidth="2" />
          <line x1="26" y1="100" x2="44" y2="100" stroke="#1c2719" strokeWidth="2" />
          {/* Cabine da torre */}
          <rect x="25" y="60" width="20" height="15" fill="#0a0e0a" stroke="#4a8270" strokeWidth="1" />
          <polygon points="20,60 35,45 50,60" fill="#1c2719" />
          {/* Batedor na torre */}
          <circle cx="35" cy="55" r="2.5" fill="#e0d8c3" />
        </g>
      )}

      {/* Horta Hidropônica */}
      {buildings.horta > 0 && (
        <g>
          <rect x="135" y="160" width="25" height="6" rx="2" fill="#2c3826" stroke="#4a8270" strokeWidth="1" />
          <rect x="135" y="152" width="25" height="6" rx="2" fill="#2c3826" stroke="#4a8270" strokeWidth="1" />
          <path d="M 138,160 Q 140,154 142,160 M 145,160 Q 147,152 149,160 M 153,160 Q 155,155 157,160" fill="none" stroke="#8fd16a" strokeWidth="1.5" />
          <path d="M 138,152 Q 140,146 142,152 M 145,152 Q 147,144 149,152 M 153,152 Q 155,147 157,152" fill="none" stroke="#8fd16a" strokeWidth="1.5" />
          {/* Gotas/tubulação azulada para indicar hidroponia */}
          <line x1="130" y1="145" x2="130" y2="165" stroke="#4a8270" strokeWidth="2" />
        </g>
      )}

      {/* Fogueira central */}
      <ellipse cx="200" cy="185" rx="60" ry="18" fill="#e57a3b" className="glow" />
      <line x1="186" y1="190" x2="214" y2="182" stroke="#2a1d12" strokeWidth="4" strokeLinecap="round" />
      <line x1="186" y1="182" x2="214" y2="190" stroke="#2a1d12" strokeWidth="4" strokeLinecap="round" />
      <polygon points="190,186 200,160 210,186" fill="#e57a3b" className="flame" />
      <polygon points="195,186 200,170 205,186" fill="#ffd54a" className="flame" style={{ animationDelay: '-.15s' }} />
      {[0, 1, 2, 3].map((d) => (
        <circle key={d} cx="200" cy="156" r="6" fill="#6b6b62" className="smoke" style={{ animationDelay: `-${d}s` }} />
      ))}

      {/* Sobreviventes sentados ao redor do fogo */}
      {seats.slice(0, people).map((s, i) => {
        const facing = s.x < 200 ? 1 : -1;
        return (
          <g key={i} transform={`translate(${s.x},${s.y}) scale(${facing},1)`}>
            <circle cx="0" cy="-20" r="5" fill="#060906" />
            <path d="M -6,-14 L 6,-14 L 8,0 L -8,0 Z" fill="#060906" />
            <path d="M 2,-2 L 12,0 L 12,4 L 0,3 Z" fill="#060906" />
          </g>
        );
      })}

      {/* Líder de pé com cajado */}
      <g transform="translate(232,168)">
        <circle cx="0" cy="-26" r="5.5" fill="#060906" />
        <path d="M -6,-20 L 6,-20 L 5,-2 L 7,14 L 2,14 L 0,0 L -2,14 L -7,14 L -5,-2 Z" fill="#060906" />
        <line x1="10" y1="-34" x2="12" y2="14" stroke="#060906" strokeWidth="2" />
      </g>
    </svg>
  );
}
