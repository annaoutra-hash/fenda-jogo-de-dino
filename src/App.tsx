import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Cog,
  Drumstick,
  Heart,
  Users,
  Compass,
  ArrowRight,
  RotateCcw,
  Backpack,
  Activity,
  HelpCircle
} from 'lucide-react';
import type {
  GameState,
  Survivor,
  CardDef,
  RollResult,
  Biome,
  Effect,
  ExpeditionReport
} from './types';
import {
  SURVIVOR_ORIGINS,
  SURVIVOR_NAMES,
  ITEM_CATALOG,
  BUILDINGS_CONFIG
} from './data/items';
import { ALL_CARDS as BASE_CARDS } from './data/cards';
import { EXTRA_CARDS } from './data/extraCards';
const ALL_CARDS = [...BASE_CARDS, ...EXTRA_CARDS];
import { CardArt } from './components/CardArt';
import { SwipeableCard } from './components/SwipeableCard';
import { CampScene } from './components/CampScene';
import { RouteSelector } from './components/RouteSelector';
import type { RouteOption } from './components/RouteSelector';
import { ItemIcon } from './components/ItemIcon';
import { HelpModal } from './components/HelpModal';
import { FishingMinigame } from './components/minigames/FishingMinigame';
import { DismantleMinigame } from './components/minigames/DismantleMinigame';
import { sfx } from './utils/audio';

const STORAGE_KEY = 'fenda_v2_save';

