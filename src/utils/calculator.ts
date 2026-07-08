import type { Item, SupplyChainResult } from '../types';

/**
 * Calculates all possible supply chains for a given item and quantity, factoring in available inventory.
 * 
 * @param {string} itemId - The ID of the item to calculate.
 * @param {number} quantity - The required quantity of the item.
 * @param {object} itemsData - The dictionary of items and their recipes.
 * @param {object} inventoryState - The current state of available inventory { itemId: qty }.
 * @returns {Array} An array of possible supply chains, each returning an updated remainingInventory.
 */
export function calculatePossibilities(itemId: string, quantity: number, itemsData: Record<string, Item>, inventoryState: Record<string, number> = {}, preference: string = 'ore'): SupplyChainResult[] {
  let inventory = { ...inventoryState };
  let fromInventory = 0;
  let remainingQuantity = quantity;

  if (inventory[itemId] > 0) {
    fromInventory = Math.min(inventory[itemId], quantity);
    inventory[itemId] -= fromInventory;
    remainingQuantity -= fromInventory;
  }

  const item = itemsData[itemId];
  
  if (!item) {
    throw new Error(`Item ${itemId} not found`);
  }

  // If fully satisfied from inventory, return a leaf node
  if (remainingQuantity === 0) {
    return [
      {
        baseResources: {},
        remainingInventory: inventory,
        tree: {
          id: itemId,
          name: item.name,
          quantity: quantity,
          fromInventory: fromInventory,
          crafted: 0,
          gathered: 0,
          isBase: item.isBase,
          children: []
        }
      }
    ];
  }

  // If it's a base item, we just "gather" the remainder
  if (item.isBase) {
    return [
      {
        baseResources: { [itemId]: remainingQuantity },
        remainingInventory: inventory,
        tree: {
          id: itemId,
          name: item.name,
          quantity: quantity,
          fromInventory: fromInventory,
          gathered: remainingQuantity,
          crafted: 0,
          isBase: true,
          children: []
        }
      }
    ];
  }

  const recipes = item.recipes || [];
  if (recipes.length === 0) {
    // If no recipes and not a base item, treat it as a base/gathered item
    return [
      {
        baseResources: { [itemId]: remainingQuantity },
        remainingInventory: inventory,
        tree: {
          id: itemId,
          name: item.name,
          quantity: quantity,
          fromInventory: fromInventory,
          gathered: remainingQuantity,
          crafted: 0,
          isBase: true,
          children: []
        }
      }
    ];
  }

  // Greedy strategy to select a single best recipe allocation
  let tempInventory = { ...inventory };
  let qLeft = remainingQuantity;
  const recipeRuns = new Array(recipes.length).fill(0);

  // Phase 1: Try to satisfy as much as possible using inputs from inventory
  let progress = true;
  while (qLeft > 0 && progress) {
    progress = false;
    
    // Find recipe that can produce the most yield using current inventory
    let bestRecipeIdx = -1;
    let bestRunsFromInv = 0;

    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      // Calculate how many runs of this recipe we can support using inventory
      let runsPossible = Infinity;
      for (const [inputId, qtyPerRun] of Object.entries(recipe.inputs)) {
        const available = tempInventory[inputId] || 0;
        const runsForInput = Math.floor(available / qtyPerRun);
        if (runsForInput < runsPossible) {
          runsPossible = runsForInput;
        }
      }

      if (runsPossible > 0 && runsPossible !== Infinity) {
        if (runsPossible > bestRunsFromInv) {
          bestRunsFromInv = runsPossible;
          bestRecipeIdx = i;
        }
      }
    }

    if (bestRecipeIdx !== -1) {
      const recipe = recipes[bestRecipeIdx];
      const runsNeeded = Math.ceil(qLeft / recipe.yield);
      const runsToRun = Math.min(runsNeeded, bestRunsFromInv);

      recipeRuns[bestRecipeIdx] += runsToRun;
      qLeft -= runsToRun * recipe.yield;

      // Deduct inputs from tempInventory
      for (const [inputId, qtyPerRun] of Object.entries(recipe.inputs)) {
        tempInventory[inputId] -= qtyPerRun * runsToRun;
      }
      progress = true;
    }
  }

  // Phase 2: If we still need to craft more, use the default recipe based on preference
  if (qLeft > 0) {
    let defaultRecipeIdx = 0;
    if (preference) {
      let prefIdx = recipes.findIndex(r => r.id.includes(preference));
      // Special mappings for general preferences
      if (prefIdx === -1 && preference === 'nugget') {
        if (itemId === 'crystal_lattice_c') {
          prefIdx = recipes.findIndex(r => r.id.includes('pyrite'));
        } else if (itemId === 'crystal_lattice_m') {
          prefIdx = recipes.findIndex(r => r.id.includes('malachite'));
        }
      }
      if (prefIdx !== -1) {
        defaultRecipeIdx = prefIdx;
      }
    }
    const recipe = recipes[defaultRecipeIdx];
    const runsNeeded = Math.ceil(qLeft / recipe.yield);
    recipeRuns[defaultRecipeIdx] += runsNeeded;
    qLeft -= runsNeeded * recipe.yield;
  }

  // Calculate inputs needed for this greedy allocation
  let totalRuns = 0;
  let totalYielded = 0;
  const inputsMap: Record<string, number> = {};
  const recipeDetails = [];

  for (let i = 0; i < recipes.length; i++) {
    const runsCount = recipeRuns[i];
    if (runsCount <= 0) continue;

    const recipe = recipes[i];
    totalRuns += runsCount;
    const yielded = runsCount * recipe.yield;
    totalYielded += yielded;

    // Create a nice human readable name for the recipe (e.g. ingot_from_ore -> from Ore)
    let recipeLabel = recipe.id.replace(/_/g, ' ');
    if (recipe.id.includes('from_ore')) recipeLabel = 'from Ore';
    else if (recipe.id.includes('from_nugget')) recipeLabel = 'from Nugget';

    recipeDetails.push({
      recipeId: recipe.id,
      name: recipeLabel,
      runs: runsCount,
      yielded: yielded
    });

    for (const [inputId, inputQtyPerRun] of Object.entries(recipe.inputs)) {
      inputsMap[inputId] = (inputsMap[inputId] || 0) + inputQtyPerRun * runsCount;
    }
  }

  // Convert inputsMap to list of cartItems
  const cartItems = Object.entries(inputsMap).map(([inputId, qty]) => ({
    id: inputId,
    quantity: qty
  }));

  // Calculate sub-possibilities for these inputs sequentially passing inventory
  const subPossibilities = calculateCartPossibilities(cartItems, itemsData, inventory, preference);
  const firstSubPoss = subPossibilities[0] || { baseResources: {}, remainingInventory: inventory, trees: [] };

  return [
    {
      baseResources: firstSubPoss.baseResources,
      remainingInventory: firstSubPoss.remainingInventory,
      tree: {
        id: itemId,
        name: item.name,
        quantity: quantity,
        fromInventory: fromInventory,
        crafted: remainingQuantity,
        gathered: 0,
        runs: totalRuns,
        yielded: totalYielded,
        isBase: false,
        recipeDetails: recipeDetails,
        children: firstSubPoss.trees
      }
    }
  ];
}

