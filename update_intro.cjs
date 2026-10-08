const fs = require('fs');

let file = 'src/App.tsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<svg width="200" height="100" viewBox="0 0 200 100">[\s\S]*?<\/div>\s*<button/m;

const newIntro = `{/* Painel 1: O Teste de Ressonância (Laboratório escuro) */}
          <div className="w-full bg-[#060906] border border-[#2c3826] rounded-sm p-2 flex flex-col sm:flex-row gap-4 items-center shadow-lg">
            <svg width="100" height="100" viewBox="0 0 100 100" className="flex-shrink-0 bg-[#030504] border border-[#1b2b1e]">
              <rect x="20" y="30" width="20" height="70" fill="#131a12" />
              <rect x="50" y="10" width="30" height="90" fill="#060906" />
              <circle cx="65" cy="30" r="8" fill="#a4fca2" className="animate-pulse" opacity="0.8" />
              <circle cx="65" cy="30" r="2" fill="#ffffff" />
              <line x1="65" y1="40" x2="65" y2="80" stroke="#a4fca2" strokeWidth="2" opacity="0.4" />
              <path d="M 65,30 L 45,20 L 30,40" fill="none" stroke="#e57a3b" strokeWidth="1" />
            </svg>
            <p className="text-[13px] text-[#8fd16a] italic text-left flex-1 px-2 font-mono">
              "Projeto TÊMPORA. Teste de ressonância número 40."
            </p>
          </div>

          {/* Painel 2: A Fenda Puxando o Mundo */}
          <div className="w-full bg-[#060906] border border-[#2c3826] rounded-sm p-2 flex flex-col sm:flex-row-reverse gap-4 items-center shadow-lg">
             <svg width="100" height="100" viewBox="0 0 100 100" className="flex-shrink-0 bg-[#030504] border border-[#1b2b1e]">
               <path d="M 10,10 Q 50,50 90,10 Q 70,70 50,90 Q 30,70 10,10 Z" fill="#4a8270" opacity="0.3" />
               <path d="M 30,30 Q 50,50 70,30 Q 60,60 50,70 Q 40,60 30,30 Z" fill="#a4fca2" opacity="0.8" />
               {/* Silhueta de carro e detritos caindo */}
               <rect x="60" y="50" width="16" height="8" rx="2" fill="#030504" transform="rotate(35 60 50)" />
               <circle cx="62" cy="58" r="2" fill="#030504" />
               <circle cx="72" cy="62" r="2" fill="#030504" />
               <polygon points="10,60 20,55 25,65" fill="#030504" transform="rotate(-20 15 60)" />
             </svg>
             <p className="text-[13px] text-[#c5bfae] text-left flex-1 px-2 leading-relaxed">
              A falha na máquina abriu uma costura no tempo. Um vagão do metrô. Um voo comercial. O seu carro. Tudo sendo puxado para 66 milhões de anos no passado.
             </p>
          </div>

          {/* Painel 3: O Meteoro se Aproximando */}
          <div className="w-full bg-[#060906] border border-[#2c3826] rounded-sm p-2 flex flex-col sm:flex-row gap-4 items-center shadow-lg mb-6">
             <svg width="100" height="100" viewBox="0 0 100 100" className="flex-shrink-0 bg-[#030504] border border-[#1b2b1e]">
               <path d="M 0,100 L 0,70 Q 25,50 50,80 T 100,60 L 100,100 Z" fill="#060906" />
               {/* Sol Normal */}
               <circle cx="25" cy="35" r="10" fill="#e0d8c3" opacity="0.5" />
               {/* Meteoro */}
               <circle cx="75" cy="25" r="18" fill="#e57a3b" opacity="0.9" />
               <circle cx="75" cy="25" r="6" fill="#ffffff" />
               <line x1="75" y1="25" x2="100" y2="0" stroke="#e57a3b" strokeWidth="6" opacity="0.5" />
             </svg>
             <p className="text-[13px] text-[#c5bfae] text-left flex-1 px-2 leading-relaxed">
              O céu tem dois sois. Um deles é maior a cada dia. Você sente que não tem muito tempo.
             </p>
          </div>
          <button`;

content = content.replace(regex, newIntro);

fs.writeFileSync(file, content);
