<script setup lang="ts">
import { ref, computed } from 'vue'
import { itemsData } from '../data/items'
import Card from 'primevue/card'
import { usePrices } from '../utils/usePrices'
import { calculatePossibilities, createSmartRegex } from '../utils/calculator'

const { getPrice } = usePrices()

const searchQuery = ref('')
const showHelpModal = ref(false)
const sortCol = ref<'name'|'sell'|'directProfit'|'rawProfit'>('rawProfit')
const sortDesc = ref(true)

// Calculate metrics for each recipe of each crafted item
const analyzedItems = computed(() => {
  const results: any[] = []

  for (const [itemId, item] of Object.entries(itemsData)) {
    if (item.isBase || !item.recipes || item.recipes.length === 0) continue

    const sellPrice = getPrice(itemId)

    for (const recipe of item.recipes) {
      // Direct Cost
      let directCostTotal = 0
      for (const [inputId, qty] of Object.entries(recipe.inputs)) {
        directCostTotal += getPrice(inputId) * qty
      }
      const directCostPerUnit = directCostTotal / recipe.yield
      const directProfit = sellPrice - directCostPerUnit

      // Raw Material Cost
      const possibilities = calculatePossibilities(itemId, 1, itemsData)
      let rawCostPerUnit = 0
      if (possibilities.length > 0) {
        const baseRes = possibilities[0].baseResources
        for (const [resId, qty] of Object.entries(baseRes)) {
          rawCostPerUnit += getPrice(resId) * qty
        }
      }
      const rawProfit = sellPrice - rawCostPerUnit

      results.push({
        id: itemId,
        name: item.name,
        recipeId: recipe.id,
        sellPrice,
        directCost: directCostPerUnit,
        directProfit,
        rawCost: rawCostPerUnit,
        rawProfit
      })
    }
  }

  return results
})

const filteredAndSortedItems = computed(() => {
  let list = analyzedItems.value

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.trim()
    try {
      const regex = createSmartRegex(query)
      list = list.filter(item => regex.test(item.name))
    } catch (e) {
      const lowerQuery = query.toLowerCase()
      list = list.filter(item => item.name.toLowerCase().includes(lowerQuery))
    }
  }

  list.sort((a, b) => {
    let valA = a[sortCol.value]
    let valB = b[sortCol.value]

    if (typeof valA === 'string') valA = valA.toLowerCase()
    if (typeof valB === 'string') valB = valB.toLowerCase()

    if (valA < valB) return sortDesc.value ? 1 : -1
    if (valA > valB) return sortDesc.value ? -1 : 1
    return 0
  })

  return list
})

