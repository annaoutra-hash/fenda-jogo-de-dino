import type { Biome } from '../types';

interface CardArtProps {
  biome: Biome;
  silhouette: string;
}

export function CardArt({ biome, silhouette }: CardArtProps) {
  const renderBiome = () => {
    switch (biome) {
      case 'noite':
        return (
          <>
            <rect width="200" height="200" fill="#0a100c" />
            <circle cx="160" cy="35" r="18" fill="#e0d8c3" opacity="0.1" />
            <circle cx="160" cy="35" r="8" fill="#e0d8c3" opacity="0.2" />
            <polygon points="0,200 45,115 105,160 155,100 200,150 200,200" fill="#131c15" />
            <polygon points="-10,200 20,160 60,185 110,145 150,185 200,155 210,200" fill="#1b261c" opacity="0.8" />
            <rect x="0" y="175" width="200" height="25" fill="#080c09" />
          </>
        );
      case 'ruinas':
        return (
          <>
            <rect width="200" height="200" fill="#111613" />
            <rect x="20" y="70" width="40" height="130" transform="rotate(7 20 70)" fill="#1a241e" opacity="0.8" />
            <rect x="125" y="50" width="50" height="150" transform="rotate(-5 125 50)" fill="#202e26" opacity="0.8" />
            <line x1="10" y1="120" x2="190" y2="140" stroke="#4a8270" strokeWidth="2.5" opacity="0.4" />
            <line x1="40" y1="80" x2="160" y2="160" stroke="#4a8270" strokeWidth="1.5" opacity="0.3" strokeDasharray="4 4" />
            <rect x="0" y="175" width="200" height="25" fill="#0c110e" />
          </>
        );
      case 'rio':
        return (
          <>
            <rect width="200" height="200" fill="#0f1714" />
            <polygon points="0,60 85,130 0,200" fill="#18231c" />
            <polygon points="200,50 125,135 200,200" fill="#18231c" />
            <path d="M 40,165 Q 100,150 160,170 L 190,200 L 10,200 Z" fill="#1c332e" opacity="0.9" />
            <path d="M 60,178 Q 100,168 140,182" stroke="#4a8270" strokeWidth="2" fill="none" opacity="0.6" />
            <path d="M 80,188 Q 110,180 150,192" stroke="#4a8270" strokeWidth="1.5" fill="none" opacity="0.4" />
          </>
        );
      case 'tempestade':
        return (
          <>
            <rect width="200" height="200" fill="#0f1a14" />
            <path d="M 0,0 L 200,0 L 200,65 Q 160,85 120,60 Q 80,80 40,65 Q 15,75 0,60 Z" fill="#1a2b20" />
            <polyline points="115,40 108,75 118,82 102,125 108,130 95,160" stroke="#e0d8c3" strokeWidth="1.5" fill="none" opacity="0.85" />
            <circle cx="102" cy="125" r="6" fill="#e0d8c3" opacity="0.2" />
            <polygon points="0,200 45,145 95,170 155,135 200,175 200,200" fill="#121c15" />
            <rect x="0" y="180" width="200" height="20" fill="#090e0a" />
          </>
        );
      case 'selva':
      default:
        return (
          <>
            <rect width="200" height="200" fill="#131a12" />
            <polygon points="0,200 25,115 55,165 95,90 135,160 175,105 200,155 200,200" fill="#1d2719" opacity="0.8" />
            <polygon points="-10,200 20,145 65,180 115,130 155,180 210,125 210,200" fill="#293623" opacity="0.7" />
            <rect x="0" y="175" width="200" height="25" fill="#0c120c" />
          </>
        );
    }
  };

  const renderSilhouette = () => {
    switch (silhouette) {
      // PTEROSSAURO (Aprovado: crista, envergadura e bico)
      case 'ptero':
        return (
          <g transform="translate(10, 10)">
            <path d="M 90,85 Q 60,65 25,45 Q 45,75 75,98 Q 85,95 90,85 Z" fill="#060906" />
            <path d="M 95,85 Q 125,60 165,38 Q 145,72 108,98 Q 100,92 95,85 Z" fill="#060906" />
            <path d="M 88,80 Q 95,75 100,82 Q 98,105 94,115 Q 90,105 88,80 Z" fill="#060906" />
            <path d="M 92,78 Q 90,65 92,58 L 98,58 Q 98,68 96,78 Z" fill="#060906" />
            <path d="M 92,58 L 84,40 L 93,52 L 115,62 L 98,64 L 112,68 L 94,66 Z" fill="#060906" />
            <circle cx="95" cy="59" r="1.5" fill="#e57a3b" />
            <circle cx="95" cy="59" r="3.5" fill="#e57a3b" opacity="0.3" />
          </g>
        );

      // NOVO TIRANOSSAURO REX: Silhueta nítida de perfil (crânio pesado, mandíbula forte, dentes pontiagudos e postura horizontal)
      case 'alfa':
        return (
          <g>
            {/* O Predador Alfa - Corpo Inteiro Massivo T-Rex */}
            
            {/* Sombras da selva no fundo e céu noturno */}
            <path d="M 0,200 L 0,80 Q 20,40 50,60 T 120,40 T 200,80 L 200,200 Z" fill="#030504" />
            <circle cx="100" cy="80" r="80" fill="#e0d8c3" opacity="0.03" />

            {/* O Tiranossauro Inteiro, andando imponente da esquerda para a direita */}
            <g transform="translate(10, 40)">
              {/* Cauda pesada esticada atrás balanceando */}
              <path d="M 60,65 Q -10,80 -20,130 Q 20,110 50,85 Z" fill="#060906" />
              
              {/* Perna traseira esquerda (fincada no chão) */}
              <path d="M 40,65 C 20,100 20,120 30,150 L 50,150 Q 60,110 70,80 Z" fill="#030504" />
              <path d="M 30,150 L 15,155 L 25,160 L 50,150 Z" fill="#030504" /> {/* Pé/Garras */}

              {/* Corpo central robusto (o 'barril' do T-Rex) */}
              <ellipse cx="80" cy="70" rx="45" ry="25" fill="#060906" />
              
              {/* Perna traseira direita (levantando para o próximo passo) */}
              <path d="M 70,70 C 60,110 70,120 90,130 L 105,120 Q 100,100 110,80 Z" fill="#0a0f0a" />
              {/* Pé direito flexionado com garras grossas */}
              <path d="M 90,130 L 75,135 L 85,140 L 110,130 Z" fill="#060906" />
              
              {/* Bracinho minúsculo inútil pendurado no peito */}
              <path d="M 110,80 Q 120,100 115,105" fill="none" stroke="#030504" strokeWidth="5" strokeLinecap="round" />
              <path d="M 115,105 L 112,112 M 115,105 L 118,112" fill="none" stroke="#030504" strokeWidth="2" strokeLinecap="round" />
              
              {/* Pescoço extremamente espesso projetado para frente e para cima */}
              <path d="M 100,55 C 130,30 150,10 160,0 C 120,10 100,30 80,55 Z" fill="#060906" />
              
              {/* Crânio Gigante e quadrado */}
              <path d="M 140,-5 Q 170,-20 190,0 Q 190,15 160,20 L 140,15 Z" fill="#060906" />
              <path d="M 145,15 Q 170,20 185,35 Q 150,30 135,20 Z" fill="#0a0f0a" /> {/* Mandíbula Inferior caindo */}
              
              {/* Dentes irregulares da morte (superiores) */}
              <polygon points="155,18 157,25 159,18" fill="#e0d8c3" />
              <polygon points="165,16 167,23 169,16" fill="#e0d8c3" />
              <polygon points="175,12 177,20 179,12" fill="#e0d8c3" />
              <polygon points="183,7 185,13 187,7" fill="#e0d8c3" />

              {/* Dentes mandibula inferior */}
              <polygon points="150,26 152,19 154,27" fill="#e0d8c3" />
              <polygon points="160,30 162,24 164,31" fill="#e0d8c3" />
              <polygon points="170,33 172,27 174,34" fill="#e0d8c3" />

              {/* Olho predatório impiedoso */}
              <circle cx="155" cy="5" r="1.5" fill="#e57a3b" />
              <circle cx="155" cy="5" r="4" fill="#e57a3b" opacity="0.3" />
              <line x1="155" y1="3" x2="155" y2="7" stroke="#000" strokeWidth="1" />
              
              {/* Baba ácida/fome escorrendo da boca */}
              <path d="M 180,25 L 180,55 M 170,30 L 170,50 M 155,25 L 155,45" stroke="#a4fca2" strokeWidth="1" opacity="0.7" strokeDasharray="2 3" />
            </g>

            {/* Tremores sísmicos no solo - Efeito de impacto do passo */}
            <ellipse cx="60" cy="195" rx="30" ry="2" fill="none" stroke="#e0d8c3" strokeWidth="1.5" opacity="0.3" />
            <ellipse cx="60" cy="195" rx="50" ry="5" fill="none" stroke="#e0d8c3" strokeWidth="1" opacity="0.1" />
            <ellipse cx="60" cy="195" rx="70" ry="10" fill="none" stroke="#e0d8c3" strokeWidth="0.5" opacity="0.05" />

            {/* Névoa pesada cruzando as pernas do monstro */}
            <path d="M 0,200 Q 50,150 100,180 T 200,160 L 200,200 Z" fill="#030504" opacity="0.8" />
            <path d="M 0,200 Q 80,160 140,190 T 200,170 L 200,200 Z" fill="#e0d8c3" opacity="0.05" />
          </g>
        );

      // NOVO SOBREVIVENTE: Náufrago humano com mochila, casaco/capuz, bastão de caminhada e relógio
      case 'corpo_batedor':
        return (
          <g>
            {/* Terreno de selva escuro */}
            <path d="M 0,200 L 200,200 L 200,165 Q 100,155 0,165 Z" fill="#0a0f0a" />
            
            {/* Tronco colossal e sapopemas da sumaúma (arcos sólidos, não linhas grossas) */}
            <path d="M 0,0 L 50,0 Q 60,60 120,180 L 0,200 Z" fill="#131a12" />
            <path d="M 30,0 Q 40,60 180,170 L 180,200 L 0,200 Z" fill="#060906" />
            <path d="M 10,0 Q 20,80 90,180 L 0,200 Z" fill="#1a241e" opacity="0.4" />
            
            {/* Raízes retorcidas formando um pequeno ninho no chão à direita */}
            <path d="M 150,200 Q 180,140 220,110 L 220,200 Z" fill="#060906" />
            <path d="M 110,200 Q 140,165 190,165 Q 210,165 220,175 L 220,200 Z" fill="#131a12" />

            {/* O Batedor morto recostado na raiz central */}
            <g transform="translate(130, 165)">
              {/* Pernas estiradas */}
              <path d="M 15,25 L -20,25 L -40,15 L -55,20" fill="none" stroke="#060906" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
              {/* Tronco inclinado para trás encostado na árvore */}
              <path d="M -20,25 L -40,5 L -30,0 L -10,20 Z" fill="#060906" />
              {/* Braço caído sobre o tronco */}
              <path d="M -30,5 L -5,15" fill="none" stroke="#060906" strokeWidth="6" strokeLinecap="round" />
              {/* Cabeça pendendo para trás */}
              <circle cx="-38" cy="-5" r="7.5" fill="#060906" />
              
              {/* A Mochila com o identificador brilhante ao lado dele */}
              <rect x="-10" y="10" width="18" height="15" rx="3" fill="#1a241e" />
              <rect x="-5" y="10" width="8" height="15" rx="1" fill="#131a12" />
              
              {/* LED Brilhante do identificador (pulsando na escuridão) */}
              <circle cx="-1" cy="17" r="5" fill="#e57a3b" opacity="0.3" />
              <circle cx="-1" cy="17" r="2.5" fill="#e57a3b" opacity="0.9" />
              <circle cx="-1" cy="17" r="1" fill="#e0d8c3" />
              
              {/* Lança de sobrevivência, jogada no chão */}
              <line x1="-50" y1="32" x2="35" y2="28" stroke="#4a8270" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="30" y1="28" x2="38" y2="27" stroke="#e0d8c3" strokeWidth="1.5" />
            </g>
          </g>
        );

      case 'sobrevivente_encostado':
        return (
          <g>
            {/* Tronco da árvore gigante na direita */}
            <rect x="150" y="30" width="50" height="170" fill="#131a12" />
            <path d="M 150,200 Q 140,160 155,100" fill="none" stroke="#060906" strokeWidth="10" strokeLinecap="round" />
            <path d="M 130,200 Q 145,180 150,150" fill="none" stroke="#060906" strokeWidth="6" strokeLinecap="round" />

            {/* Terreno */}
            <path d="M 0,200 L 200,200 L 200,195 Q 100,185 0,195 Z" fill="#0a0f0a" />

            {/* Sobrevivente de perfil, sentado/encostado */}
            {/* Corpo e pernas dobradas */}
            <path d="M 150,155 L 120,155 L 95,185 L 95,195 L 150,195 Z" fill="#060906" />
            
            {/* Colete salva-vidas inflável (desbotado) */}
            <path d="M 145,145 L 115,150 Q 110,165 115,180 L 145,180 Z" fill="#e57a3b" opacity="0.6" />
            <rect x="120" y="155" width="10" height="20" fill="#060906" opacity="0.4" />
            
            {/* Braço cansado pendurado sobre o joelho levantado */}
            <path d="M 130,150 Q 110,170 90,170 L 85,180" fill="none" stroke="#060906" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
            
            {/* Cabeça tombada pra frente */}
            <circle cx="125" cy="135" r="11" fill="#060906" />
          </g>
        );

      case 'sobrevivente':
        return (
          <g transform="translate(10, 0)">
            {/* Mochila volumosa nas costas */}
            <rect x="70" y="105" width="22" height="34" rx="6" fill="#060906" transform="rotate(-8 70 105)" />
            
            {/* Cabeça e capuz esfarrapado */}
            <circle cx="98" cy="85" r="11" fill="#060906" />
            <path d="M 88,86 C 88,72 108,72 108,86 Z" fill="#060906" />

            {/* Tronco com jaqueta e calça de campo */}
            <path
              d="
                M 88,96
                L 112,96
                L 110,135
                L 114,175
                L 104,175
                L 100,140
                L 94,175
                L 84,175
                L 86,132
                Z
              "
              fill="#060906"
            />

            {/* Braço segurando bastão/cajado */}
            <path d="M 90,102 L 80,125 L 85,130 L 96,110 Z" fill="#060906" />
            
            {/* Cajado/Lança de apoio de madeira */}
            <line x1="78" y1="80" x2="74" y2="175" stroke="#060906" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="78" y1="80" x2="74" y2="175" stroke="#4a8270" strokeWidth="1" opacity="0.6" />

            {/* Relógio digital sobrevivente piscando luz âmbar no pulso */}
            <circle cx="83" cy="127" r="2.5" fill="#e57a3b" />
            <circle cx="83" cy="127" r="6" fill="#e57a3b" opacity="0.3" />
          </g>
        );

      // VELOCIRAPTOR
      case 'raptor':
        return (
          <g>
            <path
              d="
                M 25,160
                Q 50,140 85,130
                Q 110,122 125,105
                Q 135,90 148,82
                L 172,78
                L 155,86
                L 170,92
                L 142,95
                Q 130,105 125,120
                L 135,145
                L 138,175
                L 128,175
                L 126,150
                Q 115,140 105,142
                Q 80,150 40,168
                Z
              "
              fill="#060906"
            />
            <path d="M 125,115 L 140,125 L 138,132 L 122,122 Z" fill="#060906" />
            <path d="M 128,168 Q 120,160 122,152 Q 125,155 130,166 Z" fill="#e0d8c3" />
            <circle cx="150" cy="83" r="2.5" fill="#e57a3b" />
            <circle cx="150" cy="83" r="5" fill="#e57a3b" opacity="0.35" />
          </g>
        );

      case 'cuspidor':
        return (
          <g>
            {/* Terreno plano e lama */}
            <path d="M 0,200 L 200,200 L 200,185 Q 100,175 0,185 Z" fill="#0a0f0a" />
            
            {/* Colar de pele (Frill) arrepiado atrás do pescoço (camadas laranja) */}
            <g strokeLinejoin="round">
              {/* Fundo (maior) */}
              <path d="M 60,115 L 75,60 Q 70,85 85,75 Q 75,95 100,90 Q 80,110 105,120 Q 80,120 100,145 Q 75,135 75,160 Z" fill="#1a241e" stroke="#e57a3b" strokeWidth="1.5" />
              {/* Camada média (laranja queimado) */}
              <path d="M 60,115 L 72,70 Q 68,85 80,78 Q 72,95 90,92 Q 78,110 95,120 Q 78,120 90,135 Q 72,130 70,145 Z" fill="#b05c2a" opacity="0.9" />
              {/* Camada interna (laranja vivo) */}
              <path d="M 60,115 L 68,75 Q 65,85 75,82 Q 68,95 82,95 Q 72,110 85,120 Q 72,120 80,130 Q 65,128 65,140 Z" fill="#e57a3b" opacity="0.9" />
            </g>
            
            {/* Corpo, pescoço e cauda perfeitamente conectados */}
            <path d="M 55,105 
                     Q 70,120 90,140
                     Q 110,140 130,135
                     Q 170,125 210,160
                     L 210,170
                     Q 170,165 140,175
                     Q 110,175 90,160
                     Q 70,140 50,115 Z" fill="#060906" />
            
            {/* Pernas */}
            <path d="M 120,150 L 110,190 L 95,190" fill="none" stroke="#060906" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 135,145 L 130,185 L 120,185" fill="none" stroke="#0a0f0a" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            
            {/* Cabeça de perfil perfeitamente conectada no pescoço (55, 105) */}
            <ellipse cx="50" cy="108" rx="15" ry="8" fill="#060906" transform="rotate(-20 50 108)" />
            
            {/* Crista dupla no topo do focinho */}
            <path d="M 50,100 Q 45,90 35,100 Z" fill="#060906" />
            
            {/* Mandíbula inferior aberta e sibilando */}
            <path d="M 55,115 L 40,125 L 30,120 Z" fill="#060906" />

            {/* Olho reptiliano */}
            <circle cx="48" cy="106" r="2.5" fill="#e57a3b" />
            <circle cx="48" cy="106" r="1" fill="#060906" />
            
            {/* Jato de Veneno Tóxico (Neon Verde) saindo direto da boca aberta (35,120) */}
            <path d="M 35,120 Q 30,140 38,190" fill="none" stroke="#39ff14" strokeWidth="4" strokeLinecap="round" opacity="0.9" />
            <path d="M 35,120 Q 25,150 42,190" fill="none" stroke="#a4fca2" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
            <circle cx="30" cy="145" r="2.5" fill="#39ff14" />
            <circle cx="45" cy="165" r="2" fill="#39ff14" opacity="0.8" />
            <ellipse cx="38" cy="190" rx="15" ry="3" fill="#39ff14" opacity="0.7" />
            <ellipse cx="38" cy="190" rx="8" ry="1.5" fill="#a4fca2" opacity="0.9" />
          </g>
        );

      // COMPSOGNATOS
      case 'compy':
        return (
          <g>
            <path
              d="M 65,172 Q 80,155 95,152 Q 105,138 112,142 L 122,140 L 115,146 Q 105,148 102,158 L 102,174 L 97,174 L 95,162 Q 82,162 65,172 Z"
              fill="#060906"
            />
            <circle cx="114" cy="142" r="1.5" fill="#e57a3b" />
            <path
              d="M 120,174 Q 135,160 148,162 Q 155,155 165,165 L 170,172 L 164,172 Q 158,166 150,168 L 148,175 Z"
              fill="#060906"
            />
            <circle cx="163" cy="164" r="1.5" fill="#e57a3b" />
            <path
              d="M 35,175 Q 45,162 55,160 Q 62,150 68,154 L 74,152 L 70,158 Q 62,158 55,175 Z"
              fill="#060906"
              opacity="0.7"
            />
          </g>
        );

      // CARCAÇA DE TRICERÁTOPO
      case 'carcaca':
        return (
          <g>
            <path d="M 35,170 Q 75,130 140,160 L 135,175 Q 80,145 40,175 Z" fill="#060906" />
            <path d="M 65,142 Q 70,165 68,175" stroke="#e0d8c3" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 82,138 Q 88,162 85,175" stroke="#e0d8c3" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 98,140 Q 104,162 102,175" stroke="#e0d8c3" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 135,160 Q 155,135 170,145 Q 165,165 150,172 Z" fill="#e0d8c3" opacity="0.85" />
            <polygon points="152,142 178,122 160,152" fill="#e0d8c3" />
          </g>
        );


      // METRÔ
      case 'metro':
        return (
          <g>
            {/* Barranco rochoso escuro no fundo */}
            <polygon points="0,200 40,80 100,120 160,50 200,90 200,200" fill="#060906" />
            <polygon points="0,150 70,200 200,160 200,200 0,200" fill="#0a0f0a" />
            
            {/* Vagão de Metrô da Linha Azul (entalado e inclinado) */}
            <g transform="rotate(-18 100 120) translate(0, 10)">
              {/* Teto e frente em perspectiva isométrica leve */}
              {/* Corpo Lateral (Aço Azul Desbotado) */}
              <polygon points="30,70 180,70 180,140 30,140" fill="#2c3c4a" stroke="#1c242c" strokeWidth="2" />
              {/* Listra Azul Clássica de metrô no meio da lataria */}
              <rect x="30" y="115" width="150" height="8" fill="#4a82a0" opacity="0.8" />
              
              {/* Teto Sujo */}
              <polygon points="40,55 190,55 180,70 30,70" fill="#1c242c" />
              {/* Caixas de Ar Condicionado no teto */}
              <rect x="60" y="48" width="25" height="7" fill="#131a12" />
              <rect x="130" y="48" width="25" height="7" fill="#131a12" />

              {/* Frente do Trem (Cabine do Maquinista) */}
              <polygon points="30,70 40,55 40,125 30,140" fill="#1a2530" />
              <polygon points="30,80 37,70 37,95 30,105" fill="#060906" />

              {/* Janelas Escuras Quebradas na Lateral */}
              <rect x="50" y="80" width="20" height="25" rx="2" fill="#060906" />
              <rect x="80" y="80" width="20" height="25" rx="2" fill="#060906" />
              <rect x="140" y="80" width="20" height="25" rx="2" fill="#060906" />
              
              {/* Porta Dupla Entreaberta */}
              <rect x="108" y="75" width="24" height="65" fill="#1c242c" stroke="#060906" strokeWidth="1" />
              <rect x="110" y="80" width="8" height="20" fill="#060906" />
              <rect x="122" y="80" width="8" height="20" fill="#060906" />
              {/* Fenda da porta aberta (escuridão revelando dentro) */}
              <rect x="118" y="75" width="4" height="65" fill="#060906" />

              {/* Base do chassi/rodeiros nas sombras */}
              <rect x="40" y="140" width="130" height="15" fill="#0a0f0a" />
              <circle cx="60" cy="148" r="5" fill="#060906" stroke="#131a12" strokeWidth="1" />
              <circle cx="80" cy="148" r="5" fill="#060906" stroke="#131a12" strokeWidth="1" />
              
              {/* Cipós Jurássicos Enrolando e Rasgando o Vagão */}
              <path d="M 20,40 Q 60,60 55,100 T 50,150" fill="none" stroke="#2c3826" strokeWidth="4" />
              <path d="M 120,40 Q 140,80 110,120 T 140,160" fill="none" stroke="#4a8270" strokeWidth="3" opacity="0.8" />
              <path d="M 170,40 Q 190,70 175,100 T 170,160" fill="none" stroke="#131a12" strokeWidth="5" />
            </g>

            {/* Pedras, Entulho e Mais Cipós em primeiro plano para dar contexto */}
            <polygon points="0,170 60,140 100,190 40,200" fill="#131a12" />
            <path d="M 0,160 Q 40,140 80,200" fill="none" stroke="#2c3826" strokeWidth="6" />
            
            {/* Lente de uma lanterna humana morta / farol apagado no cho dando clima */}
            <circle cx="30" cy="170" r="3" fill="#e0d8c3" opacity="0.4" />
            <path d="M 27,173 L 33,167" stroke="#0a0f0a" strokeWidth="1" />
          </g>
        );

      // PLANTAS
      case 'palmeiras':
        return (
          <g>
            {/* Vegetação densa na base */}
            <path d="M 0,200 L 20,180 Q 100,150 200,180 L 200,200 Z" fill="#0a0f0a" />
            <path d="M 10,200 Q 50,170 110,200" fill="none" stroke="#131a12" strokeWidth="8" />

            {/* Palmeira Esquerda (menor, ao fundo) */}
            {/* Tronco escamado escuro */}
            <path d="M 55,190 L 70,100 L 80,190 Z" fill="#060906" />
            <path d="M 70,190 L 70,100 L 80,190 Z" fill="#131a12" opacity="0.4" />
            
            {/* Coroa de folhas de samambaia/cicadácea saindo de (70, 100) */}
            <g fill="none" strokeLinecap="round">
              <path d="M 70,100 Q 20,80 15,140" stroke="#1a241e" strokeWidth="4" />
              <path d="M 70,100 Q 30,50 10,70" stroke="#2c3826" strokeWidth="3" />
              <path d="M 70,100 Q 60,30 80,40" stroke="#131a12" strokeWidth="3" />
              <path d="M 70,100 Q 90,40 120,60" stroke="#2c3826" strokeWidth="4" />
              <path d="M 70,100 Q 110,90 120,130" stroke="#1a241e" strokeWidth="4" />
              {/* Folhas extras para volume no centro */}
              <path d="M 70,100 Q 40,70 30,110" stroke="#060906" strokeWidth="4" />
              <path d="M 70,100 Q 100,60 105,100" stroke="#131a12" strokeWidth="5" />
              <path d="M 70,100 Q 75,50 95,70" stroke="#060906" strokeWidth="5" />
              <path d="M 70,100 Q 50,60 40,80" stroke="#131a12" strokeWidth="4" />
            </g>
            {/* Cone de sementes / Fruto central */}
            <ellipse cx="70" cy="98" rx="7" ry="10" fill="#e57a3b" opacity="0.9" />
            <circle cx="68" cy="95" r="2" fill="#e0d8c3" opacity="0.3" />

            {/* Palmeira Direita (maior e mais próxima) */}
            {/* Tronco */}
            <path d="M 120,200 L 140,80 L 165,200 Z" fill="#131a12" />
            <path d="M 140,200 L 140,80 L 165,200 Z" fill="#060906" opacity="0.5" />
            
            {/* Coroa de folhas espalhada em leque a partir de (140, 80) */}
            <g fill="none" strokeLinecap="round">
              <path d="M 140,80 Q 90,60 80,120" stroke="#1a241e" strokeWidth="5" />
              <path d="M 140,80 Q 100,30 70,40" stroke="#2c3826" strokeWidth="4" />
              <path d="M 140,80 Q 130,-10 160,10" stroke="#060906" strokeWidth="4" />
              <path d="M 140,80 Q 170,20 210,40" stroke="#131a12" strokeWidth="5" />
              <path d="M 140,80 Q 190,80 200,130" stroke="#1a241e" strokeWidth="5" />
              
              {/* Preenchimento interno do leque */}
              <path d="M 140,80 Q 110,40 90,80" stroke="#131a12" strokeWidth="6" />
              <path d="M 140,80 Q 160,30 180,70" stroke="#2c3826" strokeWidth="5" />
              <path d="M 140,80 Q 120,10 145,30" stroke="#060906" strokeWidth="6" />
              <path d="M 140,80 Q 150,15 175,35" stroke="#1a241e" strokeWidth="5" />
              <path d="M 140,80 Q 135,40 115,60" stroke="#060906" strokeWidth="4" />
            </g>
            
            {/* Cone gigante / Fruto central */}
            <ellipse cx="140" cy="76" rx="9" ry="14" fill="#e57a3b" opacity="0.9" />
            <ellipse cx="136" cy="73" rx="3" ry="5" fill="#e0d8c3" opacity="0.4" />
          </g>
        );

      case 'plantas':
        return (
          <g>
            {/* Arbusto detalhado com folhas e galhos */}
            {/* Folhagens no fundo, desenhadas com pontas denteadas simulando folhas reais */}
            <path d="M 20,200 
                     Q 20,150 40,120 Q 50,110 50,130 Q 60,100 80,100
                     Q 100,90 100,120 Q 120,80 140,110 Q 150,90 160,110
                     Q 180,130 190,160 Q 200,190 200,200 Z" 
                  fill="#0a0f0a" />

            <path d="M 40,200 
                     Q 40,160 60,140 Q 75,130 75,150 Q 80,110 110,130
                     Q 130,120 130,140 Q 140,110 170,130 Q 180,160 180,200 Z" 
                  fill="#131a12" />

            <path d="M 60,200 
                     Q 60,170 80,160 Q 95,150 95,170 Q 110,140 130,160
                     Q 150,170 150,200 Z" 
                  fill="#1a241e" />

            {/* Galhos finos saindo da folhagem */}
            <path d="M 100,200 Q 110,140 85,115" fill="none" stroke="#060906" strokeWidth="4" strokeLinecap="round" />
            <path d="M 120,200 Q 115,160 145,120" fill="none" stroke="#060906" strokeWidth="3" strokeLinecap="round" />
            <path d="M 60,200 Q 70,170 45,130" fill="none" stroke="#060906" strokeWidth="3" strokeLinecap="round" />
            <path d="M 150,200 Q 160,170 185,145" fill="none" stroke="#060906" strokeWidth="2.5" strokeLinecap="round" />
            
            {/* Folhinhas soltas na ponta dos galhos */}
            <path d="M 85,115 Q 75,115 80,125 Z M 145,120 Q 155,120 150,130 Z M 45,130 Q 35,130 40,140 Z M 185,145 Q 195,145 190,155 Z" fill="#131a12" />

            {/* Bagas e Seiva conectadas corretamente aos galhos e folhagens */}
            <g>
              {/* Baga laranja pendurada no galho 1 */}
              <circle cx="85" cy="115" r="3" fill="#e57a3b" />
              <circle cx="85" cy="115" r="7" fill="#e57a3b" opacity="0.3" />
              {/* Baga azul pingando no galho 2 */}
              <circle cx="145" cy="120" r="2.5" fill="#4a8270" />
              <circle cx="145" cy="120" r="6" fill="#4a8270" opacity="0.4" />
              <line x1="145" y1="120" x2="145" y2="135" stroke="#4a8270" strokeWidth="1.5" opacity="0.8" />
              <circle cx="145" cy="135" r="1.5" fill="#4a8270" />
              {/* Baga laranja galho 3 */}
              <circle cx="45" cy="130" r="2.5" fill="#e57a3b" />
              <circle cx="45" cy="130" r="5" fill="#e57a3b" opacity="0.3" />
              {/* Baga laranja galho 4 */}
              <circle cx="185" cy="145" r="2.5" fill="#e57a3b" />
              
              {/* Bagas aninhadas NAS folhas (nas curvinhas) */}
              <circle cx="100" cy="150" r="2" fill="#4a8270" />
              <circle cx="100" cy="150" r="5" fill="#4a8270" opacity="0.3" />
              <circle cx="70" cy="165" r="2" fill="#e57a3b" />
              <circle cx="120" cy="175" r="2.5" fill="#e57a3b" />
              <circle cx="160" cy="180" r="2" fill="#4a8270" />
              
              {/* Fios sutis de seiva escorrendo das folhas */}
              <path d="M 100,150 Q 102,160 100,170" fill="none" stroke="#4a8270" strokeWidth="1" />
              <path d="M 160,180 Q 162,185 160,195" fill="none" stroke="#4a8270" strokeWidth="1.5" opacity="0.8" />
            </g>
          </g>
        );

      // BUNKER
      case 'bunker':
        return (
          <g>
            <circle cx="100" cy="120" r="48" fill="#060906" stroke="#4a8270" strokeWidth="4" />
            <circle cx="100" cy="120" r="38" fill="#131914" stroke="#253526" strokeWidth="2" />
            <circle cx="100" cy="120" r="16" fill="#060906" />
            <line x1="100" y1="85" x2="100" y2="155" stroke="#4a8270" strokeWidth="3" />
            <line x1="65" y1="120" x2="135" y2="120" stroke="#4a8270" strokeWidth="3" />
            <circle cx="100" cy="78" r="3" fill="#e57a3b" />
          </g>
        );

      // RÁDIO
      case 'radio':
        return (
          <g>
            <line x1="100" y1="60" x2="80" y2="180" stroke="#060906" strokeWidth="4" />
            <line x1="100" y1="60" x2="120" y2="180" stroke="#060906" strokeWidth="4" />
            <line x1="88" y1="110" x2="112" y2="110" stroke="#4a8270" strokeWidth="2" />
            <line x1="83" y1="145" x2="117" y2="145" stroke="#4a8270" strokeWidth="2" />
            <circle cx="100" cy="58" r="6" fill="#e57a3b" />
            <circle cx="100" cy="58" r="18" fill="none" stroke="#e57a3b" strokeWidth="1.5" opacity="0.5" />
            <circle cx="100" cy="58" r="32" fill="none" stroke="#e57a3b" strokeWidth="1" opacity="0.25" />
          </g>
        );

      // FENDA
      case 'raptor_noite':
        return (
          <g>
            {/* Céu noturno e montanhas distantes */}
            <path d="M 0,200 L 0,160 Q 100,180 200,160 L 200,200 Z" fill="#030504" />
            <circle cx="100" cy="80" r="40" fill="#e0d8c3" opacity="0.8" />
            <circle cx="100" cy="80" r="50" fill="#e0d8c3" opacity="0.15" />
            <circle cx="100" cy="80" r="60" fill="#e0d8c3" opacity="0.05" />

            {/* Raptor Silhueta Padrão */}
            <defs>
              <g id="raptor-silhueta">
                {/* Corpo e cauda horizontal */}
                <path d="M -10,0 Q 10,-10 30,5 Q 50,15 70,5 Q 40,20 15,15 Q -5,15 -10,0 Z" fill="#060906" />
                {/* Pescoço em S e Cabeça quadradona (velociraptor) */}
                <path d="M 10,2 Q -10,-20 -20,-30 Q -30,-40 -40,-35 L -35,-25 Q -15,-20 0,5 Z" fill="#060906" />
                {/* Braços curtos */}
                <path d="M 5,10 Q -5,15 -10,25" fill="none" stroke="#060906" strokeWidth="2.5" />
                <path d="M -10,25 L -12,30 M -10,25 L -8,30" fill="none" stroke="#060906" strokeWidth="1" />
                {/* Pernas fortes */}
                <path d="M 15,10 Q 30,25 20,40" fill="none" stroke="#060906" strokeWidth="5" />
                <path d="M 20,40 L 15,50 L 10,50" fill="none" stroke="#060906" strokeWidth="3" />
                {/* Garra do pé em foice */}
                <path d="M 15,50 Q 10,40 20,40" fill="none" stroke="#060906" strokeWidth="2" />
                
                {/* Olho com fenda brilhando */}
                <circle cx="-30" cy="-32" r="1.5" fill="#e57a3b" />
                <line x1="-30" y1="-34" x2="-30" y2="-30" stroke="#060906" strokeWidth="1" />
              </g>
            </defs>

            {/* Tres raptores espreitando */}
            {/* Esquerda */}
            <g transform="translate(60, 150) scale(0.65) rotate(5)" opacity="0.8">
              <use href="#raptor-silhueta" fill="#131a12" />
            </g>

            {/* Direita */}
            <g transform="translate(180, 140) scale(-0.7, 0.7) rotate(5)" opacity="0.9">
              <use href="#raptor-silhueta" fill="#0a0f0a" />
            </g>
            
            {/* Raptor Central (Líder) contra a lua */}
            <g transform="translate(105, 160) scale(0.9)">
              <use href="#raptor-silhueta" />
            </g>
            
            {/* Mato escuro no foreground escondendo os pés */}
            <path d="M 0,200 L 0,180 Q 50,160 100,185 T 200,175 L 200,200 Z" fill="#030504" />
          </g>
        );

      case 'olhos_troodonte':
        return (
          <g>
            <path d="M 0,200 L 0,160 Q 100,180 200,160 L 200,200 Z" fill="#030504" />
            
            {/* Fogueira fraca / barraca no centro */}
            <path d="M 80,180 L 100,150 L 120,180 Z" fill="#131a12" opacity="0.8" />
            <ellipse cx="100" cy="180" rx="10" ry="3" fill="#e57a3b" opacity="0.2" />

            {/* Dezenas de olhos brilhantes na escuridão */}
            <g>
              {[
                [40, 150], [30, 130], [50, 110], [150, 140], [170, 120], 
                [160, 160], [20, 160], [130, 110], [70, 100]
              ].map((pos, i) => (
                <g key={i} transform={`translate(${pos[0]}, ${pos[1]})`}>
                  <circle cx="-3" cy="0" r="2" fill="#a4fca2" />
                  <circle cx="3" cy="0" r="2" fill="#a4fca2" />
                  <line x1="-3" y1="-2" x2="-3" y2="2" stroke="#000" strokeWidth="1" />
                  <line x1="3" y1="-2" x2="3" y2="2" stroke="#000" strokeWidth="1" />
                </g>
              ))}
            </g>
          </g>
        );

      case 'ninho_raptor_noite':
        return (
          <g>
            <path d="M 0,200 L 0,160 Q 100,180 200,160 L 200,200 Z" fill="#060906" />
            
            {/* Luar iluminando o ninho */}
            <path d="M 50,0 L 70,170 L 150,170 L 110,0 Z" fill="#e0d8c3" opacity="0.05" />

            {/* Ninho de barro e folhas */}
            <ellipse cx="100" cy="170" rx="40" ry="15" fill="#131a12" />
            <path d="M 60,170 Q 100,150 140,170" fill="none" stroke="#2c3826" strokeWidth="3" />

            {/* Ovo intacto */}
            <ellipse cx="90" cy="165" rx="8" ry="12" fill="#e0d8c3" opacity="0.7" transform="rotate(-15 90 165)" />
            {/* Ovo rachado */}
            <path d="M 110,175 Q 115,160 120,175 Z" fill="#e0d8c3" opacity="0.5" />
            
            {/* Garra do raptor (Pé) pisando perto do ninho, vindo da sombra */}
            <g transform="translate(140, 180) rotate(-20)">
              <line x1="0" y1="0" x2="-10" y2="-20" stroke="#060906" strokeWidth="4" />
              <polygon points="0,0 -15,5 -10,0" fill="#060906" />
              <polygon points="0,0 5,15 2,0" fill="#060906" />
              {/* Garra da foice levantada */}
              <path d="M 0,0 Q -10,-10 -5,-15" fill="none" stroke="#060906" strokeWidth="3" />
            </g>
          </g>
        );

      case 'clareira_vagalumes':
        return (
          <g>
            {/* Céu noturno */}
            <path d="M 0,200 L 0,160 Q 100,180 200,160 L 200,200 Z" fill="#030504" />
            
            {/* Árvore gigante torcida à esquerda enquadrando a cena (Arco de galhos) */}
            <path d="M -10,200 L 30,200 L 40,120 Q 50,50 120,20 Q 60,0 20,40 Q -20,80 -10,200 Z" fill="#060906" />
            <path d="M 40,120 Q 80,100 100,60" fill="none" stroke="#060906" strokeWidth="8" strokeLinecap="round" />
            <path d="M 30,150 Q 70,140 80,110" fill="none" stroke="#060906" strokeWidth="5" strokeLinecap="round" />
            <path d="M 100,60 Q 120,40 140,45" fill="none" stroke="#060906" strokeWidth="4" strokeLinecap="round" />
            
            {/* Moitas e folhagens densas no rodapé */}
            <path d="M 110,200 Q 140,150 170,200 Q 190,140 210,200 Z" fill="#060906" />
            <path d="M 60,200 Q 90,160 120,200 Z" fill="#0a0f0a" />
            
            {/* Samambaias pontudas */}
            <g stroke="#030504" strokeWidth="3" strokeLinecap="round">
              <path d="M 150,200 Q 140,170 130,175" fill="none" />
              <path d="M 170,200 Q 180,160 195,165" fill="none" />
              <path d="M 90,200 Q 95,180 110,185" fill="none" />
            </g>

            {/* Vagalumes minúsculos, espalhados com capricho e de forma Fixa e limpa (Chega de borrões radianos) */}
            {/* Vagalumes verdes (a4fca2) */}
            <g fill="#a4fca2">
              <circle cx="80" cy="150" r="1.5" />
              <circle cx="100" cy="130" r="1.2" />
              <circle cx="110" cy="170" r="1" />
              <circle cx="140" cy="140" r="1.5" />
              <circle cx="160" cy="120" r="1" />
              <circle cx="170" cy="160" r="1.5" />
              <circle cx="190" cy="110" r="1.2" />
              <circle cx="50" cy="110" r="1" />
              <circle cx="60" cy="80" r="1.5" />
              <circle cx="130" cy="90" r="1.2" />
            </g>

            {/* Vagalumes amarelos clarinhos (e0d8c3) */}
            <g fill="#e0d8c3" opacity="0.8">
              <circle cx="90" cy="160" r="1" />
              <circle cx="70" cy="120" r="1" />
              <circle cx="120" cy="150" r="1.5" />
              <circle cx="150" cy="170" r="1" />
              <circle cx="180" cy="130" r="1.2" />
              <circle cx="110" cy="100" r="1" />
              <circle cx="160" cy="90" r="1.5" />
              <circle cx="80" cy="60" r="1" />
            </g>

            {/* Vagalumes pequenininhos ao longe nas sombras (opacidade baixa) */}
            <g fill="#a4fca2" opacity="0.4">
              <circle cx="40" cy="160" r="0.8" />
              <circle cx="180" cy="170" r="0.8" />
              <circle cx="200" cy="140" r="0.8" />
              <circle cx="120" cy="70" r="0.8" />
              <circle cx="140" cy="60" r="0.8" />
              <circle cx="90" cy="50" r="0.8" />
            </g>
          </g>
        );

      case 'espinossauro_noite':
        return (
          <g>
            {/* Luar batendo no pântano */}
            <path d="M 0,200 L 0,160 Q 100,180 200,160 L 200,200 Z" fill="#030504" />
            <circle cx="100" cy="80" r="30" fill="#e0d8c3" opacity="0.1" />
            <circle cx="100" cy="80" r="70" fill="#e0d8c3" opacity="0.03" />
            <path d="M 0,150 L 200,150 L 200,200 L 0,200 Z" fill="#060906" opacity="0.8" /> {/* Água negra do pântano */}
            <ellipse cx="100" cy="160" rx="50" ry="2" fill="#e0d8c3" opacity="0.15" /> {/* Reflexo da lua */}

            {/* Espinossauro cruzando o pântano da esquerda para direita */}
            <g transform="translate(-10, 85)">
              {/* Corpo massivo submerso na água */}
              <ellipse cx="90" cy="65" rx="70" ry="15" fill="#030504" />
              
              {/* Vela Dorsal REAL (Orgânica e arredondada, sem parecer um pente quebrado) */}
              <path d="M 20,65 C 20,-10 130,0 150,65 Z" fill="#030504" />
              <path d="M 20,65 C 20,-10 130,0 150,65 Z" fill="none" stroke="#0a0f0a" strokeWidth="2" />
              
              {/* Pescoço em S grosso e longo saindo da água (lado direito) */}
              <path d="M 140,65 C 165,65 180,20 155,-5" fill="none" stroke="#030504" strokeWidth="18" strokeLinecap="round" />
              
              {/* Focinho alongado de crocodilo */}
              <path d="M 155,-10 Q 190,-15 210,5 Q 180,5 155,5 Z" fill="#030504" />
              <path d="M 160,-2 Q 180,0 210,8 Q 180,15 160,10 Z" fill="#060906" /> {/* Mandíbula inferior aberta */}
              
              {/* Dentes retos de piscívoro brilhando no escuro */}
              <polygon points="175,5 177,10 179,5" fill="#e0d8c3" />
              <polygon points="185,4 187,9 189,4" fill="#e0d8c3" />
              <polygon points="195,3 197,8 199,3" fill="#e0d8c3" />
              <polygon points="205,2 207,6 209,2" fill="#e0d8c3" />

              <polygon points="180,8 182,3 184,8" fill="#e0d8c3" />
              <polygon points="190,9 192,4 194,9" fill="#e0d8c3" />
              <polygon points="200,9 202,5 204,9" fill="#e0d8c3" />

              {/* Olho - Amarelo, sem parecer um gato gordo */}
              <circle cx="165" cy="-2" r="2" fill="#e57a3b" />
              <circle cx="165" cy="-2" r="6" fill="#e57a3b" opacity="0.3" />
              <line x1="165" y1="-4" x2="165" y2="0" stroke="#000" strokeWidth="1.5" />
              
              {/* Braço e Garra grossa de arrastar presa, puxando algo da água */}
              <path d="M 120,65 C 100,85 130,100 145,85" fill="none" stroke="#0a0f0a" strokeWidth="10" strokeLinecap="round" />
              <path d="M 145,85 C 150,85 155,90 150,95" fill="none" stroke="#060906" strokeWidth="5" strokeLinecap="round" />
              <path d="M 150,95 Q 140,110 155,110" fill="none" stroke="#e0d8c3" strokeWidth="2.5" strokeLinecap="round" /> {/* Garra curvada */}
            </g>

            {/* Névoa pesada passando pra cortar e dar perspectiva */}
            <path d="M 0,200 Q 50,140 100,160 T 200,150 L 200,200 Z" fill="#e0d8c3" opacity="0.05" />
          </g>
        );

      case 'mercador_noite':
        return (
          <g>
            {/* Escuridão densa */}
            <path d="M 0,200 L 0,160 Q 100,180 200,160 L 200,200 Z" fill="#030504" />
            <path d="M 0,160 Q 100,140 200,170 L 200,200 L 0,200 Z" fill="#060906" />

            {/* LUZ RADIANTE (O Lampião está sobre as tralhas à direita) */}
            <circle cx="120" cy="120" r="100" fill="#e57a3b" opacity="0.06" />
            <circle cx="120" cy="120" r="50" fill="#ffb84d" opacity="0.1" />
            <circle cx="120" cy="120" r="25" fill="#ffb84d" opacity="0.25" />

            {/* O TRENÓ DE MADEIRA COM SUCATA (Bem claro e assentado) */}
            <g transform="translate(100, 150)">
              {/* Base do trenó inclinada descansando na lama */}
              <polygon points="-10,5 60,0 70,25 -20,30" fill="#030504" />
              <line x1="-15" y1="20" x2="65" y2="15" stroke="#0a0f0a" strokeWidth="2" />
              
              {/* Caixas e sacos entupindo o trenó */}
              <rect x="0" y="-30" width="40" height="35" rx="2" fill="#0a0f0a" />
              <rect x="5" y="-30" width="30" height="6" fill="#131a12" /> {/* Luz pegando no topo da caixa */}
              
              <circle cx="50" cy="-10" r="18" fill="#060906" /> {/* Uma roda de carro solta ou bolsa redonda */}
              <circle cx="50" cy="-18" r="15" fill="#131a12" opacity="0.5" /> {/* Luz na roda */}
              
              {/* Pedaço de placa velha espetado */}
              <polygon points="30,-10 60,-40 70,-35 40,0" fill="#060906" />
              <polygon points="35,-10 60,-35 63,-32 40,-5" fill="#1b2b1e" opacity="0.4" />
            </g>

            {/* O LAMPIÃO (Em cima da caixa, estável, base tocando a madeira) */}
            <g transform="translate(120, 115)">
              <rect x="-10" y="5" width="20" height="5" rx="1" fill="#030504" /> {/* Base chata */}
              <rect x="-6" y="-10" width="12" height="15" rx="2" fill="#ffe299" /> {/* Vidro */}
              <rect x="-2" y="-5" width="4" height="8" rx="1" fill="#ffffff" /> {/* Fogo intenso */}
              <path d="M -8,-10 L 8,-10 L 5,-15 L -5,-15 Z" fill="#030504" /> {/* Tampa do lampião */}
              <path d="M -10,0 L 10,0 L 10,1 L -10,1 Z" fill="#030504" opacity="0.6" /> {/* Gradezinha fina */}
            </g>

            {/* A MÃO DO MERCADOR ESTENDIDA PARA O NEGÓCIO */}
            <g transform="translate(40, 130)">
              {/* O Manto escuro esconde o corpo todo no canto da tela */}
              <path d="M -40,-20 Q -15,0 15,20 Q -10,60 -40,100 Z" fill="#030504" />
              {/* Borda da manga onde a luz toca, textura de tecido velho */}
              <path d="M -20,-10 Q 0,-5 15,20" fill="none" stroke="#1b2b1e" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
              
              {/* O pulso fino e a mão oferecendo/negociando */}
              <path d="M 15,20 L 35,12" stroke="#0a0f0a" strokeWidth="7" strokeLinecap="round" />
              {/* Dedos abertos/em concha esperando pagamento */}
              <path d="M 33,10 Q 45,5 50,8" fill="none" stroke="#0a0f0a" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 34,13 Q 48,10 52,14" fill="none" stroke="#0a0f0a" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 35,16 Q 47,15 50,20" fill="none" stroke="#0a0f0a" strokeWidth="2.5" strokeLinecap="round" />
              
              {/* Item pequeno reluzente na mão dele (para o 'Tudo tem preço, amigo') */}
              <circle cx="45" cy="10" r="1.5" fill="#a4fca2" opacity="0.9" /> {/* Um brilho verde, talvez suco da fenda? */}
            </g>

            {/* Reflexo macabro da luz no chão sujo */}
            <ellipse cx="120" cy="175" rx="50" ry="7" fill="#ffb84d" opacity="0.08" />
          </g>
        );

      case 'raptores_arbusto':
        return (
          <g>
            {/* Céu noturno absorvendo */}
            <path d="M 0,200 L 0,160 Q 100,180 200,160 L 200,200 Z" fill="#030504" />
            
            {/* Folhagens densas e silhuetas complexas de arbustos cobrindo a tela */}
            <path d="M -10,210 L -10,50 C 20,80 60,90 80,150 C 50,160 20,180 -10,210 Z" fill="#060906" />
            <path d="M 210,210 L 210,20 C 150,50 130,100 170,160 C 180,180 200,190 210,210 Z" fill="#060906" />
            <path d="M 0,210 Q 70,120 120,150 T 210,180 L 210,210 Z" fill="#0a0f0a" />
            <path d="M 30,210 Q 100,160 160,190 T 210,210 Z" fill="#131a12" />

            {/* Frestas por onde os olhos predatórios espiam no escuro */}
            <g>
              {/* Raptor 1 (Esquerda Baixo, encarando fixo) */}
              <circle cx="45" cy="155" r="2" fill="#e57a3b" />
              <circle cx="58" cy="155" r="2" fill="#e57a3b" />
              <line x1="42" y1="154" x2="61" y2="154" stroke="#060906" strokeWidth="2.5" /> {/* Pálpebra franzida */}
              <circle cx="46" cy="155" r="0.5" fill="#fff" opacity="0.6" /> {/* Brilho */}
              
              {/* Raptor 2 (Centro Cima, um pouco mais atrás na folhagem) */}
              <circle cx="100" cy="125" r="1.5" fill="#e57a3b" opacity="0.8" />
              <circle cx="112" cy="127" r="1.5" fill="#e57a3b" opacity="0.8" />
              <line x1="97" y1="124" x2="115" y2="125" stroke="#0a0f0a" strokeWidth="2" />

              {/* Raptor 3 (Direita, com a cabeça levemente inclinada) */}
              <circle cx="155" cy="140" r="2" fill="#e57a3b" />
              <circle cx="166" cy="144" r="2" fill="#e57a3b" />
              <line x1="153" y1="138" x2="169" y2="142" stroke="#060906" strokeWidth="2" />
              
              {/* Raptor 4 (Quase invisível, no alto e longe) */}
              <circle cx="15" cy="80" r="1" fill="#e57a3b" opacity="0.4" />
              <circle cx="23" cy="82" r="1" fill="#e57a3b" opacity="0.4" />
            </g>

            {/* Traços de penas pontudas / garras vazando das bordas do arbusto */}
            <path d="M 60,160 Q 80,180 85,190" fill="none" stroke="#030504" strokeWidth="4" strokeLinecap="round" />
            <path d="M 120,200 Q 130,170 115,160" fill="none" stroke="#060906" strokeWidth="3" strokeLinecap="round" />
            {/* Garra de foice do pé aparecendo furtivamente na direita */}
            <path d="M 160,195 Q 180,185 185,170" fill="none" stroke="#060906" strokeWidth="4" strokeLinecap="round" />
            <path d="M 183,168 L 195,165" stroke="#060906" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        );

      case 'pachy_noite':
        return (
          <g>
            {/* Luar e Fundo */}
            <path d="M 0,200 L 0,160 Q 100,180 200,160 L 200,200 Z" fill="#0a0f0a" />
            <circle cx="150" cy="60" r="40" fill="#e0d8c3" opacity="0.1" />
            <circle cx="150" cy="60" r="70" fill="#e0d8c3" opacity="0.03" />

            {/* Árvore espessa sendo violentamente rachada */}
            <path d="M 20,210 C 30,150 40,80 30,-10 C 60,-10 60,80 50,210 Z" fill="#030504" />
            {/* Rachadura zigue-zague profunda na madeira */}
            <path d="M 50,110 L 40,130 L 45,140 L 35,160" fill="none" stroke="#000" strokeWidth="3" />
            
            {/* Impacto: Lascas voando com o luar batendo nelas */}
            <polygon points="55,140 65,130 70,145" fill="#e0d8c3" opacity="0.8" />
            <polygon points="60,120 70,110 75,125" fill="#e0d8c3" opacity="0.5" />
            <polygon points="55,160 62,150 68,165" fill="#e0d8c3" opacity="0.6" />
            <circle cx="70" cy="135" r="1.5" fill="#e0d8c3" />
            <circle cx="80" cy="150" r="2" fill="#e0d8c3" />
            <circle cx="65" cy="170" r="1.5" fill="#e0d8c3" />

            {/* Pachycephalosaurus posicionado perfeitamente na horizontal (Aríete) */}
            <g transform="translate(130, 140)">
              {/* Corpo musculoso e patas arqueadas trancadas no chão */}
              <path d="M 20,0 C 60,-10 80,10 60,30 C 40,50 -10,30 -20,20 Z" fill="#060906" />
              {/* Rabo duro contrabalançando o impacto (pachy tem tendões ossificados no rabo) */}
              <path d="M 60,10 Q 100,5 140,-10 L 140,0 Q 100,20 60,25 Z" fill="#060906" />
              
              {/* Perna traseira firmada */}
              <path d="M 30,15 C 50,15 40,40 30,60 L 20,60 Q 20,40 20,20" fill="#0a0f0a" />
              {/* Perna dianteira cravando no solo */}
              <path d="M 10,20 C 30,30 20,50 15,60 L 5,60 Q 5,40 0,30" fill="#030504" />
              {/* Bracinho minúsculo flexionado */}
              <path d="M 0,25 L -5,35 L -10,35" fill="none" stroke="#060906" strokeWidth="2.5" />
              
              {/* Pescoço grosso absorvendo o tranco em linha reta */}
              <path d="M -10,-5 Q -30,-5 -50,5 L -45,20 Q -25,15 -10,20 Z" fill="#060906" />
              
              {/* Crânio icônico (O Domo Batedor) */}
              {/* Bico pontudo embaixo */}
              <path d="M -50,5 Q -65,-5 -75,5 Q -80,15 -60,20 Z" fill="#030504" /> 
              {/* A Cúpula óssea massiva no topo (Cor de osso marfim refletindo a lua) */}
              <path d="M -45,5 C -60,-20 -80,-10 -75,5 Z" fill="#e0d8c3" /> 
              
              {/* Sombra realista na base do domo onde encontra a escama */}
              <path d="M -45,5 C -50,-5 -65,0 -70,5 Z" fill="#a09b8b" opacity="0.6" />
              {/* Espinhos protuberantes na parte de trás da cabeça */}
              <polygon points="-45,5 -40,-2 -35,5" fill="#e0d8c3" />
              <polygon points="-40,6 -35,0 -30,6" fill="#e0d8c3" />
            </g>
          </g>
        );

      case 'herbivoro_adormecido':
        return (
          <g>
            {/* Luar muito suave na floresta densa */}
            <path d="M 0,200 L 0,160 Q 100,180 200,160 L 200,200 Z" fill="#030504" />
            <circle cx="100" cy="50" r="100" fill="#e0d8c3" opacity="0.03" />

            {/* Árvores imensas no fundo criando uma parede de sombra */}
            <path d="M -10,200 L -10,50 Q 20,40 50,200 Z" fill="#060906" />
            <path d="M 150,200 Q 180,50 210,40 L 210,200 Z" fill="#060906" />

            {/* Tescelossauro dormindo no chão (bípede herbívoro pequeno encolhido) */}
            <g transform="translate(70, 140)">
              {/* Corpo oval encolhido */}
              <ellipse cx="30" cy="30" rx="35" ry="20" fill="#0a0f0a" />
              {/* Cauda longa enrolada no chão em volta das patas */}
              <path d="M 60,35 C 90,40 100,60 50,55 C 30,50 0,55 -20,55" fill="none" stroke="#0a0f0a" strokeWidth="8" strokeLinecap="round" />
              <path d="M -20,55 C -35,55 -45,45 -35,35 L -10,40" fill="none" stroke="#0a0f0a" strokeWidth="4" strokeLinecap="round" />
              
              {/* Perna grossa traseira dobrada para dormir */}
              <path d="M 20,25 C 40,25 35,45 20,50 Q 10,45 10,35 Z" fill="#060906" />
              <path d="M 20,50 L 10,55" stroke="#060906" strokeWidth="3" strokeLinecap="round" />
              
              {/* Pescoço curvado pra trás, cabeça repousando nas costas/chão */}
              <path d="M -5,30 Q -15,10 5,5 Q 15,15 15,20" fill="#060906" />
              <path d="M 0,5 Q 10,-5 20,0 Q 25,10 15,15 Z" fill="#030504" /> {/* Cabeça bico chato */}
              
              {/* Zzzzz - Respiração calma */}
              <path d="M 10,-10 L 20,-10 L 10,-18 L 20,-18" fill="none" stroke="#e0d8c3" strokeWidth="1" opacity="0.4" />
              <path d="M 25,-25 L 32,-25 L 25,-30 L 32,-30" fill="none" stroke="#e0d8c3" strokeWidth="1" opacity="0.2" />
            </g>

            {/* Samambaias cobrindo ele no primeiro plano pra camuflagem */}
            <path d="M 0,200 Q 40,150 80,180 T 150,200 Z" fill="#060906" opacity="0.9" />
            <path d="M 120,200 Q 160,130 200,170 T 250,200 Z" fill="#030504" opacity="0.95" />
            
            {/* Folhas caídas de detalhe */}
            <path d="M 40,165 Q 50,160 55,168 Z" fill="#131a12" />
            <path d="M 160,175 Q 170,170 175,178 Z" fill="#131a12" />
          </g>
        );

      case 'aurora_esmeralda':
        return (
          <g>
            {/* Céu noturno escuro */}
            <path d="M 0,200 L 0,0 L 200,0 L 200,200 Z" fill="#030504" />
            
            {/* CORTINAS DA AURORA BOREAL (A Fenda respirando em tons esmeraldas) */}
            
            {/* Brilho difuso de fundo (O "Halo" verde) */}
            <path d="M -20,20 Q 30,0 60,40 T 130,20 T 220,50 L 220,100 T 130,70 T 60,90 T -20,70 Z" fill="#a4fca2" opacity="0.05" />
            <path d="M -20,30 Q 30,10 60,50 T 130,30 T 220,60 L 220,90 T 130,60 T 60,80 T -20,60 Z" fill="#4a8270" opacity="0.1" />

            <g opacity="0.8">
              {/* Feixes verticais descendo da cortina no céu (Efeito de chuva de luz) */}
              <line x1="30" y1="15" x2="35" y2="100" stroke="#a4fca2" strokeWidth="8" opacity="0.1" />
              <line x1="60" y1="40" x2="55" y2="130" stroke="#a4fca2" strokeWidth="12" opacity="0.08" />
              <line x1="95" y1="30" x2="100" y2="140" stroke="#a4fca2" strokeWidth="15" opacity="0.1" />
              <line x1="130" y1="20" x2="125" y2="110" stroke="#4a8270" strokeWidth="10" opacity="0.2" />
              <line x1="180" y1="35" x2="175" y2="130" stroke="#4a8270" strokeWidth="18" opacity="0.15" />
              
              <line x1="100" y1="30" x2="105" y2="120" stroke="#e0d8c3" strokeWidth="2" opacity="0.2" />
              <line x1="60" y1="40" x2="58" y2="90" stroke="#e0d8c3" strokeWidth="1.5" opacity="0.2" />

              {/* Fita de luz principal (Néon verde rasgando) */}
              <path d="M -20,20 Q 30,0 60,40 T 130,20 T 220,50" fill="none" stroke="#4a8270" strokeWidth="8" strokeLinecap="round" />
              <path d="M -20,20 Q 30,0 60,40 T 130,20 T 220,50" fill="none" stroke="#a4fca2" strokeWidth="3" strokeLinecap="round" />
              <path d="M -20,20 Q 30,0 60,40 T 130,20 T 220,50" fill="none" stroke="#e0d8c3" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
            </g>

            {/* Segunda fita da aurora flutuando mais abaixo */}
            <g opacity="0.5">
              <path d="M -10,80 Q 50,110 90,70 T 210,90" fill="none" stroke="#4a8270" strokeWidth="6" strokeLinecap="round" />
              <path d="M -10,80 Q 50,110 90,70 T 210,90" fill="none" stroke="#a4fca2" strokeWidth="2" strokeLinecap="round" />
              <line x1="50" y1="95" x2="45" y2="140" stroke="#a4fca2" strokeWidth="5" opacity="0.1" />
              <line x1="150" y1="80" x2="155" y2="130" stroke="#a4fca2" strokeWidth="6" opacity="0.1" />
            </g>

            {/* Fundo de selva e montanhas cobrindo a base do horizonte */}
            <path d="M 0,200 L 0,140 Q 30,120 60,150 T 140,130 T 200,160 L 200,200 Z" fill="#060906" />
            
            {/* Silhuetas escuras de pinheiros ancestrais apontando para o céu claro */}
            <polygon points="20,150 25,110 30,150" fill="#030504" />
            <polygon points="17,140 25,100 33,140" fill="#030504" />

            <polygon points="120,160 125,90 130,160" fill="#030504" />
            <polygon points="115,140 125,75 135,140" fill="#030504" />
            <polygon points="125,150 132,100 139,150" fill="#030504" />

            <polygon points="180,180 185,120 190,180" fill="#030504" />
            <polygon points="175,160 185,100 195,160" fill="#030504" />

            {/* Detalhe da lore: "Por um instante, você ouve uma buzina." */}
            {/* Farol / anomalia minúscula flutuando no meio do céu verde, referenciando o tráfego de 2026 */}
            <circle cx="160" cy="40" r="1.5" fill="#e57a3b" opacity="0.8" />
            <circle cx="160" cy="40" r="4" fill="#e57a3b" opacity="0.2" />
            <line x1="165" y1="40" x2="185" y2="45" stroke="#e57a3b" strokeWidth="0.5" strokeDasharray="1 2" />
          </g>
        );

      case 'farmacia':
        return (
          <g>
            {/* Prédio/estrutura de concreto no escuro */}
            <rect x="50" y="70" width="100" height="130" fill="#131a12" />
            <polygon points="50,70 150,70 140,50 60,50" fill="#060906" />
            {/* Letreiro de Cruz Verde quebrado/apagando */}
            <path d="M 85,110 h 10 v -10 h 10 v 10 h 10 v 10 h -10 v 10 h -10 v -10 h -10 z" fill="#4a8270" opacity="0.9" />
            {/* Pisca fraco (glow) */}
            <circle cx="100" cy="115" r="25" fill="#4a8270" opacity="0.15" />
            {/* Painel Solar Rachado no Teto */}
            <polygon points="65,65 110,65 105,55 70,55" fill="#2c3826" stroke="#060906" strokeWidth="1" />
            <line x1="75" y1="55" x2="100" y2="65" stroke="#e0d8c3" strokeWidth="1" opacity="0.4" />
            <line x1="95" y1="55" x2="80" y2="65" stroke="#e0d8c3" strokeWidth="1" opacity="0.4" />
          </g>
        );

      case 'fenda':
        return (
          <g>
            {/* Céu noturno absorvido pela anomalia */}
            <path d="M 0,200 L 0,160 Q 100,180 200,160 L 200,200 Z" fill="#030504" />
            <circle cx="100" cy="90" r="80" fill="#a4fca2" opacity="0.05" />
            <circle cx="100" cy="90" r="50" fill="#a4fca2" opacity="0.1" />

            {/* O Rasgo Temporal (Centro) */}
            <g transform="translate(100, 90)">
              {/* Brilho externo da fenda */}
              <ellipse cx="0" cy="0" rx="15" ry="70" fill="#a4fca2" opacity="0.3" />
              {/* Portal rasgado (borda verde néon) */}
              <path d="M 0,-70 Q 20,0 0,70 Q -20,0 0,-70 Z" fill="#1b302c" stroke="#a4fca2" strokeWidth="3" />
              {/* O centro quebrando pro espaço/tempo (branco/creme brilhante) */}
              <path d="M 0,-60 Q 10,0 0,60 Q -10,0 0,-60 Z" fill="#e0d8c3" />
              <path d="M 0,-50 Q 5,0 0,50 Q -5,0 0,-50 Z" fill="#ffffff" />
            </g>

            {/* Energia temporal puxando coisas do chão */}
            <path d="M 60,180 Q 80,140 90,120" fill="none" stroke="#a4fca2" strokeWidth="2" strokeDasharray="5 5" opacity="0.7" />
            <path d="M 140,170 Q 115,130 110,110" fill="none" stroke="#a4fca2" strokeWidth="2" strokeDasharray="5 5" opacity="0.7" />

            {/* Pedras flutuando puxadas pela gravidade */}
            <polygon points="50,130 55,125 60,132" fill="#131a12" />
            <polygon points="65,90 72,85 75,95 68,98" fill="#060906" />
            <polygon points="140,110 135,100 145,105" fill="#131a12" />
            <polygon points="120,60 125,55 128,62" fill="#060906" />

            {/* Torre de rádio no canto emitindo sinal */}
            <g transform="translate(170, 180) scale(0.6)">
              <line x1="0" y1="0" x2="0" y2="-60" stroke="#060906" strokeWidth="4" />
              <polygon points="-10,0 10,0 0,-20" fill="none" stroke="#060906" strokeWidth="2" />
              <polygon points="-5,-30 5,-30 0,-40" fill="none" stroke="#060906" strokeWidth="2" />
              <circle cx="0" cy="-60" r="3" fill="#e57a3b" />
              <circle cx="0" cy="-60" r="8" fill="#e57a3b" opacity="0.5" />
            </g>

            {/* Caixa Preta e os 2 cristais no chão conectados à Fenda */}
            <rect x="25" y="170" width="15" height="10" fill="#e57a3b" />
            <polygon points="30,170 33,160 35,170" fill="#a4fca2" />
            <polygon points="35,170 38,155 40,170" fill="#a4fca2" />
            <line x1="32" y1="170" x2="100" y2="150" stroke="#e57a3b" strokeWidth="1.5" opacity="0.6" strokeDasharray="3 3" />
          </g>
        );

      case 'triceratopo':
        return (
          <g>
            {/* Terreno de selva */}
            <path d="M 0,200 L 20,170 L 60,190 L 100,160 L 150,180 L 200,150 L 200,200 Z" fill="#0a0f0a" />
            <path d="M 0,160 L 40,110 L 80,150 L 140,80 L 180,130 L 200,100 L 200,200 L 0,200 Z" fill="#131a12" opacity="0.6" />
            
            {/* Tricerátopo Fêmea (Mãe) - Corpo maciço virado para a esquerda */}
            {/* Pernas traseiras */}
            <path d="M 140,140 L 130,195 L 145,195 L 155,140 Z" fill="#060906" strokeLinejoin="round" />
            <path d="M 125,145 L 115,190 L 125,190 L 135,145 Z" fill="#0a0f0a" strokeLinejoin="round" />
            
            {/* Pernas dianteiras */}
            <path d="M 80,150 L 70,195 L 85,195 L 90,150 Z" fill="#060906" strokeLinejoin="round" />
            <path d="M 65,150 L 55,190 L 65,190 L 75,150 Z" fill="#0a0f0a" strokeLinejoin="round" />
            
            {/* Corpo / Lombo / Cauda */}
            <path d="M 45,120 Q 90,90 145,115 Q 170,130 195,150 Q 150,150 145,160 Q 90,170 55,150 Z" fill="#060906" />
            
            {/* Cabeça e Colar Ósseo (Frill) */}
            <path d="M 45,120 Q 55,80 75,70 Q 75,110 55,150 Z" fill="#060906" />
            <path d="M 55,115 L 20,130 L 35,145 L 50,145 Z" fill="#060906" />
            
            {/* Olho fêmea */}
            <circle cx="48" cy="123" r="2" fill="#e57a3b" />
            
            {/* Chifres Mãe (2 na testa, 1 no nariz) */}
            {/* Nariz */}
            <path d="M 23,128 L 12,120 L 26,124 Z" fill="#e0d8c3" />
            {/* Testa */}
            <path d="M 45,118 L 10,95 L 42,112 Z" fill="#e0d8c3" />
            <path d="M 50,115 L 20,90 L 48,110 Z" fill="#a4fca2" opacity="0.6" />
            
            {/* Filhote (Perto das pernas dianteiras, protegido) */}
            <g transform="translate(65, 140) scale(0.4)">
              {/* Pernas filhote */}
              <path d="M 140,140 L 130,195 L 145,195 L 155,140 Z" fill="#131a12" />
              <path d="M 80,150 L 70,195 L 85,195 L 90,150 Z" fill="#131a12" />
              {/* Corpo */}
              <path d="M 45,120 Q 90,90 145,115 Q 170,130 195,150 Q 150,150 145,160 Q 90,170 55,150 Z" fill="#131a12" />
              {/* Cabeça e Escudo */}
              <path d="M 45,120 Q 55,80 75,70 Q 75,110 55,150 Z" fill="#131a12" />
              <path d="M 55,115 L 20,130 L 35,145 L 50,145 Z" fill="#131a12" />
              {/* Chifres Filhote (mais curtos/grossos) */}
              <path d="M 23,128 L 16,124 L 26,124 Z" fill="#e0d8c3" />
              <path d="M 45,118 L 25,105 L 42,112 Z" fill="#e0d8c3" />
              {/* Olho filhote */}
              <circle cx="48" cy="123" r="3" fill="#e57a3b" opacity="0.8" />
            </g>
          </g>
        );


      case 'herbivoro':
        return (
          <g>
            {/* Corpo quadrúpede arqueado */}
            <path d="M 30,150 Q 60,140 75,120 Q 100,95 130,110 Q 150,118 160,135 L 178,130 L 182,138 L 160,145 L 155,175 L 145,175 L 140,150 L 90,152 L 85,175 L 75,175 L 72,150 Q 50,158 30,150 Z" fill="#060906" />
            {/* Placas dorsais */}
            <polygon points="85,112 92,90 100,108" fill="#060906" />
            <polygon points="100,104 110,80 118,104" fill="#060906" />
            <polygon points="118,106 128,86 134,110" fill="#060906" />
            {/* Espinhos da cauda */}
            <polygon points="36,148 26,132 42,145" fill="#e0d8c3" />
            <polygon points="46,146 40,130 52,144" fill="#e0d8c3" />
            <circle cx="172" cy="134" r="1.6" fill="#e57a3b" />
          </g>
        );
      case 'aviao':
        return (
          <g>
            {/* Fuselagem partida */}
            <path d="M 20,140 Q 40,110 120,105 L 128,150 Q 60,160 20,140 Z" fill="#060906" stroke="#4a8270" strokeWidth="1.5" />
            {/* Bordas rasgadas */}
            <polyline points="120,105 126,115 121,124 129,134 123,142 128,150" fill="none" stroke="#e0d8c3" strokeWidth="1.5" />
            {/* Janelas */}
            {[40, 56, 72, 88, 104].map((x) => (
              <rect key={x} x={x} y="118" width="7" height="9" rx="2" fill="#1c241b" />
            ))}
            {/* Asa caída */}
            <polygon points="70,150 150,170 160,178 60,160" fill="#060906" />
            {/* Luz de emergência */}
            <circle cx="30" cy="132" r="3" fill="#e57a3b" />
            <circle cx="30" cy="132" r="7" fill="#e57a3b" opacity="0.3" />
          </g>
        );
      case 'crocodilo':
        return (
          <g>
            {/* Corpo rente à água */}
            <path d="M 15,165 Q 60,150 110,152 L 175,148 L 190,156 L 172,160 L 186,166 L 110,166 Q 60,172 15,165 Z" fill="#060906" />
            {/* Escamas */}
            {[40, 55, 70, 85, 100].map((x) => (
              <polygon key={x} points={`${x},154 ${x + 5},146 ${x + 10},154`} fill="#060906" />
            ))}
            {/* Dentes */}
            <polygon points="150,160 153,166 156,160" fill="#e0d8c3" />
            <polygon points="162,160 165,166 168,160" fill="#e0d8c3" />
            <circle cx="140" cy="149" r="2.5" fill="#e57a3b" />
            <circle cx="140" cy="149" r="6" fill="#e57a3b" opacity="0.3" />
          </g>
        );
      case 'cristal':
        return (
          <g>
            <path d="M 40,178 Q 100,160 160,178 Z" fill="#060906" />
            <polygon points="80,175 90,110 100,175" fill="#4a8270" opacity="0.9" />
            <polygon points="95,175 108,90 120,175" fill="#6fb39c" />
            <polygon points="115,175 125,125 134,175" fill="#4a8270" opacity="0.8" />
            <polygon points="70,176 75,140 82,176" fill="#4a8270" opacity="0.6" />
            <circle cx="108" cy="120" r="22" fill="#6fb39c" opacity="0.15" />
            <circle cx="108" cy="100" r="2.5" fill="#e0d8c3" />
          </g>
        );
      case 'caverna':
        return (
          <g>
            <path d="M 10,178 Q 30,80 100,70 Q 170,80 190,178 Z" fill="#060906" />
            <path d="M 55,178 Q 65,115 100,110 Q 135,115 145,178 Z" fill="#000" />
            {/* Fogueira na entrada */}
            <polygon points="92,175 100,150 108,175" fill="#e57a3b" />
            <polygon points="96,175 100,160 104,175" fill="#ffd54a" />
            <circle cx="100" cy="165" r="18" fill="#e57a3b" opacity="0.2" />
          </g>
        );
      case 'tenda':
        return (
          <g>
            {/* Barraca rasgada */}
            <polygon points="40,175 85,105 130,175" fill="#060906" />
            <polyline points="85,105 95,130 88,150 98,175" fill="none" stroke="#4a8270" strokeWidth="1.5" />
            {/* Bandeira */}
            <line x1="150" y1="175" x2="150" y2="95" stroke="#060906" strokeWidth="3" />
            <polygon points="150,95 175,103 150,111" fill="#e0d8c3" opacity="0.8" />
            {/* Brasas da fogueira */}
            <circle cx="140" cy="172" r="3" fill="#e57a3b" opacity="0.7" />
          </g>
        );
      case 'ninho':
        return (
          <g>
            {/* Terreno hostil das ruínas ao fundo */}
            <path d="M 0,200 L 20,180 L 80,185 L 150,175 L 200,190 L 200,200 Z" fill="#0a0f0a" />
            <polygon points="10,180 50,150 90,165" fill="#131a12" opacity="0.6" />
            <polygon points="120,175 160,140 200,160" fill="#131a12" opacity="0.6" />
            {/* Pilares quebrados/concreto no fundo */}
            <polygon points="20,150 40,50 60,60 50,160" fill="#060906" opacity="0.4" />
            <polygon points="140,160 150,70 170,80 170,170" fill="#060906" opacity="0.4" />

            {/* O Ninho (Monte de lama e palha) */}
            <g transform="translate(100, 150)">
              {/* Lama base escavada */}
              <ellipse cx="0" cy="20" rx="70" ry="25" fill="#1a241e" stroke="#060906" strokeWidth="3" />
              {/* Borda grossa do ninho na frente (parede do vulcãozinho) */}
              <path d="M -65,20 Q 0,45 65,20 Q 75,30 65,40 Q 0,60 -65,40 Z" fill="#2d1c15" />
              {/* Sombras / textura de terra */}
              <path d="M -50,30 Q 0,50 50,30" fill="none" stroke="#060906" strokeWidth="2" strokeDasharray="5 3" />
              
              {/* Folhas gigantes amontoadas fazendo a "cama" */}
              <path d="M -40,15 Q -20,5 -10,20 Q -30,25 -40,15 Z" fill="#2c3826" />
              <path d="M 30,10 Q 10,0 0,15 Q 20,25 30,10 Z" fill="#131a12" />
              <path d="M -15,25 Q 0,10 15,20 Q -5,30 -15,25 Z" fill="#4a8270" opacity="0.6" />

              {/* Os ovos enormes (3 ovos ovais repousando) */}
              {/* Ovo Esquerda */}
              <ellipse cx="-18" cy="8" rx="14" ry="20" fill="#e0d8c3" transform="rotate(-15 -18 8)" />
              <ellipse cx="-22" cy="4" rx="4" ry="6" fill="#ffffff" opacity="0.5" transform="rotate(-15 -22 4)" />
              {/* Ovo Direita */}
              <ellipse cx="22" cy="10" rx="13" ry="18" fill="#e0d8c3" transform="rotate(20 22 10)" />
              <ellipse cx="18" cy="6" rx="4" ry="5" fill="#ffffff" opacity="0.4" transform="rotate(20 18 6)" />
              {/* Ovo Centro (Maior, na frente) */}
              <ellipse cx="2" cy="15" rx="15" ry="22" fill="#ffffff" />
              <ellipse cx="-3" cy="8" rx="5" ry="8" fill="#e0d8c3" opacity="0.8" />
              {/* Manchas/Sujeira no ovo */}
              <circle cx="5" cy="22" r="2" fill="#4a8270" opacity="0.4" />
              <circle cx="8" cy="15" r="1.5" fill="#2c3826" opacity="0.3" />

              {/* Palha espetada cobrindo levemente as bordas dos ovos */}
              <path d="M -40,0 L -25,12 M -35,5 L -20,15 M 40,-5 L 25,10 M 35,-2 L 20,15" stroke="#a4fca2" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
            </g>
          </g>
        );

      case 'saqueadores':
        return (
          <g>
            {/* Terreno hostil das ruínas */}
            <path d="M 0,200 L 20,180 L 80,185 L 150,175 L 200,190 L 200,200 Z" fill="#0a0f0a" />
            <polygon points="10,180 50,150 90,165" fill="#131a12" opacity="0.6" />
            <polygon points="120,175 160,140 200,160" fill="#131a12" opacity="0.6" />

            {/* Saqueador Esquerda (Recuado) */}
            <g transform="translate(30, 90) scale(0.8)">
              {/* Lança inclinada */}
              <line x1="60" y1="20" x2="10" y2="120" stroke="#060906" strokeWidth="4" />
              <polygon points="60,20 65,10 68,25" fill="#e0d8c3" />
              {/* Corpo esfarrapado */}
              <polygon points="20,120 30,50 50,55 60,120 40,80" fill="#060906" />
              <circle cx="40" cy="40" r="10" fill="#060906" />
              {/* Olho brilhante mau */}
              <circle cx="43" cy="38" r="1.5" fill="#e57a3b" />
            </g>

            {/* Saqueador Direita (Recuado) */}
            <g transform="translate(130, 95) scale(0.75)">
              {/* Lança */}
              <line x1="0" y1="15" x2="50" y2="120" stroke="#060906" strokeWidth="4" />
              <polygon points="0,15 -5,5 -8,20" fill="#e0d8c3" />
              {/* Corpo bruto / Corcunda */}
              <polygon points="10,120 20,50 45,45 50,120 30,85" fill="#060906" />
              <circle cx="28" cy="35" r="11" fill="#060906" />
            </g>

            {/* Saqueador Central (O Líder) */}
            <g transform="translate(70, 75) scale(1.1)">
              {/* Capa tremulando */}
              <path d="M 15,100 Q 0,110 5,80 Q 20,40 30,30 Q 40,40 45,80 Q 50,110 35,100 Z" fill="#131a12" />
              
              {/* Bastão / Lança pesada reta e cravada no chão */}
              <line x1="45" y1="10" x2="45" y2="110" stroke="#060906" strokeWidth="3" />
              <polygon points="45,10 40,0 50,0" fill="#a4fca2" opacity="0.8" />
              
              {/* Corpo central imponente */}
              <polygon points="20,110 25,40 35,40 40,110 30,80" fill="#060906" />
              
              {/* Braço segurando a lança */}
              <path d="M 35,50 L 45,60" stroke="#060906" strokeWidth="6" strokeLinecap="round" />
              
              {/* Cabeça envolta em capuz de sucata (máscara de gás rústica) */}
              <circle cx="30" cy="30" r="9" fill="#060906" />
              {/* Tubos da máscara */}
              <path d="M 30,35 Q 25,45 20,40" fill="none" stroke="#2c3826" strokeWidth="2" />
              {/* Lentes refletindo vermelho */}
              <circle cx="27" cy="29" r="2.5" fill="#e57a3b" />
              <circle cx="34" cy="29" r="2.5" fill="#e57a3b" />
            </g>

            {/* Detalhes de fumaça / névoa baixa nas ruínas */}
            <path d="M 0,170 Q 50,160 100,175 Q 150,190 200,170" fill="none" stroke="#e0d8c3" strokeWidth="8" opacity="0.05" />
            <path d="M 0,185 Q 80,175 120,190 Q 180,200 200,185" fill="none" stroke="#e0d8c3" strokeWidth="12" opacity="0.03" />
          </g>
        );

      case 'modulo':
        return (
          <g>
            {/* Terreno rochoso */}
            <path d="M 0,200 L 200,200 L 200,165 L 100,175 L 0,160 Z" fill="#060906" />

            <g transform="translate(10, 10)">
              {/* Rochas ao fundo / laterais (esmagando o contêiner) */}
              <polygon points="120,170 150,80 180,60 200,100 200,180" fill="#131a12" stroke="#0a0f0a" strokeWidth="2" strokeLinejoin="round" />
              <polygon points="0,150 20,90 60,70 80,120 70,170" fill="#060906" stroke="#0a0f0a" strokeWidth="2" strokeLinejoin="round" />

              {/* Lateral do contêiner (aço branco / cinza claro) - Módulo de laboratório com chanfros */}
              <polygon points="70,140 160,120 160,50 70,40" fill="#e0d8c3" opacity="0.8" />
              {/* Sombra de esmagamento / Amassado forte no topo e fundo da lateral direita */}
              <polygon points="140,50 160,50 160,70 120,60" fill="#060906" opacity="0.4" />
              <polygon points="130,125 160,120 160,100 110,110" fill="#060906" opacity="0.4" />

              {/* Janela reforçada na lateral (vidro quebrado) */}
              <rect x="90" y="60" width="40" height="15" rx="2" fill="#131a12" stroke="#060906" strokeWidth="2" transform="rotate(7 110 67)" />
              <path d="M 95,65 L 105,75 M 100,62 L 98,72 M 120,68 L 125,75" stroke="#e0d8c3" strokeWidth="1" opacity="0.5" transform="rotate(7 110 67)" />

              {/* Frente do Contêiner Branco (Porta de Laboratório) */}
              <polygon points="10,120 70,140 70,40 10,40" fill="#ffffff" opacity="0.9" stroke="#060906" strokeWidth="2" strokeLinejoin="round" />
              
              {/* Porta selada e barra pesada de tranca POR FORA */}
              <line x1="40" y1="40" x2="40" y2="130" stroke="#060906" strokeWidth="2" />
              <rect x="25" y="50" width="30" height="70" fill="none" stroke="#131a12" strokeWidth="1.5" />
              
              {/* Barra transversal de tranca pesada de aço posta pelo lado de fora */}
              <polygon points="15,85 65,95 65,105 15,95" fill="#4a8270" stroke="#060906" strokeWidth="1" />
              {/* Travas ou parafusos soldando a barra */}
              <circle cx="20" cy="91" r="2" fill="#e57a3b" />
              <circle cx="60" cy="99" r="2" fill="#e57a3b" />

              {/* O Logotipo do Projeto TÊMPORA "parcialmente derretido" (T grande estilizado com borda) */}
              <g transform="skewY(-15) translate(80, 85)" opacity="0.8">
                {/* Logo base T */}
                <path d="M 20,0 L 40,0 L 40,5 L 32,5 L 32,25 L 28,25 L 28,5 L 20,5 Z" fill="#e57a3b" />
                {/* Círculo da ampulheta ao redor do T */}
                <circle cx="30" cy="12" r="15" fill="none" stroke="#e57a3b" strokeWidth="2" />
                {/* O efeito de "derretido" nas partes de baixo */}
                <path d="M 28,25 Q 29,35 28,45 Q 26,48 24,47 Q 27,35 25,25 Z" fill="#e57a3b" />
                <path d="M 32,25 Q 33,30 35,38 Q 36,40 37,39 Q 35,32 34,25 Z" fill="#e57a3b" />
                <path d="M 20,22 Q 22,30 20,38 Z" fill="#e57a3b" />
              </g>

              {/* Rocha penetrando a lateral do contêiner branco */}
              <polygon points="120,105 140,85 145,130 110,135" fill="#131a12" stroke="#0a0f0a" strokeWidth="1.5" strokeLinejoin="round" />
            </g>
          </g>
        );

      case 'container':
        return (
          <g>
            {/* Terreno pantanoso / lama ao redor */}
            <path d="M 0,200 L 200,200 L 200,165 Q 100,150 0,165 Z" fill="#0a0f0a" />

            <g transform="translate(10, 10)">
              {/* Lateral do contêiner recuando na perspectiva (aço corrugado) */}
              <polygon points="70,140 180,110 180,30 70,40" fill="#131a12" />
              {/* Ranhuras verticais de aço (textura corrugada) */}
              {[...Array(9)].map((_, i) => (
                <path key={`cont-${i}`} d={`M ${80 + i * 11},${40 - i * 1} L ${80 + i * 11},${138 - i * 3}`} stroke="#060906" strokeWidth="4" />
              ))}
              
              {/* O Letreiro esmaecido na lateral */}
              <g transform="skewY(-15) translate(80, 80)" fill="#a4fca2" opacity="0.1">
                <text x="0" y="0" fontFamily="monospace" fontWeight="bold" fontSize="24" letterSpacing="2">MAERSK</text>
              </g>

              {/* Frente do Contêiner (Portas Duplas) */}
              <polygon points="10,120 70,140 70,40 10,40" fill="#1a241e" stroke="#060906" strokeWidth="2" strokeLinejoin="round" />
              
              {/* Fenda da porta no meio */}
              <line x1="40" y1="40" x2="40" y2="130" stroke="#060906" strokeWidth="3" />
              
              {/* Dobradiças / Barras de tranca verticais nas portas */}
              <line x1="25" y1="40" x2="25" y2="125" stroke="#131a12" strokeWidth="2" />
              <line x1="55" y1="40" x2="55" y2="135" stroke="#131a12" strokeWidth="2" />
              {/* Maçanetas das trancas no centro */}
              <rect x="23" y="80" width="4" height="10" fill="#060906" />
              <rect x="53" y="80" width="4" height="10" fill="#060906" />

              {/* Corrente pesada e cadeado nas duas portas centrais */}
              {/* Corrente enrolada ligando as maçanetas */}
              <path d="M 25,85 Q 40,95 55,85" fill="none" stroke="#e0d8c3" strokeWidth="2" strokeDasharray="3 2" opacity="0.6" />
              <path d="M 25,87 Q 40,100 55,87" fill="none" stroke="#e0d8c3" strokeWidth="2" strokeDasharray="4 2" opacity="0.4" />
              {/* Cadeado pesado e brilhante (militar) no meio por cima da corrente */}
              <rect x="35" y="82" width="10" height="12" rx="2" fill="#e0d8c3" opacity="0.8" />
              <path d="M 37,82 Q 40,75 43,82" fill="none" stroke="#060906" strokeWidth="2" />
              
              {/* Vegetação / Trepadeiras umidas cobrindo parte do topo e laterais */}
              <path d="M 50,40 Q 60,60 70,50 Q 80,70 100,50 Q 120,40 140,50 L 140,35 L 50,35 Z" fill="#0a0f0a" />
              <path d="M 60,40 Q 65,80 75,70 Q 75,60 85,75" fill="none" stroke="#0a0f0a" strokeWidth="3" strokeLinecap="round" />
            </g>
          </g>
        );

      case 'bunker':
        return (
          <g>
            <circle cx="100" cy="110" r="60" fill="#060906" stroke="#4a8270" strokeWidth="8" opacity="0.9" />
            <circle cx="100" cy="110" r="50" fill="#131a12" stroke="#2c3826" strokeWidth="3" />
            <circle cx="100" cy="110" r="14" fill="#060906" stroke="#4a8270" strokeWidth="3" />
            {/* Hastes da escotilha */}
            <line x1="100" y1="60" x2="100" y2="160" stroke="#2c3826" strokeWidth="5" />
            <line x1="50" y1="110" x2="150" y2="110" stroke="#2c3826" strokeWidth="5" />
            <line x1="65" y1="75" x2="135" y2="145" stroke="#2c3826" strokeWidth="4" />
            <line x1="65" y1="145" x2="135" y2="75" stroke="#2c3826" strokeWidth="4" />
            {/* Luz do painel */}
            <rect x="145" y="80" width="12" height="24" rx="2" fill="#060906" />
            <circle cx="151" cy="86" r="3" fill="#e57a3b" />
          </g>
        );

      case 'acampamento':
        return (
          <g>
            {/* Terreno de selva */}
            <path d="M 0,200 L 200,200 L 200,175 Q 100,165 0,175 Z" fill="#0a0f0a" />

            {/* Barraca Direita (inteira) */}
            <polygon points="120,180 150,110 180,180" fill="#131a12" stroke="#2c3826" strokeWidth="2" strokeLinejoin="round" />
            <polygon points="135,180 150,140 165,180" fill="#060906" />

            {/* Barraca Esquerda (grande, rasgada) */}
            <polygon points="20,180 60,80 100,180" fill="#182017" stroke="#2c3826" strokeWidth="2" strokeLinejoin="round" />
            <polygon points="40,180 60,110 80,180" fill="#060906" />
            {/* Rasgo na lona da barraca esq */}
            <path d="M 30,120 L 40,140 L 35,160" fill="none" stroke="#060906" strokeWidth="3" />
            <path d="M 35,120 L 45,140 L 40,160" fill="none" stroke="#0a0f0a" strokeWidth="2" />

            {/* Fogueira quase fria (meio apagada) */}
            <path d="M 100,185 Q 110,180 120,185 Q 110,195 100,185 Z" fill="#060906" />
            <circle cx="110" cy="182" r="3" fill="#e57a3b" opacity="0.6" />
            <circle cx="113" cy="184" r="1.5" fill="#e57a3b" opacity="0.4" />
            {/* Fumaca fina */}
            <path d="M 110,175 Q 105,155 110,140" fill="none" stroke="#e0d8c3" strokeWidth="4" opacity="0.1" />

            {/* Mesinha dobrável de metal com diário e caneca */}
            <line x1="75" y1="185" x2="85" y2="160" stroke="#060906" strokeWidth="2" />
            <line x1="85" y1="185" x2="75" y2="160" stroke="#060906" strokeWidth="2" />
            {/* Tampo da mesa */}
            <polygon points="65,162 95,162 100,157 70,157" fill="#2c3826" stroke="#131a12" strokeWidth="1" />
            {/* Diário aberto branco em cima da mesa */}
            <polygon points="75,161 88,161 90,158 78,158" fill="#e0d8c3" opacity="0.8" />
            {/* Lombada/Sombra do diário */}
            <line x1="81" y1="161" x2="84" y2="158" stroke="#060906" strokeWidth="1" opacity="0.5" />
            {/* Caneca */}
            <rect x="70" y="157" width="4" height="4" fill="#a4fca2" opacity="0.4" />
          </g>
        );

      case 'posto':
        return (
          <g>
            {/* Cobertura do posto inclinada */}
            <polygon points="10,80 180,50 160,75 0,105" fill="#131a12" stroke="#2c3826" strokeWidth="2" />
            <polygon points="10,80 180,50 170,40 20,70" fill="#060906" />
            {/* Pilar quebrado */}
            <polygon points="120,60 140,55 150,150 130,150" fill="#060906" />
            {/* Bombas de combustível afundadas */}
            <rect x="30" y="120" width="25" height="50" rx="3" fill="#131a12" stroke="#4a8270" strokeWidth="1" opacity="0.8" />
            <rect x="70" y="125" width="25" height="45" rx="3" fill="#060906" stroke="#4a8270" strokeWidth="1" opacity="0.6" />
            {/* Letreiro sujo */}
            <rect x="40" y="60" width="60" height="20" fill="#e57a3b" opacity="0.2" />
            <text x="45" y="75" fill="#060906" fontSize="12" fontFamily="monospace" fontWeight="bold" opacity="0.7">GAS</text>
            {/* Nível d'água / Pântano */}
            <path d="M 0,165 Q 50,150 100,165 T 200,165 L 200,200 L 0,200 Z" fill="#0a120c" opacity="0.9" />
          </g>
        );



      case 'supermercado':
        return (
          <g>
            {/* Fachada quadrada e janelas escuras */}
            <rect x="20" y="40" width="160" height="120" fill="#060906" stroke="#2c3826" strokeWidth="3" />
            <rect x="40" y="60" width="30" height="40" fill="#131a12" />
            <rect x="85" y="60" width="30" height="40" fill="#131a12" />
            <rect x="130" y="60" width="30" height="40" fill="#131a12" />
            {/* Placa torta "MERCADO" */}
            <polygon points="30,20 160,10 170,40 25,45" fill="#1a2319" />
            <text x="40" y="38" fill="#e0d8c3" fontSize="14" fontFamily="monospace" fontWeight="bold" opacity="0.6" transform="rotate(5 40 38)">MERCADO</text>
            {/* Água invadindo e prateleiras */}
            <path d="M 0,130 Q 50,120 100,130 T 200,130 L 200,200 L 0,200 Z" fill="#0a120c" opacity="0.85" />
            {/* Pontas de gôndolas boiando ou emergindo */}
            <rect x="50" y="115" width="40" height="15" fill="#2c3826" opacity="0.5" />
            <rect x="110" y="110" width="40" height="20" fill="#2c3826" opacity="0.6" />
            {/* Olho nas sombras da água */}
            <circle cx="130" cy="145" r="2.5" fill="#e57a3b" />
          </g>
        );

      case 'muro':
        return (
          <g>
            {/* O Muro Gigante (Textura de Concreto e Musgo) */}
            <rect x="0" y="40" width="200" height="160" fill="#1a241e" />
            <polygon points="0,40 200,40 200,60 0,70" fill="#131a12" />
            {/* Textura de blocos cimento */}
            <line x1="0" y1="100" x2="200" y2="105" stroke="#131a12" strokeWidth="2" opacity="0.8" />
            <line x1="0" y1="150" x2="200" y2="155" stroke="#131a12" strokeWidth="2" opacity="0.8" />
            <line x1="80" y1="40" x2="80" y2="100" stroke="#131a12" strokeWidth="2" opacity="0.8" />
            <line x1="140" y1="105" x2="140" y2="155" stroke="#131a12" strokeWidth="2" opacity="0.8" />
            <line x1="40" y1="150" x2="40" y2="200" stroke="#131a12" strokeWidth="2" opacity="0.8" />

            {/* Pichação (Desalinhada, Fonte Grosseira) e Gotas Escorrendo */}
            <g transform="rotate(-3 100 100) translate(0, 5)">
              <text x="100" y="100" textAnchor="middle" fill="#e57a3b" fontSize="13" fontFamily="monospace" fontWeight="bold">ALENCAR SABIA!</text>
              <text x="100" y="118" textAnchor="middle" fill="#e57a3b" fontSize="11" fontFamily="monospace" fontWeight="bold">O CONSELHO MENTIU.</text>
              <text x="100" y="135" textAnchor="middle" fill="#e57a3b" fontSize="13" fontFamily="monospace" fontWeight="bold">NÃO LIGUEM O RÁDIO.</text>
              {/* Tinta escorrendo */}
              <line x1="45" y1="100" x2="45" y2="120" stroke="#e57a3b" strokeWidth="1" opacity="0.8" />
              <line x1="140" y1="100" x2="140" y2="125" stroke="#e57a3b" strokeWidth="1" opacity="0.6" />
              <line x1="70" y1="118" x2="70" y2="130" stroke="#e57a3b" strokeWidth="1" opacity="0.8" />
              <line x1="120" y1="135" x2="120" y2="155" stroke="#e57a3b" strokeWidth="1" opacity="0.7" />
              <line x1="150" y1="135" x2="150" y2="145" stroke="#e57a3b" strokeWidth="1" opacity="0.6" />
            </g>

            {/* MARCAS DE GARRA (Profundas, Cortando a Tinta e Mostrando Escuridão/Rochas) */}
            {/* O arranhão é um polygon que rasga a parede de cima até em baixo */}
            <g transform="translate(15, -15)">
              {/* Sombra / Profundidade afiada na ponta (Garras de raptor) */}
              <polygon points="60,60 70,60 100,180" fill="#060906" />
              <polygon points="90,55 100,55 130,175" fill="#060906" />
              <polygon points="120,50 130,50 160,170" fill="#060906" />
              
              {/* Relevo de cimento quebrado (borda esquerda e direita do rasgo) */}
              <path d="M 60,60 Q 75,120 100,180 M 70,60 Q 82,120 100,180" stroke="#4a8270" fill="none" strokeWidth="1" opacity="0.6" />
              <path d="M 90,55 Q 105,115 130,175 M 100,55 Q 112,115 130,175" stroke="#4a8270" fill="none" strokeWidth="1" opacity="0.6" />
              <path d="M 120,50 Q 135,110 160,170 M 130,50 Q 142,110 160,170" stroke="#4a8270" fill="none" strokeWidth="1" opacity="0.6" />
              
              {/* Lascas de pedra espalhadas saindo do buraco */}
              <circle cx="95" cy="180" r="3" fill="#131a12" />
              <circle cx="125" cy="175" r="2" fill="#131a12" />
              <circle cx="155" cy="170" r="4" fill="#0a0f0a" />
            </g>

            {/* Entulho e Musgo na Base do Muro */}
            <path d="M 0,200 L 20,180 Q 50,170 80,190 L 120,175 Q 160,185 200,165 L 200,200 Z" fill="#0a0f0a" />
            <circle cx="30" cy="190" r="10" fill="#060906" />
            <circle cx="170" cy="180" r="15" fill="#131a12" />
          </g>
        );

      case 'torre_caida':
        return (
          <g>
            {/* Chão de mata destruída */}
            <path d="M 0,200 L 40,160 Q 100,180 150,150 L 200,180 L 200,200 Z" fill="#0a0f0a" />
            <polygon points="10,200 50,170 100,180" fill="#131a12" />

            {/* Cabos de Cobre espalhados no chão e mato */}
            <path d="M 20,180 Q 50,150 70,190 T 110,160" fill="none" stroke="#e57a3b" strokeWidth="2" opacity="0.8" />
            <path d="M 50,190 Q 30,170 60,165 T 90,190" fill="none" stroke="#e57a3b" strokeWidth="1.5" opacity="0.6" />
            <path d="M 100,170 Q 130,190 150,160 T 180,180" fill="none" stroke="#e57a3b" strokeWidth="2" opacity="0.7" />

            {/* Torre Treliçada de Celular (Inclinada / Dobrada) */}
            <g transform="rotate(65 40 180)">
              {/* Hastes principais da torre */}
              <line x1="40" y1="180" x2="40" y2="-20" stroke="#060906" strokeWidth="6" />
              <line x1="70" y1="180" x2="60" y2="-20" stroke="#060906" strokeWidth="5" />
              
              {/* Treliça (X cruzados) ao longo da torre */}
              {[...Array(8)].map((_, i) => (
                <g key={`trelica-${i}`}>
                  <line x1="40" y1={180 - i*25} x2={70 - i*1.2} y2={155 - i*25} stroke="#131a12" strokeWidth="3" />
                  <line x1={70 - i*1.2} y1={180 - i*25} x2="40" y2={155 - i*25} stroke="#131a12" strokeWidth="3" />
                </g>
              ))}

              {/* Estrutura amassada/quebrada perto da base */}
              <path d="M 35,160 L 20,150 M 75,140 L 90,130" stroke="#060906" strokeWidth="4" />

              {/* Topo da Torre com Antenas Setoriais de Celular */}
              <g transform="translate(45, -20)">
                <rect x="-15" y="-10" width="40" height="20" fill="#1a241e" />
                {/* Antena Setorial 1 (Retângulo longo) */}
                <rect x="-25" y="-5" width="8" height="40" rx="2" fill="#e0d8c3" transform="rotate(-15)" />
                {/* Antena Setorial 2 */}
                <rect x="5" y="-10" width="10" height="45" rx="3" fill="#e0d8c3" opacity="0.8" />
                {/* Antena Setorial 3 (Caída) */}
                <rect x="25" y="-5" width="8" height="35" rx="2" fill="#e0d8c3" opacity="0.6" transform="rotate(30)" />
                {/* Cabos grossos ligados aos painéis */}
                <path d="M -20,35 Q 0,50 5,20" fill="none" stroke="#e57a3b" strokeWidth="2" />
                <path d="M 10,35 Q 20,60 30,25" fill="none" stroke="#060906" strokeWidth="2" />
              </g>
            </g>

            {/* Folhagens cobrindo parte da torre no chão */}
            <path d="M 80,180 Q 100,140 130,160 Q 150,130 170,160 Z" fill="#1a241e" opacity="0.9" />
            <path d="M 70,190 Q 90,160 110,180 Q 130,150 140,190 Z" fill="#0a0f0a" />
          </g>
        );

      case 'onibus':
        return (
          <g>
            {/* Ônibus escolar tombado de lado */}
            <rect x="20" y="80" width="160" height="70" rx="10" fill="#ffd54a" opacity="0.8" transform="rotate(-15 100 115)" />
            <rect x="25" y="85" width="150" height="60" rx="8" fill="#e57a3b" opacity="0.6" transform="rotate(-15 100 115)" />
            {/* Janelas */}
            {[35, 65, 95, 125, 155].map(x => (
              <rect key={x} x={x} y="95" width="20" height="25" rx="3" fill="#060906" transform="rotate(-15 100 115)" />
            ))}
            {/* Faixa preta */}
            <rect x="20" y="130" width="160" height="5" fill="#060906" transform="rotate(-15 100 115)" />
            {/* Pneus (vistos de baixo pois está tombado) */}
            <ellipse cx="60" cy="165" rx="15" ry="8" fill="#131a12" transform="rotate(-15 60 165)" />
            <ellipse cx="140" cy="143" rx="15" ry="8" fill="#131a12" transform="rotate(-15 140 143)" />
            {/* Vegetação cobrindo */}
            <path d="M 0,160 Q 50,130 100,160 T 200,180" fill="none" stroke="#131a12" strokeWidth="8" opacity="0.8" />
          </g>
        );

      case 'pegada_trex':
        return (
          <g>
            {/* Terreno lamacento escuro */}
            <path d="M 0,110 Q 100,90 200,120 L 200,200 L 0,200 Z" fill="#0a0f0a" />

            <g transform="translate(0, 10)">
              {/* Buraco base com borda preta espessa e cantos arredondados (geométrico brutal) */}
              <path d="M 100,150 
                       L 70,130 L 40,70 L 55,60 L 85,100
                       L 90,30 L 110,30 L 115,100
                       L 145,60 L 160,70 L 130,130
                       L 100,150 Z" 
                    fill="#1a241e" stroke="#060906" strokeWidth="22" strokeLinejoin="round" />
              
              {/* Água empoçada dentro do buraco */}
              <path d="M 100,150 
                       L 70,130 L 40,70 L 55,60 L 85,100
                       L 90,30 L 110,30 L 115,100
                       L 145,60 L 160,70 L 130,130
                       L 100,150 Z" 
                    fill="#060906" opacity="0.6" strokeLinejoin="round" />

              {/* Reflexos cortados da água, para parecer lodo denso refletindo fraco */}
              <polygon points="90,120 110,125 100,135" fill="#4a8270" opacity="0.4" />
              <polygon points="95,90 105,70 100,60 90,80" fill="#4a8270" opacity="0.3" />
              <polygon points="65,95 50,95 55,100" fill="#e0d8c3" opacity="0.2" />
              <polygon points="135,95 150,95 145,100" fill="#e0d8c3" opacity="0.2" />
              
              {/* Marcas profundas de garra perfurando o chão negro nas pontas dos dedos */}
              <polygon points="95,15 105,15 100,0" fill="#060906" />
              <polygon points="25,75 35,65 20,55" fill="#060906" />
              <polygon points="175,75 165,65 180,55" fill="#060906" />
            </g>

            {/* Terra revirada e pedregulhos/escala na beira da marca do monstro */}
            <circle cx="140" cy="175" r="4" fill="#131a12" />
            <circle cx="40" cy="165" r="3" fill="#131a12" />
            <circle cx="35" cy="175" r="2.5" fill="#060906" />
            <circle cx="160" cy="150" r="3" fill="#060906" />
            <circle cx="70" cy="180" r="5" fill="#131a12" />
          </g>
        );

      case 'cupinzeiro':
        return (
          <g>
            {/* Montículo de barro abaloado (estilo João-de-Barro / Cupinzeiro Gigante) */}
            <path d="M 30,180 Q 20,80 100,40 Q 180,80 170,180 Z" fill="#2d1c15" />
            {/* Texturas/ondulações de barro empilhado */}
            <path d="M 40,180 Q 40,90 100,50 Q 160,90 160,180 Z" fill="#3a241b" />
            <path d="M 50,180 Q 60,100 100,60 Q 140,100 150,180 Z" fill="#482d22" />
            
            {/* Buraco irregular escavado na lateral do cupinzeiro (não é um olho alien) */}
            <path d="M 85,130 Q 80,100 90,85 Q 100,75 112,85 Q 122,105 115,135 Q 100,145 85,130 Z" fill="#060906" />
            
            {/* Pedaço de Sucata Metálica (caixa/engrenagem) presa dentro do barro refletindo o sol */}
            {/* Chapa de metal enterrada e angulada */}
            <polygon points="90,140 105,138 115,105 100,107" fill="#4a8270" opacity="0.6" />
            <polygon points="100,107 115,105 110,95 95,97" fill="#e0d8c3" opacity="0.8" />
            
            {/* Fios ou cabos soltos pendurados do buraco */}
            <path d="M 95,140 Q 90,150 95,160" fill="none" stroke="#e57a3b" strokeWidth="1.5" />
            <path d="M 102,139 Q 105,150 100,165" fill="none" stroke="#e0d8c3" strokeWidth="1" opacity="0.5" />
            
            {/* Brilho do Sol forte batendo na quina da chapa de metal */}
            <circle cx="108" cy="98" r="3" fill="#ffffff" opacity="0.9" />
            <path d="M 100,98 L 116,98 M 108,90 L 108,106" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
          </g>
        );

      case 'matagal':
        return (
          <g>
            {/* Folhas largas gigantes preenchendo a tela */}
            <path d="M 0,180 Q 50,80 120,30 Q 80,120 40,180 Z" fill="#131a12" />
            <path d="M 200,180 Q 150,70 80,40 Q 130,130 160,180 Z" fill="#060906" opacity="0.9" />
            <path d="M 50,200 Q 100,100 150,60 Q 110,150 100,200 Z" fill="#1a2319" opacity="0.8" />
            {/* Fiapos de pelos urticantes brancos/verdes claros */}
            <path d="M 70,100 L 75,95 M 80,120 L 88,115 M 130,110 L 122,105" stroke="#4a8270" strokeWidth="1" strokeLinecap="round" />
          </g>
        );

      case 'ossada':
        return (
          <g>
            {/* Costelas Gigantes Arquedas (Túnel de Ossos) */}
            <path d="M 30,170 Q 30,90 80,60" fill="none" stroke="#e0d8c3" strokeWidth="6" strokeLinecap="round" />
            <path d="M 60,175 Q 60,100 110,75" fill="none" stroke="#e0d8c3" strokeWidth="7" strokeLinecap="round" />
            <path d="M 90,180 Q 90,110 140,85" fill="none" stroke="#e0d8c3" strokeWidth="8" strokeLinecap="round" />
            <path d="M 120,185 Q 120,120 170,100" fill="none" stroke="#e0d8c3" strokeWidth="6" strokeLinecap="round" />
            {/* Costelas do outro lado, menores por perspectiva */}
            <path d="M 110,65 Q 150,70 170,120" fill="none" stroke="#d0c8b3" strokeWidth="4" strokeLinecap="round" />
            <path d="M 140,80 Q 170,90 190,130" fill="none" stroke="#d0c8b3" strokeWidth="5" strokeLinecap="round" />
            
            {/* Mochila entre as costelas */}
            <rect x="75" y="165" width="20" height="15" rx="4" fill="#4a8270" transform="rotate(-15 85 170)" />
            <rect x="80" y="160" width="10" height="5" rx="2" fill="#2c3826" transform="rotate(-15 85 170)" />
            
            {/* Grama e terreno onde estão enterradas */}
            <path d="M 10,185 Q 100,160 200,195 L 200,200 L 10,200 Z" fill="#060906" />
            <path d="M 50,170 Q 150,150 220,185" fill="none" stroke="#060906" strokeWidth="4" />
          </g>
        );

      case 'sanguessugas':
        return (
          <g>
            {/* Remanso escuro */}
            <path d="M 0,120 Q 100,140 200,120 L 200,200 L 0,200 Z" fill="#0a120c" />
            {/* Silhuetas minúsculas parecendo parasitas serpenteando */}
            <path d="M 50,160 Q 55,155 60,165" fill="none" stroke="#e57a3b" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
            <path d="M 90,145 Q 98,150 95,155" fill="none" stroke="#e57a3b" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
            <path d="M 130,175 Q 125,165 140,170" fill="none" stroke="#e57a3b" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
            <path d="M 160,150 Q 170,160 165,145" fill="none" stroke="#e57a3b" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
            
            <path d="M 40,180 Q 45,175 35,185" fill="none" stroke="#1a2319" strokeWidth="3" strokeLinecap="round" />
            <path d="M 80,170 Q 75,160 90,165" fill="none" stroke="#1a2319" strokeWidth="3" strokeLinecap="round" />
            <path d="M 110,160 Q 120,150 115,165" fill="none" stroke="#1a2319" strokeWidth="3" strokeLinecap="round" />
            <path d="M 150,185 Q 140,175 160,180" fill="none" stroke="#1a2319" strokeWidth="3" strokeLinecap="round" />
          </g>
        );

      case 'brejo_vozes':
        return (
          <g>
            {/* Pântano macabro e escuro */}
            <path d="M 0,200 L 0,160 Q 100,170 200,160 L 200,200 Z" fill="#030504" />
            
            {/* Água estagnada negra */}
            <path d="M 0,170 L 200,170 L 200,200 L 0,200 Z" fill="#060906" opacity="0.8" />
            <path d="M 0,175 Q 100,185 200,175" fill="none" stroke="#131a12" strokeWidth="1" />

            {/* Árvores mortas do pântano (Troncos finos, tortos e musgosos) */}
            <path d="M 20,170 C 10,100 30,50 10,-10 C 30,-10 30,50 35,170 Z" fill="#060906" />
            <path d="M 30,80 Q 50,60 60,70" fill="none" stroke="#060906" strokeWidth="4" strokeLinecap="round" />
            
            <path d="M 180,180 C 170,120 190,40 180,-10 C 190,-10 200,80 190,180 Z" fill="#030504" />
            <path d="M 185,60 Q 160,50 150,70" fill="none" stroke="#030504" strokeWidth="5" strokeLinecap="round" />

            {/* Toco podre central e folhagens de pântano cobrindo o bicho */}
            <path d="M 70,180 L 80,110 L 95,120 L 115,100 L 130,120 L 140,180 Z" fill="#060906" />
            <path d="M 50,180 Q 90,140 130,180 Z" fill="#0a0f0a" />
            <path d="M 110,180 Q 140,130 170,180 Z" fill="#0a0f0a" />

            {/* O PREDADOR MIMÉTICO (Terópode bizarro atrás do toco fingindo ser humano) */}
            <g transform="translate(85, 90)">
              {/* Cabeça curvada pra frente, espiando do escuro */}
              <path d="M 15,30 C -10,30 -5,10 10,0 C 25,10 25,30 15,30 Z" fill="#030504" />
              {/* Focinho abrindo levemente simulando a voz */}
              <path d="M 0,15 L -20,18 L -15,22 L 5,20" fill="#060906" />
              
              {/* Olhos amarelos finos, predatórios, não sorridentes, espiando a vítima */}
              <polygon points="5,10 15,12 10,8" fill="#d4af37" />
              <polygon points="20,11 25,13 22,9" fill="#d4af37" />
              <circle cx="10" cy="10" r="0.5" fill="#000" />
              <circle cx="22" cy="11" r="0.5" fill="#000" />
            </g>

            {/* Névoa densa cobrindo os pés (O Pântano respira) */}
            <path d="M 0,200 Q 50,140 100,160 T 200,130 L 200,200 Z" fill="#a09b8b" opacity="0.07" />
            <path d="M 0,200 Q 80,150 140,180 T 200,160 L 200,200 Z" fill="#e0d8c3" opacity="0.04" />
          </g>
        );
      case 'rio_sombra':
        return (
          <g>
            <path d="M 0,200 L 0,130 Q 100,160 200,130 L 200,200 Z" fill="#060906" opacity="0.9" />
            <path d="M 0,145 Q 100,175 200,145" fill="none" stroke="#2c3826" strokeWidth="2" opacity="0.5" />
            <path d="M 0,160 Q 100,190 200,160" fill="none" stroke="#2c3826" strokeWidth="2" opacity="0.3" />
            {/* Monstro colossal submerso */}
            <path d="M 20,180 Q 80,120 170,160 Q 200,180 220,150 Q 170,220 20,180 Z" fill="#131a12" opacity="0.8" />
            <path d="M 60,146 Q 100,130 140,152" fill="none" stroke="#060906" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
            <path d="M 90,138 L 105,120 L 120,143" fill="#060906" />
          </g>
        );

      case 'peixes':
        return (
          <g>
            <path d="M 0,200 L 0,150 Q 100,170 200,150 L 200,200 Z" fill="#0a0f0a" />
            <g opacity="0.7">
              {[...Array(6)].map((_, i) => (
                <g key={`peixe-${i}`} transform={`translate(${40 + i*25}, ${165 + (i%2===0?10:-10)}) rotate(${i*15 - 30})`}>
                  <ellipse cx="0" cy="0" rx="12" ry="4" fill="#1c241b" />
                  <polygon points="-12,0 -18,-5 -15,0 -18,5" fill="#1c241b" />
                  <path d="M 8,-2 L 14,0 L 8,2 Z" fill="#060906" />
                  <circle cx="6" cy="-1" r="0.8" fill="#e57a3b" />
                </g>
              ))}
            </g>
          </g>
        );

      case 'peixes_bico':
        return (
          <g>
            <path d="M 0,200 L 0,140 Q 100,160 200,140 L 200,200 Z" fill="#0a0f0a" />
            
            {/* Peixe Bico Grande (Lepisosteus / Gar) nadando à espreita */}
            <g transform="translate(40, 160) rotate(5)">
              {/* Corpo longo e blindado */}
              <path d="M 0,0 L 70,5 L 110,0 L 70,-5 Z" fill="#1c241b" />
              {/* Escamas em losango visíveis */}
              <path d="M 20,-2 L 30,2 M 40,-3 L 50,3 M 60,-3 L 70,3 M 80,-2 L 90,2" stroke="#0a0f0a" strokeWidth="1" />
              
              {/* Focinho longo / Bico */}
              <polygon points="105,-1 135,-2 105,2" fill="#060906" />
              {/* Dentes */}
              <path d="M 115,-2 L 115,-4 M 125,-2 L 125,-4 M 110,2 L 110,4 M 120,2 L 120,4" stroke="#e0d8c3" strokeWidth="0.5" />
              
              {/* Cauda */}
              <polygon points="0,0 -15,-10 -5,0 -15,10" fill="#1c241b" />
              {/* Barbatanas */}
              <polygon points="70,-5 65,-12 80,-5" fill="#1c241b" />
              <polygon points="70,5 65,12 80,5" fill="#1c241b" />
              
              {/* Olho cruel */}
              <circle cx="102" cy="-1" r="1.5" fill="#e57a3b" />
            </g>

            {/* Um menor mais ao fundo */}
            <g transform="translate(130, 140) scale(0.6) rotate(-10)" opacity="0.6">
              <path d="M 0,0 L 70,5 L 110,0 L 70,-5 Z" fill="#1c241b" />
              <polygon points="105,-1 135,-2 105,2" fill="#060906" />
              <polygon points="0,0 -15,-10 -5,0 -15,10" fill="#1c241b" />
              <circle cx="102" cy="-1" r="1.5" fill="#e57a3b" />
            </g>

            {/* Linhas na água */}
            <path d="M 10,180 Q 50,190 100,180 T 190,190" fill="none" stroke="#2c3826" strokeWidth="2" opacity="0.4" />
          </g>
        );

      case 'lancha':
        return (
          <g>
            <path d="M 0,200 L 0,160 Q 100,180 200,160 L 200,200 Z" fill="#0a0f0a" />
            {/* Lancha */}
            <g transform="translate(60, 110) rotate(-15)">
              <polygon points="0,50 15,20 80,20 100,50" fill="#e0d8c3" opacity="0.9" />
              <polygon points="0,50 100,50 90,70 10,70" fill="#2c3c4a" />
              <polygon points="20,20 30,5 60,5 70,20" fill="#1a2530" />
              <rect x="35" y="8" width="20" height="10" fill="#060906" />
              {/* Vidro quebrado */}
              <path d="M 37,8 L 45,18 M 55,8 L 45,18" stroke="#e0d8c3" strokeWidth="1" />
              {/* Motor de popa */}
              <rect x="-10" y="40" width="10" height="15" fill="#060906" />
              <rect x="-12" y="55" width="14" height="20" fill="#1a241e" />
              <path d="M -15,75 L -5,75 L -5,85 Z M 0,75 L 5,75 L -5,85 Z" fill="#131a12" />
            </g>
            {/* Água batendo e cipós */}
            <path d="M 40,170 Q 100,160 160,190" fill="none" stroke="#2c3826" strokeWidth="3" opacity="0.6" />
          </g>
        );

      case 'azhdarquido':
        return (
          <g>
            <path d="M 0,200 L 0,160 Q 100,180 200,160 L 200,200 Z" fill="#0a0f0a" />
            {/* O Pterossauro Gigante */}
            <g transform="translate(140, 50)">
              {/* Pernas traseiras */}
              <polyline points="0,70 -10,120 -20,130" fill="none" stroke="#060906" strokeWidth="4" />
              <polyline points="20,70 30,120 40,130" fill="none" stroke="#060906" strokeWidth="4" />
              
              {/* Corpo (costas pontudas, como uma corcunda ossuda) */}
              <polygon points="-10,50 30,50 20,80 -5,80" fill="#060906" />
              
              {/* Asas gigantes dobradas como pilares (Braços) que tocam o chão */}
              <path d="M -10,50 Q -50,60 -60,110 L -60,140" fill="none" stroke="#060906" strokeWidth="8" strokeLinejoin="round" />
              <path d="M -60,110 L -40,90 L -10,50" fill="none" stroke="#060906" strokeWidth="6" />
              <path d="M -60,110 Q -70,90 -90,70" fill="none" stroke="#060906" strokeWidth="3" opacity="0.7" />

              {/* Pescoço absurdamente longo */}
              <path d="M 10,50 Q -10,-10 -60,20 Q -100,40 -120,90" fill="none" stroke="#060906" strokeWidth="10" strokeLinecap="round" />
              
              {/* Cabeça e Bico de lança enorme (como uma cegonha infernal) */}
              <polygon points="-110,80 -100,105 -118,100" fill="#060906" />
              {/* Bico superior e inferior */}
              <polygon points="-113,95 -145,130 -115,100" fill="#e0d8c3" opacity="0.8" />
              <polygon points="-110,100 -140,135 -113,105" fill="#e0d8c3" opacity="0.5" />
              {/* Olho ameaçador brilhante */}
              <circle cx="-110" cy="95" r="2" fill="#e57a3b" />
            </g>
          </g>
        );

      case 'toca_mordedor':
        return (
          <g>
            <path d="M 0,200 L 0,140 L 40,130 L 100,180 L 160,130 L 200,140 L 200,200 Z" fill="#131a12" />
            {/* Toca escura */}
            <ellipse cx="100" cy="165" rx="40" ry="25" fill="#060906" />
            {/* Raízes em cima */}
            <path d="M 50,130 Q 80,160 100,140 Q 120,160 150,130" fill="none" stroke="#0a0f0a" strokeWidth="6" />
            {/* Olhos e dentes na escuridão */}
            <circle cx="85" cy="160" r="3" fill="#e57a3b" />
            <circle cx="115" cy="160" r="3" fill="#e57a3b" />
            <polygon points="80,170 85,180 90,170" fill="#e0d8c3" />
            <polygon points="110,170 115,180 120,170" fill="#e0d8c3" />
            {/* Lixo brilhante na frente */}
            <rect x="70" y="180" width="15" height="5" fill="#a4fca2" opacity="0.6" transform="rotate(-15 70 180)" />
            <circle cx="130" cy="182" r="5" fill="#e0d8c3" opacity="0.4" />
          </g>
        );

      case 'corredeira':
        return (
          <g>
            {/* Água violenta */}
            <path d="M 0,200 L 0,130 L 50,150 L 100,130 L 150,160 L 200,120 L 200,200 Z" fill="#0a0f0a" />
            <path d="M 0,150 Q 40,120 100,160 T 200,140" fill="none" stroke="#2c3826" strokeWidth="3" opacity="0.6" />
            <path d="M 0,170 Q 50,190 120,150 T 200,170" fill="none" stroke="#e0d8c3" strokeWidth="2" opacity="0.3" />
            
            {/* Destroços: Carrinho de supermercado */}
            <g transform="translate(60, 140) rotate(20)">
              <rect x="0" y="0" width="40" height="25" fill="none" stroke="#4a8270" strokeWidth="2" />
              <line x1="10" y1="0" x2="10" y2="25" stroke="#4a8270" strokeWidth="1" />
              <line x1="20" y1="0" x2="20" y2="25" stroke="#4a8270" strokeWidth="1" />
              <line x1="30" y1="0" x2="30" y2="25" stroke="#4a8270" strokeWidth="1" />
              <line x1="0" y1="12" x2="40" y2="12" stroke="#4a8270" strokeWidth="1" />
              <circle cx="5" cy="30" r="3" fill="#131a12" />
              <circle cx="35" cy="30" r="3" fill="#131a12" />
            </g>
            {/* Pneu enferrujado e cano */}
            <ellipse cx="150" cy="170" rx="15" ry="8" fill="#131a12" stroke="#e57a3b" strokeWidth="2" opacity="0.7" transform="rotate(-15 150 170)" />
            <rect x="120" y="160" width="40" height="8" fill="#e57a3b" opacity="0.5" transform="rotate(45 120 160)" />
          </g>
        );

      case 'tartarugas':
        return (
          <g>
            {/* Praia de areia úmida */}
            <path d="M 0,200 L 0,150 Q 100,120 200,160 L 200,200 Z" fill="#1a241e" />
            {/* Água beirando */}
            <path d="M 0,160 Q 80,140 200,180" fill="none" stroke="#0a0f0a" strokeWidth="10" opacity="0.5" />
            
            {/* Tartaruga 1 escavando */}
            <g transform="translate(60, 150) rotate(-10)">
              <polygon points="0,15 20,0 50,0 70,15 50,30 20,30" fill="#060906" />
              <polygon points="20,5 50,5 60,15 50,25 20,25 10,15" fill="#131a12" stroke="#2c3826" strokeWidth="1" />
              {/* Cabeça */}
              <circle cx="75" cy="15" r="5" fill="#060906" />
              {/* Patas grossas */}
              <path d="M 10,5 L 0,-5 M 60,5 L 70,-5 M 10,25 L 0,35 M 60,25 L 70,35" stroke="#060906" strokeWidth="4" />
            </g>

            {/* Tartaruga 2 ao fundo */}
            <g transform="translate(140, 130) scale(0.7) rotate(15)">
              <polygon points="0,15 20,0 50,0 70,15 50,30 20,30" fill="#060906" />
              <polygon points="20,5 50,5 60,15 50,25 20,25 10,15" fill="#131a12" />
              <circle cx="-5" cy="15" r="5" fill="#060906" />
            </g>

            {/* Ovos na areia */}
            <circle cx="90" cy="180" r="4" fill="#e0d8c3" />
            <circle cx="100" cy="185" r="4" fill="#e0d8c3" />
            <circle cx="105" cy="178" r="4" fill="#e0d8c3" />
          </g>
        );

      case 'carro_arrastado':
        return (
          <g>
            <path d="M 0,200 L 0,140 Q 100,160 200,140 L 200,200 Z" fill="#0a0f0a" />
            {/* Tronco de árvore segurando o carro */}
            <path d="M 120,200 L 140,150 Q 160,130 200,120" fill="none" stroke="#060906" strokeWidth="12" />
            
            {/* Sedan submerso pela metade, capotado de lado */}
            <g transform="translate(80, 160) rotate(160)">
              <path d="M -30,-15 L 30,-15 L 45,10 L 50,15 L -50,15 L -45,10 Z" fill="#2c3c4a" opacity="0.9" />
              {/* Teto esmagado */}
              <polygon points="-25,-15 25,-15 15,-35 -15,-35" fill="#1a2530" />
              {/* Vidros */}
              <polygon points="-20,-15 -5,-15 -10,-30 -15,-30" fill="#060906" />
              <polygon points="0,-15 20,-15 10,-30 5,-30" fill="#060906" />
              {/* Roda fora da água */}
              <circle cx="25" cy="15" r="8" fill="#060906" />
              <circle cx="25" cy="15" r="3" fill="#e0d8c3" opacity="0.4" />
            </g>

            {/* Água passando violentamente por cima */}
            <path d="M 20,160 Q 60,140 100,170 T 180,150" fill="none" stroke="#2c3826" strokeWidth="4" opacity="0.6" />
            <path d="M 40,180 Q 80,160 120,190" fill="none" stroke="#e0d8c3" strokeWidth="2" opacity="0.4" />
          </g>
        );

      case 'flamingos':
        return (
          <g>
            <path d="M 0,200 L 0,160 Q 100,170 200,160 L 200,200 Z" fill="#0a0f0a" />
            <path d="M 0,160 Q 50,140 100,160 T 200,140 L 200,110 L 0,110 Z" fill="#131a12" />
            
            {/* Flamingo 1 */}
            <g transform="translate(60, 110)">
              {/* Pernas longas */}
              <path d="M 15,20 L 10,60 M 20,20 L 25,60" stroke="#060906" strokeWidth="2" />
              {/* Corpo redondinho rosa e sombra */}
              <ellipse cx="15" cy="15" rx="15" ry="10" fill="#a34161" />
              <ellipse cx="15" cy="15" rx="13" ry="8" fill="#e57a99" />
              <path d="M 0,15 Q 15,30 28,15" fill="none" stroke="#a34161" strokeWidth="3" opacity="0.6" />
              {/* Pescoço curvado pra baixo (comendo) */}
              <path d="M 5,15 Q -10,0 -15,15 Q -20,25 -10,35" fill="none" stroke="#e57a99" strokeWidth="4" />
              <path d="M 5,15 Q -10,0 -15,15 Q -20,25 -10,35" fill="none" stroke="#a34161" strokeWidth="1.5" opacity="0.6" />
              {/* Bico curvado */}
              <path d="M -10,35 Q 0,40 5,35" fill="#060906" />
            </g>

            {/* Flamingo 2 (Observando) */}
            <g transform="translate(130, 120) scale(0.8)">
              <path d="M 15,20 L 10,60 M 20,20 L 25,60" stroke="#060906" strokeWidth="2" />
              <ellipse cx="15" cy="15" rx="15" ry="10" fill="#a34161" />
              <ellipse cx="15" cy="15" rx="13" ry="8" fill="#e57a99" />
              <path d="M 0,15 Q 15,30 28,15" fill="none" stroke="#a34161" strokeWidth="3" opacity="0.6" />
              {/* Pescoço em S */}
              <path d="M 25,10 Q 35,0 30,-10 Q 25,-20 30,-30" fill="none" stroke="#e57a99" strokeWidth="4" />
              <circle cx="30" cy="-30" r="4" fill="#e57a99" />
              <path d="M 32,-30 L 40,-25 L 32,-25" fill="#060906" />
              <circle cx="30" cy="-31" r="0.8" fill="#060906" />
            </g>
            
            {/* Flamingo 3 (Lá no fundo) */}
            <g transform="translate(95, 100) scale(0.5)">
              <path d="M 15,20 L 10,60 M 20,20 L 25,60" stroke="#060906" strokeWidth="2" />
              <ellipse cx="15" cy="15" rx="15" ry="10" fill="#cc6688" />
              <ellipse cx="15" cy="15" rx="13" ry="8" fill="#e57a99" />
              <path d="M 25,10 Q 35,0 30,-10 Q 25,-20 30,-30" fill="none" stroke="#e57a99" strokeWidth="4" />
              <circle cx="30" cy="-30" r="4" fill="#e57a99" />
              <path d="M 32,-30 L 40,-25 L 32,-25" fill="#060906" />
            </g>

            {/* Olhos espreitando na água */}
            <circle cx="90" cy="180" r="1.5" fill="#e57a3b" opacity="0.8" />
            <circle cx="95" cy="180" r="1.5" fill="#e57a3b" opacity="0.8" />
            <path d="M 70,185 Q 92,175 115,185" fill="none" stroke="#060906" strokeWidth="2" />
          </g>
        );

      case 'crocodiliano':
        return (
          <g>
            <path d="M 0,200 L 0,160 Q 100,170 200,160 L 200,200 Z" fill="#0a0f0a" />
            <path d="M 0,175 Q 100,160 200,185 L 200,200 L 0,200 Z" fill="#131a12" />
            
            {/* Crocodiliano mais gordo e encorpado (boca e focinho grandes vindo pra frente) */}
            <g transform="translate(60, 160)">
              {/* Corpo largo */}
              <path d="M -30,15 Q 10,-5 50,0 Q 80,5 90,10 Q 50,25 -30,25 Z" fill="#060906" />
              
              {/* Cristas ósseas grandes nas costas */}
              <polygon points="-10,5 0,-5 10,6" fill="#060906" />
              <polygon points="10,2 20,-6 30,3" fill="#060906" />
              <polygon points="30,-1 40,-8 50,0" fill="#060906" />
              
              {/* Cabeça e mandíbula forte superior */}
              <path d="M 50,0 L 100,5 Q 110,10 100,15 L 50,15 Z" fill="#060906" />
              
              {/* Mandíbula forte inferior (boca aberta) */}
              <path d="M 50,15 L 90,20 Q 95,25 90,28 L 50,20 Z" fill="#060906" />
              
              {/* Dentes grossos cruzando as duas mandíbulas (boca muito mais nítida) */}
              <polygon points="60,15 63,22 66,15" fill="#e0d8c3" />
              <polygon points="70,16 73,23 76,16" fill="#e0d8c3" />
              <polygon points="80,17 83,24 86,17" fill="#e0d8c3" />
              <polygon points="90,18 92,23 94,18" fill="#e0d8c3" />
              
              <polygon points="65,21 68,14 71,21" fill="#e0d8c3" />
              <polygon points="75,22 78,15 81,22" fill="#e0d8c3" />
              <polygon points="85,23 88,16 91,23" fill="#e0d8c3" />

              {/* Olho ameaçador amarelado */}
              <circle cx="55" cy="5" r="2.5" fill="#e57a3b" />
              <circle cx="55" cy="5" r="5" fill="#e57a3b" opacity="0.4" />
            </g>
          </g>
        );

      case 'enchente':
        return (
          <g>
            {/* AGORA SIM O CÉU LIMPO - Sobrescreve a escuridão base do bioma! */}
            <rect x="0" y="0" width="200" height="150" fill="#93b09d" />
            
            {/* Sol brilhante e passarinhos claros */}
            <circle cx="150" cy="30" r="15" fill="#e57a3b" opacity="0.9" />
            <path d="M 40,20 Q 45,15 50,20 Q 55,15 60,20" fill="none" stroke="#131a12" strokeWidth="1.5" />
            <path d="M 80,30 Q 85,25 90,30 Q 95,25 100,30" fill="none" stroke="#131a12" strokeWidth="1.5" />
            
            {/* Parede de água suja (Muralha) subindo de baixo e tomando a tela */}
            <path d="M 0,200 L 0,80 Q 50,60 100,90 T 200,50 L 200,200 Z" fill="#131a12" />
            <path d="M 0,100 Q 50,80 100,110 T 200,70 L 200,200 L 0,200 Z" fill="#0a0f0a" />
            
            {/* Correnteza frontal e espuma suja da ponta do muro de água */}
            <path d="M 20,85 Q 60,65 100,100 T 180,65" fill="none" stroke="#2c3826" strokeWidth="4" />
            <path d="M 40,110 Q 80,90 120,120 T 200,90" fill="none" stroke="#e0d8c3" strokeWidth="2" opacity="0.3" />
            
            {/* Árvores e galhos inteiros sendo arrastados */}
            <path d="M 50,130 L 80,180 M 60,150 L 90,140" stroke="#060906" strokeWidth="5" />
            <path d="M 130,90 L 160,140 M 140,110 L 170,100" stroke="#060906" strokeWidth="4" />
            
            {/* Respingos de água barrenta voando violentamente PRA CIMA e PRA FRENTE (Não é chuva descendo!) */}
            <line x1="120" y1="100" x2="110" y2="70" stroke="#131a12" strokeWidth="2" />
            <line x1="60" y1="90" x2="50" y2="60" stroke="#131a12" strokeWidth="2" />
            <circle cx="110" cy="65" r="1.5" fill="#131a12" />
            <circle cx="50" cy="55" r="1.5" fill="#131a12" />
          </g>
        );

      case 'tempestade_caminho':
        return (
          <g>
            {/* Céu escuro esmeralda caindo sobre o horizonte */}
            <path d="M 0,160 Q 100,120 200,160 L 200,0 L 0,0 Z" fill="#06120d" opacity="0.8" />
            <path d="M 0,200 L 0,160 Q 100,180 200,160 L 200,200 Z" fill="#0a0f0a" />
            <path d="M 80,170 L 100,140 L 120,170" fill="none" stroke="#2c3c4a" strokeWidth="2" opacity="0.3" />
            
            {/* Chuva forte oblíqua (agora mais clara, para aparecer no céu!) */}
            <g stroke="#a4fca2" strokeWidth="1.5" opacity="0.2">
              {[...Array(20)].map((_, i) => (
                <line key={i} x1={i * 15} y1="-50" x2={i * 15 - 40} y2="250" />
              ))}
              {[...Array(20)].map((_, i) => (
                <line key={`b${i}`} x1={i * 15 + 10} y1="-50" x2={i * 15 - 30} y2="250" opacity="0.4" />
              ))}
            </g>

            {/* Raio violento ramificado caindo no centro (Atualizado) */}
            <path d="M 110,0 L 95,60 L 105,65 L 85,150 L 80,180" fill="none" stroke="#a4fca2" strokeWidth="4" opacity="0.9" />
            <path d="M 110,0 L 95,60 L 105,65 L 85,150 L 80,180" fill="none" stroke="#e0d8c3" strokeWidth="1.5" />
            
            {/* Ramificação secundária do raio */}
            <path d="M 105,65 L 130,90 L 125,100 L 140,110" fill="none" stroke="#a4fca2" strokeWidth="2" opacity="0.7" />
            <path d="M 85,150 L 100,160" fill="none" stroke="#a4fca2" strokeWidth="1.5" opacity="0.7" />

            {/* Marca de impacto no chão */}
            <ellipse cx="80" cy="180" rx="30" ry="10" fill="#a4fca2" opacity="0.2" />
            <ellipse cx="80" cy="180" rx="15" ry="5" fill="#a4fca2" opacity="0.5" />
          </g>
        );

      case 'anquilossauro_tempestade':
        return (
          <g>
            <path d="M 0,200 L 0,160 Q 100,180 200,160 L 200,200 Z" fill="#0a0f0a" />
            {/* Raio ao fundo */}
            <path d="M 80,0 L 70,80 L 75,85 L 60,160" fill="none" stroke="#a4fca2" strokeWidth="2" opacity="0.5" />
            <ellipse cx="60" cy="160" rx="20" ry="5" fill="#a4fca2" opacity="0.2" />

            {/* Anquilossauro tenso na chuva */}
            <g transform="translate(100, 150) rotate(-5)">
              <ellipse cx="0" cy="0" rx="40" ry="20" fill="#060906" />
              <polygon points="40,5 55,10 40,15" fill="#060906" />
              <circle cx="50" cy="5" r="1.5" fill="#e57a3b" />
              
              {/* Espinhos nas costas */}
              <polygon points="-20,-17 -20,-25 -10,-19" fill="#e0d8c3" />
              <polygon points="0,-20 0,-30 10,-20" fill="#e0d8c3" />
              <polygon points="20,-17 20,-25 30,-15" fill="#e0d8c3" />
              <polygon points="-35,-10 -45,-15 -30,-5" fill="#e0d8c3" />

              {/* Cauda em clava balançando */}
              <path d="M -40,0 Q -70,-20 -90,0" fill="none" stroke="#060906" strokeWidth="8" />
              <circle cx="-90" cy="0" r="10" fill="#060906" />
              <polygon points="-100,0 -105,-5 -95,-8" fill="#e0d8c3" />
              
              {/* Pernas curtas */}
              <rect x="-20" y="15" width="10" height="15" fill="#060906" />
              <rect x="15" y="15" width="10" height="15" fill="#060906" />
            </g>
          </g>
        );

      case 'gruta_tempestade':
        return (
          <g>
            {/* Ambiente externo e parede da caverna */}
            <path d="M 0,200 L 0,160 Q 100,180 200,160 L 200,200 Z" fill="#0a0f0a" />
            <path d="M 0,160 Q 100,120 200,160 L 200,0 L 0,0 Z" fill="#030504" opacity="0.9" />
            <path d="M 0,200 L 20,150 L 10,80 L 40,40 L 90,30 L 140,50 L 180,80 L 170,160 L 200,200 L 200,0 L 0,0 Z" fill="#131a12" />
            
            {/* Chão e restos de fogueira reais (no chão da caverna) */}
            <path d="M 20,150 Q 100,220 170,160 L 120,200 L 60,200 Z" fill="#060906" opacity="0.6" />
            <g transform="translate(100, 170)">
              <ellipse cx="0" cy="0" rx="35" ry="8" fill="#030504" />
              <polygon points="-10,3 -5,-2 0,4" fill="#1c241b" />
              <polygon points="5,2 12,-1 18,3" fill="#1c241b" />
              <circle cx="-5" cy="0" r="1.5" fill="#4a8270" opacity="0.4" />
            </g>

            {/* PINTURAS RUPESTRES NA PAREDE DA CAVERNA (Rústicas e em tons ocre) */}
            
            {/* Cena Central: Caçador montado no Dinossauro e Fogueira */}
            <g transform="translate(45, 60) scale(0.65)" stroke="#ffb84d" strokeWidth="3" opacity="0.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              
              {/* O Grande Dinossauro (Brontossauro/T-Rex de palito) */}
              <path d="M 40,40 Q 60,10 90,20 Q 120,30 130,50" /> {/* Corpo e Pescoço */}
              <circle cx="135" cy="55" r="5" /> {/* Cabeça */}
              <line x1="140" y1="55" x2="148" y2="60" /> {/* Mandíbula */}
              <path d="M 40,40 Q 20,50 0,60" /> {/* Rabo longo */}
              
              {/* Pernas do Dino */}
              <line x1="50" y1="35" x2="50" y2="70" />
              <line x1="80" y1="25" x2="80" y2="65" />
              <line x1="90" y1="20" x2="95" y2="60" />

              {/* Caçador 1 MONTADO no Dino */}
              <line x1="75" y1="15" x2="75" y2="-10" stroke="#e57a3b" /> {/* Corpo montador */}
              <circle cx="75" cy="-15" r="4" stroke="#e57a3b" /> {/* Cabeça montador */}
              <line x1="75" y1="-5" x2="90" y2="-10" stroke="#e57a3b" /> {/* Braço montador com lança */}
              <line x1="85" y1="-20" x2="95" y2="0" stroke="#e57a3b" strokeWidth="2" /> {/* Lança gigante */}
              <line x1="75" y1="10" x2="65" y2="25" stroke="#e57a3b" /> {/* Perna firmada */}
              
              {/* Cena Direita: Galera em volta da Fogueira Rupestre */}
              <g transform="translate(140, 20) scale(0.8)">
                {/* Fogueira Desenhada na parede */}
                <path d="M 40,40 L 45,25 L 50,40" stroke="#ffb84d" />
                <path d="M 42,40 L 45,30 L 48,40" stroke="#e57a3b" />
                <line x1="35" y1="42" x2="55" y2="42" />
                
                {/* Humano Sentado Esquerda */}
                <circle cx="25" cy="30" r="3" stroke="#e57a3b" />
                <line x1="25" y1="33" x2="25" y2="45" stroke="#e57a3b" />
                <line x1="25" y1="38" x2="35" y2="35" stroke="#e57a3b" />
                
                {/* Humano Dançando Direita */}
                <circle cx="65" cy="20" r="3" stroke="#e57a3b" />
                <line x1="65" y1="23" x2="65" y2="35" stroke="#e57a3b" />
                <line x1="65" y1="28" x2="55" y2="23" stroke="#e57a3b" /> {/* Braço pro alto */}
                <line x1="65" y1="28" x2="75" y2="23" stroke="#e57a3b" /> {/* Braço pro alto */}
                <line x1="65" y1="35" x2="55" y2="45" stroke="#e57a3b" />
                <line x1="65" y1="35" x2="75" y2="45" stroke="#e57a3b" />
              </g>

            </g>

            {/* Cena Superior Esquerda: Animais voadores e Caçador com arco */}
            <g transform="translate(15, 40) scale(0.5)" stroke="#ffb84d" strokeWidth="3" opacity="0.4" fill="none" strokeLinecap="round">
              {/* Pássaro/Pterodátilo */}
              <path d="M 0,0 Q 15,-15 30,0 Q 15,10 0,0" />
              <path d="M 30,0 Q 45,-15 60,0 Q 45,10 30,0" />
              {/* Caçador atirando */}
              <circle cx="30" cy="50" r="4" stroke="#e57a3b" />
              <line x1="30" y1="54" x2="30" y2="70" stroke="#e57a3b" />
              <path d="M 30,60 Q 40,55 50,50" stroke="#e57a3b" /> {/* Arco sendo puxado */}
              <path d="M 50,40 Q 55,50 50,60" stroke="#ffb84d" /> {/* Corda do arco */}
            </g>

          </g>
        );

      case 'raio_copa':
        return (
          <g>
            <path d="M 0,200 L 0,160 Q 100,180 200,160 L 200,200 Z" fill="#0a0f0a" />
            
            {/* Raio violento ramificado atingindo o tronco */}
            <path d="M 90,0 L 105,40 L 95,60 L 115,80 L 105,100 L 120,130 L 105,180" fill="none" stroke="#a4fca2" strokeWidth="3" opacity="0.9" />
            <path d="M 90,0 L 105,40 L 95,60 L 115,80 L 105,100 L 120,130 L 105,180" fill="none" stroke="#e0d8c3" strokeWidth="1" />
            
            {/* Tronco de árvore rachado em dois (V invertido abrindo) */}
            {/* Metade Esquerda */}
            <path d="M 95,180 L 100,120 L 70,60 L 60,70 L 85,120 L 80,180 Z" fill="#060906" />
            {/* Metade Direita */}
            <path d="M 115,180 L 110,130 L 150,50 L 160,60 L 120,130 L 125,180 Z" fill="#131a12" />
            
            {/* Galhos pretos retorcidos (Silhuetas na copa) */}
            <path d="M 150,50 L 140,30 M 155,55 L 170,40" stroke="#131a12" strokeWidth="3" />
            <path d="M 70,60 L 50,40 M 80,65 L 90,45" stroke="#060906" strokeWidth="3" />

            {/* Fogo orgânico subindo pelas duas metades da copa (Chamas não geométricas) */}
            <path d="M 50,70 Q 60,30 75,10 Q 75,40 90,50 Q 80,65 70,75 Z" fill="#e57a3b" opacity="0.9" />
            <path d="M 55,65 Q 65,40 73,25 Q 75,40 85,55 Q 75,60 65,65 Z" fill="#ffb84d" />
            
            <path d="M 140,60 Q 155,20 165,0 Q 170,30 180,50 Q 170,70 150,70 Z" fill="#e57a3b" opacity="0.8" />
            <path d="M 145,55 Q 158,25 163,15 Q 165,35 173,50 Q 165,65 152,60 Z" fill="#ffb84d" />

            {/* Brasas e centelhas voando caóticas levadas pelo vento pra esquerda */}
            <circle cx="40" cy="40" r="2.5" fill="#ffb84d" />
            <circle cx="20" cy="50" r="3.5" fill="#e57a3b" opacity="0.8" />
            <circle cx="10" cy="35" r="1.5" fill="#ffb84d" />
            <circle cx="50" cy="20" r="2" fill="#e57a3b" />
            <circle cx="120" cy="25" r="2" fill="#e57a3b" opacity="0.8" />
            <circle cx="30" cy="70" r="1.5" fill="#ffb84d" />
          </g>
        );

      case 'chuva_enxofre':
        return (
          <g>
            <path d="M 0,200 L 0,160 Q 100,180 200,160 L 200,200 Z" fill="#0a0f0a" />
            
            {/* Chuva espessa amarelo-esverdeada */}
            <g stroke="#8ba84a" strokeWidth="2" opacity="0.6">
              {[...Array(20)].map((_, i) => (
                <line key={i} x1={i * 10} y1={-20 + (i%3)*20} x2={i * 10 - 20} y2={200} />
              ))}
            </g>

            {/* Poças fumaçantes e chão derretendo */}
            <ellipse cx="60" cy="180" rx="30" ry="10" fill="#4a8270" opacity="0.8" />
            <path d="M 40,180 Q 50,150 70,140 Q 60,160 80,175" fill="none" stroke="#8ba84a" strokeWidth="3" opacity="0.7" />
            
            <ellipse cx="150" cy="170" rx="20" ry="6" fill="#4a8270" opacity="0.8" />
            <path d="M 140,170 Q 145,150 160,145" fill="none" stroke="#8ba84a" strokeWidth="2" opacity="0.6" />
          </g>
        );

      case 'deslizamento_tempestade':
        return (
          <g>
            {/* Encosta desmoronando à direita */}
            <path d="M 0,200 L 0,160 L 80,180 L 200,80 L 200,200 Z" fill="#0a0f0a" />
            
            {/* Chuva oblíqua */}
            <g stroke="#1b302c" strokeWidth="1" opacity="0.4">
              {[...Array(15)].map((_, i) => (
                <line key={i} x1={i * 20} y1="0" x2={i * 20 - 30} y2="200" />
              ))}
            </g>

            {/* Pedras gigantes (tamanho de carro) rolando */}
            <g transform="translate(120, 110) rotate(-15)">
              <polygon points="-20,-20 10,-30 30,-10 20,20 -10,25 -30,5" fill="#131a12" stroke="#2c3826" strokeWidth="2" />
              <polygon points="-10,-10 20,-10 10,10" fill="#060906" />
            </g>
            
            <g transform="translate(70, 160) rotate(25)">
              <polygon points="-15,-15 15,-20 25,-5 10,15 -10,10 -20,-5" fill="#131a12" stroke="#2c3826" strokeWidth="2" />
            </g>

            {/* Poeira/barro levantando */}
            <path d="M 50,180 Q 80,150 130,130" fill="none" stroke="#2c3826" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
          </g>
        );

      case 'manada_tempestade':
        return (
          <g>
            <path d="M 0,200 L 0,160 Q 100,180 200,160 L 200,200 Z" fill="#0a0f0a" />
            {/* Céu de tempestade e raio pequeno */}
            <path d="M 120,0 L 110,60 L 115,65 L 100,140" fill="none" stroke="#a4fca2" strokeWidth="1.5" opacity="0.6" />
            <circle cx="100" cy="140" r="10" fill="#a4fca2" opacity="0.1" />

            {/* Manada vindo na diagonal (Triceratops de perfil em disparada) */}
            <g transform="translate(100, 150) rotate(-5)">
              <ellipse cx="0" cy="0" rx="35" ry="20" fill="#060906" />
              {/* Escudo ósseo nuca */}
              <path d="M -25,0 Q -40,-30 -10,-40 Q -10,-10 -25,0 Z" fill="#060906" />
              <polygon points="-15,-40 -12,-45 -8,-38" fill="#e0d8c3" />
              <polygon points="-25,-35 -30,-40 -20,-33" fill="#e0d8c3" />
              <polygon points="-33,-25 -40,-27 -30,-20" fill="#e0d8c3" />
              
              {/* Cabeça e bico pesado */}
              <path d="M -25,0 L -50,5 Q -55,-5 -45,-15 L -25,-10 Z" fill="#060906" />
              
              {/* Chifres aponta pra frente */}
              <polygon points="-35,-15 -60,-25 -30,-10" fill="#e0d8c3" />
              <polygon points="-40,-13 -65,-22 -35,-8" fill="#e0d8c3" opacity="0.7" />

              {/* Olho amedrontado */}
              <circle cx="-35" cy="-5" r="1.5" fill="#e57a3b" />
              
              {/* Pernas pesadas em corrida */}
              <path d="M -20,15 L -25,30 M -10,18 L -5,30 M 15,15 L 20,30 M 25,10 L 35,30" stroke="#060906" strokeWidth="6" />
            </g>

            {/* Outro herbivoro menor atrás seguindo o lider */}
            <g transform="translate(160, 130) scale(0.7) rotate(-10)" opacity="0.7">
              <ellipse cx="0" cy="0" rx="35" ry="20" fill="#060906" />
              <path d="M -25,0 Q -40,-30 -10,-40 Q -10,-10 -25,0 Z" fill="#131a12" />
              <path d="M -25,0 L -50,5 Q -55,-5 -45,-15 L -25,-10 Z" fill="#060906" />
              <polygon points="-35,-15 -60,-25 -30,-10" fill="#e0d8c3" />
            </g>

            {/* Terra batida voando do casco */}
            <path d="M 50,180 L -10,180 M 100,185 L 20,185" fill="none" stroke="#2c3826" strokeWidth="4" strokeDasharray="10 5" opacity="0.5" />
          </g>
        );

      case 'fenda_estatica':
        return (
          <g>
            <path d="M 0,200 L 0,160 Q 100,180 200,160 L 200,200 Z" fill="#0a0f0a" />
            {/* O rasgo temporal flutuando no meio do nada */}
            <path d="M 100,20 Q 80,80 100,150 Q 120,80 100,20 Z" fill="#2c3c4a" opacity="0.4" />
            <path d="M 100,30 Q 90,80 100,140 Q 110,80 100,30 Z" fill="#a4fca2" opacity="0.6" />
            <path d="M 100,40 Q 95,80 100,130 Q 105,80 100,40 Z" fill="#e0d8c3" />
            
            {/* Estática (raios) sendo puxados pro centro */}
            <path d="M 30,50 L 60,60 L 70,80 L 95,100" fill="none" stroke="#a4fca2" strokeWidth="2" />
            <path d="M 180,40 L 140,55 L 120,90 L 105,105" fill="none" stroke="#a4fca2" strokeWidth="2" />
            <path d="M 50,160 L 70,140 L 90,135" fill="none" stroke="#a4fca2" strokeWidth="1" />
            
            <circle cx="100" cy="90" r="40" fill="#a4fca2" opacity="0.1" />
          </g>
        );

      case 'raptor_encharcado':
        return (
          <g>
            <path d="M 0,200 L 0,160 Q 100,180 200,160 L 200,200 Z" fill="#0a0f0a" />
            {/* Pedra grande fazendo um toldo */}
            <path d="M 130,200 L 130,120 Q 180,100 200,110 L 200,200 Z" fill="#131a12" />
            
            {/* Raptor abaixado, penas pesadas grudadas no corpo */}
            <g transform="translate(130, 160) scale(0.9)">
              {/* Corpo esguio */}
              <path d="M 0,0 Q -30,-10 -50,10 L -40,30 Q 10,20 40,30 Q 70,-10 0,0 Z" fill="#060906" />
              {/* Cauda caída no chão */}
              <path d="M 40,25 Q 70,40 90,20" fill="none" stroke="#060906" strokeWidth="8" strokeLinecap="round" />
              {/* Pescoço curvado e cabeça */}
              <path d="M -25,0 Q -40,-20 -60,-15 L -80,-5 L -65,-5 Z" fill="#060906" />
              {/* Penas molhadas pingando */}
              <path d="M -15,5 L -10,20 M 0,0 L 5,15 M 15,10 L 20,25" stroke="#131a12" strokeWidth="2" />
              {/* Olho brilhante na sombra */}
              <circle cx="-60" cy="-10" r="2.5" fill="#e57a3b" />
            </g>
            
            {/* Poça na frente dele com pingos */}
            <ellipse cx="60" cy="180" rx="40" ry="10" fill="#1a241e" />
            <circle cx="50" cy="180" r="1.5" fill="#e0d8c3" opacity="0.5" />
            <circle cx="80" cy="175" r="1" fill="#e0d8c3" opacity="0.5" />
          </g>
        );

      case 'asa_aviao':
        return (
          <g>
            <path d="M 0,200 L 0,160 Q 100,180 200,160 L 200,200 Z" fill="#0a0f0a" />
            {/* Chuva */}
            <g stroke="#1b302c" strokeWidth="1" opacity="0.5">
              {[...Array(10)].map((_, i) => (
                <line key={i} x1={i * 20} y1="0" x2={i * 20 - 30} y2="200" />
              ))}
            </g>
            
            {/* Asa de avião enfiada na lama na diagonal */}
            <g transform="translate(100, 140) rotate(-30)">
              <polygon points="-80,10 -80,-10 60,-30 60,30" fill="#e0d8c3" opacity="0.9" />
              {/* Turbina amassada */}
              <ellipse cx="20" cy="20" rx="15" ry="10" fill="#2c3c4a" />
              <ellipse cx="15" cy="20" rx="5" ry="8" fill="#060906" />
              {/* Letras rasgadas "V 026" */}
              <text x="-40" y="-10" fill="#060906" fontSize="12" fontWeight="bold" transform="rotate(10 -40 -10)">V 026</text>
              {/* Fios rompidos / Faiscando */}
              <path d="M 60,-20 L 70,-15 L 75,-25" fill="none" stroke="#060906" strokeWidth="2" />
              <path d="M -80,0 L -90,-10" fill="none" stroke="#a4fca2" strokeWidth="1" />
            </g>
            
            {/* Lama ao redor */}
            <path d="M 60,170 Q 100,150 140,180" fill="none" stroke="#131a12" strokeWidth="10" />
          </g>
        );

      case 'peixes_atordoados':
        return (
          <g>
            <path d="M 0,200 L 0,160 Q 100,180 200,160 L 200,200 Z" fill="#0a0f0a" />
            {/* Poça gigantesca na tela */}
            <ellipse cx="100" cy="170" rx="80" ry="25" fill="#131a12" />
            <path d="M 40,160 Q 100,140 160,160" fill="none" stroke="#2c3826" strokeWidth="2" opacity="0.4" />
            
            {/* Árvore fumegando perto da poça (onde o raio caiu) */}
            <path d="M 180,150 L 175,70 L 190,60 L 185,150 Z" fill="#060906" />
            <circle cx="180" cy="65" r="5" fill="#e57a3b" opacity="0.6" />
            <path d="M 180,60 Q 170,30 190,0" fill="none" stroke="#4a8270" strokeWidth="2" opacity="0.5" />

            {/* Peixes mortos (barriga virada) boiando */}
            <g opacity="0.8">
              {[...Array(8)].map((_, i) => (
                <g key={`peixe-${i}`} transform={`translate(${40 + i*15}, ${160 + (i%2===0?15:5)}) rotate(${i*45})`}>
                  {/* Barriga curva pra cima */}
                  <path d="M -10,0 Q 0,-8 10,0 Q 0,-2 -10,0 Z" fill="#e0d8c3" opacity="0.9" />
                  <polygon points="10,0 15,-3 13,3" fill="#e0d8c3" />
                  <path d="M -5,0 L -5,-5" stroke="#1c241b" strokeWidth="1" />
                </g>
              ))}
            </g>
          </g>
        );

      case 'barraca_tempestade':
        return (
          <g>
            <path d="M 0,200 L 0,160 Q 100,180 200,160 L 200,200 Z" fill="#0a0f0a" />
            {/* Vento selvagem (linhas horizontais curtas) */}
            <path d="M 10,50 L 80,45 M 120,80 L 190,75 M 50,110 L 150,100" stroke="#1b302c" strokeWidth="2" opacity="0.5" />
            
            {/* Barraca estilo Domo deformada pelo vento (puxada para a direita) */}
            <path d="M 50,170 Q 70,60 140,80 Q 160,130 160,170 Z" fill="#e0d8c3" opacity="0.9" />
            {/* Abertura rasgada e batendo no vento */}
            <path d="M 80,170 L 100,110 L 130,170 Z" fill="#060906" />
            <path d="M 100,110 Q 130,130 150,110" fill="none" stroke="#e0d8c3" strokeWidth="3" />
            
            {/* Bandeira TÊMPORA entortada */}
            <line x1="170" y1="170" x2="160" y2="70" stroke="#060906" strokeWidth="3" />
            <polygon points="160,70 190,75 162,90" fill="#2c3c4a" />
            
            {/* Tranqueira no chão da lama */}
            <rect x="70" y="175" width="10" height="5" fill="#2c3c4a" transform="rotate(-15 70 175)" />
            <rect x="140" y="172" width="15" height="10" fill="#060906" transform="rotate(20 140 172)" />
            <circle cx="145" cy="177" r="1.5" fill="#e57a3b" />
          </g>
        );

      default:
        return (
          <g>
            {/* Céu escuro esmeralda caindo sobre o horizonte */}
            <path d="M 0,20 Q 50,60 100,30 T 200,50 L 200,0 L 0,0 Z" fill="#060906" />
            <path d="M 0,50 Q 80,100 150,40 T 200,80 L 200,0 L 0,0 Z" fill="#131a12" opacity="0.8" />
            <path d="M -20,80 Q 50,140 120,70 T 220,110 L 220,0 L -20,0 Z" fill="#1a241e" opacity="0.7" />
            {/* Um raio principal rachando o céu no meio das nuvens */}
            <polyline points="100,60 85,110 95,115 70,180" fill="none" stroke="#e0d8c3" strokeWidth="3" opacity="0.9" strokeLinejoin="miter" />
            <polyline points="100,60 115,80 110,85 125,120" fill="none" stroke="#e0d8c3" strokeWidth="1.5" opacity="0.5" strokeLinejoin="miter" />
            {/* Clarão do raio no chão */}
            <ellipse cx="70" cy="180" rx="30" ry="10" fill="#e0d8c3" opacity="0.2" />
            {/* Chuva fina e oblíqua constante */}
            <line x1="30" y1="20" x2="10" y2="100" stroke="#4a8270" strokeWidth="1" opacity="0.5" />
            <line x1="80" y1="30" x2="50" y2="150" stroke="#4a8270" strokeWidth="1.5" opacity="0.4" />
            <line x1="130" y1="10" x2="100" y2="130" stroke="#4a8270" strokeWidth="1" opacity="0.6" />
            <line x1="180" y1="50" x2="150" y2="170" stroke="#4a8270" strokeWidth="2" opacity="0.3" />
            <line x1="200" y1="90" x2="170" y2="190" stroke="#4a8270" strokeWidth="1" opacity="0.5" />
          </g>
        );
    }
  };

  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      className="rounded-xl border border-[#253320] shadow-xl overflow-hidden"
    >
      {renderBiome()}
      {renderSilhouette()}
    </svg>
  );
}
