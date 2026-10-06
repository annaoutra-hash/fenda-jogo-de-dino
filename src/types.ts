export type Attribute = 'combate' | 'furtivo' | 'agil' | 'arrombar' | 'sobrev';

export interface SurvivorOrigin {
  id: string;
  name: string;
  description: string;
  mods: Partial<Record<Attribute, number>>;
  startItems?: string[];
  trait: string;
}

export interface Survivor {
  id: string;
  name: string;
  origin: string;
  status?: string;
}

export interface ItemDef {
  id: string;
  name: string;
  desc?: string;
  tags?: string[];
  bonus?: Partial<Record<Attribute, number>>;
  uses: number | null;
  cost: { sucata?: number; comida?: number; remedio?: number } | null;
  level: number;
  heal?: number;
}

export interface ItemInstance {
  id: string;
  usesRemaining: number | null;
  selected?: boolean;
}

export type MinigameType = 'fishing' | 'dismantle';

export interface CardOption {
  text: string;
  reqTag?: string; // Garantido com item
  isGuaranteed?: boolean; // Garantido sem item (ex: dar comida)
  attr?: Attribute; // Teste d100
  baseChance?: number;
  successEffect?: Effect;
  failEffect?: Effect;
  successMsg: string;
  failMsg?: string;
  triggerCombat?: EnemyDef;
  triggerMinigame?: MinigameType;
}

export interface Effect {
  hp?: number;
  food?: number;
  sucata?: number;
  comida?: number;
  remedio?: number;
  flag?: string;
  item?: string;
  nextCard?: string;
  survivorBonus?: number;
  logEntry?: { title: string; text: string };
  ending?: boolean;
}

export type Biome = 'selva' | 'noite' | 'ruinas' | 'rio' | 'tempestade';

export interface EnemyDef {
  name: string;
  maxHp: number;
  damage: number;
  combatChance: number;
  fleeChance: number;
  loot?: Effect;
}

export interface EnemyState {
  hp: number;
  maxHp: number;
  def: EnemyDef;
}

export interface CardDef {
  id: string;
  title: string;
  desc: string;
  biome: Biome;
  silhouette: string;
  options: CardOption[];
  enemy?: EnemyDef; // Se presente, inicia modo combate
  onlyTriggered?: boolean;
  once?: boolean;
  weight?: number;
  condition?: (state: GameState) => boolean;
}

export interface DeadLeaderRecord {
  name: string;
  origin: string;
  lostPack: ItemInstance[];
  recovered?: boolean;
}

export interface ExpeditionReport {
  status: 'victory' | 'retreat' | 'death';
  leaderName: string;
  cardsExplored: number;
  loot: {
    sucata: number;
    comida: number;
    remedio: number;
    items: ItemInstance[];
  };
  log: string[];
}

export interface GameState {
  camp: {
    sucata: number;
    comida: number;
    remedio: number;
  };
  buildings: {
    bancada: number;
    defumador: number;
    enfermaria: number;
    radio: number;
    incubadora: number;
    horta: number;
    torre: number;
  };
  stash: ItemInstance[];
  leader: Survivor | null;
  pool: Survivor[];
  flags: Record<string, boolean>;
  loreLogs: { title: string; text: string }[];
  deadLeaders: DeadLeaderRecord[];
  generation: number;
  expeditionCount: number;
  introSeen: boolean;
  gameLostMeteor: boolean;
  activeExpedition: ExpeditionState | null;
  expeditionSetup: {
    configuring: boolean;
    duration: number; // 5, 8, 12
    food: number;
  } | null;
  report: ExpeditionReport | null;
  gameWon: boolean;
  incubatorQueue: { eggId: string; petId: string; expeditionsLeft: number }[];
}

export interface ExpeditionState {
  hp: number;
  maxHp: number;
  food: number;
  cardIndex: number;
  totalCards: number;
  pack: ItemInstance[];
  loot: {
    sucata: number;
    comida: number;
    remedio: number;
    items: ItemInstance[];
  };
  currentCard: CardDef;
  activeEnemy?: EnemyState;
  activeMinigame?: {
    type: MinigameType;
    successEffect?: Effect;
    failEffect?: Effect;
    successMsg: string;
    failMsg: string;
  };
  lastCardId?: string;
  seenCardIds: string[];
  nextQueuedCard?: string | null;
  lastResult: RollResult | null;
  chosenBiomeRoute?: Biome;
  pendingRoutes?: any[] | null;
}

export interface RollResult {
  type: 'guaranteed' | 'crit' | 'success' | 'fail' | 'disaster';
  title: string;
  message: string;
  roll?: number;
  target?: number;
  log: string[];
}