const formatCurrency = (value: number) => {
  return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const toggleSort = (col: 'name'|'sell'|'directProfit'|'rawProfit') => {
  if (sortCol.value === col) {
    sortDesc.value = !sortDesc.value
  } else {
    sortCol.value = col
    sortDesc.value = true
  }
}

const getProfitClass = (profit: number) => {
  if (profit > 0) return 'profit-positive'
  if (profit < 0) return 'profit-negative'
  return 'profit-neutral'
}
</script>

<template>
  <div class="profit-analyzer">
    <Card class="analyzer-card">
      <template #title>
        <div class="panel-header">
          <i class="pi pi-chart-line icon"></i> Value & Profit Analyzer
        </div>
      </template>
      <template #content>
        <div class="header-controls">
          <p class="subtitle">Compare the sell price of crafted items against their direct crafting cost and raw material cost.</p>
          <div class="search-bar">
          <div class="search-wrapper">
            <i class="pi pi-search search-icon"></i>
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search items..." 
              class="custom-search-input"
              style="padding-right: 3.25rem;"
            />
            <div style="display: flex; align-items: center; gap: 0.25rem; position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%);">
              <button type="button" @click="showHelpModal = true" style="background: none; border: none; color: var(--p-surface-400); cursor: pointer; padding: 0.25rem; display: flex; align-items: center;" title="Search Regex Helper">
                <i class="pi pi-question-circle"></i>
              </button>
              <button v-if="searchQuery" type="button" @click="searchQuery = ''" style="background: none; border: none; color: var(--p-surface-400); cursor: pointer; padding: 0.25rem; display: flex; align-items: center;">
                <i class="pi pi-times"></i>
              </button>
            </div>
          </div>
        </div>
        </div>

        <div class="table-container">
          <table class="analysis-table">
            <thead>
              <tr>
                <th @click="toggleSort('name')" class="sortable">
                  Item Name <i v-if="sortCol === 'name'" :class="['pi', sortDesc ? 'pi-sort-alpha-down' : 'pi-sort-alpha-up']"></i>
                </th>
                <th @click="toggleSort('sell')" class="sortable text-right">
                  Sell Price <i v-if="sortCol === 'sell'" :class="['pi', sortDesc ? 'pi-sort-numeric-down' : 'pi-sort-numeric-up']"></i>
                </th>
                <th class="text-right">Direct Cost</th>
                <th @click="toggleSort('directProfit')" class="sortable text-right">
                  Direct Profit <i v-if="sortCol === 'directProfit'" :class="['pi', sortDesc ? 'pi-sort-numeric-down' : 'pi-sort-numeric-up']"></i>
                </th>
                <th class="text-right">Raw Cost</th>
                <th @click="toggleSort('rawProfit')" class="sortable text-right">
                  Raw Profit <i v-if="sortCol === 'rawProfit'" :class="['pi', sortDesc ? 'pi-sort-numeric-down' : 'pi-sort-numeric-up']"></i>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredAndSortedItems" :key="item.recipeId">
                <td class="item-name-cell">
                  <span class="item-name">{{ item.name }}</span>
                  <span class="recipe-id" v-if="item.recipeId.includes('from')">({{ item.recipeId.split('_from_')[1] }})</span>
                </td>
                <td class="text-right font-mono">{{ formatCurrency(item.sellPrice) }}</td>
                <td class="text-right font-mono text-surface-400">{{ formatCurrency(item.directCost) }}</td>
                <td :class="['text-right font-mono font-bold', getProfitClass(item.directProfit)]">
                  {{ item.directProfit > 0 ? '+' : '' }}{{ formatCurrency(item.directProfit) }}
                </td>
                <td class="text-right font-mono text-surface-400">{{ formatCurrency(item.rawCost) }}</td>
                <td :class="['text-right font-mono font-bold', getProfitClass(item.rawProfit)]">
                  {{ item.rawProfit > 0 ? '+' : '' }}{{ formatCurrency(item.rawProfit) }}
                </td>
              </tr>
              <tr v-if="filteredAndSortedItems.length === 0">
                <td colspan="6" class="empty-row">No items match your search.</td>
              </tr>
            </tbody>
          </table>
         </div>
      </template>
    </Card>

    <!-- Search Regex Helper Modal -->
    <div v-if="showHelpModal" class="modal-backdrop" @click.self="showHelpModal = false">
      <div class="modal-content help-modal-content">
        <div class="modal-header">
          <i class="pi pi-info-circle info-icon-modal"></i>
          <h3>Regex Search Helper</h3>
        </div>
        <div class="modal-body">
          <p>The search fields support standard text search and **Regular Expressions (Regex)**. The search is case-insensitive.</p>
          
          <div class="help-section">
            <h4>Common Patterns & Examples:</h4>
            <ul class="help-list">
              <li>
                <span class="code-badge">|</span> 
                <strong>OR Operator:</strong> Match one term or another. Plurals are automatically supported.
                <div class="example"><code>ingots|ores</code> &rarr; matches items containing "ingot" or "ore".</div>
              </li>
              <li>
                <span class="code-badge">^</span> 
                <strong>Start Anchor:</strong> Match items starting with a term.
                <div class="example"><code>^gold</code> &rarr; matches "Gold Nugget", but not "refined gold".</div>
              </li>
              <li>
                <span class="code-badge">$</span> 
                <strong>End Anchor:</strong> Match items ending with a term.
                <div class="example"><code>plate$</code> &rarr; matches "Iron Plate", but not "Plate Assembly".</div>
              </li>
              <li>
                <span class="code-badge">.*</span> 
                <strong>Wildcard:</strong> Match anything in between.
                <div class="example"><code>copper.*wire</code> &rarr; matches "Copper Wire" and "Copper Coated Wire".</div>
              </li>
            </ul>
          </div>
          <p class="fallback-note"><em>Note: If you enter an invalid regular expression, the search will temporarily fall back to matching the exact text.</em></p>
        </div>
        <div class="modal-footer">
          <button type="button" @click="showHelpModal = false" class="modal-close-btn">Got it</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profit-analyzer {
  display: flex;
  flex-direction: column;
}

.analyzer-card {
  background-color: var(--p-surface-900);
  border: 1px solid var(--p-surface-700);
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
  color: var(--p-surface-0);
}

.icon {
  color: #10b981; /* emerald-500 */
}

.header-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.subtitle {
  color: var(--p-surface-400);
  margin: 0;
  font-size: 0.95rem;
  max-width: 600px;
}

.search-wrapper {
  position: relative;
  width: 300px;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--p-surface-400);
  font-size: 1rem;
  pointer-events: none;
}