export default function App() {
  const [showHelp, setShowHelp] = useState(false);
  const [gameState, setGameState] = useState<GameState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Migrations / Polyfills for older saves
        if (!parsed.loreLogs) parsed.loreLogs = [];
        if (!parsed.buildings.incubadora) parsed.buildings.incubadora = 0;
        if (!parsed.buildings.horta) parsed.buildings.horta = 0;
        if (!parsed.buildings.torre) parsed.buildings.torre = 0;
        if (parsed.report === undefined) parsed.report = null;
        if (parsed.expeditionSetup === undefined) parsed.expeditionSetup = null;
        if (!parsed.incubatorQueue) parsed.incubatorQueue = [];
        return parsed;
      }
    } catch {}
    return createInitialState();
  });

  const [rollingDice, setRollingDice] = useState<boolean>(false);
  const [diceDisplay, setDiceDisplay] = useState<number | null>(null);
  const [campNameInput, setCampNameInput] = useState<string>('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  }, [gameState]);

  function createInitialState(): GameState {
    const p1 = generateRandomSurvivor();
    const p2 = generateRandomSurvivor();
    const p3 = generateRandomSurvivor();
    return {
      campName: '',
      camp: { sucata: 6, comida: 8, remedio: 1 },
      buildings: { bancada: 1, defumador: 0, enfermaria: 0, radio: 0, incubadora: 0, horta: 0, torre: 0 },
      stash: [
        { id: 'lanca', usesRemaining: null },
        { id: 'corda', usesRemaining: null }
      ],
      leader: null,
      pool: [p1, p2, p3],
      flags: {},
      loreLogs: [],
      deadLeaders: [],
      generation: 0,
      expeditionCount: 0,
      introSeen: false,
      gameLostMeteor: false,
      gameLostPop: false,
      population: 12,
      cristaisTemporais: 0,
      activeExpedition: null,
      expeditionSetup: null,
      report: null,
      gameWon: false,
      incubatorQueue: []
    };
  }

  function generateRandomSurvivor(): Survivor {
    const originKeys = Object.keys(SURVIVOR_ORIGINS);
    const originKey = originKeys[Math.floor(Math.random() * originKeys.length)];
    const name = SURVIVOR_NAMES[Math.floor(Math.random() * SURVIVOR_NAMES.length)];
    return {
      id: Math.random().toString(36).substring(2, 9),
      name,
      origin: originKey
    };
  }

  const getMaxHp = () => (gameState.buildings.enfermaria > 0 ? 130 : 100);

  // ==================== AÇÕES DO ACAMPAMENTO ====================
  const handleSelectLeader = (survivor: Survivor) => {
    sfx.click();
    const origin = SURVIVOR_ORIGINS[survivor.origin];
    const newStash = [...gameState.stash];
    if (origin.startItems) {
      origin.startItems.forEach(itemId => {
        newStash.push({
          id: itemId,
          usesRemaining: ITEM_CATALOG[itemId].uses
        });
      });
    }

    const newPool = gameState.pool.filter(s => s.id !== survivor.id);
    while (newPool.length < 3) {
      newPool.push(generateRandomSurvivor());
    }

    setGameState(prev => ({
      ...prev,
      leader: survivor,
      generation: prev.generation + 1,
      stash: newStash,
      pool: newPool
    }));
  };

  const handleBuild = (buildingKey: keyof typeof BUILDINGS_CONFIG) => {
    const config = BUILDINGS_CONFIG[buildingKey];
    const currentLvl = gameState.buildings[buildingKey];
    const cost = config.costs[currentLvl];

    if (gameState.camp.sucata < cost) return;

    if (buildingKey === 'radio') {
      if (gameState.buildings.bancada < 2 || !gameState.flags.bateria_nautica) {
        return;
      }
    }

    sfx.click();

    setGameState(prev => ({
      ...prev,
      camp: { ...prev.camp, sucata: prev.camp.sucata - cost },
      buildings: { ...prev.buildings, [buildingKey]: currentLvl + 1 }
    }));
  };

  const handleCraft = (itemId: string) => {
    const item = ITEM_CATALOG[itemId];
    if (!item.cost) return;

    if (
      (item.cost.sucata && gameState.camp.sucata < item.cost.sucata) ||
      (item.cost.remedio && gameState.camp.remedio < item.cost.remedio) ||
      (item.cost.comida && gameState.camp.comida < item.cost.comida)
    ) {
      return;
    }

    sfx.click();
    setGameState(prev => ({
      ...prev,
      camp: {
        sucata: prev.camp.sucata - (item.cost?.sucata || 0),
        remedio: prev.camp.remedio - (item.cost?.remedio || 0),
        comida: prev.camp.comida - (item.cost?.comida || 0)
      },
      stash: [...prev.stash, { id: itemId, usesRemaining: item.uses }]
    }));
  };

  const handleToggleStashItem = (index: number) => {
    sfx.click();
    const item = gameState.stash[index];
    const selectedCount = gameState.stash.filter(s => s.selected).length;
    if (!item.selected && selectedCount >= 3) return;

    setGameState(prev => {
      const nextStash = [...prev.stash];
      nextStash[index] = { ...item, selected: !item.selected };
      return { ...prev, stash: nextStash };
    });
  };

  const handleHatch = (stashIndex: number, eggId: string, petId: string) => {
    sfx.click();
    setGameState(prev => {
      const nextStash = [...prev.stash];
      nextStash.splice(stashIndex, 1);
      const queue = [...(prev.incubatorQueue || [])];
      queue.push({ eggId, petId, expeditionsLeft: 2 });
      return { ...prev, stash: nextStash, incubatorQueue: queue };
    });
  };

  const handleOpenSetup = () => {
    sfx.click();
    setGameState(prev => ({
      ...prev,
      expeditionSetup: { configuring: true, duration: 7, food: 0 }
    }));
  };

  const handleConfirmSetup = () => {
    sfx.click();
    if (!gameState.expeditionSetup) return;
    const { duration, food } = gameState.expeditionSetup;
    
    const pack = gameState.stash.filter(s => s.selected);
    const remainingStash = gameState.stash.filter(s => !s.selected);

    const firstCard = drawCard('selva', null, []);

    setGameState(prev => ({
      ...prev,
      camp: { ...prev.camp, comida: prev.camp.comida - food },
      stash: remainingStash,
      expeditionSetup: null,
      activeExpedition: {
        hp: getMaxHp(),
        maxHp: getMaxHp(),
        food,
        cardIndex: 1,
        totalCards: duration,
        craterAt: (prev.expeditionCount || 0) >= 25 && Math.random() < 0.25 ? 1 + Math.floor(Math.random() * (duration - 1)) : -1,
        pack,
        loot: { sucata: 0, comida: 0, remedio: 0, items: [] },
        currentCard: firstCard,
        activeEnemy: firstCard.enemy ? { hp: firstCard.enemy.maxHp, maxHp: firstCard.enemy.maxHp, def: firstCard.enemy } : undefined,
        seenCardIds: [firstCard.id],
        lastResult: null
      }
    }));
  };

  const drawCard = (
    preferredBiome?: Biome,
    queuedId?: string | null,
    seenIds: string[] = []
  ): CardDef => {
    if (queuedId) {
      const found = ALL_CARDS.find(c => c.id === queuedId);
      if (found) return found;
    }

    // Injetar Mochila Perdida Dinâmica
    const targetBiome = preferredBiome || 'selva';
    const lastDead = gameState.deadLeaders.length > 0 ? gameState.deadLeaders[gameState.deadLeaders.length - 1] : null;
    if (lastDead && !lastDead.recovered && lastDead.lostPack && lastDead.lostPack.length > 0 && lastDead.biome === targetBiome && !seenIds.includes('corpo_batedor')) {
      // Filtrar apenas itens permanentes (sem usos limitados)
      const permItems = lastDead.lostPack.filter(p => p.usesRemaining === null);
      
      if (permItems.length > 0) {
        if (lastDead.cause === 'starvation') {
          return {
            id: 'corpo_batedor',
            title: `Os Restos de ${lastDead.name}`,
            desc: `Você encontra o corpo desnutrido do seu antecessor. A mochila está jogada no chão, contendo as ferramentas duráveis dele.`,
            biome: targetBiome,
            silhouette: 'acampamento',
            options: [
              {
                text: 'Recuperar o equipamento (Cansaço extremo)',
                isGuaranteed: true,
                successEffect: { flag: 'recover_pack', hp: -10 },
                successMsg: 'O esforço e o peso extra exaurem você, mas as ferramentas valem a pena.',
              },
              {
                text: 'Apenas seguir em frente',
                isGuaranteed: true,
                successEffect: { flag: 'ignore_pack' },
                successMsg: 'Você deixa a mochila para a selva.',
              }
            ]
          };
        } else {
          return {
            id: 'corpo_batedor',
            title: `A Morte de ${lastDead.name}`,
            desc: `Você encontra a mochila do seu antecessor, manchada de sangue. Mas o predador que o matou ainda está farejando os arredores.`,
            biome: targetBiome,
            silhouette: 'acampamento',
            options: [
              {
                text: 'Esperar a fera se afastar e esgueirar-se',
                attr: 'furtivo',
                baseChance: 45,
                successEffect: { flag: 'recover_pack' },
                successMsg: 'Você pega a mochila sem fazer barulho.',
                failEffect: { hp: -25, flag: 'ignore_pack' },
                failMsg: 'Você é notado e forçado a fugir, deixando os itens para trás.',
              },
              {
                text: 'Enfrentar a fera pelo equipamento',
                attr: 'combate',
                baseChance: 40,
                successEffect: { flag: 'recover_pack' },
                successMsg: 'Você espanta a criatura e recupera o que sobrou.',
                failEffect: { hp: -30, flag: 'ignore_pack' },
                failMsg: 'A fera te ataca ferozmente. Você recua de mãos vazias.',
              }
            ]
          };
        }
      }
    }

    // 1. Filtrar cartas disponíveis
    let available = ALL_CARDS.filter(card => {
      if (card.onlyTriggered) return false;
      if (card.once && gameState.flags[`card_${card.id}`]) return false;
      if (card.condition && !card.condition(gameState)) return false;
      // Impedir repetição na mesma expedição
      if (seenIds.includes(card.id)) return false;
      if (preferredBiome && card.biome !== preferredBiome && card.biome as string !== 'any') return false;
      return true;
    });

    // Clímax Garantido: Se todos os requisitos da Fenda estão cumpridos e fomos para a Noite
    const fendaReady =
      gameState.buildings.radio > 0 &&
      !!gameState.flags.bunker &&
      !!gameState.flags.caixa_preta &&
      !!gameState.flags.diario_cientista &&
      (gameState.cristaisTemporais || 0) >= 2;

    if (fendaReady && preferredBiome === 'noite') {
      const fendaCard = ALL_CARDS.find(c => c.id === 'fenda');
      if (fendaCard && !seenIds.includes('fenda')) {
        const hasCracha = gameState.stash.some(i => i.id === 'cracha_tempora') || (gameState.activeExpedition?.pack.some(i => i.id === 'cracha_tempora') ?? false);
        const dynamicFenda = { ...fendaCard };
        
        const limit = ((gameState.cristaisTemporais || 0) - 2) * 3;
        const saved = Math.min(gameState.population || 12, Math.max(0, limit));
        dynamicFenda.desc = fendaCard.desc + `\n\n[ Capacidade atual da Fenda: Salva o líder + ${saved} de ${gameState.population || 12} colonos ]`;
        
        dynamicFenda.options = [
          {
            text: hasCracha ? 'Abandonar o crachá e atravessar' : 'Atravessar o portal de volta',
            isGuaranteed: true,
            successEffect: { ending: true },
            successMsg: 'Você se lança na energia esmeralda.'
          }
        ];
        if (hasCracha) {
          dynamicFenda.options.push({
            text: 'Atravessar empunhando o Crachá (Desvendar a verdade)',
            isGuaranteed: true,
            successEffect: { ending: 'paradoxo' },
            successMsg: 'As assinaturas quânticas entram em ressonância destrutiva...'
          });
        }
        dynamicFenda.options.push({
            text: 'Recuar. Preciso de mais cristais para salvar a todos.',
            isGuaranteed: true,
            successMsg: 'A fenda ficará aberta. Você volta às sombras da selva.'
        });
        
        return dynamicFenda as CardDef;
      }
    }

    // Pity System e Ajudas Tardias: RNG Mais Justo no late game
    if ((gameState.expeditionCount || 0) >= 25) {
      if (gameState.activeExpedition?.craterAt === seenIds.length && !seenIds.includes('cratera_fresca')) {
        return {
          id: 'cratera_fresca',
          title: 'Cratera Recente',
          desc: 'Um meteoro anômalo caiu recentemente aqui. A rocha ainda fumega, irradiando uma cor esmeralda familiar. Uma chance desesperada de conseguir cristais de energia.',
          biome: preferredBiome || 'selva',
          silhouette: 'caverna',
          options: [
            {
              text: 'Extrair minério no calor extremo',
              attr: 'sobrev',
              baseChance: 35,
              successEffect: { cristaisTemporais: 2 },
              successMsg: 'Com as mãos queimadas, você arranca duas formações de cristal puro.',
              failEffect: { hp: -25 },
              failMsg: 'A instabilidade da rocha causa uma pequena explosão térmica no seu rosto.'
            },
            {
              text: 'Afastar-se e procurar outra rota',
              isGuaranteed: true,
              successMsg: 'O calor é insuportável demais para arriscar.'
            }
          ]
        } as CardDef;
      }
      const FONTE: Record<string, string> = {
        fita: 'metro', bunker: 'bunker', caixa_preta: 'aviao',
        diario_cientista: 'acampamento_abandonado', bateria_nautica: 'barco',
      };
      const faltam = Object.entries(FONTE).filter(([f]) => !gameState.flags[f]).map(([, id]) => id);
      if ((gameState.cristaisTemporais || 0) < 2) faltam.push('cristal');
      faltam.push('fenda');
      
      const pityCards = available.filter(c => faltam.includes(c.id));
      if (pityCards.length > 0 && Math.random() < 0.6) {
        return pityCards[Math.floor(Math.random() * pityCards.length)];
      }
    }

    // Se todas as cartas válidas já foram vistas, permite não-consecutivas
    if (available.length === 0) {
      const lastId = seenIds[seenIds.length - 1];
      available = ALL_CARDS.filter(card => {
        if (card.onlyTriggered) return false;
        if (card.once && gameState.flags[`card_${card.id}`]) return false;
        if (card.condition && !card.condition(gameState)) return false;
        return card.id !== lastId;
      });
    }

    // Ponderar bioma se escolhido
    const weighted = available.map(c => {
      let weight = c.weight || 1;
      if (preferredBiome && c.biome === preferredBiome) weight += 2;
      return { card: c, weight };
    });

    const totalWeight = weighted.reduce((acc, curr) => acc + curr.weight, 0);
    let random = Math.random() * totalWeight;

    for (const entry of weighted) {
      random -= entry.weight;
      if (random <= 0) return entry.card;
    }

    return available[0] || ALL_CARDS[0];
  };

  const calculateChance = (cardOption: any) => {
    if (!cardOption.attr || !gameState.leader) return 0;
    let chance = cardOption.baseChance || 50;

    // Bônus do líder
    const origin = SURVIVOR_ORIGINS[gameState.leader.origin];
    if (origin.mods[cardOption.attr as keyof typeof origin.mods]) {
      chance += origin.mods[cardOption.attr as keyof typeof origin.mods] || 0;
    }

    // Bônus de itens equipados
    gameState.activeExpedition?.pack.forEach(p => {
      const def = ITEM_CATALOG[p.id];
      if (def?.bonus && def.bonus[cardOption.attr as keyof typeof def.bonus]) {
        chance += def.bonus[cardOption.attr as keyof typeof def.bonus] || 0;
      }
    });

    // Torre de Vigia
    if (gameState.buildings.torre > 0 && (cardOption.attr === 'furtivo' || cardOption.attr === 'agil')) {
      chance += 10;
    }

    return Math.max(5, Math.min(95, chance));
  };

  const consumeItemUsage = (reqTag: string) => {
    if (!gameState.activeExpedition) return;
    const isMecanico = gameState.leader?.origin === 'mecanico';
    if (isMecanico && Math.random() < 0.35) return; // Passiva mecânico

    const pack = [...gameState.activeExpedition.pack];
    const index = pack.findIndex(i => ITEM_CATALOG[i.id].tags?.includes(reqTag));
    if (index === -1) return;

    const item = pack[index];
    if (item.usesRemaining === null) return; // Infinito

    const nextUses = item.usesRemaining - 1;
    if (nextUses <= 0) {
      pack.splice(index, 1);
    } else {
      pack[index] = { ...item, usesRemaining: nextUses };
    }

    setGameState(prev => prev.activeExpedition ? ({
      ...prev,
      activeExpedition: { ...prev.activeExpedition, pack }
    }) : prev);
  };

  const applyEffect = (effect: Effect | undefined, logs: string[]) => {
    if (!effect || !gameState.activeExpedition) return;
    const exp = gameState.activeExpedition;

    if (effect.hp) {
      exp.hp = Math.min(exp.maxHp, exp.hp + effect.hp);
      logs.push(`${effect.hp > 0 ? '+' : ''}${effect.hp} Vida`);
    }
    if (effect.food) {
      exp.food = Math.max(0, exp.food + effect.food);
      logs.push(`${effect.food > 0 ? '+' : ''}${effect.food} Comida`);
    }
    if (effect.sucata) {
      exp.loot.sucata += effect.sucata;
      logs.push(`+${effect.sucata} Sucata`);
    }
    if (effect.comida) {
      exp.loot.comida += effect.comida;
      logs.push(`+${effect.comida} Mantimentos`);
    }
    if (effect.remedio) {
      exp.loot.remedio += effect.remedio;
      logs.push(`+${effect.remedio} Remédio`);
    }
    if (effect.flag) {
      gameState.flags[effect.flag] = true;
    }
    if (effect.cristaisTemporais) {
      exp.loot.cristaisTemporais = (exp.loot.cristaisTemporais || 0) + effect.cristaisTemporais;
      logs.push(`+${effect.cristaisTemporais} Cristal Temporal`);
    }
    if (effect.item) {
      exp.loot.items.push({ id: effect.item, usesRemaining: ITEM_CATALOG[effect.item].uses });
      logs.push(`+ ${ITEM_CATALOG[effect.item].name}`);
    }
    if (effect.tradeItemRandom) {
      if (exp.pack.length > 0) {
        const loseIdx = Math.floor(Math.random() * exp.pack.length);
        const lostItem = exp.pack.splice(loseIdx, 1)[0];
        const allItems = Object.keys(ITEM_CATALOG);
        const gainId = allItems[Math.floor(Math.random() * allItems.length)];
        exp.pack.push({ id: gainId, usesRemaining: ITEM_CATALOG[gainId].uses });
        logs.push(`Mercador pegou ${ITEM_CATALOG[lostItem.id].name} e te deu ${ITEM_CATALOG[gainId].name}`);
      } else {
        logs.push(`O Mercador riu da sua mochila vazia. Nada feito.`);
      }
    }
    if (effect.survivorBonus) {
      gameState.pool.push(generateRandomSurvivor());
      gameState.population = (gameState.population || 12) + 1;
      logs.push('+1 Sobrevivente no Acampamento');
    }
    if (effect.nextCard) {
      exp.nextQueuedCard = effect.nextCard;
    }
    if (effect.logEntry) {
      gameState.loreLogs.push(effect.logEntry);
      logs.push(`Novo registro de lore: ${effect.logEntry.title}`);
    }
    if (effect.ending) {
      gameState.gameWon = effect.ending;
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    }

    if (effect.flag === 'recover_pack' || effect.flag === 'ignore_pack') {
      if (gameState.deadLeaders.length > 0) {
        const lastDead = gameState.deadLeaders[gameState.deadLeaders.length - 1];
        lastDead.recovered = true;
        if (effect.flag === 'recover_pack' && lastDead.lostPack) {
          const perm = lastDead.lostPack.filter(p => p.usesRemaining === null);
          exp.pack.push(...perm);
          logs.push(`Recuperou ${perm.length} itens da mochila.`);
        }
      }
      delete gameState.flags['recover_pack'];
      delete gameState.flags['ignore_pack'];
    }
  };

  const handleResolveOption = (optionIndex: number) => {
    if (!gameState.activeExpedition || rollingDice) return;
    const exp = gameState.activeExpedition;
    const card = exp.currentCard;
    const option = card.options[optionIndex];

    if (card.once) {
      gameState.flags[`card_${card.id}`] = true;
    }

    sfx.click();

    if (option.triggerCombat) {
      setGameState(prev => prev.activeExpedition ? ({
        ...prev,
        activeExpedition: {
          ...prev.activeExpedition,
          activeEnemy: {
            hp: option.triggerCombat!.maxHp,
            maxHp: option.triggerCombat!.maxHp,
            def: option.triggerCombat!
          }
        }
      }) : prev);
      return;
    }

    if (option.triggerMinigame) {
      setGameState(prev => prev.activeExpedition ? ({
        ...prev,
        activeExpedition: {
          ...prev.activeExpedition,
          activeMinigame: {
            type: option.triggerMinigame!,
            successEffect: option.successEffect,
            failEffect: option.failEffect,
            successMsg: option.successMsg,
            failMsg: option.failMsg || 'Falha no minigame.',
          }
        }
      }) : prev);
      return;
    }

    const logs: string[] = [];

    // 1. Garantido (Item ou Ação)
    if (option.reqTag || option.isGuaranteed) {
      if (option.reqTag) {
        consumeItemUsage(option.reqTag);
      }
      applyEffect(option.successEffect, logs);
      finishTurn({
        type: 'guaranteed',
        title: 'Sucesso Garantido',
        message: option.successMsg,
        log: logs
      });
      sfx.success(false);
      return;
    }

    // 2. Teste d100 com animação de dado
    setRollingDice(true);
    sfx.roll();

    const targetChance = calculateChance(option);
    let counter = 0;
    const interval = setInterval(() => {
      setDiceDisplay(Math.floor(Math.random() * 100) + 1);
      counter++;
      if (counter > 8) {
        clearInterval(interval);
        const roll = Math.floor(Math.random() * 100) + 1;
        setDiceDisplay(roll);
        setRollingDice(false);

        let result: RollResult;
        if (roll <= 5) {
          applyEffect(option.successEffect, logs);
          applyEffect({ sucata: 2 }, logs);
          result = {
            type: 'crit',
            title: `Sucesso Crítico! (${roll} ≤ ${targetChance})`,
            message: `${option.successMsg} Você ainda encontra suprimentos extras!`,
            roll,
            target: targetChance,
            log: logs
          };
          sfx.success(true);
        } else if (roll <= targetChance) {
          applyEffect(option.successEffect, logs);
          result = {
            type: 'success',
            title: `Sucesso (${roll} ≤ ${targetChance})`,
            message: option.successMsg,
            roll,
            target: targetChance,
            log: logs
          };
          sfx.success(false);
        } else if (roll >= 96) {
          applyEffect(option.failEffect, logs);
          applyEffect({ hp: -10 }, logs);
          result = {
            type: 'disaster',
            title: `Desastre Crítico! (${roll})`,
            message: `${option.failMsg || 'A situação saiu completamente do controle.'} Consequências severas!`,
            roll,
            target: targetChance,
            log: logs
          };
          sfx.fail(true);
        } else {
          applyEffect(option.failEffect, logs);
          result = {
            type: 'fail',
            title: `Falha (${roll} > ${targetChance})`,
            message: option.failMsg || 'Você não conseguiu superar o desafio sem sequelas.',
            roll,
            target: targetChance,
            log: logs
          };
          sfx.fail(false);
        }

        finishTurn(result);
      }
    }, 50);
  };

  const finishTurn = (result: RollResult) => {
    if (!gameState.activeExpedition) return;
    const exp = gameState.activeExpedition;

    // Consumo de ração ou fome
    if (!gameState.gameWon) {
      if (exp.food > 0) {
        exp.food -= 1;
      } else if (exp.loot.comida > 0) {
        exp.loot.comida -= 1;
        result.log.push('Comeu suprimento roubado: -1 Comida Encontrada');
      } else {
        exp.hp -= 8;
        result.log.push('Inanição: -8 Vida');
      }
    }

    if (gameState.flags['recover_pack']) {
      const lastDead = gameState.deadLeaders[gameState.deadLeaders.length - 1];
      if (lastDead && !lastDead.recovered) {
        lastDead.recovered = true;
        // Só recupera os permanentes
        const permItems = lastDead.lostPack.filter(p => p.usesRemaining === null);
        exp.pack.push(...permItems);
      }
      delete gameState.flags['recover_pack'];
    }

    if (gameState.flags['ignore_pack']) {
      const lastDead = gameState.deadLeaders[gameState.deadLeaders.length - 1];
      if (lastDead) lastDead.recovered = true;
      delete gameState.flags['ignore_pack'];
    }

    setGameState(prev => prev.activeExpedition ? ({
      ...prev,
      flags: { ...gameState.flags },
      pool: [...gameState.pool],
      loreLogs: [...gameState.loreLogs],
      gameWon: gameState.gameWon,
      activeExpedition: {
        ...prev.activeExpedition,
        hp: exp.hp,
        food: exp.food,
        loot: { ...exp.loot, items: [...exp.loot.items] },
        nextQueuedCard: exp.nextQueuedCard,
        lastResult: result
      }
    }) : prev);
  };

  const handleCombatAction = (action: 'attack' | 'flee') => {
    if (!gameState.activeExpedition || !gameState.activeExpedition.activeEnemy || rollingDice) return;
    const exp = gameState.activeExpedition;
    const enemy = exp.activeEnemy;
    if (!enemy) return;
    
    setRollingDice(true);
    sfx.roll();

    let chance = action === 'attack' ? enemy.def.combatChance : (enemy.def.fleeChance + 15);
    const attr = action === 'attack' ? 'combate' : 'agil';
    
    const origin = SURVIVOR_ORIGINS[gameState.leader!.origin];
    if (origin.mods[attr]) chance += origin.mods[attr]!;
    
    exp.pack.forEach(p => {
      const def = ITEM_CATALOG[p.id];
      if (def?.bonus && def.bonus[attr]) chance += def.bonus[attr]!;
    });
    
    chance = Math.max(5, Math.min(95, chance));

    let counter = 0;
    const interval = setInterval(() => {
      setDiceDisplay(Math.floor(Math.random() * 100) + 1);
      counter++;
      if (counter > 8) {
        clearInterval(interval);
        const roll = Math.floor(Math.random() * 100) + 1;
        setDiceDisplay(roll);
        setRollingDice(false);

        const logs: string[] = [];
        let nextHp = exp.hp;
        let nextEnemyHp = enemy.hp;
        let result: RollResult | null = null;
        
        if (roll <= chance) {
          sfx.success(roll <= 5);
          if (action === 'attack') {
            const dmg = roll <= 5 ? 30 : 15;
            nextEnemyHp -= dmg;
            logs.push(`Ataque certeiro! ${dmg} dano no inimigo.`);
            
            if (nextEnemyHp <= 0) {
               applyEffect(enemy.def.loot, logs);
               result = {
                 type: 'success', title: 'Vitória no Combate!', message: `Você derrotou o ${enemy.def.name}.`,
                 roll, target: chance, log: logs
               };
            }
          } else {
             result = {
               type: 'success', title: 'Fuga Bem-sucedida', message: 'Você escapou com vida.',
               roll, target: chance, log: logs
             };
          }
        } else {
          sfx.fail(roll >= 96);
          const dmg = roll >= 96 ? enemy.def.damage * 2 : enemy.def.damage;
          nextHp -= dmg;
          logs.push(`O ${enemy.def.name} te atingiu! -${dmg} Vida.`);
          
          if (nextHp <= 0) {
            result = {
               type: 'disaster', title: 'Derrota', message: 'Você sucumbiu aos ferimentos...',
               roll, target: chance, log: logs
             };
          } else if (action === 'flee') {
            logs.push('A fuga falhou. O combate continua!');
          }
        }

        exp.hp = nextHp;
        setGameState(prev => {
          if (!prev.activeExpedition) return prev;
          return {
            ...prev,
            activeExpedition: {
              ...prev.activeExpedition,
              hp: nextHp,
              loot: { ...exp.loot, items: [...exp.loot.items] },
              activeEnemy: { ...prev.activeExpedition.activeEnemy!, hp: nextEnemyHp },
              lastResult: result
            }
          };
        });

        // Se houve result final (fugiu ou venceu), processa o fim do turno
        if (result) {
          setTimeout(() => finishTurn(result), 100);
        }
      }
    }, 50);
  };

  const handleMinigameEnd = (won: boolean) => {
    if (!gameState.activeExpedition || !gameState.activeExpedition.activeMinigame) return;
    const exp = gameState.activeExpedition;
    const mg = exp.activeMinigame;
    
    const logs: string[] = [];
    const effect = won ? mg?.successEffect : mg?.failEffect;
    applyEffect(effect, logs);
    
    if (won) sfx.success(true);
    else sfx.fail(true);

    finishTurn({
      type: won ? 'success' : 'fail',
      title: won ? 'Vitória no Minigame!' : 'Falha no Minigame',
      message: won ? (mg?.successMsg || 'Sucesso.') : (mg?.failMsg || 'Falha.'),
      log: logs
    });
  };

  // Gerador de Bifurcações no Terreno
  const generateRouteOptions = (): RouteOption[] => {
    const routePool: RouteOption[] = [
      {
        biome: 'selva',
        title: 'Trilha das Samambaias Gigantes',
        description: 'Mata densa e úmida. Pegadas de carnívoros médios e vegetação medicinal rica.',
        potentialLoot: 'Carne fresca e Plantas Curativas',
        dangerLevel: 'Médio',
      },
      {
        biome: 'ruinas',
        title: 'Pátio dos Destroços Urbanos',
        description: 'Vagões tombados e contêineres entrecipós. Excelente para quem carrega ferramentas de arrombamento.',
        potentialLoot: 'Peças industriais e Antibióticos',
        dangerLevel: 'Alto',
      },
      {
        biome: 'rio',
        title: 'Cânion da Garganta Fluvial',
        description: 'Leito de águas rápidas. Travessia rápida pelas copas ou nado com risco de predadores aquáticos.',
        potentialLoot: 'Carcaças encalhadas e Água limpa',
        dangerLevel: 'Médio',
      },
      {
        biome: 'tempestade',
        title: 'Cordilheira dos Raios Verdes',
        description: 'Encostas escarpadas expostas a descargas elétricas anômalas e ninhos aéreos.',
        potentialLoot: 'Componentes energéticos e Ninhos',
        dangerLevel: 'Extremo',
      },
      {
        biome: 'noite',
        title: 'Vale Sombrio das Sombras',
        description: 'Terreno fechado onde a luz quase não penetra. O território preferido dos raptores noturnos.',
        potentialLoot: 'Relíquias raras e Ovos',
        dangerLevel: 'Alto',
      },
    ];

    // Embaralha e seleciona 2 biomas distintos
    const shuffled = [...routePool].sort(() => Math.random() - 0.5);
    return [shuffled[0], shuffled[1]];
  };

  const handlePromptNextRoute = () => {
    if (!gameState.activeExpedition) return;
    sfx.click();
    const routes = generateRouteOptions();

    setGameState(prev => prev.activeExpedition ? ({
      ...prev,
      activeExpedition: {
        ...prev.activeExpedition,
        pendingRoutes: routes
      }
    }) : prev);
  };

  const handleSelectRoute = (chosen: RouteOption) => {
    if (!gameState.activeExpedition) return;
    const exp = gameState.activeExpedition;
    const nextIndex = exp.cardIndex + 1;
    const updatedSeen = [...exp.seenCardIds];
    const nextCard = drawCard(chosen.biome, exp.nextQueuedCard, updatedSeen);
    updatedSeen.push(nextCard.id);

    setGameState(prev => prev.activeExpedition ? ({
      ...prev,
      activeExpedition: {
        ...prev.activeExpedition,
        cardIndex: nextIndex,
        currentCard: nextCard,
        activeEnemy: nextCard.enemy ? { hp: nextCard.enemy.maxHp, maxHp: nextCard.enemy.maxHp, def: nextCard.enemy } : undefined,
        activeMinigame: undefined,
        seenCardIds: updatedSeen,
        nextQueuedCard: null,
        lastResult: null,
        chosenBiomeRoute: chosen.biome,
        pendingRoutes: null
      }
    }) : prev);
  };

  const handleHealWithKit = () => {
    if (!gameState.activeExpedition) return;
    const kitIdx = gameState.activeExpedition.pack.findIndex(i => ITEM_CATALOG[i.id]?.heal);
    if (kitIdx === -1) return;

    sfx.click();
    const pack = [...gameState.activeExpedition.pack];
    pack.splice(kitIdx, 1);

    setGameState(prev => prev.activeExpedition ? ({
      ...prev,
      activeExpedition: {
        ...prev.activeExpedition,
        hp: Math.min(prev.activeExpedition.maxHp, prev.activeExpedition.hp + 40),
        pack
      }
    }) : prev);
  };

  const handleReturnToCamp = (retreatParam?: boolean | any) => {
    if (!gameState.activeExpedition) return;
    sfx.click();
    const exp = gameState.activeExpedition;
    const isRetreat = retreatParam === true;
    
    // Se recuar antes de acabar, perde 1 item aleatório (ônus)
    let lostLog = [];
    if (isRetreat && exp.pack.length > 0) {
      const lostItemIndex = Math.floor(Math.random() * exp.pack.length);
      const lostItem = exp.pack.splice(lostItemIndex, 1)[0];
      lostLog.push(`Perdeu na fuga: ${ITEM_CATALOG[lostItem.id].name}`);
    } else if (isRetreat) {
      // Se não tinha item para perder, perde metade dos recursos coletados
      exp.loot.sucata = Math.floor(exp.loot.sucata / 2);
      exp.loot.comida = Math.floor(exp.loot.comida / 2);
      exp.loot.remedio = Math.floor(exp.loot.remedio / 2);
      lostLog.push('Perdeu metade dos recursos coletados na fuga desorganizada.');
    }

    // Horta Hidropônica
    const hortaBonus = gameState.buildings.horta > 0 ? 3 : 0;
    if (hortaBonus > 0) {
      exp.loot.comida += hortaBonus;
      lostLog.push(`Horta gerou +${hortaBonus} comida enquanto você explorava.`);
    }


    // Process incubator queue
    const newQueue: typeof gameState.incubatorQueue = [];
    const newStash = [...gameState.stash, ...exp.pack, ...exp.loot.items];
    const incubatorLogs: string[] = [];
    
    (gameState.incubatorQueue || []).forEach(q => {
      if (q.expeditionsLeft <= 1) {
        newStash.push({ id: q.petId, usesRemaining: null });
        incubatorLogs.push(`Um ovo eclodiu! O novo mascote está no acampamento.`);
      } else {
        newQueue.push({ ...q, expeditionsLeft: q.expeditionsLeft - 1 });
      }
    });
    
    const finalLog = isRetreat ? lostLog : (hortaBonus > 0 ? [`Retornou em segurança. A Horta gerou +${hortaBonus} comida.`] : ['Retornou em segurança.']);
    
    const report: ExpeditionReport = {
      status: (isRetreat ? 'retreat' : 'victory') as 'victory' | 'retreat',
      leaderName: gameState.leader?.name || 'Desconhecido',
      cardsExplored: exp.cardIndex,
      loot: exp.loot,
      log: [...finalLog, ...incubatorLogs]
    };

    setGameState(prev => {
      let nextComida = prev.camp.comida + exp.loot.comida + exp.food;
      let nextPop = prev.population || 12;
      const maintenance = 3; // Custo de manutenção da colônia

      if (nextComida >= maintenance) {
        nextComida -= maintenance;
        report.log.push(`A colônia consumiu ${maintenance} rações.`);
      } else {
        nextPop -= 1;
        report.log.push(`Fome na colônia! O acampamento não tinha ${maintenance} rações. 1 pessoa morreu de inanição.`);
        nextComida = 0;
      }

      const cristaisGanhos = exp.loot.cristaisTemporais || 0;
      if (cristaisGanhos > 0) {
        report.log.push(`+${cristaisGanhos} Cristal(is) Temporal(is) armazenado(s) na colônia!`);
      }

      return {
        ...prev,
        camp: {
          sucata: prev.camp.sucata + exp.loot.sucata,
          comida: nextComida,
          remedio: prev.camp.remedio + exp.loot.remedio
        },
        population: nextPop,
        cristaisTemporais: (prev.cristaisTemporais || 0) + cristaisGanhos,
        gameLostPop: nextPop <= 0,
        stash: newStash,
        incubatorQueue: newQueue,
        activeExpedition: null,
        report,
        expeditionCount: (prev.expeditionCount || 0) + 1,
        gameLostMeteor: (prev.expeditionCount || 0) + 1 > 35
      };
    });
  };

  const handleDie = () => {
    if (!gameState.leader || !gameState.activeExpedition) return;
    sfx.fail(true);
    const exp = gameState.activeExpedition;

    const lostPack = [...gameState.activeExpedition.pack];
    
    // Identificar causa e bioma
    const isStarvation = exp.lastResult?.log.some(l => l.includes('Inanição'));
    const cause = isStarvation ? 'starvation' : 'combat';
    const biome = exp.currentCard?.biome || 'selva';

    const deadRecord = {
      name: gameState.leader.name,
      origin: gameState.leader.origin,
      lostPack,
      recovered: false,
      biome,
      cause
    };

    const hortaBonus = gameState.buildings.horta > 0 ? 3 : 0;
    
    // Process incubator queue even on death
    const newQueue: typeof gameState.incubatorQueue = [];
    const newStash = [...gameState.stash];
    const incubatorLogs: string[] = [];
    
    (gameState.incubatorQueue || []).forEach(q => {
      if (q.expeditionsLeft <= 1) {
        newStash.push({ id: q.petId, usesRemaining: null });
        incubatorLogs.push(`Um ovo eclodiu no acampamento durante a sua ausência!`);
      } else {
        newQueue.push({ ...q, expeditionsLeft: q.expeditionsLeft - 1 });
      }
    });
    
    let baseLog = hortaBonus > 0 
      ? ['O batedor não retornou. Todos os recursos foram perdidos.', `A Horta gerou +${hortaBonus} comida passivamente.`]
      : ['O batedor não retornou. Todos os recursos foram perdidos.'];

    const report: ExpeditionReport = {
      status: 'death' as const,
      leaderName: gameState.leader.name,
      cardsExplored: exp.cardIndex,
      loot: { sucata: 0, comida: hortaBonus, remedio: 0, items: [] },
      log: [...baseLog, ...incubatorLogs]
    };

    setGameState(prev => {
      let nextComida = prev.camp.comida + hortaBonus;
      let nextPop = (prev.population || 12) - 1; // Morte do líder custa 1 pop
      const maintenance = 3;

      if (nextComida >= maintenance) {
        nextComida -= maintenance;
        report.log.push(`A colônia consumiu ${maintenance} rações.`);
      } else {
        nextPop -= 1; // Penalidade extra por não alimentar a colônia
        report.log.push(`Fome na colônia! Sem ${maintenance} rações, 1 pessoa morreu de inanição no acampamento.`);
        nextComida = 0;
      }

      return {
        ...prev,
        camp: {
          ...prev.camp,
          comida: nextComida
        },
        stash: newStash,
        incubatorQueue: newQueue,
        deadLeaders: [...prev.deadLeaders, deadRecord],
        leader: null,
        activeExpedition: null,
        report,
        expeditionCount: (prev.expeditionCount || 0) + 1,
        population: nextPop,
        gameLostPop: nextPop <= 0,
        gameLostMeteor: (prev.expeditionCount || 0) + 1 > 35
      };
    });
  };

  // ==================== RENDERS ====================
  const bgClass = (gameState.expeditionCount || 0) >= 20 ? "bg-[#251010]" : "bg-[#121612]";

  // 1. Tela de Relatório de Expedição
  if (gameState.report) {
    const r = gameState.report;
    const isWin = r.status === 'victory';
    const isDeath = r.status === 'death';
    return (
      <div className={`min-h-screen ${bgClass} text-[#e0d8c3] flex items-center justify-center p-4`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-[#182017] border border-[#2b3924] rounded-2xl p-6 text-center shadow-2xl"
        >
          <h1 className={`text-xl font-bold mb-2 ${isWin ? 'text-[#8fd16a]' : isDeath ? 'text-[#e0604a]' : 'text-[#ffd54a]'}`}>
            {isWin ? 'Expedição Concluída' : isDeath ? 'Tragédia na Selva' : 'Retirada Estratégica'}
          </h1>
          <p className="text-sm text-[#c5bfae] mb-4">
            O batedor {r.leaderName} explorou {r.cardsExplored} áreas.
          </p>
          
          <div className="bg-[#1e261a] border border-[#2e3a27] rounded-lg p-3 text-left mb-4">
            <h2 className="text-xs font-bold text-[#4a8270] uppercase mb-2">Recursos Obtidos</h2>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div><span className="text-[#c5bfae]">⚙ {r.loot.sucata}</span></div>
              <div><span className="text-[#e57a3b]">🍗 {r.loot.comida}</span></div>
              <div><span className="text-[#8fd16a]">💊 {r.loot.remedio}</span></div>
            </div>
            {r.loot.items.length > 0 && (
              <div className="mt-2 text-xs text-[#857f70]">
                Itens: {r.loot.items.map(i => ITEM_CATALOG[i.id].name).join(', ')}
              </div>
            )}
          </div>

          {r.log.length > 0 && (
            <div className="text-[11px] text-[#e57a3b] text-left mb-6 italic">
              {r.log.map((l, idx) => <p key={idx}>{l}</p>)}
            </div>
          )}

          <button
            onClick={() => {
              sfx.click();
              setGameState(prev => ({ ...prev, report: null }));
            }}
            className="w-full py-3 bg-[#2e281e] text-[#e0d8c3] font-bold rounded-lg hover:bg-[#3d3427] transition"
          >
            Confirmar e Continuar
          </button>
        </motion.div>
      </div>
    );
  }

  if (gameState.gameLostPop) {
    return (
      <div className="min-h-screen bg-[#1c0f0f] text-[#e0d8c3] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-[#201010] border border-[#ff4d4d]/30 rounded-2xl p-6 text-center shadow-2xl"
        >
          <div className="flex justify-center mb-4">
            <Users size={48} className="text-[#ff4d4d]" />
          </div>
          <h1 className="text-2xl font-bold text-[#ff4d4d] mb-2">COLÔNIA EXTINTA</h1>
          <p className="text-sm text-[#ff9999] mb-4 leading-relaxed">
            As mortes constantes cobraram seu preço. Sem batedores ou esperança, os poucos sobreviventes restantes se dispersaram na selva para nunca mais serem vistos.
          </p>
          <p className="text-xs text-[#857f70] mb-6">
            O {gameState.campName || 'Acampamento Central'} caiu após {gameState.expeditionCount} expedições.
          </p>
          <button
            onClick={() => {
              sfx.click();
              localStorage.removeItem(STORAGE_KEY);
              window.location.reload();
            }}
            className="w-full py-3 bg-[#4a1c1c] text-[#ffb0b0] font-bold rounded-lg hover:bg-[#5a2222] transition uppercase tracking-wider"
          >
            Apagar Arquivo e Recomeçar
          </button>
        </motion.div>
      </div>
    );
  }

  if (gameState.gameLostMeteor) {
    return (
      <div className="min-h-screen bg-[#1c0f0f] text-[#e0d8c3] flex items-center justify-center p-4 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#ff4d4d]/20 via-[#1c0f0f] to-[#1c0f0f]"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-[#201010] border border-[#ff4d4d]/30 rounded-2xl p-6 text-center shadow-2xl relative z-10"
        >
          <div className="flex justify-center mb-4 opacity-80">
            <svg width="120" height="120" viewBox="0 0 120 120" className="drop-shadow-[0_0_15px_rgba(255,77,77,0.5)]">
              <circle cx="90" cy="30" r="15" fill="#ff4d4d" />
              <path d="M 90,30 L 10,110 L 20,115 Z" fill="#ff4d4d" opacity="0.3" />
              <path d="M 85,25 L 0,105 L 10,115 Z" fill="#ff4d4d" opacity="0.1" />
              <circle cx="85" cy="35" r="4" fill="#fff" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#ff4d4d] mb-2 tracking-widest">O FIM</h1>
          <p className="text-sm text-[#ff9999] mb-4 leading-relaxed">
            O meteoro de Chicxulub cortou o céu como um segundo sol. O ar se transformou em fogo, e a terra derreteu sob seus pés.
            A Fenda Cretácea foi selada para sempre.
          </p>
          <p className="text-xs text-[#857f70] mb-6">
            A colônia resistiu por {gameState.expeditionCount} expedições antes da extinção.
          </p>
          <button
            onClick={() => {
              sfx.click();
              localStorage.removeItem(STORAGE_KEY);
              window.location.reload();
            }}
            className="w-full py-3 bg-[#4a1c1c] text-[#ffb0b0] font-bold rounded-lg hover:bg-[#5a2222] transition uppercase tracking-wider"
          >
            Apagar Arquivo e Recomeçar
          </button>
        </motion.div>
      </div>
    );
  }

  if (!gameState.introSeen) {
    return (
      <div className="min-h-screen bg-[#000] text-[#e0d8c3] flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="max-w-md w-full flex flex-col items-center text-center space-y-6"
        >
          <svg width="200" height="100" viewBox="0 0 200 100">
            <path d="M 80,10 Q 100,50 120,90 Q 90,70 70,50 Q 80,30 80,10 Z" fill="#4a8270" opacity="0.8" className="animate-pulse" />
            <path d="M 85,15 Q 100,50 115,85 Q 92,68 75,50 Q 82,32 85,15 Z" fill="#8fd16a" />
            <circle cx="100" cy="50" r="2" fill="#fff" />
          </svg>
          
          <div className="space-y-4">
            <p className="text-sm text-[#c5bfae] italic">
              "Projeto TÊMPORA. Teste de ressonância número 40."
            </p>
            <p className="text-sm text-[#e0d8c3]">
              A falha na máquina abriu uma costura no tempo. 
              Um vagão do metrô. Um voo comercial. O seu carro. 
              Tudo sendo puxado para 66 milhões de anos no passado.
            </p>
            <p className="text-sm text-[#e0d8c3]">
              O céu tem dois sois. Um deles é maior a cada dia. Você sente que não tem muito tempo.
            </p>
          </div>

          <button
            onClick={() => {
              sfx.click();
              setGameState(prev => ({ ...prev, introSeen: true }));
            }}
            className="mt-8 px-6 py-3 border border-[#4a8270] text-[#8fd16a] rounded hover:bg-[#4a8270]/10 transition-all font-mono text-sm uppercase tracking-wider"
          >
            Abrir os olhos
          </button>
        </motion.div>
      </div>
    );
  }

  // 1d. Tela de Nomeação do Acampamento
  if (!gameState.campName) {
    return (
      <div className={`min-h-screen ${bgClass} text-[#e0d8c3] flex flex-col items-center justify-center p-4`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-[#182017] border border-[#2b3924] rounded-2xl p-6 text-center shadow-2xl space-y-6"
        >
          <h1 className="text-xl font-bold text-[#e57a3b]">Fundação da Colônia</h1>
          <p className="text-sm text-[#c5bfae]">
            Os sobreviventes se reúnem em uma clareira segura. Para manter a esperança viva, vocês decidem dar um nome a este novo lar.
          </p>
          <input
            type="text"
            value={campNameInput}
            onChange={e => setCampNameInput(e.target.value)}
            placeholder="Ex: Refúgio Alfa, Nova Aurora..."
            className="w-full bg-[#1e261a] border border-[#2e3a27] rounded-lg p-3 text-center text-[#e0d8c3] focus:outline-none focus:border-[#4a8270] focus:ring-1 focus:ring-[#4a8270]"
            maxLength={25}
          />
          <button
            onClick={() => {
              const finalName = campNameInput.trim() || 'Acampamento Central';
              sfx.click();
              setGameState(prev => ({ ...prev, campName: finalName }));
            }}
            className="w-full py-3 bg-[#4a8270] text-[#121612] font-bold rounded-lg hover:brightness-110 transition"
          >
            Confirmar Nome
          </button>
        </motion.div>
      </div>
    );
  }

  // 2. Tela de Vitória
  if (gameState.gameWon) {
    return (
      <div className={`min-h-screen ${bgClass} text-[#e0d8c3] flex items-center justify-center p-4`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-[#182017] border border-[#4a8270] rounded-2xl p-6 text-center shadow-2xl"
        >
          <div className="flex justify-center mb-4">
            <CardArt biome="noite" silhouette="fenda" />
          </div>
          <h1 className="text-2xl font-bold text-[#e57a3b] mb-2">A FENDA — O RETORNO</h1>
          
          {gameState.gameWon === 'paradoxo' ? (
            <div className="text-sm text-[#c5bfae] mb-4 leading-relaxed">
              <p>Você estendeu a mão com o Crachá de Alencar para ativar a passagem, mas as assinaturas ressoaram.</p>
              <p>A luz pisca. Você não está na rua. Está no centro de pesquisa do Projeto TÊMPORA, instantes ANTES da detonação.</p>
              <p className="mt-2 text-[#4a8270] font-bold">O crachá é seu. Você é o Dr. Alencar. O sacrifício do projeto não foi para abrir a fenda; foi porque você tentou fugir dela.</p>
            </div>
          ) : (
            <div className="text-sm text-[#c5bfae] mb-4 leading-relaxed">
              <p className="mb-2">O portal estabilizou, contido pela força de {gameState.cristaisTemporais} cristais temporais.</p>
              {(() => {
                const limit = ((gameState.cristaisTemporais || 0) - 2) * 3;
                const saved = Math.min(gameState.population, Math.max(0, limit));
                const leftBehind = gameState.population - saved;
                return (
                  <>
                    <p className="text-green-400 font-bold mb-2">
                      {gameState.leader?.name} cruzou a fenda em segurança trazendo consigo {saved} sobreviventes do {gameState.campName || 'Acampamento Central'}.
                    </p>
                    {leftBehind > 0 && (
                       <p className="text-red-400 mb-2">
                         Infelizmente a energia não foi suficiente. {leftBehind} membros da colônia ficaram para trás, presos no Cretáceo Superior.
                       </p>
                    )}
                    {saved === gameState.population && saved > 0 && (
                      <p className="text-blue-400 italic">
                        Todos os vivos retornaram. A colônia cumpriu seu propósito.
                      </p>
                    )}
                  </>
                );
              })()}
            </div>
          )}

          <p className="text-xs text-[#857f70] mb-6">
            A colônia resistiu por {gameState.expeditionCount} expedições. {gameState.deadLeaders.length} companheiros
            tombaram no cretáceo.
          </p>
          <button
            onClick={() => {
              localStorage.removeItem(STORAGE_KEY);
              setGameState(createInitialState());
            }}
            className="w-full py-3 bg-[#e57a3b] text-[#121612] font-bold rounded-lg hover:brightness-110 transition"
          >
            Iniciar Nova Campanha
          </button>
        </motion.div>
      </div>
    );
  }

  // 2. Tela de Sucessão / Morte
  if (!gameState.leader) {
    const lastDead = gameState.deadLeaders[gameState.deadLeaders.length - 1];
    return (
      <div className={`min-h-screen ${bgClass} text-[#e0d8c3] flex justify-center p-4`}>
        <div className="w-full max-w-md">
          <h1 className="text-xl font-bold text-[#e57a3b] mb-1">
            {lastDead ? `${lastDead.name} não retornou da selva` : 'Fenda Temporal — Cretáceo'}
          </h1>
          <p className="text-xs text-[#857f70] mb-4 leading-relaxed">
            {lastDead
              ? 'O equipamento da patrulha anterior se perdeu na floresta. Mas o acampamento continua de pé.'
              : 'Um clarão esmeralda rasga o céu. Você acorda entre destroços de avião e rugidos pré-históricos.'}
          </p>

          <h2 className="text-xs font-bold uppercase tracking-wider text-[#4a8270] mb-3">
            Quem assume a liderança do acampamento?
          </h2>

          <div className="space-y-3">
            {gameState.pool.slice(0, 3).map((survivor) => {
              const orig = SURVIVOR_ORIGINS[survivor.origin];
              return (
                <div
                  key={survivor.id}
                  className="bg-[#182017] border border-[#24301f] rounded-xl p-3 flex justify-between items-center hover:border-[#4a8270] transition"
                >
                  <div>
                    <div className="font-semibold text-sm text-[#e0d8c3]">
                      {survivor.name} <span className="text-xs text-[#e57a3b]">({orig.name})</span>
                    </div>
                    <div className="text-xs text-[#857f70] mt-0.5">{orig.description}</div>
                    <div className="text-[11px] text-[#4a8270] mt-1 font-mono">{orig.trait}</div>
                  </div>
                  <button
                    onClick={() => handleSelectLeader(survivor)}
                    className="ml-3 px-3 py-2 bg-[#e57a3b] text-[#121612] font-bold text-xs rounded-lg hover:brightness-110"
                  >
                    Assumir
                  </button>
                </div>
              );
            })}
          </div>

          {gameState.deadLeaders.length > 0 && (
            <div className="mt-8 pt-4 border-t border-[#24301f] text-xs text-[#857f70]">
              Memorial dos caídos: {gameState.deadLeaders.map((d) => d.name).join(', ')}
            </div>
          )}
        </div>
      </div>
    );
  }

  // 3. Tela de Configuração de Expedição
  if (gameState.expeditionSetup) {
    const setup = gameState.expeditionSetup;
    const maxFood = Math.min(gameState.camp.comida, gameState.buildings.defumador > 0 ? 8 : 5);
    return (
      <div className={`min-h-screen ${bgClass} text-[#e0d8c3] flex items-center justify-center p-4`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-[#182017] border border-[#4a8270] rounded-2xl p-6 shadow-2xl"
        >
          <h1 className="text-xl font-bold text-[#e57a3b] mb-4 text-center">Planejar Expedição</h1>
          
          <div className="space-y-6">
            <div>
              <label className="text-xs text-[#857f70] uppercase font-bold mb-2 block">Duração (Cartas a explorar)</label>
              <div className="flex gap-2">
                {[5, 8, 12].map(dur => (
                  <button
                    key={dur}
                    onClick={() => setGameState(prev => prev.expeditionSetup ? ({
                      ...prev, expeditionSetup: { ...prev.expeditionSetup, duration: dur }
                    }) : prev)}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold border transition ${
                      setup.duration === dur ? 'bg-[#3a2c16] border-[#e57a3b] text-white' : 'bg-[#1e261a] border-[#2e3a27] text-[#c5bfae]'
                    }`}
                  >
                    {dur === 5 ? 'Curta (5)' : dur === 8 ? 'Média (8)' : 'Longa (12)'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-[#857f70] uppercase font-bold mb-2 block">
                Rações de Viagem: {setup.food} / {maxFood}
              </label>
              <input
                type="range"
                min="0"
                max={maxFood}
                value={setup.food}
                onChange={e => setGameState(prev => prev.expeditionSetup ? ({
                  ...prev, expeditionSetup: { ...prev.expeditionSetup, food: parseInt(e.target.value) }
                }) : prev)}
                className="w-full accent-[#e57a3b]"
              />
              <p className="text-[11px] text-[#4a8270] mt-1 text-center">
                Cada turno sem comida causa 8 de dano ao batedor.
              </p>
            </div>
          </div>

          <div className="mt-8 flex gap-2">
            <button
              onClick={() => setGameState(prev => ({ ...prev, expeditionSetup: null }))}
              className="flex-1 py-3 bg-[#2e281e] text-[#e0d8c3] rounded-lg text-sm"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirmSetup}
              className="flex-1 py-3 bg-[#e57a3b] text-[#121612] font-bold rounded-lg text-sm hover:brightness-110"
            >
              Partir
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // 4. Tela da Expedição em Cartas
  if (gameState.activeExpedition) {
    const exp = gameState.activeExpedition;
    const card = exp.currentCard;
    const hasKit = exp.pack.some((i) => ITEM_CATALOG[i.id]?.heal);

    return (
      <div className={`min-h-screen ${bgClass} text-[#e0d8c3] flex justify-center p-3`}>
        <div className="w-full max-w-md flex flex-col justify-between pb-6">
          {/* Barra Superior de Status */}
          <div>
            <div className="bg-[#182017] border border-[#2c3826] rounded-xl p-2.5 flex justify-between items-center text-xs">
              <span className="flex items-center gap-1 text-[#e57a3b] font-semibold">
                <Heart size={14} className="fill-[#e57a3b]" /> {Math.max(0, exp.hp)}/{exp.maxHp}
              </span>
              <span className="flex items-center gap-1 text-[#e0d8c3]">
                <Drumstick size={14} /> {exp.food}
              </span>
              <span className="flex items-center gap-1 text-[#4a8270]">
                <Compass size={14} /> {exp.cardIndex}/{exp.totalCards}
              </span>
              <span className="flex items-center gap-1 text-xs font-mono text-[#857f70]">
                <Backpack size={14} /> ⚙{exp.loot.sucata} 🍗{exp.loot.comida} 💊{exp.loot.remedio}
              </span>
            </div>

            {/* Barra de Vida Visual */}
            <div className="w-full h-1.5 bg-[#251212] rounded-full overflow-hidden mt-1.5">
              <div
                className="h-full bg-[#e57a3b] transition-all duration-300"
                style={{ width: `${(Math.max(0, exp.hp) / exp.maxHp) * 100}%` }}
              />
            </div>

            {/* Ferramentas na Mão */}
            <div className="flex justify-between items-center mt-2">
              <div className="flex flex-wrap gap-1">
                {exp.pack.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-[#1e261a] border border-[#2e3a27] rounded text-xs"
                  >
                    <ItemIcon id={item.id} size={14} />
                    {ITEM_CATALOG[item.id].name}
                    {item.usesRemaining !== null && ` (${item.usesRemaining})`}
                  </span>
                ))}
              </div>
              {hasKit && !exp.lastResult && (
                <button
                  onClick={handleHealWithKit}
                  className="px-2 py-1 bg-[#2e3a27] text-[#e0d8c3] text-xs rounded hover:bg-[#3d4d34] flex items-center gap-1"
                >
                  <Activity size={12} /> Curar +40
                </button>
              )}
            </div>

            {/* A CARTA INTERATIVA, BIFURCAÇÃO OU RESULTADO */}
            <AnimatePresence mode="wait">
              {exp.pendingRoutes ? (
                <motion.div
                  key="route-selector"
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="w-full my-2"
                >
                  <RouteSelector
                    lastDeadBiome={gameState.deadLeaders.length > 0 && !gameState.deadLeaders[gameState.deadLeaders.length - 1].recovered ? gameState.deadLeaders[gameState.deadLeaders.length - 1].biome : undefined} currentCardIndex={exp.cardIndex}
                    totalCards={exp.totalCards}
                    routes={exp.pendingRoutes}
                    onSelectRoute={handleSelectRoute}
                    onRetreat={() => handleReturnToCamp(true)}
                  />
                </motion.div>
              ) : !exp.lastResult ? (
                <motion.div
                  key={card.id + exp.cardIndex}
                  initial={{ opacity: 0, scale: 0.92, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="w-full"
                >
                  {exp.activeEnemy ? (
                    <div className="bg-[#182017] border border-[#e0604a] rounded-xl p-4 my-2 text-center shadow-lg shadow-[#4a1c1c]/50">
                      <div className="mb-3 flex justify-center">
                        <CardArt biome={card.biome} silhouette={card.silhouette} />
                      </div>
                      <h2 className="text-lg font-bold text-[#e0604a] mb-1">{exp.activeEnemy.def.name}</h2>
                      <p className="text-xs text-[#c5bfae] mb-4">{card.desc}</p>
                      
                      <div className="flex justify-between items-center text-xs font-mono bg-[#121612] px-2 py-1.5 rounded-t mt-4 border-b border-[#2c3826]">
                        <span className="text-[#e0604a]">HP Inimigo: {Math.max(0, exp.activeEnemy.hp)}/{exp.activeEnemy.maxHp}</span>
                        <span className="text-[#ffd54a]">Dano: {exp.activeEnemy.def.damage}</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#251212] rounded-b overflow-hidden mb-4">
                        <div
                          className="h-full bg-[#e0604a] transition-all duration-300"
                          style={{ width: `${(Math.max(0, exp.activeEnemy.hp) / exp.activeEnemy.maxHp) * 100}%` }}
                        />
                      </div>

                      <div className="space-y-2">
                        <button
                          disabled={rollingDice}
                          onClick={() => handleCombatAction('attack')}
                          className="w-full py-3 bg-[#4a1c1c] text-[#ffb0b0] font-bold rounded-lg text-sm hover:brightness-110 disabled:opacity-50"
                        >
                          Atacar ({exp.activeEnemy.def.combatChance}% chance base)
                        </button>
                        <button
                          disabled={rollingDice}
                          onClick={() => handleCombatAction('flee')}
                          className="w-full py-3 bg-[#2e281e] text-[#e0d8c3] font-bold rounded-lg text-sm hover:brightness-110 disabled:opacity-50"
                        >
                          Tentar Fugir ({exp.activeEnemy.def.fleeChance + 15}% chance base)
                        </button>
                      </div>
                    </div>
                  ) : exp.activeMinigame ? (
                    <div className="my-2">
                      {exp.activeMinigame.type === 'fishing' && (
                        <FishingMinigame 
                          onWin={() => handleMinigameEnd(true)} 
                          onLose={() => handleMinigameEnd(false)} 
                        />
                      )}
                      {exp.activeMinigame.type === 'dismantle' && (
                        <DismantleMinigame 
                          onWin={() => handleMinigameEnd(true)} 
                          onLose={() => handleMinigameEnd(false)} 
                        />
                      )}
                    </div>
                  ) : (
                    <SwipeableCard
                      card={card}
                      pack={exp.pack}
                      calculateChance={calculateChance}
                      onChoose={handleResolveOption}
                      disabled={rollingDice}
                      expeditionFood={exp.food}
                    />
                  )}

                  {/* Dado animado */}
                  {rollingDice && diceDisplay && (
                    <div className="text-center py-2 text-sm font-mono text-[#e57a3b] animate-pulse">
                      Rolando D100... [ {diceDisplay} ]
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="result-box"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#182017] border border-[#2b3924] rounded-xl p-4 text-center my-3"
                >
                  <div
                    className={`text-base font-bold mb-1 ${
                      exp.lastResult.type === 'crit' || exp.lastResult.type === 'guaranteed'
                        ? 'text-[#ffd54a]'
                        : exp.lastResult.type === 'success'
                        ? 'text-[#8fd16a]'
                        : 'text-[#e0604a]'
                    }`}
                  >
                    {exp.lastResult.title}
                  </div>
                  <p className="text-xs text-[#c5bfae] leading-relaxed mb-2">{exp.lastResult.message}</p>
                  {exp.lastResult.log.length > 0 && (
                    <div className="text-[11px] text-[#4a8270] font-mono mb-3">
                      {exp.lastResult.log.join(' · ')}
                    </div>
                  )}

                  {exp.hp <= 0 ? (
                    <button
                      onClick={handleDie}
                      className="w-full py-3 bg-[#4a1c1c] text-[#ffb0b0] font-bold rounded-lg text-xs"
                    >
                      O batedor sucumbiu na selva...
                    </button>
                  ) : exp.cardIndex >= exp.totalCards ? (
                    <button
                      onClick={() => handleReturnToCamp(false)}
                      className="w-full py-3 bg-[#e57a3b] text-[#121612] font-bold rounded-lg text-xs"
                    >
                      Retornar vitorioso ao acampamento
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <button
                        onClick={handlePromptNextRoute}
                        className="w-full py-3 bg-[#e57a3b] text-[#121612] font-bold rounded-lg text-xs flex justify-center items-center gap-1 hover:brightness-110"
                      >
                        Escolher próxima trilha de avanço <ArrowRight size={14} />
                      </button>
                      <button
                        onClick={() => handleReturnToCamp(true)}
                        className="w-full py-2 bg-[#2e281e] text-[#e0d8c3] rounded-lg text-xs"
                      >
                        Abortar e recuar com os suprimentos
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
  }

  // 4. Tela do Acampamento Central (Macro)
  const leaderOrigin = SURVIVOR_ORIGINS[gameState.leader.origin];
  const selectedCount = gameState.stash.filter((s) => s.selected).length;

  return (
    <div className={`min-h-screen ${bgClass} text-[#e0d8c3] flex justify-center p-3 pb-12`}>
      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
      <div className="w-full max-w-md">
        {/* Cabeçalho do Líder */}
        <div>
          <h1 className="text-xl font-bold text-[#e0d8c3] flex items-center justify-between">
            <span className="flex items-center gap-2">
              {gameState.campName}
              <button 
                onClick={() => setShowHelp(true)}
                className="text-[#857f70] hover:text-[#e0d8c3] transition bg-[#182017] p-1 rounded border border-[#2c3826]"
                title="Manual de Sobrevivência"
              >
                <HelpCircle size={16} />
              </button>
            </span>
            <span className="text-xs font-mono font-normal text-[#857f70]">Geração {gameState.generation}</span>
          </h1>
          <p className="text-xs text-[#857f70] mt-0.5">
            Líder: <b className="text-[#e0d8c3]">{gameState.leader.name}</b> ({leaderOrigin.name})
          </p>
          {(gameState.expeditionCount || 0) >= 20 && (
            <div className="mt-2 inline-block px-3 py-1 bg-[#1a0f0f] border border-[#ff4d4d]/30 text-[#ff4d4d] text-[10px] font-mono rounded tracking-widest uppercase shadow-[0_0_8px_rgba(255,77,77,0.15)] animate-pulse">
              Alerta: O Sol intruso cresce. Impacto estimado em {35 - (gameState.expeditionCount || 0)} expediç{35 - (gameState.expeditionCount || 0) === 1 ? 'ão' : 'ões'}
            </div>
          )}
          <p className="text-[11px] text-[#4a8270] font-mono mt-0.5">{leaderOrigin.trait}</p>
        </div>

        {/* Cena viva do acampamento */}
        <div className="mt-3">
          <CampScene buildings={gameState.buildings} survivors={gameState.pool.length} stash={gameState.stash} incubatorQueue={gameState.incubatorQueue} />
        </div>

        {/* Recursos Centrais */}
        <div className="bg-[#182017] border border-[#2c3826] rounded-xl p-2.5 flex justify-between items-center text-xs mt-3">
          <span className="flex items-center gap-1 text-[#4a8270]">
            <Cog size={15} /> {gameState.camp.sucata} Sucata
          </span>
          <span className="flex items-center gap-1 text-[#e57a3b]" title="Custo de Manutenção: -3 ao retornar">
            <Drumstick size={15} /> {gameState.camp.comida} Ração <span className="text-[9px] opacity-70 ml-0.5">(-3)</span>
          </span>
          <span className="flex items-center gap-1 text-[#8fd16a]">
            <Activity size={15} /> {gameState.camp.remedio} Remédio
          </span>
          <span className="flex items-center gap-1 text-[#c5bfae]">
            <Users size={15} /> {gameState.pool.length}
          </span>
        </div>

        {/* Construções da Base */}
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#4a8270] mt-5 mb-2">
          Instalações do Acampamento
        </h2>
        <div className="space-y-2">
          {(Object.keys(BUILDINGS_CONFIG) as Array<keyof typeof BUILDINGS_CONFIG>).map((key) => {
            const b = BUILDINGS_CONFIG[key];
            const lvl = gameState.buildings[key];
            const cost = b.costs[lvl];
            const isMax = lvl >= b.maxLevel;

            // Bloqueio especial da Torre de Rádio
            const isRadioBlocked =
              key === 'radio' &&
              (gameState.buildings.bancada < 2 || !gameState.flags.bateria_nautica);

            const radioBlockReason =
              key === 'radio' && isRadioBlocked
                ? gameState.buildings.bancada < 2 && !gameState.flags.bateria_nautica
                  ? 'Requer Bancada Lv2 e Bateria Náutica (Rio)'
                  : gameState.buildings.bancada < 2
                  ? 'Requer Bancada Lv2'
                  : 'Requer Bateria Náutica (Lancha no Rio)'
                : null;

            return (
              <div
                key={key}
                className="bg-[#182017] border border-[#24301f] rounded-xl p-2.5 flex justify-between items-center text-xs"
              >
                <div>
                  <div className="font-semibold text-[#e0d8c3]">
                    {b.name} {lvl > 0 && <span className="text-[#e57a3b]">Lv{lvl}</span>}
                  </div>
                  <div className="text-[11px] text-[#857f70]">{b.desc}</div>
                  {radioBlockReason && (
                    <div className="text-[10px] text-[#e0604a] font-mono mt-0.5">
                      🔒 {radioBlockReason}
                    </div>
                  )}
                </div>
                {isMax ? (
                  <span className="text-xs text-[#4a8270] font-bold">Completo</span>
                ) : (
                  <button
                    disabled={gameState.camp.sucata < cost || isRadioBlocked}
                    onClick={() => handleBuild(key)}
                    className="px-2.5 py-1.5 bg-[#2c3826] text-[#e0d8c3] rounded font-mono hover:bg-[#3d4d34] disabled:opacity-30 disabled:hover:bg-[#2c3826]"
                  >
                    {cost} ⚙
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Missão de Fuga: Checklist da Fenda */}
        {(gameState.flags.bunker || gameState.buildings.radio > 0) && (
          <div className="mt-5 bg-[#141b13] border border-[#3e5235] rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#8fd16a] uppercase tracking-wider">
                📡 Protocolo de Fuga: A Fenda
              </span>
              <span className="text-[10px] font-mono text-[#857f70]">
                {
                  [
                    gameState.buildings.radio > 0,
                    gameState.flags.bunker,
                    gameState.flags.caixa_preta,
                    gameState.flags.diario_cientista,
                    (gameState.cristaisTemporais || 0) >= 2,
                  ].filter(Boolean).length
                }
                /5 componentes
              </span>
            </div>
            <div className="space-y-1 text-[11px] font-mono">
              <div className={gameState.buildings.radio > 0 ? 'text-[#8fd16a]' : 'text-[#857f70]'}>
                {gameState.buildings.radio > 0 ? '✓' : '○'} Torre de Rádio instalada (Bancada Lv2 + Bateria do Rio)
              </div>
              <div className={gameState.flags.bunker ? 'text-[#8fd16a]' : 'text-[#857f70]'}>
                {gameState.flags.bunker ? '✓' : '○'} Coordenadas do Bunker (Ruínas / Fita)
              </div>
              <div className={gameState.flags.caixa_preta ? 'text-[#8fd16a]' : 'text-[#857f70]'}>
                {gameState.flags.caixa_preta ? '✓' : '○'} Frequência da Caixa Preta (Voo 2026 nas Ruínas)
              </div>
              <div className={gameState.flags.diario_cientista ? 'text-[#8fd16a]' : 'text-[#857f70]'}>
                {gameState.flags.diario_cientista ? '✓' : '○'} Diário de Campo da Equipe (Acampamento na Selva)
              </div>
              <div className={(gameState.cristaisTemporais || 0) >= 2 ? 'text-[#8fd16a]' : 'text-[#857f70]'}>
                {(gameState.cristaisTemporais || 0) >= 2 ? '✓' : '○'} Cristais Temporais ({gameState.cristaisTemporais || 0}/2 coletados nas Tempestades)
              </div>
            </div>
            {(gameState.buildings.radio > 0 &&
              gameState.flags.bunker &&
              gameState.flags.caixa_preta &&
              gameState.flags.diario_cientista &&
              (gameState.cristaisTemporais || 0) >= 2) && (
              <div className="mt-2 p-1.5 bg-[#1b2b1e] border border-[#4a8270] rounded text-[11px] text-[#8fd16a] text-center font-bold animate-pulse">
                ⚡ PORTAL ESTÁVEL: Parta para a NOITE para atravessar a Fenda!
              </div>
            )}
          </div>
        )}

        {/* Bancada de Fabricação */}
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#4a8270] mt-5 mb-2">
          Bancada de Fabricação
        </h2>
        <div className="bg-[#182017] border border-[#24301f] rounded-xl p-2 space-y-1.5 text-xs">
          {Object.entries(ITEM_CATALOG)
            .filter(([_, item]) => item.cost)
            .map(([id, item]) => {
              const locked = item.level > gameState.buildings.bancada;
              const canAfford =
                (!item.cost?.sucata || gameState.camp.sucata >= item.cost.sucata) &&
                (!item.cost?.remedio || gameState.camp.remedio >= item.cost.remedio);

              return (
                <div key={id} className="flex justify-between items-center py-1 border-b border-[#1f281b] last:border-0">
                  <span className="flex items-center gap-1.5">
                    <ItemIcon id={id} size={15} />
                    <span>{item.name}</span>
                    <span className="text-[11px] text-[#857f70]">
                      {locked
                        ? `(Bancada Lv${item.level})`
                        : `${item.cost?.sucata ? `${item.cost.sucata}⚙ ` : ''}${
                            item.cost?.remedio ? `${item.cost.remedio}💊` : ''
                          }`}
                    </span>
                  </span>
                  <button
                    disabled={locked || !canAfford}
                    onClick={() => handleCraft(id)}
                    className="px-2 py-1 bg-[#2e281e] border border-[#4a3e2a] rounded text-xs hover:bg-[#3d3427] disabled:opacity-30"
                  >
                    Forjar
                  </button>
                </div>
              );
            })}
        </div>

        {/* Incubadora */}
        {(gameState.buildings.incubadora || 0) > 0 && (
          <>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#4a8270] mt-5 mb-2">
              Incubadora Geotérmica
            </h2>
            <div className="bg-[#182017] border border-[#24301f] rounded-xl p-2 space-y-1.5 text-xs">
              {gameState.stash.map((item, idx) => {
                const def = ITEM_CATALOG[item.id];
                if (!def?.tags?.includes('ovo')) return null;
                const mappedPetId = item.id === 'ovo_trico' ? 'mount_trico' : 'pet_raptor';
                
                return (
                  <div key={idx} className="flex justify-between items-center py-1 border-b border-[#1f281b] last:border-0">
                    <span className="flex items-center gap-1.5">
                      <ItemIcon id={item.id} size={15} />
                      <span>{def.name}</span>
                    </span>
                    <button
                      onClick={() => handleHatch(idx, item.id, mappedPetId)}
                      className="px-2 py-1 bg-[#2e281e] border border-[#4a3e2a] rounded text-xs hover:bg-[#3d3427] text-[#e0d8c3]"
                    >
                      Chocar
                    </button>
                  </div>
                );
              })}
              {gameState.stash.filter(i => ITEM_CATALOG[i.id]?.tags?.includes('ovo')).length === 0 && (!gameState.incubatorQueue || gameState.incubatorQueue.length === 0) && (
                <div className="text-[11px] text-[#857f70] text-center p-2">Nenhum ovo na fila ou na mochila.</div>
              )}
              {gameState.incubatorQueue?.map((q, idx) => (
                <div key={`q-${idx}`} className="flex justify-between items-center py-1 border-b border-[#1f281b] last:border-0 opacity-75">
                  <span className="flex items-center gap-1.5">
                    <ItemIcon id={q.eggId} size={15} />
                    <span>{ITEM_CATALOG[q.eggId].name}</span>
                  </span>
                  <span className="text-[10px] text-[#8fd16a]">
                    Pronto em {q.expeditionsLeft} expediç{q.expeditionsLeft === 1 ? 'ão' : 'ões'}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Diário de Bordo (Lore Logs) */}
        {(gameState.loreLogs?.length || 0) > 0 && (
          <>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#4a8270] mt-5 mb-2">
              Diário de Bordo
            </h2>
            <div className="bg-[#182017] border border-[#24301f] rounded-xl p-3 space-y-3">
              {(gameState.loreLogs || []).map((log, idx) => (
                <div key={idx} className="border-b border-[#1f281b] last:border-0 pb-2 last:pb-0">
                  <div className="text-xs font-bold text-[#e57a3b] mb-1">{log.title}</div>
                  <div className="text-[11px] text-[#c5bfae] italic leading-relaxed">{log.text}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Mochila / Preparação */}
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#4a8270] mt-5 mb-2 flex justify-between items-center">
          <span>Mochila de Campo ({selectedCount}/3)</span>
          <span className="text-[11px] font-normal text-[#857f70]">Toque para selecionar</span>
        </h2>
        <div className="flex flex-wrap gap-1.5 min-h-[42px] p-2 bg-[#182017] border border-[#24301f] rounded-xl">
          {gameState.stash.length === 0 ? (
            <span className="text-xs text-[#857f70]">Depósito vazio. Forje equipamentos acima.</span>
          ) : (
            gameState.stash.map((it, idx) => (
              <span
                key={idx}
                onClick={() => handleToggleStashItem(idx)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs cursor-pointer border transition ${
                  it.selected
                    ? 'bg-[#3a2c16] border-[#e57a3b] text-white'
                    : 'bg-[#1e261a] border-[#2e3a27] text-[#c5bfae] hover:border-[#4a8270]'
                }`}
              >
                <ItemIcon id={it.id} size={14} />
                {ITEM_CATALOG[it.id].name}
                {it.usesRemaining !== null && ` (${it.usesRemaining})`}
              </span>
            ))
          )}
        </div>

        {/* Botão de Partida e Escolha de Rota */}
        <div className="mt-5 space-y-2">
          {gameState.deadLeaders.length > 0 && !gameState.deadLeaders[gameState.deadLeaders.length - 1].recovered && (
            <div className="bg-[#2a1b1b] border border-[#5e2b2b] rounded-lg p-2 text-center text-xs text-[#ffb0b0] font-mono mb-2">
              ⚠️ A mochila de {gameState.deadLeaders[gameState.deadLeaders.length - 1].name} foi perdida no bioma {gameState.deadLeaders[gameState.deadLeaders.length - 1].biome?.toUpperCase()}.
            </div>
          )}
          <button
            onClick={handleOpenSetup}
            className="w-full py-3.5 bg-[#e57a3b] text-[#121612] font-bold rounded-xl text-sm hover:brightness-110 flex justify-center items-center gap-2 shadow-lg"
          >
            <Compass size={18} /> Iniciar Expedição
          </button>
        </div>

        {/* Reset */}
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              if (confirm('Deseja realmente apagar o save e recomeçar do zero?')) {
                localStorage.removeItem(STORAGE_KEY);
                setGameState(createInitialState());
              }
            }}
            className="text-xs text-[#857f70] hover:text-[#e0604a] flex items-center justify-center gap-1 mx-auto"
          >
            <RotateCcw size={12} /> Reiniciar campanha do zero
          </button>
        </div>
      </div>
    </div>
  );
}