/**
 * Calculates combinations of supply chains for an entire cart of items, sequentially passing inventory state.
 * 
 * @param {Array} cartItems - Array of {itemId, quantity} objects.
 * @param {object} itemsData - The dictionary of items and their recipes.
 * @param {object} initialInventory - The user's available inventory.
 * @param {string} preference - The recipe preference ('ore' or 'nugget').
 * @returns {Array} An array of combined possibilities.
 */
export function calculateCartPossibilities(cartItems: any[], itemsData: Record<string, Item>, initialInventory: Record<string, number> = {}, preference: string = 'ore'): any[] {
  if (!cartItems || cartItems.length === 0) return [];

  let currentPossibilities = [
    {
      baseResources: {} as Record<string, number>,
      remainingInventory: { ...initialInventory } as Record<string, number>,
      trees: [] as any[]
    }
  ];

  for (const cartItem of cartItems) {
    const nextPossibilities = [];

    for (const currPoss of currentPossibilities) {
      const itemPossibilities = calculatePossibilities(
        cartItem.id, 
        cartItem.quantity, 
        itemsData, 
        currPoss.remainingInventory,
        preference
      );

      for (const itemPoss of itemPossibilities) {
         const combinedBase: Record<string, number> = { ...currPoss.baseResources };
         for (const [resId, resQty] of Object.entries(itemPoss.baseResources)) {
           combinedBase[resId] = (combinedBase[resId] || 0) + resQty;
         }

         nextPossibilities.push({
           baseResources: combinedBase,
           remainingInventory: itemPoss.remainingInventory,
           trees: [...currPoss.trees, itemPoss.tree]
         });
      }
    }
    currentPossibilities = nextPossibilities;
  }

  return currentPossibilities;
}

/**
 * Creates a smart RegExp from a query string.
 * Automatically makes trailing 's' optional before pipes or at the end of the string
 * to better support searching for plurals (e.g., "ingots|ores" -> /ingot(?:s)?|ore(?:s)?/i)
 * 
 * @param {string} query - The search query.
 * @returns {RegExp} The generated RegExp.
 */
export function createSmartRegex(query: string): RegExp {
  // Make word-final 's' optional for plural/singular tolerance.
  // Lookbehind ensures the 's' follows a letter (not a backslash like \s).
  const smartQuery = query.replace(/(?<=[a-zA-Z])s\b/gi, 's?');
  return new RegExp(smartQuery, 'i');
}
