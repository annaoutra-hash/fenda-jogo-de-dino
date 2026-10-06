import type { CardDef, GameState } from '../types';

// ============================================================
// PACOTE 2 — Inimigos, locais neutros de coleta e eventos
// Para adicionar cartas, basta seguir o mesmo formato.
// ============================================================

export const EXTRA_CARDS: CardDef[] = [
  // ===================== SELVA =====================
  {
    id: 'estegossauro',
    title: 'Manada de Estegossauros',
    desc: 'Herbívoros colossais pastam numa clareira. Pacíficos... até alguém chegar perto demais dos filhotes.',
    biome: 'selva',
    silhouette: 'herbivoro',
    options: [
      {
        text: 'Contornar a manada em silêncio',
        attr: 'furtivo',
        baseChance: 65,
        successMsg: 'Você passa pela borda da clareira sem que nenhum deles levante a cabeça.',
        failEffect: { hp: -20 },
        failMsg: 'Um adulto gira a cauda espinhosa. O golpe de raspão te arremessa no mato.',
      },
      {
        text: 'Coletar folhas mastigadas e esterco (adubo)',
        attr: 'sobrev',
        baseChance: 50,
        successEffect: { comida: 4, remedio: 2 },
        successMsg: 'Entre os restos você encontra tubérculos comestíveis e um fungo medicinal.',
        failEffect: { hp: -15 },
        failMsg: 'Você pisa num filhote escondido. A mãe não gosta nada disso.',
      },
      {
        text: 'Esperar a manada passar (-1 ração)',
        isGuaranteed: true,
        successEffect: { food: -1 },
        successMsg: 'Horas de espera, mas a trilha fica livre.',
      },
    ],
  },
  {
    id: 'pomar',
    title: 'Pomar de Cicadáceas',
    desc: 'Um bosque tranquilo de palmeiras primitivas carregadas de frutos. Nenhum rastro de predador.',
    biome: 'selva',
    silhouette: 'plantas',
    weight: 2,
    options: [
      {
        text: 'Colher frutos com calma',
        isGuaranteed: true,
        successEffect: { comida: 4 },
        successMsg: 'Um saco cheio de frutos fibrosos e nutritivos.',
      },
      {
        text: 'Escalar até os cachos mais altos com a corda',
        reqTag: 'escalar',
        successEffect: { comida: 4 },
        successMsg: 'Lá no alto estão os frutos maduros. Você enche a mochila.',
      },
      {
        text: 'Descansar à sombra',
        isGuaranteed: true,
        successEffect: { hp: 15 },
        successMsg: 'Um raro momento de paz. Você recupera o fôlego.',
      },
    ],
  },
  {
    id: 'dilofossauro',
    title: 'Cuspidor de Veneno',
    desc: 'Um Dilofossauro abre o colar de pele e sibila. A baba escorre da mandíbula, ácida.',
    biome: 'selva',
    silhouette: 'raptor',
    enemy: {
      name: 'Dilofossauro',
      maxHp: 40,
      damage: 15,
      combatChance: 50,
      fleeChance: 40,
      loot: { sucata: 2, comida: 1 }
    },
    options: [],
  },
  {
    id: 'acampamento_abandonado',
    title: 'Acampamento Abandonado',
    desc: 'Barracas rasgadas, uma fogueira fria e uma bandeira de expedição científica. Ninguém por perto há semanas.',
    biome: 'selva',
    silhouette: 'tenda',
    once: true,
    options: [
      {
        text: 'Revirar as barracas',
        isGuaranteed: true,
        successEffect: { sucata: 3, remedio: 2 },
        successMsg: 'Ferramentas, uma lanterna sem bateria e um frasco de antibiótico.',
      },
      {
        text: 'Ler o diário de campo',
        isGuaranteed: true,
        successEffect: { flag: 'diario_cientista', logEntry: { title: 'Página Rasgada do Diário', text: 'Dia 41: As fendas dimensionais abrem sempre depois das tempestades verdes. Notei que equipamentos de rádio sintonizados em certas frequências ressoam com os cristais. A fuga é possível.' } },
        successMsg: '"Dia 41: as fendas abrem sempre depois das tempestades verdes. O rádio é a chave."',
      },
    ],
  },

  // ===================== RUÍNAS =====================
  {
    id: 'aviao',
    title: 'Fuselagem do Voo 2026',
    desc: 'Metade de um Boeing partido ao meio, tomado por samambaias. As poltronas ainda têm cinto afivelado.',
    biome: 'ruinas',
    silhouette: 'aviao',
    options: [
      {
        text: 'Vasculhar o compartimento de bagagem',
        attr: 'agil',
        baseChance: 55,
        successEffect: { sucata: 4, comida: 1 },
        successMsg: 'Malas cheias: eletrônicos, barras de cereal e um canivete.',
        failEffect: { hp: -10 },
        failMsg: 'O bagageiro despenca sobre você.',
      },
      {
        text: 'Abrir a cabine do piloto com o pé-de-cabra',
        reqTag: 'arrombar',
        successEffect: { sucata: 5, flag: 'caixa_preta' },
        successMsg: 'Você recupera a caixa-preta. Os últimos segundos gravados mencionam "luz verde no céu".',
      },
      {
        text: 'Pegar o kit de primeiros socorros da parede',
        isGuaranteed: true,
        successEffect: { remedio: 2 },
        successMsg: 'Ainda lacrado. Um achado precioso.',
      },
    ],
  },
  {
    id: 'posto_gasolina',
    title: 'Posto de Gasolina Engolido',
    desc: 'Um posto inteiro, com bombas e loja de conveniência, meio afundado num pântano.',
    biome: 'ruinas',
    silhouette: 'container',
    options: [
      {
        text: 'Saquear a loja de conveniência',
        attr: 'agil',
        baseChance: 60,
        successEffect: { comida: 5 },
        successMsg: 'Enlatados, salgadinhos e água engarrafada. Banquete!',
        failEffect: { hp: -10 },
        failMsg: 'O piso apodrecido cede e você cai na água lamacenta.',
      },
      {
        text: 'Desmontar as bombas por peças (Cuidado)',
        triggerMinigame: 'dismantle',
        successEffect: { sucata: 5 },
        successMsg: 'Mangueiras, válvulas e chapas metálicas. A bancada vai adorar.',
        failEffect: { hp: -15 },
        failMsg: 'Um resto de combustível espirra e queima suas mãos.',
      },
    ],
  },
  {
    id: 'saqueadores',
    title: 'Saqueadores Humanos',
    desc: 'Três sobreviventes armados com lanças bloqueiam o caminho. Nem todo náufrago virou aliado.',
    biome: 'ruinas',
    silhouette: 'sobrevivente',
    options: [
      {
        text: 'Pagar pedágio (perde 2 rações)',
        isGuaranteed: true,
        successEffect: { food: -2 },
        successMsg: 'Eles pegam a comida e deixam você passar, rindo.',
      },
      {
        text: 'Intimidar com a espingarda',
        reqTag: 'tiro',
        successEffect: { sucata: 3 },
        successMsg: 'Um tiro para o alto e eles largam tudo e correm.',
      },
      {
        text: 'Negociar e propor aliança',
        attr: 'sobrev',
        baseChance: 35,
        successEffect: { survivorBonus: 1 },
        successMsg: 'Um deles, cansado da vida de bandido, decide seguir você até o acampamento.',
        failEffect: { hp: -20, food: -1 },
        failMsg: 'A conversa azeda. Você apanha e ainda perde comida.',
      },
      {
        text: 'Lutar (combate direto)',
        isGuaranteed: true,
        successMsg: '',
        triggerCombat: {
          name: 'Saqueadores',
          maxHp: 35,
          damage: 10,
          combatChance: 45,
          fleeChance: 60,
          loot: { sucata: 2, food: 1 }
        }
      },
    ],
  },
  {
    id: 'farmacia',
    title: 'Farmácia Soterrada',
    desc: 'Um letreiro verde em cruz pisca fraco, alimentado por um painel solar rachado.',
    biome: 'ruinas',
    silhouette: 'bunker',
    weight: 1,
    options: [
      {
        text: 'Rastejar por baixo dos escombros',
        attr: 'agil',
        baseChance: 50,
        successEffect: { remedio: 2 },
        successMsg: 'As prateleiras do fundo estão intactas. Remédios de sobra.',
        failEffect: { hp: -15 },
        failMsg: 'Uma viga cede e prende sua perna por longos minutos.',
      },
      {
        text: 'Arrombar a porta dos fundos',
        reqTag: 'arrombar',
        successEffect: { remedio: 2, sucata: 1 },
        successMsg: 'Entrada limpa direto no estoque.',
      },
      {
        text: 'Desmontar o painel solar',
        isGuaranteed: true,
        successEffect: { sucata: 2 },
        successMsg: 'Células fotovoltaicas e fios de cobre. Útil para o rádio.',
      },
    ],
  },
  {
    id: 'ninho_abandando',
    title: 'Ninho Abandonado',
    desc: 'Um monte de palha e lama com ovos enormes. Não há sinal da mãe por perto.',
    biome: 'ruinas',
    silhouette: 'herbivoro',
    weight: 2,
    options: [
      {
        text: 'Roubar um ovo com cuidado',
        attr: 'furtivo',
        baseChance: 60,
        successEffect: { item: 'ovo_trico', logEntry: { title: 'Ovo Desconhecido', text: 'Você encontrou um ovo grande e pesado. Talvez a incubadora geotérmica sirva para algo.' } },
        successMsg: 'Você coloca o ovo na mochila sem fazer barulho.',
        failEffect: { hp: -20 },
        failMsg: 'A mãe Triceratops aparece de repente! Ela te dá uma chifrada e você foge sem o ovo.',
      },
      {
        text: 'Quebrar ovos para comer',
        attr: 'sobrev',
        baseChance: 80,
        successEffect: { comida: 5 },
        successMsg: 'Omelete pré-histórico cru. Sustenta bem.',
        failEffect: { hp: -10 },
        failMsg: 'O cheiro atrai carnívoros. Você é forçado a fugir antes de comer.',
      },
    ],
  },

  // ===================== RIO =====================
  {
    id: 'sarcosuco',
    title: 'Sarcosuchus na Margem',
    desc: 'O que parecia um tronco de doze metros abre os olhos. Um crocodilo pré-histórico guarda o vau.',
    biome: 'rio',
    silhouette: 'crocodilo',
    enemy: {
      name: 'Sarcosuchus',
      maxHp: 80,
      damage: 25,
      combatChance: 35,
      fleeChance: 45,
      loot: { comida: 4 }
    },
    options: [],
  },
  {
    id: 'pesca',
    title: 'Remanso de Peixes',
    desc: 'Uma curva calma do rio, cheia de peixes primitivos com escamas blindadas.',
    biome: 'rio',
    silhouette: 'rio_sombra',
    weight: 2,
    options: [
      {
        text: 'Tentar pescar na margem',
        triggerMinigame: 'fishing',
        successEffect: { comida: 5 },
        successMsg: 'Três peixes gordos no espeto.',
        failEffect: { food: -1},
        failMsg: 'Horas perdidas sem pegar nada. Fome e frustração.',
      },
      {
        text: 'Montar uma armadilha de galhos',
        isGuaranteed: true,
        successEffect: { comida: 1 },
        successMsg: 'Um peixe pequeno cai na armadilha. Melhor que nada.',
      },
      {
        text: 'Encher os cantis e descansar',
        isGuaranteed: true,
        successEffect: { hp: 10 },
        successMsg: 'Água fresca e cinco minutos de silêncio.',
      },
    ],
  },
  {
    id: 'barco',
    title: 'Lancha Encalhada',
    desc: 'Uma lancha de passeio presa entre pedras, com o motor de popa ainda acoplado.',
    biome: 'rio',
    silhouette: 'container',
    once: true,
    options: [
      {
        text: 'Desmontar o motor de popa (Risco de Choque)',
        triggerMinigame: 'dismantle',
        successEffect: { sucata: 6 },
        successMsg: 'Pistões, velas e fios. Um tesouro mecânico.',
        failEffect: { hp: -10, sucata: 2 },
        failMsg: 'A lancha vira com o peso. Você salva só algumas peças.',
      },
      {
        text: 'Revistar a cabine',
        isGuaranteed: true,
        successEffect: { comida: 4, sucata: 1 },
        successMsg: 'Um cooler com enlatados e uma caixa de ferramentas.',
      },
    ],
  },

  // ===================== TEMPESTADE =====================
  {
    id: 'cristal',
    title: 'Cristais Temporais',
    desc: 'Onde um raio verde caiu, a rocha se cristalizou. As pedras zumbem e brilham por dentro.',
    biome: 'tempestade',
    silhouette: 'cristal',
    options: [
      {
        text: 'Extrair um cristal com cuidado',
        attr: 'sobrev',
        baseChance: 45,
        successEffect: { sucata: 5, flag: 'cristal_temporal' },
        successMsg: 'O cristal pulsa na sua mão. Isso pode ser energia para o rádio.',
        failEffect: { hp: -20 },
        failMsg: 'Uma descarga elétrica percorre seu corpo.',
      },
      {
        text: 'Juntar fragmentos soltos do chão',
        isGuaranteed: true,
        successEffect: { sucata: 2 },
        successMsg: 'Fragmentos pequenos, mas valiosos.',
      },
    ],
  },
  {
    id: 'anquilossauro',
    title: 'Anquilossauro Assustado',
    desc: 'Os trovões deixaram um tanque blindado vivo em pânico. A cauda em clava destrói tudo ao redor.',
    biome: 'tempestade',
    silhouette: 'herbivoro',
    options: [
      {
        text: 'Abrigar-se atrás das rochas',
        attr: 'agil',
        baseChance: 60,
        successMsg: 'Você se joga atrás das pedras. A clava estilhaça a rocha ao lado.',
        failEffect: { hp: -30 },
        failMsg: 'A cauda te acerta em cheio. Costelas trincadas.',
      },
      {
        text: 'Acalmá-lo com o sinalizador (afastar)',
        reqTag: 'fogo',
        successMsg: 'A luz forte o faz mudar de direção e sumir na chuva.',
      },
    ],
  },
  {
    id: 'gruta_seca',
    title: 'Gruta Seca',
    desc: 'Uma caverna protegida da chuva, com pinturas rupestres e restos de uma fogueira antiga.',
    biome: 'tempestade',
    silhouette: 'caverna',
    weight: 2,
    options: [
      {
        text: 'Acampar e se recuperar',
        isGuaranteed: true,
        successEffect: { hp: 25, food: -1 },
        successMsg: 'Uma noite inteira de sono. Você acorda renovado.',
      },
      {
        text: 'Explorar o fundo da gruta',
        attr: 'furtivo',
        baseChance: 50,
        successEffect: { sucata: 3, remedio: 2 },
        successMsg: 'Alguém já viveu aqui. Você acha um esconderijo de suprimentos.',
        failEffect: { hp: -20 },
        failMsg: 'Morcegos gigantes. Muitos morcegos gigantes.',
      },
    ],
  },

  // ===================== NOITE =====================
  {
    id: 'troodon',
    title: 'Olhos no Escuro',
    desc: 'Dezenas de pares de olhos verdes cercam seu acampamento noturno. Troodontes: pequenos e muito espertos.',
    biome: 'noite',
    silhouette: 'compy',
    options: [
      {
        text: 'Acender o sinalizador',
        reqTag: 'fogo',
        successMsg: 'A luz química dispersa o bando instantaneamente.',
      },
      {
        text: 'Manter a fogueira alta a noite toda (-1 ração)',
        isGuaranteed: true,
        successEffect: { food: -1, hp: -5 },
        successMsg: 'Você não dorme, mas eles não se aproximam.',
      },
      {
        text: 'Atacar o líder do bando',
        isGuaranteed: true,
        successMsg: '',
        triggerCombat: {
          name: 'Troodonte Alfa',
          maxHp: 25,
          damage: 8,
          combatChance: 60,
          fleeChance: 70,
          loot: { sucata: 1 }
        }
      },
    ],
  },
  {
    id: 'ninho_raptor',
    title: 'Ninho de Raptor',
    desc: 'Escondido na escuridão, um ninho com cascas rachadas e um ovo intacto. Ouço passos leves.',
    biome: 'noite',
    silhouette: 'raptor',
    weight: 2,
    options: [
      {
        text: 'Agarrar o ovo e correr',
        attr: 'agil',
        baseChance: 55,
        successEffect: { item: 'ovo_raptor' },
        successMsg: 'Você pega o ovo morno e some na névoa antes que a mãe ataque.',
        failEffect: { hp: -25 },
        failMsg: 'Garras afiadas cortam suas costas na fuga! Você escapa ferido e sem o ovo.',
      },
      {
        text: 'Afastar a mãe com fogo',
        reqTag: 'fogo',
        successEffect: { item: 'ovo_raptor' },
        successMsg: 'O sinalizador cega e espanta o animal tempo suficiente para pegar o ovo e sair intacto.',
      }
    ],
  },
  {
    id: 'vagalumes',
    title: 'Clareira dos Vaga-lumes',
    desc: 'Milhares de insetos luminosos iluminam uma clareira silenciosa. Um raro refúgio noturno.',
    biome: 'noite',
    silhouette: 'plantas',
    weight: 2,
    options: [
      {
        text: 'Descansar sob a luz',
        isGuaranteed: true,
        successEffect: { hp: 20 },
        successMsg: 'Pela primeira vez em dias, você dorme sem medo.',
      },
      {
        text: 'Coletar insetos luminosos (fonte de luz)',
        attr: 'agil',
        baseChance: 55,
        successEffect: { sucata: 2 },
        successMsg: 'Um frasco brilhante. Serve para trocar ou improvisar lanternas.',
        failMsg: 'Eles escapam entre os dedos.',
      },
    ],
  },
  {
    id: 'espinossauro',
    title: 'Espinossauro Caçando',
    desc: 'Uma vela dorsal enorme corta a névoa do pântano. Maior que um T-Rex, e com fome.',
    biome: 'noite',
    silhouette: 'alfa',
    condition: (s: GameState) => s.generation >= 2,
    enemy: {
      name: 'Espinossauro',
      maxHp: 120,
      damage: 40,
      combatChance: 25,
      fleeChance: 40,
      loot: { sucata: 5, comida: 5, flag: 'matou_espinossauro' }
    },
    options: [],
  },
  {
    id: 'mercador',
    title: 'O Mercador da Lanterna',
    desc: 'Um velho com lanterna a pilha e carrinho de supermercado cheio de tralhas. "Tudo tem preço, amigo."',
    biome: 'noite',
    silhouette: 'sobrevivente',
    weight: 1,
    options: [
      {
        text: 'Trocar 2 rações por sucata',
        isGuaranteed: true,
        successEffect: { food: -2, sucata: 4 },
        successMsg: 'Ele embala as peças num pano sujo e sorri.',
      },
      {
        text: 'Trocar 2 rações por remédio',
        isGuaranteed: true,
        successEffect: { food: -2, remedio: 2 },
        successMsg: '"Antibiótico de verdade. Validade? Detalhe."',
      },
      {
        text: 'Ouvir as histórias dele',
        isGuaranteed: true,
        successEffect: { flag: 'mercador_lore', logEntry: { title: 'Lendas do Mercador', text: 'O velho disse que a fenda temporal reage a sinais eletromagnéticos intensos. Ele também mencionou um predador colossal espreitando o pântano noturno, algo maior que um T-Rex.' } },
        successMsg: '"Já vi a fenda abrir três vezes. Sempre perto de um rádio ligado..."',
      },
    ],
  },
];
