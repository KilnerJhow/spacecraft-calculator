<script setup lang="ts">
import { ref, computed } from 'vue'
import { itemsData } from '../data/items'
import Card from 'primevue/card'
import { usePrices } from '../utils/usePrices'
import { calculatePossibilities } from '../utils/calculator'

const { getPrice } = usePrices()

const searchQuery = ref('')
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

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase().trim()
    list = list.filter(item => item.name.toLowerCase().includes(q))
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
          <div class="search-wrapper">
            <i class="pi pi-search search-icon"></i>
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search items..." 
              class="custom-search-input"
            />
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
</style>
