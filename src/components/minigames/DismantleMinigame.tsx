import { useState, useEffect, useRef } from 'react';
import { Cpu, CheckCircle, XCircle } from 'lucide-react';
import { sfx } from '../../utils/audio';

interface DismantleMinigameProps {
  onWin: () => void;
  onLose: () => void;
}

export function DismantleMinigame({ onWin, onLose }: DismantleMinigameProps) {
  const [bars, setBars] = useState([
     { pos: 0, dir: 1, speed: 1.8, locked: false, success: false },
     { pos: 50, dir: -1, speed: 2.5, locked: false, success: false },
     { pos: 100, dir: -1, speed: 3.2, locked: false, success: false }
  ]);
  const barsRef = useRef(bars);
  const isOver = useRef(false);

  useEffect(() => {
     const interval = setInterval(() => {
        if (isOver.current) return;

        let changed = false;
        barsRef.current = barsRef.current.map(b => {
           if (b.locked) return b;
           changed = true;
           let next = b.pos + b.dir * b.speed;
           let nextDir = b.dir;
           if (next >= 100) { next = 100; nextDir = -1; }
           if (next <= 0) { next = 0; nextDir = 1; }
           return { ...b, pos: next, dir: nextDir };
        });

        if (changed) {
          setBars([...barsRef.current]);
        }
     }, 30);
     return () => clearInterval(interval);
  }, []);

  const handleLock = (idx: number) => {
     if (isOver.current) return;
     const b = barsRef.current[idx];
     if (b.locked) return;
     
     // Target zone is 40% to 60%
     const success = b.pos >= 35 && b.pos <= 65;
     barsRef.current[idx] = { ...b, locked: true, success };
     setBars([...barsRef.current]);

     if (success) {
       sfx.success(false);
     } else {
       sfx.fail(false);
     }

     // check end condition
     if (barsRef.current.every(x => x.locked)) {
        isOver.current = true;
        setTimeout(() => {
            if (barsRef.current.every(x => x.success)) onWin();
            else onLose();
        }, 1000);
     }
  };

  return (
     <div className="bg-[#182017] p-5 rounded-2xl border-2 border-[#2c3826] text-center shadow-2xl">
       <div className="flex justify-center mb-2 text-[#e57a3b]">
         <Cpu size={32} />
       </div>
       <h2 className="text-lg font-bold text-[#e0d8c3] mb-1">Desarme de Circuito</h2>
       <p className="text-xs text-[#857f70] mb-6">
         Trave os 3 conectores na zona de segurança (verde central) para desmontar o painel sem curto-circuito.
       </p>

       <div className="space-y-5">
         {bars.map((b, i) => (
            <div key={i} className="flex gap-3 items-center">
               <div className="relative flex-1 h-8 bg-[#121612] border border-[#2c3826] rounded overflow-hidden">
                  {/* Sweet spot 35% - 65% (width 30%, left 35%) */}
                  <div className="absolute top-0 h-full w-[30%] left-[35%] bg-[#8fd16a]/20 border-x border-[#8fd16a]" />
                  
                  {/* Cursor */}
                  <div 
                    className="absolute top-0 h-full w-2 bg-[#e57a3b] -ml-1 transition-all" 
                    style={{ left: `${b.pos}%`, transitionDuration: b.locked ? '0ms' : '30ms', transitionTimingFunction: 'linear' }} 
                  />
               </div>
               
               <button 
                 onClick={() => handleLock(i)} 
                 disabled={b.locked} 
                 className={`w-20 py-1.5 text-xs font-bold rounded ${
                   !b.locked 
                     ? 'bg-[#2c3826] text-[#e0d8c3] hover:bg-[#3d4d34]' 
                     : b.success 
                       ? 'bg-[#8fd16a]/20 text-[#8fd16a] border border-[#8fd16a]' 
                       : 'bg-[#e0604a]/20 text-[#e0604a] border border-[#e0604a]'
                 }`}
               >
                 {!b.locked ? 'TRAVAR' : (b.success ? <CheckCircle size={16} className="mx-auto" /> : <XCircle size={16} className="mx-auto" />)}
               </button>
            </div>
         ))}
       </div>
     </div>
  );
}
