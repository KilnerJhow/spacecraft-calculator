const fs = require('fs');

const recipesPath = './recipes.json';
const itemsPath = './src/data/items.ts';

const recipesData = JSON.parse(fs.readFileSync(recipesPath, 'utf8'));
const itemsContent = fs.readFileSync(itemsPath, 'utf8');

// Extract the object part
const match = itemsContent.match(/export const itemsData: Record<string, Item> = ([\s\S]+);/);
if (!match) {
  console.error("Could not parse items.ts");
  process.exit(1);
}

let itemsData;
// Use eval to parse the object since it's a JS object literal
eval('itemsData = ' + match[1]);

let updatedCount = 0;
let addedCount = 0;

for (const [key, data] of Object.entries(recipesData.recipes)) {
  if (!itemsData[key]) {
    // Add new item
    const newItem = {
      name: data.name,
      isBase: data.inputs.length === 0,
    };
    if (data.value != null) {
      newItem.basePrice = data.value;
    }
    
    if (data.inputs && data.inputs.length > 0) {
      const inputsObj = {};
      for (const input of data.inputs) {
        inputsObj[input.id] = input.qty;
      }
      newItem.recipes = [
        {
          id: `${key}_recipe`,
          yield: data.outputQty || 1,
          inputs: inputsObj
        }
      ];
    }
    
    itemsData[key] = newItem;
    addedCount++;
  } else {
    // Update existing item's price if available and not set
    if (data.value != null) {
      if (itemsData[key].basePrice !== data.value) {
        itemsData[key].basePrice = data.value;
        updatedCount++;
      }
    }
  }
}

console.log(`Added ${addedCount} items. Updated ${updatedCount} items.`);

const newContent = `import type { Item } from '../types';

export const itemsData: Record<string, Item> = ${JSON.stringify(itemsData, null, 2)};
`;

fs.writeFileSync(itemsPath, newContent);
console.log("items.ts updated successfully.");
