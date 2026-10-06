import { useState, useEffect, useRef } from 'react';
import { Fish, Waves } from 'lucide-react';
import { sfx } from '../../utils/audio';

interface FishingMinigameProps {
  onWin: () => void;
  onLose: () => void;
}

export function FishingMinigame({ onWin, onLose }: FishingMinigameProps) {
  const [progress, setProgress] = useState(20);
  const [timeLeft, setTimeLeft] = useState(15);
  const [fishPos, setFishPos] = useState(50);
  
  const hookPosRef = useRef(50);
  const fishPosRef = useRef(50);
  const fishTargetRef = useRef(50);
  const progressRef = useRef(20);

  useEffect(() => {
    sfx.roll(); // Reusing roll sound as a "splash" or tension sound

    const interval = setInterval(() => {
      // Move fish towards target
      let f = fishPosRef.current;
      let t = fishTargetRef.current;
      
      if (Math.abs(f - t) < 3) {
         fishTargetRef.current = Math.random() * 90 + 5; // new target 5-95
      } else {
         const speed = Math.random() * 1.5 + 0.5; // Random erratic speed
         fishPosRef.current += f < t ? speed : -speed;
      }
      setFishPos(fishPosRef.current);

      // Calc progress (hook zone is ~20% wide, so +/- 10%)
      if (Math.abs(fishPosRef.current - hookPosRef.current) < 12) {
         progressRef.current = Math.min(100, progressRef.current + 0.6);
      } else {
         progressRef.current = Math.max(0, progressRef.current - 0.3);
      }
      setProgress(progressRef.current);

      if (progressRef.current >= 100) {
         clearInterval(interval);
         onWin();
      }
    }, 40);

    return () => clearInterval(interval);
  }, [onWin]);

  useEffect(() => {
    const timer = setInterval(() => {
       setTimeLeft(t => {
         if (t <= 1) { 
           clearInterval(timer);
           onLose(); 
           return 0; 
         }
         return t - 1;
       });
    }, 1000);
    return () => clearInterval(timer);
  }, [onLose]);

  return (
    <div className="bg-[#182017] p-5 rounded-2xl border-2 border-[#2c3826] text-center shadow-2xl">
       <div className="flex justify-center mb-2 text-[#4a8270]">
         <Waves size={32} />
       </div>
       <h2 className="text-lg font-bold text-[#e0d8c3] mb-1">Pescaria Dinâmica</h2>
       <p className="text-xs text-[#857f70] mb-4">
         Use o controle deslizante para manter a rede na área do peixe! Preencha a barra verde antes que o tempo acabe.
       </p>
       
       <div className="flex justify-between text-xs font-mono mb-1 px-1">
         <span className="text-[#e57a3b]">Tempo: {timeLeft}s</span>
         <span className="text-[#8fd16a]">{Math.floor(progress)}%</span>
       </div>
       
       {/* Progress bar */}
       <div className="w-full h-2 bg-[#121612] rounded overflow-hidden mb-5">
         <div 
           style={{ width: `${progress}%` }} 
           className="bg-[#8fd16a] h-full transition-all duration-75" 
         />
       </div>

       {/* Play area */}
       <div className="relative w-full h-16 bg-[#1f2a33] rounded-xl border border-[#2a3c4a] mb-6 overflow-hidden">
          {/* Hook Zone */}
          <div 
            className="absolute top-0 h-full bg-[#8fd16a]/30 border-x-2 border-[#8fd16a] w-[24%]" 
            style={{ left: `${hookPosRef.current - 12}%`, transition: 'left 0.1s linear' }} 
          />
          {/* Fish */}
          <div 
            className="absolute top-4 -ml-3" 
            style={{ left: `${fishPos}%` }}
          >
            <Fish className="text-[#e0d8c3]" size={24} />
          </div>
       </div>

       {/* Control */}
       <input 
         type="range" 
         min="12" 
         max="88" 
         defaultValue="50" 
         onChange={e => { hookPosRef.current = Number(e.target.value); }} 
         className="w-full h-4 bg-[#121612] rounded-lg appearance-none cursor-pointer accent-[#4a8270]" 
       />
       <div className="mt-2 text-[10px] text-[#546b48] uppercase tracking-widest">Controle da Rede</div>
    </div>
  );
}
