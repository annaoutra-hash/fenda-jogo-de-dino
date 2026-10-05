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
          <g transform="translate(-5, 0)">
            {/* Silhueta anatômica do T-Rex */}
            <path
              d="
                M 10,165
                C 30,145 55,130 85,115
                C 95,110 102,95 108,82
                C 114,70 125,58 140,55
                L 178,58
                C 185,60 188,68 185,76
                L 155,82
                L 176,96
                C 178,104 172,108 162,108
                L 134,106
                C 126,120 128,135 138,150
                L 142,176
                L 130,176
                L 124,152
                C 112,142 98,145 80,154
                C 50,168 25,174 10,165
                Z
              "
              fill="#060906"
            />
            {/* Braço vestigial clássico com dois dedos */}
            <path d="M 115,112 L 126,120 L 123,124 L 112,116 Z" fill="#060906" />
            
            {/* Fileira superior de dentes brancos afiados */}
            <polygon points="152,82 155,90 157,82" fill="#e0d8c3" />
            <polygon points="160,82 163,91 165,82" fill="#e0d8c3" />
            <polygon points="168,81 171,89 173,81" fill="#e0d8c3" />

            {/* Fileira inferior de dentes afiados */}
            <polygon points="145,104 148,96 150,104" fill="#e0d8c3" />
            <polygon points="154,104 157,95 159,104" fill="#e0d8c3" />
            <polygon points="163,103 166,96 168,103" fill="#e0d8c3" />

            {/* Olho em fenda alaranjado predador */}
            <circle cx="148" cy="68" r="3" fill="#e57a3b" />
            <circle cx="148" cy="68" r="7" fill="#e57a3b" opacity="0.35" />
            <line x1="148" y1="64" x2="148" y2="72" stroke="#121612" strokeWidth="1.5" />
          </g>
        );

      // NOVO SOBREVIVENTE: Náufrago humano com mochila, casaco/capuz, bastão de caminhada e relógio
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

      // NINHO
      case 'ninho':
        return (
          <g>
            <path d="M 30,175 Q 100,140 170,175 Z" fill="#060906" />
            <ellipse cx="80" cy="155" rx="13" ry="18" fill="#e0d8c3" transform="rotate(-15 80 155)" />
            <ellipse cx="105" cy="150" rx="12" ry="17" fill="#e0d8c3" />
            <ellipse cx="128" cy="156" rx="13" ry="18" fill="#e0d8c3" transform="rotate(18 128 156)" />
          </g>
        );

      // METRÔ
      case 'metro':
        return (
          <g>
            <rect x="35" y="85" width="130" height="75" rx="8" transform="rotate(-9 100 120)" fill="#060906" stroke="#4a8270" strokeWidth="2" />
            <rect x="50" y="98" width="22" height="20" rx="3" transform="rotate(-9 100 120)" fill="#1c241b" />
            <rect x="85" y="103" width="22" height="20" rx="3" transform="rotate(-9 100 120)" fill="#1c241b" />
            <circle cx="48" cy="146" r="4" fill="#e57a3b" />
            <circle cx="48" cy="146" r="9" fill="#e57a3b" opacity="0.3" />
          </g>
        );

      // CONTÊINER
      case 'container':
        return (
          <g>
            <polygon points="30,100 150,75 180,120 60,150" fill="#060906" stroke="#4a8270" strokeWidth="2" />
            <line x1="90" y1="87" x2="120" y2="135" stroke="#4a8270" strokeWidth="2" />
            <circle cx="106" cy="120" r="4" fill="#e57a3b" />
          </g>
        );

      // PLANTAS
      case 'plantas':
        return (
          <g>
            <path d="M 70,180 Q 90,110 100,80 Q 110,120 140,180" stroke="#1c241b" strokeWidth="6" fill="none" />
            <circle cx="85" cy="115" r="7" fill="#4a8270" />
            <circle cx="115" cy="105" r="8" fill="#e57a3b" />
            <circle cx="100" cy="80" r="9" fill="#e57a3b" />
            <circle cx="100" cy="80" r="16" fill="#e57a3b" opacity="0.25" />
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
      case 'fenda':
        return (
          <g>
            <ellipse cx="100" cy="100" rx="14" ry="70" fill="none" stroke="#e57a3b" strokeWidth="4" opacity="0.6" />
            <polygon points="98,15 104,70 110,100 102,145 99,185 96,130 92,80" fill="#e0d8c3" />
            <line x1="70" y1="90" x2="130" y2="110" stroke="#4a8270" strokeWidth="2" opacity="0.8" />
            <circle cx="100" cy="100" r="32" fill="#e57a3b" opacity="0.2" />
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
      case 'rio_sombra':
        return (
          <g>
            <path d="M 60,170 Q 100,140 140,170" stroke="#060906" strokeWidth="8" fill="none" strokeLinecap="round" />
            <polygon points="120,150 135,162 110,165" fill="#e0d8c3" />
          </g>
        );

      case 'tempestade_caminho':
      default:
        return (
          <g>
            <path d="M 50,180 Q 90,130 140,110" stroke="#060906" strokeWidth="6" fill="none" />
            <circle cx="140" cy="110" r="3" fill="#e57a3b" />
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
