import React from 'react';

interface ItemIconProps {
  id: string;
  size?: number;
  className?: string;
}

export const ItemIcon: React.FC<ItemIconProps> = ({ id, size = 18, className = '' }) => {
  const commonSvgProps = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    className: `inline-block shrink-0 ${className}`
  };

  switch (id) {
    // 1. Lança de Faca Amarrada: Cabo de bambu com cortes diagonais e lâmina prateada afiada com amarras de couro
    case 'lanca':
      return (
        <svg {...commonSvgProps}>
          <line x1="4" y1="20" x2="15" y2="9" stroke="#8c6a38" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="7" y1="17" x2="8.5" y2="15.5" stroke="#5a4220" strokeWidth="2.5" />
          <line x1="11" y1="13" x2="12.5" y2="11.5" stroke="#5a4220" strokeWidth="2.5" />
          <rect x="13" y="7" width="3" height="3" transform="rotate(45 14.5 8.5)" fill="#c47a3f" />
          <path d="M 14 10 L 21 3 C 21 7 19 10 17 11 Z" fill="#e0d8c3" stroke="#ffffff" strokeWidth="0.75" strokeLinejoin="round" />
          <line x1="16" y1="8" x2="19" y2="5" stroke="#a4fca2" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
        </svg>
      );

    // 2. Pé-de-Cabra Reforçado: Alavanca de aço forjado curvada com ponta chanfrada
    case 'pe':
      return (
        <svg {...commonSvgProps}>
          <path 
            d="M 5 19 L 16 8 C 17.5 6.5 19.5 6 21 7 C 21 8.5 20.5 10.5 19 12" 
            stroke="#d48344" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          <path d="M 19 7.5 L 21 6" stroke="#060906" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 4 18 L 3 21" stroke="#e0d8c3" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    // 3. Corda de Escalada: Nó de marinheiro / laço trançado em fibra sintética
    case 'corda':
      return (
        <svg {...commonSvgProps}>
          <ellipse cx="12" cy="12" rx="7" ry="5.5" stroke="#7ea368" strokeWidth="2.5" strokeDasharray="3 2" transform="rotate(-20 12 12)" />
          <ellipse cx="12" cy="12" rx="4.5" ry="3.5" stroke="#a4fca2" strokeWidth="2" strokeDasharray="2.5 1.5" transform="rotate(25 12 12)" />
          <path d="M 14 16 Q 16 20 20 20" stroke="#7ea368" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="20" cy="20" r="1.5" fill="#e57a3b" />
        </svg>
      );

    // 4. Apito Ultrassônico: Apito cilíndrico de metal prateado emitindo ondas sonoras
    case 'apito':
      return (
        <svg {...commonSvgProps}>
          <path d="M 4 14 L 8 14 L 8 11 L 4 11 Z" fill="#d4af37" stroke="#997a15" strokeWidth="0.8" />
          <circle cx="12" cy="13" r="4.5" fill="#ffd54a" stroke="#997a15" strokeWidth="1" />
          <rect x="8" y="10" width="3" height="2" fill="#030504" />
          <circle cx="16.5" cy="13" r="1.5" fill="none" stroke="#d4af37" strokeWidth="1.2" />
          <path d="M 9 7 C 11 6 13 6 15 7" stroke="#4a8270" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 7 4 C 11 2 15 2 19 4" stroke="#a4fca2" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
        </svg>
      );

    // 5. Estojo Médico: Maleta de primeiros socorros militar com cruz destacada
    case 'kit':
      return (
        <svg {...commonSvgProps}>
          <rect x="9" y="3" width="6" height="3" rx="1" fill="none" stroke="#5cb887" strokeWidth="1.5" />
          <rect x="3" y="6" width="18" height="15" rx="3" fill="#1b2e23" stroke="#5cb887" strokeWidth="1.75" />
          <line x1="3" y1="13" x2="21" y2="13" stroke="#0e1a13" strokeWidth="1.2" />
          <path 
            d="M 10.5 9.5 H 13.5 V 12 H 16 V 15 H 13.5 V 17.5 H 10.5 V 15 H 8 V 12 H 10.5 Z" 
            fill="#e0d8c3" 
            stroke="#5cb887" 
            strokeWidth="0.5" 
          />
        </svg>
      );

    // 6. Sinalizador Químico Náutico: Cartucho aceso com labareda incandescente e fumaça
    case 'sinal':
      return (
        <svg {...commonSvgProps}>
          <rect x="4" y="12" width="7" height="10" rx="1.5" transform="rotate(-35 7.5 17)" fill="#ff4d4d" stroke="#991b1b" strokeWidth="1" />
          <rect x="8" y="10" width="3" height="4" transform="rotate(-35 9.5 12)" fill="#333" />
          <circle cx="16" cy="8" r="5" fill="#ff7a3b" opacity="0.3" className="animate-pulse" />
          <path 
            d="M 12 11 Q 14 5 17 3 Q 19 7 21 8 Q 18 13 14 11 Z" 
            fill="#ffe299" 
            stroke="#ff5733" 
            strokeWidth="1.2" 
          />
          <circle cx="17" cy="6" r="2" fill="#ffffff" />
          <circle cx="21" cy="4" r="0.8" fill="#ffea75" />
          <circle cx="13" cy="3" r="0.8" fill="#ffea75" />
        </svg>
      );

    // 7. Espingarda Calibre 12: Cano duplo, cano de aço escovado e coronha de madeira
    case 'esp':
      return (
        <svg {...commonSvgProps}>
          <path d="M 3 19 C 4 16 6 15 9 14 L 11 15 L 7 21 C 5 21 3.5 20.5 3 19 Z" fill="#7a4b26" stroke="#4a2a10" strokeWidth="0.8" />
          <rect x="10" y="12.5" width="4" height="3" fill="#2d372e" />
          <path d="M 10 16 Q 11 17.5 12 16" fill="none" stroke="#2d372e" strokeWidth="1" />
          <line x1="13" y1="13" x2="22" y2="6.5" stroke="#b0b8b0" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="14" y1="14.5" x2="22" y2="8" stroke="#758075" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="21.5" cy="6" r="0.75" fill="#d4af37" />
        </svg>
      );

    // 8. Tocha de Piche e Resina: Galho amarrado com pano em brasa e labareda viva
    case 'tocha':
      return (
        <svg {...commonSvgProps}>
          <line x1="6" y1="20" x2="14" y2="10" stroke="#6e4d29" strokeWidth="3" strokeLinecap="round" />
          {/* Pano ensopado de resina amarrado na ponta */}
          <rect x="11.5" y="7" width="5" height="5" rx="1.5" transform="rotate(-30 14 9.5)" fill="#2b1d0c" stroke="#5a3d1c" strokeWidth="1" />
          {/* Chamas ardentes */}
          <circle cx="17" cy="6" r="4.5" fill="#e57a3b" opacity="0.3" className="animate-pulse" />
          <path d="M 14 10 Q 14 4 17 2 Q 20 6 20 9 Q 18 12 14 10 Z" fill="#ffb84d" stroke="#e57a3b" strokeWidth="1" />
          <path d="M 15.5 8 Q 16.5 4.5 17.5 4 Q 18.5 6 18.5 8 Z" fill="#fff5cc" />
        </svg>
      );

    // 9. Filtro de Carvão e Fibra: Cilindro filtrante com camadas de carvão ativado e bocal
    case 'filtro':
      return (
        <svg {...commonSvgProps}>
          {/* Corpo do cilindro */}
          <rect x="7" y="6" width="10" height="13" rx="2" fill="#1b241c" stroke="#4a8270" strokeWidth="1.5" />
          {/* Camadas internas filtrantes */}
          <line x1="9" y1="10" x2="15" y2="10" stroke="#334235" strokeWidth="1.5" strokeDasharray="1 1" />
          <line x1="9" y1="13" x2="15" y2="13" stroke="#a4fca2" strokeWidth="1.2" opacity="0.8" />
          <line x1="9" y1="16" x2="15" y2="16" stroke="#334235" strokeWidth="1.5" strokeDasharray="1 1" />
          {/* Bocal superior para beber/respirar */}
          <rect x="10" y="3" width="4" height="3" rx="1" fill="#4a8270" stroke="#7ea368" strokeWidth="0.8" />
          {/* Gotícula pura filtrada */}
          <circle cx="12" cy="13" r="1.2" fill="#58c4dc" />
        </svg>
      );

    // 10. Armadilha de Gaiola de Bambu: Estrutura reticulada com estacas pontiagudas
    case 'armadilha':
      return (
        <svg {...commonSvgProps}>
          {/* Armação piramidal de varas de bambu */}
          <path d="M 4 19 L 12 5 L 20 19 Z" fill="#1e1810" stroke="#8c6a38" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Grades e amarras cruzadas */}
          <line x1="7" y1="14" x2="17" y2="14" stroke="#8c6a38" strokeWidth="1.2" />
          <line x1="9" y1="10" x2="15" y2="10" stroke="#8c6a38" strokeWidth="1.2" />
          <line x1="12" y1="5" x2="12" y2="19" stroke="#5a4220" strokeWidth="1" strokeDasharray="2 1" />
          {/* Gatilho / isca tensionada */}
          <circle cx="12" cy="15.5" r="1.5" fill="#e57a3b" />
        </svg>
      );

    // 11. Colete com Blindagem de Fuselagem: Placas curvadas rebitadas e tiras elásticas
    case 'colete':
      return (
        <svg {...commonSvgProps}>
          {/* Formato do colete peitoral */}
          <path 
            d="M 5 6 L 9 3 L 15 3 L 19 6 L 19 14 C 19 18 16 21 12 21 C 8 21 5 18 5 14 Z" 
            fill="#232e27" 
            stroke="#9bb39b" 
            strokeWidth="1.5" 
            strokeLinejoin="round" 
          />
          {/* Placas de blindagem rebitadas (duralumínio) */}
          <path d="M 8 9 L 16 9 L 15 15 L 9 15 Z" fill="#3a4b40" stroke="#9bb39b" strokeWidth="1" />
          {/* Rebites nos cantos da chapa */}
          <circle cx="9.5" cy="10.5" r="0.75" fill="#e0d8c3" />
          <circle cx="14.5" cy="10.5" r="0.75" fill="#e0d8c3" />
          <circle cx="10" cy="13.5" r="0.75" fill="#e0d8c3" />
          <circle cx="14" cy="13.5" r="0.75" fill="#e0d8c3" />
        </svg>
      );

    // 12. Rádio Portátil Sintonizador: Aparelho de rádio militar com antena e mostrador de frequência
    case 'radio_campo':
      return (
        <svg {...commonSvgProps}>
          {/* Antena telescópica estendida */}
          <line x1="7" y1="7" x2="7" y2="2" stroke="#857f70" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="7" cy="2" r="1" fill="#e57a3b" />
          {/* Ondas eletromagnéticas recebidas */}
          <path d="M 9 3 C 11 3 12 4 12 5" stroke="#a4fca2" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
          <path d="M 10 1 C 13 1 15 3 15 5" stroke="#4a8270" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
          {/* Caixa do rádio portátil */}
          <rect x="5" y="7" width="14" height="14" rx="2" fill="#182319" stroke="#4a8270" strokeWidth="1.5" />
          {/* Dial / visor analógico de frequência */}
          <rect x="8" y="10" width="8" height="4" rx="1" fill="#09120b" stroke="#2c4230" strokeWidth="0.8" />
          <line x1="11" y1="10.5" x2="11" y2="13.5" stroke="#e57a3b" strokeWidth="1" />
          {/* Alto-falante ranhurado */}
          <circle cx="10" cy="17" r="1.5" fill="#2c4230" />
          <circle cx="14" cy="17" r="1.5" fill="#2c4230" />
        </svg>
      );

    // 13. Colar com Dente de T-Rex: Cordão com nó e um dente curvo fossilizado e serrilhado
    case 'colar':
      return (
        <svg {...commonSvgProps}>
          <path d="M 4 5 Q 12 12 20 5" fill="none" stroke="#5a4220" strokeWidth="1.5" strokeLinecap="round" />
          <ellipse cx="12" cy="8.5" rx="2" ry="1.2" fill="#3a2510" />
          <path 
            d="M 10 8.5 C 10.5 14 12 18 16 21 C 13.5 17 14 12 14 8.5 Z" 
            fill="#f5ebd0" 
            stroke="#998762" 
            strokeWidth="1" 
            strokeLinejoin="round" 
          />
          <line x1="11.5" y1="11" x2="12" y2="15" stroke="#c2b08a" strokeWidth="0.75" strokeDasharray="1 1" />
        </svg>
      );

    // 14. Ovo de Velociraptor: Ovo mosqueado esverdeado
    case 'ovo_raptor':
      return (
        <svg {...commonSvgProps}>
          <path 
            d="M 12 3 C 7 3 5 9 5 15 C 5 19.5 8 22 12 22 C 16 22 19 19.5 19 15 C 19 9 17 3 12 3 Z" 
            fill="#527047" 
            stroke="#7ea368" 
            strokeWidth="1.5" 
          />
          <ellipse cx="10" cy="12" rx="1.5" ry="2" fill="#2d4224" />
          <ellipse cx="14" cy="9" rx="2" ry="1" fill="#2d4224" />
          <ellipse cx="13" cy="16" rx="2.5" ry="1.5" fill="#2d4224" />
          <circle cx="8" cy="17" r="1" fill="#3f5935" />
          <path d="M 14 5 C 16 8 16 11 16 14" stroke="#a4fca2" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
        </svg>
      );

    // 15. Velociraptor Filhote (Pet): Cabeça/silhueta feroz de velociraptor com olho dourado e penas
    case 'pet_raptor':
      return (
        <svg {...commonSvgProps}>
          <path 
            d="M 4 19 Q 7 13 8 10 Q 10 5 16 4 Q 21 5 22 8 Q 18 11 16 11 L 18 14 Q 13 14 11 13 L 9 20 Z" 
            fill="#2d4a2d" 
            stroke="#4a8270" 
            strokeWidth="1.2" 
            strokeLinejoin="round" 
          />
          <circle cx="14" cy="7.5" r="1.5" fill="#ffd54a" />
          <line x1="14" y1="6.5" x2="14" y2="8.5" stroke="#000" strokeWidth="0.8" />
          <polygon points="16,11 17,12.5 18,11" fill="#fff" />
          <polygon points="18,11 19,12.5 20,11" fill="#fff" />
        </svg>
      );

    // 16. Ovo de Triceratops: Ovo grande, cor de barro e texturizado
    case 'ovo_trico':
      return (
        <svg {...commonSvgProps}>
          <ellipse cx="12" cy="13" rx="8" ry="9" fill="#7a5839" stroke="#ab8054" strokeWidth="1.5" />
          <path d="M 8 10 L 11 12 L 10 15 L 13 16" fill="none" stroke="#4a321d" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="15" cy="11" r="1.5" fill="#9c734e" />
          <circle cx="10" cy="18" r="1.5" fill="#5c3f25" />
        </svg>
      );

    // 17. Triceratops de Carga (Mount): Escudo cefálico e chifres imponentes
    case 'mount_trico':
      return (
        <svg {...commonSvgProps}>
          <path d="M 5 14 C 4 8 8 4 12 4 C 16 4 20 8 19 14 Z" fill="#523924" stroke="#8a6341" strokeWidth="1.2" />
          <path d="M 8 13 L 12 21 L 16 13 Z" fill="#694b30" stroke="#8a6341" strokeWidth="1" />
          <line x1="8" y1="10" x2="4" y2="4" stroke="#e0d8c3" strokeWidth="2" strokeLinecap="round" />
          <line x1="16" y1="10" x2="20" y2="4" stroke="#e0d8c3" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="16" x2="12" y2="12" stroke="#e0d8c3" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    // 18. Crachá TÊMPORA: Cartão magnético com cordão, microchip e logo da anomalia temporal
    case 'cracha_tempora':
      return (
        <svg {...commonSvgProps}>
          <path d="M 7 2 L 12 7 L 17 2" fill="none" stroke="#2d473e" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="10.5" y="6" width="3" height="2" rx="0.5" fill="#a0a0a0" />
          <rect x="5" y="8" width="14" height="14" rx="2" fill="#14211a" stroke="#4a8270" strokeWidth="1.5" />
          <rect x="7" y="11" width="4" height="5" rx="0.5" fill="#4a8270" opacity="0.6" />
          <line x1="13" y1="12" x2="17" y2="12" stroke="#a4fca2" strokeWidth="1" />
          <line x1="13" y1="14" x2="16" y2="14" stroke="#857f70" strokeWidth="1" />
          <circle cx="12" cy="18.5" r="1.5" fill="#ff7a3b" className="animate-pulse" />
        </svg>
      );

    default:
      return (
        <svg {...commonSvgProps}>
          <circle cx="12" cy="12" r="9" stroke="#4a8270" strokeWidth="1.5" />
          <path d="M 10 9 C 10 7.5 11 6.5 12 6.5 C 13.5 6.5 14 7.5 14 8.5 C 14 10 12 10.5 12 12" stroke="#4a8270" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="15.5" r="1" fill="#4a8270" />
        </svg>
      );
  }
};
