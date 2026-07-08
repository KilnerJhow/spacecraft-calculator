import { itemsData } from './src/data/items.js';

// Since items.ts is TS, I'll just read it and parse it or I'll just copy the relevant parts to test.
// Let's read items.ts dynamically and test the exact logic.
import fs from 'fs';
import path from 'path';

// read items.ts and extract itemsData
const itemsTs = fs.readFileSync(path.join(process.cwd(), 'src/data/items.ts'), 'utf-8');
const itemsMatch = itemsTs.match(/export const itemsData: Record<string, Item> = (\{[\s\S]*?\});\n\n/);
let itemsData = {};
try {
  // Hacky way to parse the object, we can just replace some TS specific syntax if any, but it looks like standard JSON-like object
  const cleanStr = itemsMatch[1].replace(/ as any/g, '');
  itemsData = eval('(' + cleanStr + ')');
} catch (e) {
  console.log("Error parsing itemsData:", e.message);
}

const itemsList = Object.keys(itemsData).map(key => ({
  id: key,
  ...itemsData[key]
}));

function testQuery(query, activeFilter = 'all') {
  let regex = null;
  try {
    regex = new RegExp(query, 'i');
  } catch (e) {}

  const filtered = itemsList.filter(item => {
    let matchesSearch = false;
    if (regex) {
      matchesSearch = regex.test(item.name);
      if (!matchesSearch && item.recipes) {
        matchesSearch = item.recipes.some(recipe => {
          if (!recipe.inputs) return false;
          return Object.keys(recipe.inputs).some(inputId => {
            const inputName = itemsData[inputId]?.name || inputId;
            return regex.test(inputName);
          });
        });
      }
    } else {
      const lowerQuery = query.toLowerCase();
      matchesSearch = item.name.toLowerCase().includes(lowerQuery);
      if (!matchesSearch && item.recipes) {
        matchesSearch = item.recipes.some(recipe => {
          if (!recipe.inputs) return false;
          return Object.keys(recipe.inputs).some(inputId => {
            const inputName = itemsData[inputId]?.name || inputId;
            return inputName.toLowerCase().includes(lowerQuery);
          });
        });
      }
    }

    if (activeFilter === 'crafted') {
      return matchesSearch && !item.isBase;
    } else if (activeFilter === 'base') {
      return matchesSearch && item.isBase;
    }
    return matchesSearch;
  });

  console.log(`Query: "${query}" -> Found ${filtered.length} items`);
  if (filtered.length > 0) {
    console.log(`Examples: ${filtered.slice(0, 3).map(i => i.name).join(', ')}`);
  }
}

if (Object.keys(itemsData).length > 0) {
  testQuery('concrete|silicate');
  testQuery('ingots|ores');
  testQuery('ingot|ore');
}
