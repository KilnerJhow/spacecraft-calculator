import { itemsData } from './src/data/items.js';
import { calculateCartPossibilities } from './src/utils/calculator.js';

try {
  console.log("Testing recipe calculation for Assembler...");
  
  const cart = [{ id: 'b_factory_1', quantity: 1 }];
  
  console.log("\n--- Scenario A: Preferring Ore ---");
  const resultOre = calculateCartPossibilities(cart, itemsData, {}, 'ore');
  console.log("Base Resources:", JSON.stringify(resultOre[0].baseResources, null, 2));

  console.log("\n--- Scenario B: Preferring Nugget ---");
  const resultNugget = calculateCartPossibilities(cart, itemsData, {}, 'nugget');
  console.log("Base Resources:", JSON.stringify(resultNugget[0].baseResources, null, 2));

  console.log("\nTesting recipe calculation for Microchip (Quantity: 2)...");
  const chipCart = [{ id: 'micro_chip', quantity: 2 }];
  const chipResult = calculateCartPossibilities(chipCart, itemsData, {}, 'ore');
  console.log("Base Resources (Expected 1 quartz):", JSON.stringify(chipResult[0].baseResources, null, 2));
  if (chipResult[0].baseResources.quartz !== 1) {
    throw new Error(`Expected 1 quartz, got ${chipResult[0].baseResources.quartz}`);
  }

  console.log("\nTesting recipe calculation for Brick Cockpit (Quantity: 1)...");
  const cockpitCart = [{ id: 'cockpit_tc_1', quantity: 1 }];
  const cockpitResult = calculateCartPossibilities(cockpitCart, itemsData, {}, 'ore');
  console.log("Base Resources for Brick Cockpit:", JSON.stringify(cockpitResult[0].baseResources, null, 2));

  console.log("\nTesting recipe calculation for m-Crystal Matrix from Malachite Stone (Quantity: 16)...");
  const matrixCart = [{ id: 'crystal_lattice_m', quantity: 16 }];
  const matrixResult = calculateCartPossibilities(matrixCart, itemsData, {}, 'malachite');
  console.log("Base Resources for m-Crystal Matrix (Expected 1 malachite_stone):", JSON.stringify(matrixResult[0].baseResources, null, 2));
  if (matrixResult[0].baseResources.malachite_stone !== 1) {
    throw new Error(`Expected 1 malachite_stone, got ${matrixResult[0].baseResources.malachite_stone}`);
  }

  console.log("\nSUCCESS! All computed correctly.");
} catch (error) {
  console.error("FAIL:", error);
  process.exit(1);
}