.custom-search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  background-color: var(--p-surface-950);
  border: 1px solid var(--p-surface-700);
  color: var(--p-surface-50);
  border-radius: var(--p-border-radius);
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.custom-search-input:focus {
  border-color: var(--p-primary-color);
  outline: none;
  box-shadow: 0 0 0 2px rgba(var(--p-primary-color-rgb, 100, 116, 139), 0.2);
}

.table-container {
  overflow-x: auto;
  border: 1px solid var(--p-surface-700);
  border-radius: var(--p-border-radius);
  background-color: var(--p-surface-950);
}

.analysis-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
}

.analysis-table th {
  background-color: var(--p-surface-800);
  color: var(--p-surface-200);
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  padding: 1rem;
  border-bottom: 2px solid var(--p-surface-700);
  white-space: nowrap;
}

.sortable {
  cursor: pointer;
  user-select: none;
  transition: color 0.2s;
}

.sortable:hover {
  color: var(--p-surface-0);
}

.sortable i {
  margin-left: 0.25rem;
  font-size: 0.8rem;
}

.analysis-table td {
  padding: 1rem;
  border-bottom: 1px solid var(--p-surface-800);
  color: var(--p-surface-100);
}

.analysis-table tbody tr {
  transition: background-color 0.15s;
}

.analysis-table tbody tr:hover {
  background-color: rgba(var(--p-primary-color-rgb, 100, 116, 139), 0.05);
}

.item-name-cell {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.item-name {
  font-weight: 500;
}

.recipe-id {
  font-size: 0.8rem;
  color: var(--p-surface-500);
  text-transform: capitalize;
}

.text-right {
  text-align: right;
}

.font-mono {
  font-family: monospace;
  font-size: 1rem;
}

.font-bold {
  font-weight: 700;
}

.text-surface-400 {
  color: var(--p-surface-400) !important;
}

.profit-positive {
  color: #34d399 !important; /* emerald-400 */
}

.profit-negative {
  color: #f87171 !important; /* red-400 */
}

.profit-neutral {
  color: var(--p-surface-400) !important;
}

.empty-row {
  text-align: center;
  padding: 3rem !important;
  color: var(--p-surface-500) !important;
  font-style: italic;
}

/* Custom Confirmation Modal Styling */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
  animation: fadeIn 0.2s ease-out;
}

.modal-content {
  background: var(--p-surface-900);
  border: 1px solid var(--p-surface-700);
  border-radius: var(--p-border-radius);
  width: 90%;
  max-width: 400px;
  padding: 1.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  animation: scaleIn 0.2s ease-out;
}

.modal-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.modal-header h3 {
  margin: 0;
  border-bottom: none;
  padding-bottom: 0;
  font-size: 1.25rem;
  color: var(--p-surface-0);
}

.modal-body {
  color: var(--p-surface-300);
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  text-align: left;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.modal-close-btn {
  width: 100%;
  background-color: var(--p-primary-color);
  color: var(--p-primary-contrast-color, #ffffff);
  border: none;
  padding: 0.6rem 1.25rem;
  border-radius: var(--p-border-radius);
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.modal-close-btn:hover {
  background-color: var(--p-primary-hover-color, var(--p-primary-600));
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.help-modal-content {
  max-width: 500px !important;
}

.help-modal-content .info-icon-modal {
  font-size: 1.5rem;
  color: var(--p-primary-500);
}

.help-section {
  background-color: var(--p-surface-950);
  border: 1px solid var(--p-surface-800);
  border-radius: var(--p-border-radius);
  padding: 1rem;
  margin: 1rem 0;
}

.help-section h4 {
  margin-top: 0;
  margin-bottom: 0.75rem;
  color: var(--p-surface-100);
  font-size: 0.95rem;
}

.help-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.help-list li {
  font-size: 0.9rem;
  line-height: 1.4;
  color: var(--p-surface-300);
}

.code-badge {
  display: inline-block;
  background-color: var(--p-surface-800);
  color: var(--p-primary-400);
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  font-family: monospace;
  font-weight: bold;
  margin-right: 0.5rem;
}

.example {
  margin-top: 0.2rem;
  margin-left: 1.5rem;
  font-size: 0.85rem;
  color: var(--p-surface-400);
}

.example code {
  background-color: var(--p-surface-800);
  padding: 0.05rem 0.25rem;
  border-radius: 3px;
  color: var(--p-surface-200);
}

.fallback-note {
  font-size: 0.85rem;
  color: var(--p-surface-400);
  margin-top: 1rem;
}
</style>
