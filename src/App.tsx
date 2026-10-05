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
  Activity
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
import { sfx } from './utils/audio';

const STORAGE_KEY = 'fenda_v2_save';

export default function App() {
  const [gameState, setGameState] = useState<GameState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Migrations / Polyfills for older saves
        if (!parsed.loreLogs) parsed.loreLogs = [];
        if (!parsed.buildings.incubadora) parsed.buildings.incubadora = 0;
        if (parsed.report === undefined) parsed.report = null;
        if (parsed.expeditionSetup === undefined) parsed.expeditionSetup = null;
        return parsed;
      }
    } catch {}
    return createInitialState();
  });

  const [rollingDice, setRollingDice] = useState<boolean>(false);
  const [diceDisplay, setDiceDisplay] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  }, [gameState]);

  function createInitialState(): GameState {
    const p1 = generateRandomSurvivor();
    const p2 = generateRandomSurvivor();
    const p3 = generateRandomSurvivor();
    return {
      camp: { sucata: 6, comida: 8, remedio: 1 },
      buildings: { bancada: 1, defumador: 0, enfermaria: 0, radio: 0, incubadora: 0 },
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
      activeExpedition: null,
      expeditionSetup: null,
      report: null,
      gameWon: false
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

  const handleHatch = (stashIndex: number, petId: string) => {
    sfx.click();
    setGameState(prev => {
      const nextStash = [...prev.stash];
      nextStash.splice(stashIndex, 1);
      nextStash.push({ id: petId, usesRemaining: null });
      return { ...prev, stash: nextStash };
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

    const firstCard = drawCard(undefined, null, []);

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

    // 1. Filtrar cartas disponíveis
    let available = ALL_CARDS.filter(card => {
      if (card.onlyTriggered) return false;
      if (card.once && gameState.flags[`card_${card.id}`]) return false;
      if (card.condition && !card.condition(gameState)) return false;
      // Impedir repetição na mesma expedição
      if (seenIds.includes(card.id)) return false;
      return true;
    });

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
    if (effect.item) {
      exp.loot.items.push({ id: effect.item, usesRemaining: ITEM_CATALOG[effect.item].uses });
      logs.push(`+ ${ITEM_CATALOG[effect.item].name}`);
    }
    if (effect.survivorBonus) {
      gameState.pool.push(generateRandomSurvivor());
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
      gameState.gameWon = true;
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
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
      } else {
        exp.hp -= 8;
        result.log.push('Inanição: -8 Vida');
      }
    }

    setGameState(prev => prev.activeExpedition ? ({
      ...prev,
      activeExpedition: {
        ...prev.activeExpedition,
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

    let chance = action === 'attack' ? enemy.def.combatChance : enemy.def.fleeChance;
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

        setGameState(prev => {
          if (!prev.activeExpedition) return prev;
          return {
            ...prev,
            activeExpedition: {
              ...prev.activeExpedition,
              hp: nextHp,
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
    const kitIdx = gameState.activeExpedition.pack.findIndex(i => ITEM_CATALOG[i.id].heal);
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

    const report: ExpeditionReport = {
      status: (isRetreat ? 'retreat' : 'victory') as 'victory' | 'retreat',
      leaderName: gameState.leader?.name || 'Desconhecido',
      cardsExplored: exp.cardIndex,
      loot: exp.loot,
      log: isRetreat ? lostLog : ['Retornou em segurança e trouxe os suprimentos.']
    };

    setGameState(prev => ({
      ...prev,
      camp: {
        sucata: prev.camp.sucata + exp.loot.sucata,
        comida: prev.camp.comida + exp.loot.comida + exp.food, // devolve comida nãousada
        remedio: prev.camp.remedio + exp.loot.remedio
      },
      stash: [...prev.stash, ...exp.pack, ...exp.loot.items],
      activeExpedition: null,
      report
    }));
  };

  const handleDie = () => {
    if (!gameState.leader || !gameState.activeExpedition) return;
    sfx.fail(true);
    const exp = gameState.activeExpedition;

    const lostPack = [...gameState.activeExpedition.pack];
    const deadRecord = {
      name: gameState.leader.name,
      origin: gameState.leader.origin,
      lostPack,
      recovered: false
    };

    const report: ExpeditionReport = {
      status: 'death' as const,
      leaderName: gameState.leader.name,
      cardsExplored: exp.cardIndex,
      loot: { sucata: 0, comida: 0, remedio: 0, items: [] }, // Perdeu tudo
      log: ['O batedor não retornou. Todos os itens e recursos coletados foram perdidos na selva.']
    };

    setGameState(prev => ({
      ...prev,
      deadLeaders: [...prev.deadLeaders, deadRecord],
      leader: null,
      activeExpedition: null,
      report
    }));
  };

  // ==================== RENDERS ====================

  // 1. Tela de Relatório de Expedição
  if (gameState.report) {
    const r = gameState.report;
    const isWin = r.status === 'victory';
    const isDeath = r.status === 'death';
    return (
      <div className="min-h-screen bg-[#121612] text-[#e0d8c3] flex items-center justify-center p-4">
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

  // 2. Tela de Vitória
  if (gameState.gameWon) {
    return (
      <div className="min-h-screen bg-[#121612] text-[#e0d8c3] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-[#182017] border border-[#4a8270] rounded-2xl p-6 text-center shadow-2xl"
        >
          <div className="flex justify-center mb-4">
            <CardArt biome="noite" silhouette="fenda" />
          </div>
          <h1 className="text-2xl font-bold text-[#e57a3b] mb-2">A FENDA — O RETORNO</h1>
          <p className="text-sm text-[#c5bfae] mb-4 leading-relaxed">
            {gameState.leader?.name} cruzou a fronteira quântica de volta a 2026. As buzinas do trânsito
            paulistano ecoam enquanto seus pés tocam o asfalto molhado.
          </p>
          <p className="text-xs text-[#857f70] mb-6">
            A colônia resistiu por {gameState.generation} gerações de líderes. {gameState.deadLeaders.length} companheiros
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
      <div className="min-h-screen bg-[#121612] text-[#e0d8c3] flex justify-center p-4">
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
      <div className="min-h-screen bg-[#121612] text-[#e0d8c3] flex items-center justify-center p-4">
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
    const hasKit = exp.pack.some((i) => ITEM_CATALOG[i.id].heal);

    return (
      <div className="min-h-screen bg-[#121612] text-[#e0d8c3] flex justify-center p-3">
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
                    currentCardIndex={exp.cardIndex}
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
                      
                      <div className="flex justify-between items-center text-xs font-mono bg-[#121612] p-2 rounded mb-4">
                        <span className="text-[#e0604a]">HP Inimigo: {exp.activeEnemy.hp}/{exp.activeEnemy.maxHp}</span>
                        <span className="text-[#ffd54a]">Dano: {exp.activeEnemy.def.damage}</span>
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
                          Tentar Fugir ({exp.activeEnemy.def.fleeChance}% chance base)
                        </button>
                      </div>
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
    <div className="min-h-screen bg-[#121612] text-[#e0d8c3] flex justify-center p-3 pb-12">
      <div className="w-full max-w-md">
        {/* Cabeçalho do Líder */}
        <div>
          <h1 className="text-xl font-bold text-[#e0d8c3] flex items-center justify-between">
            Acampamento dos Destroços
            <span className="text-xs font-mono font-normal text-[#857f70]">Geração {gameState.generation}</span>
          </h1>
          <p className="text-xs text-[#857f70] mt-0.5">
            Líder: <b className="text-[#e0d8c3]">{gameState.leader.name}</b> ({leaderOrigin.name})
          </p>
          <p className="text-[11px] text-[#4a8270] font-mono mt-0.5">{leaderOrigin.trait}</p>
        </div>

        {/* Cena viva do acampamento */}
        <div className="mt-3">
          <CampScene buildings={gameState.buildings} survivors={gameState.pool.length} />
        </div>

        {/* Recursos Centrais */}
        <div className="bg-[#182017] border border-[#2c3826] rounded-xl p-2.5 flex justify-between items-center text-xs mt-3">
          <span className="flex items-center gap-1 text-[#4a8270]">
            <Cog size={15} /> {gameState.camp.sucata} Sucata
          </span>
          <span className="flex items-center gap-1 text-[#e57a3b]">
            <Drumstick size={15} /> {gameState.camp.comida} Ração
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
                </div>
                {isMax ? (
                  <span className="text-xs text-[#4a8270] font-bold">Completo</span>
                ) : (
                  <button
                    disabled={gameState.camp.sucata < cost}
                    onClick={() => handleBuild(key)}
                    className="px-2.5 py-1.5 bg-[#2c3826] text-[#e0d8c3] rounded font-mono hover:bg-[#3d4d34] disabled:opacity-30"
                  >
                    {cost} ⚙
                  </button>
                )}
              </div>
            );
          })}
        </div>

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
                if (!ITEM_CATALOG[item.id].tags?.includes('ovo')) return null;
                const mappedPetId = item.id === 'ovo_trico' ? 'mount_trico' : 'pet_raptor';
                
                return (
                  <div key={idx} className="flex justify-between items-center py-1 border-b border-[#1f281b] last:border-0">
                    <span className="flex items-center gap-1.5">
                      <ItemIcon id={item.id} size={15} />
                      <span>{ITEM_CATALOG[item.id].name}</span>
                    </span>
                    <button
                      onClick={() => handleHatch(idx, mappedPetId)}
                      className="px-2 py-1 bg-[#2e281e] border border-[#4a3e2a] rounded text-xs hover:bg-[#3d3427] text-[#e0d8c3]"
                    >
                      Chocar
                    </button>
                  </div>
                );
              })}
              {gameState.stash.filter(i => ITEM_CATALOG[i.id].tags?.includes('ovo')).length === 0 && (
                <div className="text-[11px] text-[#857f70] text-center p-2">Nenhum ovo para chocar.</div>
              )}
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
