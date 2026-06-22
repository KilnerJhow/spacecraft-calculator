const fs = require('fs');
const recipesData = JSON.parse(fs.readFileSync('./recipes.json', 'utf8')).recipes;

// We want to find items that can be crafted starting ONLY from iron_ingot (as the source item).
// Let's compute their cost assuming iron_ingot is valued at 5.8 credits.

function getIronOnlyCost(itemId) {
  if (itemId === 'iron_ingot') {
    return 5.8;
  }
  
  const item = recipesData[itemId];
  if (!item) return null;
  
  // If it has no inputs but isn't iron_ingot, it's not made from iron_ingot.
  if (!item.inputs || item.inputs.length === 0) {
    return null;
  }
  
  let totalCost = 0;
  for (const input of item.inputs) {
    const inputCost = getIronOnlyCost(input.id);
    if (inputCost === null) return null; // depends on non-iron items
    totalCost += inputCost * input.qty;
  }
  
  return totalCost / (item.outputQty || 1);
}

const recommendations = [];
for (const [key, item] of Object.entries(recipesData)) {
  if (key === 'iron_ingot') continue;
  const cost = getIronOnlyCost(key);
  if (cost !== null && item.value != null) {
    const profit = item.value - cost;
    const margin = (item.value / cost) - 1;
    recommendations.push({
      id: key,
      name: item.name,
      value: item.value,
      cost: cost,
      profit: profit,
      margin: margin,
      inputs: item.inputs.map(i => `${recipesData[i.id]?.name || i.id} x${i.qty}`).join(', ')
    });
  }
}

recommendations.sort((a, b) => b.profit - a.profit);
console.log("=== ACTUAL IRON-ONLY CRAFT OPTIONS ===");
recommendations.forEach(r => {
  console.log(`${r.name} (${r.id}) (Value: ${r.value.toFixed(2)}, Cost in Iron Ingot: ${r.cost.toFixed(2)}, Profit: ${r.profit >= 0 ? '+' : ''}${r.profit.toFixed(2)} [${(r.margin * 100).toFixed(1)}%])`);
  console.log(`  Inputs: ${r.inputs}`);
});
