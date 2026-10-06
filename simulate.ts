import { ALL_CARDS as BASE_CARDS } from './src/data/cards';
import { EXTRA_CARDS } from './src/data/extraCards';

const ALL_CARDS = [...BASE_CARDS, ...EXTRA_CARDS];

function simulate() {
  let totalWeight = 0;
  let expectedSucata = 0;
  let expectedComida = 0;
  let expectedRemedio = 0;

  let totalComidaSources = 0;
  let totalRemedioSources = 0;
  let totalSucataSources = 0;

  for (const card of ALL_CARDS) {
    const weight = card.weight || 1;
    totalWeight += weight;
    
    // Assume player picks the option with the highest reward for each resource type
    // and multiply by the baseChance (if it's a test) or 100% (if guaranteed)
    
    let maxSucataEV = 0;
    let maxComidaEV = 0;
    let maxRemedioEV = 0;

    for (const opt of card.options) {
      const chance = opt.isGuaranteed || opt.reqTag || opt.triggerMinigame ? 1.0 : (opt.baseChance || 50) / 100;
      
      const sucata = (opt.successEffect?.sucata || 0) * chance;
      const comida = (opt.successEffect?.comida || 0) * chance;
      const remedio = (opt.successEffect?.remedio || 0) * chance;

      if (sucata > maxSucataEV) maxSucataEV = sucata;
      if (comida > maxComidaEV) maxComidaEV = comida;
      if (remedio > maxRemedioEV) maxRemedioEV = remedio;

      if (opt.successEffect?.comida) totalComidaSources++;
      if (opt.successEffect?.remedio) totalRemedioSources++;
      if (opt.successEffect?.sucata) totalSucataSources++;
    }

    expectedSucata += maxSucataEV * weight;
    expectedComida += maxComidaEV * weight;
    expectedRemedio += maxRemedioEV * weight;
  }

  const avgSucataPerCard = expectedSucata / totalWeight;
  const avgComidaPerCard = expectedComida / totalWeight;
  const avgRemedioPerCard = expectedRemedio / totalWeight;

  console.log(`--- Análise de Balanceamento de Recursos ---`);
  console.log(`Média de ganho esperado POR CARTA EXPLORADA:`);
  console.log(`Sucata:  ${avgSucataPerCard.toFixed(3)} / carta`);
  console.log(`Comida:  ${avgComidaPerCard.toFixed(3)} / carta`);
  console.log(`Remédio: ${avgRemedioPerCard.toFixed(3)} / carta`);
  console.log(`\nFontes brutas (quantidade de opções no jogo inteiro que dão o recurso):`);
  console.log(`Opções que dão Sucata:  ${totalSucataSources}`);
  console.log(`Opções que dão Comida:  ${totalComidaSources}`);
  console.log(`Opções que dão Remédio: ${totalRemedioSources}`);
  
  // Em uma expedição média de 5 cartas (tamanho normal até decidir voltar)
  console.log(`\nGanho esperado em uma expedição média de 5 cartas:`);
  console.log(`Sucata:  ${(avgSucataPerCard * 5).toFixed(2)}`);
  console.log(`Comida:  ${(avgComidaPerCard * 5).toFixed(2)}`);
  console.log(`Remédio: ${(avgRemedioPerCard * 5).toFixed(2)}`);
}

simulate();
