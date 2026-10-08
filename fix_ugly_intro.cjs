const fs = require('fs');

let file = 'src/App.tsx';
let content = fs.readFileSync(file, 'utf8');

// Vou substituir os painéis antigos pelos novos e aprimorados
const regex = /\{\/\* Painel 1: O Teste de Ressonância \(Laboratório escuro\) \*\/\}[\s\S]*?<\/button>/m;

const newIntro = `{/* Painel 1: O Teste de Ressonância (Interface do Radar/Máquina) */}
          <div className="w-full bg-[#060906] border border-[#2c3826] rounded-sm p-2 flex flex-col sm:flex-row gap-4 items-center shadow-lg">
            <svg width="100" height="100" viewBox="0 0 100 100" className="flex-shrink-0 bg-[#030504] border border-[#1b2b1e]">
               {/* Radar/Interface Sci-Fi */}
               <circle cx="50" cy="50" r="40" fill="none" stroke="#1b2b1e" strokeWidth="2" />
               <circle cx="50" cy="50" r="30" fill="none" stroke="#2c3826" strokeWidth="2" strokeDasharray="5 5" />
               <circle cx="50" cy="50" r="20" fill="none" stroke="#4a8270" strokeWidth="1" />
               
               {/* Centro de Energia */}
               <circle cx="50" cy="50" r="8" fill="#a4fca2" className="animate-pulse" opacity="0.9" />
               <circle cx="50" cy="50" r="3" fill="#ffffff" />
               
               {/* Anomalia detectada (Ponteiro) */}
               <line x1="50" y1="50" x2="80" y2="20" stroke="#a4fca2" strokeWidth="2" opacity="0.8" />
               <circle cx="80" cy="20" r="4" fill="#e57a3b" className="animate-pulse" />
               <circle cx="80" cy="20" r="10" fill="#e57a3b" opacity="0.3" />
            </svg>
            <p className="text-[13px] text-[#8fd16a] italic text-left flex-1 px-2 font-mono">
              "Projeto TÊMPORA. Teste de ressonância número 40."
            </p>
          </div>

          {/* Painel 2: A Fenda Puxando o Mundo */}
          <div className="w-full bg-[#060906] border border-[#2c3826] rounded-sm p-2 flex flex-col sm:flex-row-reverse gap-4 items-center shadow-lg">
             <svg width="100" height="100" viewBox="0 0 100 100" className="flex-shrink-0 bg-[#030504] border border-[#1b2b1e]">
               {/* O Rasgo no Espaço-Tempo (Fluido e orgânico) */}
               <path d="M 40,10 C 70,30 20,60 50,90 C 80,60 70,30 60,10 Z" fill="#4a8270" opacity="0.4" />
               <path d="M 45,20 C 60,35 35,55 50,80 C 65,55 60,35 55,20 Z" fill="#a4fca2" opacity="0.8" />
               
               {/* Silhueta de carro caindo (mais definida) */}
               <g transform="translate(25, 45) rotate(30)">
                 <rect x="-10" y="-5" width="20" height="8" rx="2" fill="#030504" />
                 <rect x="-5" y="-10" width="10" height="5" rx="1" fill="#030504" />
                 <circle cx="-6" cy="3" r="2.5" fill="#131a12" />
                 <circle cx="6" cy="3" r="2.5" fill="#131a12" />
               </g>

               {/* Detritos / Pedaço de asfalto caindo */}
               <polygon points="75,55 85,50 90,60 80,65" fill="#060906" transform="rotate(-15 80 55)" />
             </svg>
             <p className="text-[13px] text-[#c5bfae] text-left flex-1 px-2 leading-relaxed">
              A falha na máquina abriu uma costura no tempo. Um vagão do metrô. Um voo comercial. O seu carro. Tudo sendo puxado para 66 milhões de anos no passado.
             </p>
          </div>

          {/* Painel 3: O Meteoro se Aproximando */}
          <div className="w-full bg-[#060906] border border-[#2c3826] rounded-sm p-2 flex flex-col sm:flex-row gap-4 items-center shadow-lg mb-6">
             <svg width="100" height="100" viewBox="0 0 100 100" className="flex-shrink-0 bg-[#030504] border border-[#1b2b1e]">
               {/* Chão e Floresta (Terreno acidentado) */}
               <path d="M 0,100 L 0,75 C 30,65 70,85 100,70 L 100,100 Z" fill="#060906" />
               
               {/* Árvores escuras no horizonte */}
               <polygon points="15,80 20,50 25,80" fill="#030504" />
               <polygon points="35,85 40,60 45,85" fill="#030504" />
               <polygon points="80,75 85,45 90,75" fill="#030504" />

               {/* O Meteoro Devastador caindo */}
               <path d="M 50,10 Q 75,-10 95,0 Q 80,20 80,30 Z" fill="#ffb84d" opacity="0.3" />
               <circle cx="70" cy="30" r="18" fill="#e57a3b" opacity="0.4" />
               <circle cx="70" cy="30" r="12" fill="#e57a3b" />
               <circle cx="72" cy="28" r="4" fill="#ffffff" opacity="0.9" />
               <path d="M 62,22 Q 40,-5 90,-5 Q 85,15 78,25 Z" fill="#e57a3b" opacity="0.6" />

               {/* O Sol Normal pálido no canto */}
               <circle cx="20" cy="40" r="6" fill="#e0d8c3" opacity="0.7" />
             </svg>
             <p className="text-[13px] text-[#c5bfae] text-left flex-1 px-2 leading-relaxed">
              O céu tem dois sois. Um deles é maior a cada dia. Você sente que não tem muito tempo.
             </p>
          </div>
          <button`;

content = content.replace(regex, newIntro);
fs.writeFileSync(file, content);
