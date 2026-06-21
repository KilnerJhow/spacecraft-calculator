import { itemsData } from './src/data/items.js';
import { calculateCartPossibilities } from './src/utils/calculator.js';

try {
  console.log("Testing recipe calculation for Assemblre...");
  
  const cart = [{ itemId: 'assemblre', quantity: 1 }];
  
  console.log("\n--- Scenario A: Preferring Ore ---");
  const resultOre = calculateCartPossibilities(cart, itemsData, {}, 'ore');
  console.log("Base Resources:", JSON.stringify(resultOre[0].baseResources, null, 2));

  console.log("\n--- Scenario B: Preferring Nugget ---");
  const resultNugget = calculateCartPossibilities(cart, itemsData, {}, 'nugget');
  console.log("Base Resources:", JSON.stringify(resultNugget[0].baseResources, null, 2));

  console.log("\nTesting recipe calculation for Microchip (Quantity: 2)...");
  const chipCart = [{ itemId: 'microchip', quantity: 2 }];
  const chipResult = calculateCartPossibilities(chipCart, itemsData, {}, 'ore');
  console.log("Base Resources (Expected 1 semicondutor_substrate):", JSON.stringify(chipResult[0].baseResources, null, 2));
  if (chipResult[0].baseResources.semicondutor_substrate !== 1) {
    throw new Error(`Expected 1 semiconductor substrate, got ${chipResult[0].baseResources.semicondutor_substrate}`);
  }

  console.log("\nSUCCESS! All computed correctly.");
} catch (error) {
  console.error("FAIL:", error);
  process.exit(1);
}
