import type { CardDef, GameState } from '../types';

export const ALL_CARDS: CardDef[] = [
  // 1. COMPYS
  {
    id: 'compys',
    title: 'Bando de Compsognatos',
    desc: 'Uma dúzia de pequenos predadores carniceiros cerca uma carcaça bem na sua trilha.',
    biome: 'selva',
    silhouette: 'compy',
    options: [
      {
        text: 'Erguer o Colar com Dente de Rex',
        reqTag: 'medo',
        successMsg: 'Eles sentem o odor do predador alfa e fogem apavorados para a vegetação densa.',
      },
      {
        text: 'Arremessar uma Ração aberta (-1 comida)',
        isGuaranteed: true,
        successEffect: { food: -1},
        successMsg: 'O bando disputa a carne freneticamente. Você avança sem barulho pelo flanco.',
      },
      {
        text: 'Disparar a Espingarda Calibre 12',
        reqTag: 'tiro',
        successEffect: { nextCard: 'alfa' },
        successMsg: 'O tiro detona e estilhaça a folhagem. Os compys debandam... mas o estrondo ecoou por quilômetros.',
      },
      {
        text: 'Espantar no grito e cajado',
        isGuaranteed: true,
        successMsg: '',
        triggerCombat: {
          name: 'Bando de Compys',
          maxHp: 20,
          damage: 5,
          combatChance: 70,
          fleeChance: 80,
          loot: { sucata: 1 }
        }
      },
    ],
  },

  // 2. RAPTORES
  {
    id: 'raptors',
    title: 'Raptores na Noite',
    desc: 'Pupilas fendidas refletem a lua. Três velociraptores fecham seu ângulo de fuga em formação de caça.',
    biome: 'noite',
    silhouette: 'raptor_noite',
    options: [
      {
        text: 'Acender o Sinalizador Químico',
        reqTag: 'fogo',
        successMsg: 'A labareda vermelha a 1.200°C cega a visão noturna dos predadores, que recuam em pânico.',
      },
      {
        text: 'Apresentar o Colar com Dente de Rex',
        reqTag: 'medo',
        successMsg: 'O líder do bando fareja a relíquia, estala a mandíbula em submissão e comanda a retirada.',
      },
      {
        text: 'Combater com arma branca',
        isGuaranteed: true,
        successMsg: '',
        triggerCombat: {
          name: 'Raptores',
          maxHp: 40,
          damage: 15,
          combatChance: 40,
          fleeChance: 50,
          loot: { sucata: 2, comida: 1 }
        }
      },
      {
        text: 'Esgueirar-se por entre as pedras',
        attr: 'furtivo',
        baseChance: 35,
        successMsg: 'Você se move como uma sombra entre as fendas e despista o olfato do bando.',
        failEffect: { hp: -25 },
        failMsg: 'Uma pedra se solta. Um dos predadores dá o bote raspando em você na fuga.',
      },
    ],
  },

  // 3. METRÔ
  {
    id: 'metro',
    title: 'Vagão de Metrô no Barranco',
    desc: 'Um vagão da linha azul coberto de cipós jurássicos, entalado na rocha. Como isso foi parar aqui?',
    biome: 'ruinas',
    silhouette: 'metro',
    options: [
      {
        text: 'Forçar a porta com o Pé-de-Cabra',
        reqTag: 'arrombar',
        successEffect: { sucata: 4, flag: 'fita' },
        successMsg: 'A porta cede com um rangido metálico! No painel: fios de cobre intactos e uma fita cassete: "BUNKER — PROJETO FENDA".',
      },
      {
        text: 'Escalar pela janela de emergência',
        attr: 'agil',
        baseChance: 50,
        successEffect: { sucata: 3, flag: 'fita' },
        successMsg: 'Você rasteja com destreza pelos estilhaços e recupera componentes eletrônicos e a fita marcada!',
        failEffect: { hp: -10 },
        failMsg: 'O vidro quebrado rasga sua perna e a estrutura treme, impedindo a exploração.',
      },
      {
        text: 'Ignorar o vagão e seguir a trilha',
        isGuaranteed: true,
        successMsg: 'Você decide não arriscar tempo e estamina explorando o metal retorcido.',
      },
    ],
  },

  // 4. RIO
  {
    id: 'rio',
    title: 'Rio Caudaloso',
    desc: 'A correnteza é violenta e águas turvas ocultam uma sombra colossal nadando contra o leito.',
    biome: 'rio',
    silhouette: 'rio_sombra',
    options: [
      {
        text: 'Atravessar pelas copas usando a Corda',
        reqTag: 'escalar',
        successMsg: 'Travessia perfeita e seca pelas raízes aéreas, longe do alcance de qualquer predador aquático.',
      },
      {
        text: 'Nadar com velocidade máxima',
        attr: 'agil',
        baseChance: 45,
        successMsg: 'Com braçadas vigorosas você atinge a outra margem ensopado, mas inteiro.',
        failEffect: { hp: -20, food: -1},
        failMsg: 'A correnteza te arremessa contra rochas submersas e parte de suas rações é levada pela água.',
      },
      {
        text: 'Contornar a pé pela nascente (-2 comida)',
        isGuaranteed: true,
        successEffect: { food: -2},
        successMsg: 'Horas exaustivas de caminhada contornando o vale fluvial. Seguro, porém custoso.',
      },
    ],
  },

  // 5. CARCAÇA
  {
    id: 'carcaca',
    title: 'Carcaça de Tricerátopo',
    desc: 'Um dinossauro herbívoro recém-abatido. Há dezenas de quilos de carne fresca, mas o carnívoro pode retornar.',
    biome: 'selva',
    silhouette: 'carcaca',
    options: [
      {
        text: 'Extrair mantimentos com pressa',
        attr: 'sobrev',
        baseChance: 55,
        successEffect: { comida: 5 },
        successMsg: 'Você corta filés nobres e embala tudo antes que qualquer outro bicho se aproxime.',
        failEffect: { hp: -20 },
        failMsg: 'O predador alfa retorna durante a extração! Você foge às pressas com ferimentos.',
      },
      {
        text: 'Dispersar carniceiros com o Apito',
        reqTag: 'distrair',
        successEffect: { comida: 4 },
        successMsg: 'A frequência ultrassônica afasta os animais locais. Você estoca carne com tranquilidade.',
      },
      {
        text: 'Evitar a armadilha óbvia',
        isGuaranteed: true,
        successMsg: 'Você mantém a distância prudente e continua sua rota de exploração.',
      },
    ],
  },

  // 6. CONTÊINER
  {
    id: 'container',
    title: 'Contêiner Marítimo Lacrado',
    desc: 'A pintura "MAERSK" desbotada pela umidade da selva. Uma pesada corrente militar tranca as portas duplas.',
    biome: 'ruinas',
    silhouette: 'container',
    options: [
      {
        text: 'Romper a corrente com o Pé-de-Cabra',
        reqTag: 'arrombar',
        successEffect: { sucata: 5, remedio: 2 },
        successMsg: 'Alavanca certeira! As portas se abrem revelando maquinário industrial e caixas lacradas de antibióticos.',
      },
      {
        text: 'Martelar a trava com rocha sólida',
        attr: 'arrombar',
        baseChance: 35,
        successEffect: { sucata: 4 },
        successMsg: 'Com esforço bruto a solda gasta cede e você recolhe ferramentas úteis.',
        failEffect: { hp: -10 },
        failMsg: 'A rocha se parte em estilhaços afiados machucando sua mão e dedos.',
      },
      {
        text: 'Não mexer no contêiner',
        isGuaranteed: true,
        successMsg: 'Você opta por não fazer barulho de martelamento na floresta hostil.',
      },
    ],
  },

  // 7. NINHO
  {
    id: 'ninho',
    title: 'Ninho Desprotegido',
    desc: 'Três ovos de quase meio metro aninhados em folhas aquecidas. Nenhum adulto à vista nas imediações.',
    biome: 'selva',
    silhouette: 'ninho',
    options: [
      {
        text: 'Furtar um ovo para a comunidade',
        attr: 'furtivo',
        baseChance: 40,
        successEffect: { comida: 4 },
        successMsg: 'Você transporta a refeição colossal sem emitir um único som na folhagem.',
        failEffect: { hp: -30 },
        failMsg: 'A fêmea protetora emerge das árvores como uma tempestade. Você escapa por um fio d’água.',
      },
      {
        text: 'Apenas registrar a localização e recuar',
        isGuaranteed: true,
        successMsg: 'Respeitar o ninho garante uma jornada sem confrontos mortais.',
      },
    ],
  },

  // 8. RESGATE DE CORPO DO LÍDER ANTERIOR
  {
    id: 'restos_lider',
    title: 'Mochila do Antigo Batedor',
    desc: 'Entre as raízes de uma sumaúma milenar, jaz a mochila identificada do líder anterior que não retornou da selva.',
    biome: 'selva',
    silhouette: 'corpo_batedor',
    condition: (state: GameState) => state.deadLeaders.some((d) => !d.recovered && d.lostPack.length > 0),
    options: [
      {
        text: 'Recuperar com cautela o equipamento perdido',
        attr: 'sobrev',
        baseChance: 50,
        successEffect: { flag: 'resgate_corpo' },
        successMsg: 'Você resgata as ferramentas e pertences do companheiro caído sem atrair predadores!',
        failEffect: { hp: -20 },
        failMsg: 'O predador territorial ainda rondava a área e ataca de surpresa na aproximação.',
      },
      {
        text: 'Cobrir os restos com pedras e seguir',
        isGuaranteed: true,
        successMsg: 'Você presta uma última homenagem silenciosa e segue sua missão de sobrevivência.',
      },
    ],
  },

  // 9. NÁUFRAGO FERIDO
  {
    id: 'ferido',
    title: 'Sobrevivente Enfraquecido',
    desc: 'Um homem com colete de passageiro de avião comercial, debilitado por febre, encostado em um tronco.',
    biome: 'selva',
    silhouette: 'sobrevivente_encostado',
    options: [
      {
        text: 'Tratar os ferimentos e escoltar (-1 comida)',
        isGuaranteed: true,
        successEffect: { food: -1, survivorBonus: 1 },
        successMsg: 'Você estabiliza o pulso dele com suas rações. Ele aceita se juntar ao seu acampamento!',
      },
      {
        text: 'Apenas recolher os recursos que ele carrega',
        isGuaranteed: true,
        successEffect: { sucata: 2 },
        successMsg: 'Você confisca a sucata técnica da bagagem dele e continua seu caminho.',
      },
    ],
  },

  // 10. PLANTAS BIOLUMINESCENTES
  {
    id: 'plantas',
    title: 'Flora Bioluminescente',
    desc: 'Arbustos exóticos com bagas âmbar e seiva azul reluzente que pulsam suavemente no escuro.',
    biome: 'selva',
    silhouette: 'plantas',
    options: [
      {
        text: 'Extrair a seiva com luvas para remédio',
        attr: 'sobrev',
        baseChance: 60,
        successEffect: { remedio: 2 },
        successMsg: 'A seiva possui alta concentração cicatrizante. Frasco de remédio obtido!',
        failEffect: { hp: -10 },
        failMsg: 'Toxinas penetram suas luvas improvisadas, provocando queimaduras químicas dolorosas.',
      },
      {
        text: 'Ingerir as bagas para recuperar estamina',
        attr: 'sobrev',
        baseChance: 45,
        successEffect: { hp: 25 },
        successMsg: 'Um choque revigorante de calor restaura seu vigor e estamina física!',
        failEffect: { hp: -20 },
        failMsg: 'Alcaloides venenosos. Você tem convulsões gástricas e perde energia vital preciosa.',
      },
    ],
  },

  // 11. TEMPESTADE TEMPORAL
  {
    id: 'tempestade',
    title: 'Tormenta Esmeralda',
    desc: 'O céu diurno escurece em tons esmeralda. Rajadas anômalas de vento e raios estalam no horizonte.',
    biome: 'tempestade',
    silhouette: 'tempestade_caminho',
    options: [
      {
        text: 'Aguardar o temporal em uma gruta (-1 comida)',
        isGuaranteed: true,
        successEffect: { food: -1},
        successMsg: 'Você raciona seu alimento em segurança enquanto a ventania varre as copas das árvores.',
      },
      {
        text: 'Acelerar o passo sob os relâmpagos',
        attr: 'agil',
        baseChance: 50,
        successMsg: 'Você cruza o terreno acidentado enquanto a fauna selvagem se recolhe apavorada.',
        failEffect: { hp: -15 },
        failMsg: 'O solo cede em lamaçal e você despenca por uma ravina enlameada.',
      },
    ],
  },

  // 12. PTEROSSAURO
  {
    id: 'ptero',
    title: 'Sombra nas Alturas',
    desc: 'Uma envergadura alar de mais de doze metros bloqueia a luz solar. O monstro alado inicia um rasante mortal.',
    biome: 'tempestade',
    silhouette: 'ptero',
    options: [
      {
        text: 'Disparar a Espingarda para o alto',
        reqTag: 'tiro',
        successEffect: { sucata: 1 },
        successMsg: 'O estampido assusta o gigante alado! Na fuga desordenada, galhos quebram revelando sucata presa.',
      },
      {
        text: 'Camuflar-se sob samambaias gigantes',
        attr: 'furtivo',
        baseChance: 50,
        successMsg: 'A silhueta se perde na vegetação. O predador voa para além das cordilheiras.',
        failEffect: { hp: -15 },
        failMsg: 'As garras pontiagudas raspam violentamente no seu ombro no rasante.',
      },
    ],
  },

  // 13. O PREDADOR ALFA (T-REX)
  {
    id: 'alfa',
    title: 'O PREDADOR ALFA',
    desc: 'O solo treme a cada passo. O monarca da era cretácea, um Tiranossauro de 7 toneladas, bloqueia sua respiração.',
    biome: 'noite',
    silhouette: 'alfa',
    onlyTriggered: true,
    options: [
      {
        text: 'Disparar o Sinalizador Químico na mandíbula',
        reqTag: 'fogo',
        successMsg: 'A chama ofuscante estoura na face do monstro! Desorientado e com rugidos ensurdecedores, ele recua!',
      },
      {
        text: 'Frequência de emergência no Apito',
        reqTag: 'distrair',
        successMsg: 'A ressonância aguda confunde o sistema auditivo hiper-sensível do gigante, dando chance de fuga.',
      },
      {
        text: 'Combater com pura coragem e aço',
        isGuaranteed: true,
        successMsg: '',
        triggerCombat: {
          name: 'Tiranossauro Rex',
          maxHp: 150,
          damage: 40,
          combatChance: 20,
          fleeChance: 30,
          loot: { sucata: 6, item: 'colar' }
        }
      },
      {
        text: 'Mergulhar e camuflar o cheiro na lama',
        attr: 'furtivo',
        baseChance: 30,
        successMsg: 'A lama espessa mascara seus feromônios térmicos. O predador perde o rastro e avança.',
        failEffect: { hp: -50 },
        failMsg: 'O predador escava as raízes com o focinho antes de você submergir completamente.',
      },
    ],
  },

  // 14. O BUNKER DA FITA
  {
    id: 'bunker',
    title: 'O Bunker do Projeto Fenda',
    desc: 'Seguindo as coordenadas da fita, você destranca a escotilha militar. Em um terminal que pisca em verde, o Dr. Alencar deixou o "Protocolo de Retorno": para abrir o portal, a Torre de Rádio precisa sincronizar: 1. Caixa Preta do Avião, 2. Diário do Acampamento Científico, e 3. Pelo menos 2 Cristais Temporais da Tempestade.',
    biome: 'ruinas',
    silhouette: 'bunker',
    once: true,
    condition: (state: GameState) => !!state.flags.fita && !state.flags.bunker,
    options: [
      {
        text: 'Estourar os trincos com o Pé-de-Cabra',
        reqTag: 'arrombar',
        successEffect: {
          sucata: 8,
          item: 'colar',
          flag: 'bunker',
          logEntry: {
            title: 'Protocolo de Retorno da TÊMPORA',
            text: 'Requisitos para o portal: Torre de Rádio (Bateria Náutica do Rio + Bancada Lv2), Caixa Preta (Avião), Diário de Campo (Selva) e 2 Cristais Temporais (Tempestade).'
          }
        },
        successMsg: 'Os selos de aço se rompem! Você copia o Protocolo de Retorno e resgata um amuleto tribal!',
      },
      {
        text: 'Inserir a combinação sonora da fita',
        attr: 'sobrev',
        baseChance: 45,
        successEffect: {
          sucata: 6,
          item: 'colar',
          flag: 'bunker',
          logEntry: {
            title: 'Protocolo de Retorno da TÊMPORA',
            text: 'Requisitos para o portal: Torre de Rádio (Bateria Náutica do Rio + Bancada Lv2), Caixa Preta (Avião), Diário de Campo (Selva) e 2 Cristais Temporais (Tempestade).'
          }
        },
        successMsg: 'A tranca pneumática abre. O Protocolo de Retorno e o amuleto foram resgatados!',
        failEffect: { hp: -20 },
        failMsg: 'Sequência errada. Válvulas de gás lacrimogêneo de defesa disparam no seu rosto.',
      },
    ],
  },

  // 15. SINAL NO RÁDIO
  {
    id: 'radio',
    title: 'Transmissão no Rádio Amador',
    desc: '"...chamando acampamento central... estamos sitiados na encosta norte... alguém na escuta?..."',
    biome: 'ruinas',
    silhouette: 'radio',
    condition: (state: GameState) => state.buildings.radio > 0,
    options: [
      {
        text: 'Mapear as coordenadas e resgatar o grupo',
        attr: 'sobrev',
        baseChance: 55,
        successEffect: { survivorBonus: 1, sucata: 3 },
        successMsg: 'Você chega a tempo de guiar os náufragos e sua bagagem de volta ao acampamento seguro!',
        failEffect: { hp: -20 },
        failMsg: 'Ao chegar ao local, o posto já havia sido devastado por predadores locais.',
      },
      {
        text: 'Desligar o receptor e poupar esforços',
        isGuaranteed: true,
        successMsg: 'A transmissão se dissipa na estática da fita magnética.',
      },
    ],
  },

  // 16. O FINAL: A FENDA TEMPORAL
  {
    id: 'fenda',
    title: 'A Fenda Quântica Aberta',
    desc: 'O ar chia com eletricidade estática. Com o sinal da Torre de Rádio alimentada, os 2 cristais temporais ressoam e a frequência da caixa preta estabiliza o rasgo verde. Do outro lado, o tráfego de 2026!',
    biome: 'fenda',
    silhouette: 'fenda',
    once: true,
    onlyTriggered: true,
    options: [
      {
        text: 'Atravessar o portal de volta para o século XXI',
        isGuaranteed: true,
        successEffect: { ending: true },
        successMsg: 'Você fecha os olhos e dá o passo decisivo contra o feixe luminoso...',
      },
      {
        text: 'Permanecer. O acampamento e os sobreviventes precisam de mim',
        isGuaranteed: true,
        successMsg: 'Você se vira para a selva. O portal continuará aqui enquanto você consolida a colônia.',
      },
    ],
  },
];
