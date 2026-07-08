<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { itemsData } from '../data/items'
import { calculatePossibilities, createSmartRegex } from '../utils/calculator'
import { usePrices } from '../utils/usePrices'
import Card from 'primevue/card'

const { getPrice } = usePrices()

const searchQuery = ref('')
const selectedItemId = ref<string | null>(null)
const showHelpModal = ref(false)

// Build the list of all craftable items
const craftableItems = computed(() => {
  return Object.entries(itemsData)
    .filter(([_, item]) => !item.isBase && item.recipes && item.recipes.length > 0)
    .map(([id, item]) => ({
      id,
      name: item.name,
      recipeCount: item.recipes!.length,
      hasMultiple: item.recipes!.length > 1
    }))
    .sort((a, b) => {
      // Multi-recipe items first, then alphabetical
      if (a.hasMultiple !== b.hasMultiple) return a.hasMultiple ? -1 : 1
      return a.name.localeCompare(b.name)
    })
})

// Filter the item list based on search
const filteredCraftableItems = computed(() => {
  if (!searchQuery.value.trim()) return craftableItems.value

  const query = searchQuery.value.trim()
  try {
    const regex = createSmartRegex(query)
    return craftableItems.value.filter(item => regex.test(item.name))
  } catch (e) {
    const lowerQuery = query.toLowerCase()
    return craftableItems.value.filter(item => item.name.toLowerCase().includes(lowerQuery))
  }
})

// Recursively calculate crafting depth for a recipe
function getCraftingDepth(itemId: string, visited: Set<string> = new Set()): number {
  if (visited.has(itemId)) return 0
  visited.add(itemId)

  const item = itemsData[itemId]
  if (!item || item.isBase || !item.recipes || item.recipes.length === 0) return 0

  let maxDepth = 0
  for (const recipe of item.recipes) {
    for (const inputId of Object.keys(recipe.inputs)) {
      const depth = getCraftingDepth(inputId, new Set(visited))
      if (depth + 1 > maxDepth) maxDepth = depth + 1
    }
  }
  return maxDepth
}

// Analyze all blueprints for the selected item
const blueprintAnalysis = computed(() => {
  if (!selectedItemId.value) return null

  const item = itemsData[selectedItemId.value]
  if (!item || !item.recipes || item.recipes.length === 0) return null

  const blueprints = item.recipes.map((recipe, index) => {
    // Direct inputs
    const directInputs = Object.entries(recipe.inputs).map(([inputId, qty]) => ({
      id: inputId,
      name: itemsData[inputId]?.name || inputId,
      quantity: qty,
      unitPrice: getPrice(inputId),
      totalPrice: getPrice(inputId) * qty
    }))

    const totalDirectInputCount = Object.values(recipe.inputs).reduce((sum, qty) => sum + qty, 0)
    const directCostTotal = directInputs.reduce((sum, input) => sum + input.totalPrice, 0)
    const directCostPerUnit = directCostTotal / recipe.yield

    // Raw material breakdown — calculate for 1 unit using this specific recipe
    // We need to resolve for the recipe's yield and then divide by yield
    let rawResources: Record<string, number> = {}
    let rawCostPerUnit = 0

    try {
      // To force a specific recipe, we temporarily create a modified itemsData
      // where the selected item only has this one recipe
      const tempItemsData = { ...itemsData }
      tempItemsData[selectedItemId.value!] = {
        ...item,
        recipes: [recipe]
      }
      const possibilities = calculatePossibilities(
        selectedItemId.value!, 
        recipe.yield, 
        tempItemsData
      )
      if (possibilities.length > 0) {
        rawResources = possibilities[0].baseResources
        for (const [resId, qty] of Object.entries(rawResources)) {
          rawCostPerUnit += getPrice(resId) * qty
        }
        rawCostPerUnit = rawCostPerUnit / recipe.yield
      }
    } catch (e) {
      console.error('Error calculating raw resources for recipe', recipe.id, e)
    }

    // Per-unit raw resources
    const rawResourcesPerUnit: Record<string, number> = {}
    for (const [resId, qty] of Object.entries(rawResources)) {
      rawResourcesPerUnit[resId] = qty / recipe.yield
    }

    // Distinct ingredient count (direct)
    const distinctInputs = Object.keys(recipe.inputs).length

    // Distinct raw resources
    const distinctRawResources = Object.keys(rawResources).length

    // Crafting depth for this specific recipe path
    let maxDepth = 0
    for (const inputId of Object.keys(recipe.inputs)) {
      const depth = getCraftingDepth(inputId)
      if (depth + 1 > maxDepth) maxDepth = depth + 1
    }

    // Human-readable label
    let label = recipe.id.replace(/_/g, ' ')
    const fromMatch = recipe.id.match(/from_(.+)/)
    if (fromMatch) {
      label = 'from ' + fromMatch[1].replace(/_/g, ' ')
    }

    return {
      index,
      letter: String.fromCharCode(65 + index), // A, B, C...
      recipeId: recipe.id,
      label,
      yield: recipe.yield,
      directInputs,
      totalDirectInputCount,
      directCostTotal,
      directCostPerUnit,
      rawResources: Object.entries(rawResourcesPerUnit).map(([id, qty]) => ({
        id,
        name: itemsData[id]?.name || id,
        quantity: qty,
        unitPrice: getPrice(id),
        totalPrice: getPrice(id) * qty
      })).sort((a, b) => b.totalPrice - a.totalPrice),
      rawCostPerUnit,
      distinctInputs,
      distinctRawResources,
      craftingDepth: maxDepth
    }
  })

  // Determine the best blueprint
  let bestIdx = 0
  let bestCost = Infinity
  for (let i = 0; i < blueprints.length; i++) {
    const bp = blueprints[i]
    if (bp.rawCostPerUnit < bestCost || 
        (bp.rawCostPerUnit === bestCost && bp.distinctInputs < blueprints[bestIdx].distinctInputs)) {
      bestCost = bp.rawCostPerUnit
      bestIdx = i
    }
  }

  // Build recommendation reasons
  const best = blueprints[bestIdx]
  const others = blueprints.filter((_, i) => i !== bestIdx)
  const reasons: string[] = []

  if (others.length > 0) {
    const worstCost = Math.max(...others.map(o => o.rawCostPerUnit))
    if (best.rawCostPerUnit < worstCost) {
      const savings = ((1 - best.rawCostPerUnit / worstCost) * 100).toFixed(0)
      reasons.push(`${savings}% cheaper in raw materials`)
    }
    
    const fewerInputs = others.some(o => best.distinctInputs < o.distinctInputs)
    if (fewerInputs) {
      reasons.push('Fewer unique ingredients')
    }

    const shallower = others.some(o => best.craftingDepth < o.craftingDepth)
    if (shallower) {
      reasons.push('Simpler crafting chain')
    }

    if (best.yield > Math.min(...others.map(o => o.yield))) {
      reasons.push('Higher yield per craft')
    }
  }

  return {
    itemId: selectedItemId.value,
    itemName: item.name,
    blueprints,
    bestIndex: bestIdx,
    reasons,
    hasMultiple: blueprints.length > 1
  }
})

const selectItem = (itemId: string) => {
  selectedItemId.value = itemId
  searchQuery.value = ''
}

const clearSelection = () => {
  selectedItemId.value = null
}

const formatCurrency = (value: number) => {
  return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const formatQty = (value: number) => {
  if (Number.isInteger(value)) return value.toString()
  return value.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 2 })
}
</script>

<template>
  <div class="blueprint-compare">
    <Card class="main-card">
      <template #title>
        <div class="panel-header">
          <i class="pi pi-objects-column icon"></i> Blueprint Compare
        </div>
      </template>
      <template #content>
        <p class="subtitle">Select a craftable item to compare its available blueprints and find the most efficient one.</p>

        <!-- Item Selector -->
        <div class="selector-section">
          <div class="search-wrapper">
            <i class="pi pi-search search-icon"></i>
            <input 
              type="text" 
              v-model="searchQuery" 
              :placeholder="selectedItemId ? (itemsData[selectedItemId]?.name || 'Search items...') : 'Search items to compare...'" 
              class="custom-search-input"
              style="padding-right: 3.25rem;"
              @focus="searchQuery = ''"
            />
            <div style="display: flex; align-items: center; gap: 0.25rem; position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%);">
              <button type="button" @click="showHelpModal = true" style="background: none; border: none; color: var(--p-surface-400); cursor: pointer; padding: 0.25rem; display: flex; align-items: center;" title="Search Regex Helper">
                <i class="pi pi-question-circle"></i>
              </button>
              <button v-if="selectedItemId" type="button" @click="clearSelection" style="background: none; border: none; color: var(--p-surface-400); cursor: pointer; padding: 0.25rem; display: flex; align-items: center;" title="Clear selection">
                <i class="pi pi-times"></i>
              </button>
            </div>
          </div>

          <!-- Dropdown results -->
          <div v-if="searchQuery.trim() && filteredCraftableItems.length > 0" class="dropdown-results">
            <div 
              v-for="item in filteredCraftableItems.slice(0, 15)" 
              :key="item.id" 
              class="dropdown-item"
              @click="selectItem(item.id)"
            >
              <span class="dropdown-item-name">{{ item.name }}</span>
              <span v-if="item.hasMultiple" class="multi-badge">
                <i class="pi pi-copy"></i> {{ item.recipeCount }} BPs
              </span>
              <span v-else class="single-badge">1 BP</span>
            </div>
          </div>
          <div v-if="searchQuery.trim() && filteredCraftableItems.length === 0" class="dropdown-results">
            <div class="dropdown-empty">No craftable items found.</div>
          </div>
        </div>

        <!-- No item selected state -->
        <div v-if="!selectedItemId" class="empty-state">
          <i class="pi pi-search empty-icon"></i>
          <p>Search and select an item above to compare its blueprints.</p>
          <div class="quick-picks">
            <span class="quick-picks-label">Popular multi-blueprint items:</span>
            <div class="quick-picks-list">
              <button 
                v-for="item in craftableItems.filter(i => i.hasMultiple).slice(0, 6)" 
                :key="item.id"
                class="quick-pick-btn"
                @click="selectItem(item.id)"
              >
                {{ item.name }}
              </button>
            </div>
          </div>
        </div>

        <!-- Analysis Results -->
        <div v-if="blueprintAnalysis" class="analysis-results">
          
          <!-- Item Header -->
          <div class="item-header">
            <div class="item-title-row">
              <h2 class="item-title">{{ blueprintAnalysis.itemName }}</h2>
              <span class="bp-count-badge">
                <i class="pi pi-copy"></i>
                {{ blueprintAnalysis.blueprints.length }} Blueprint{{ blueprintAnalysis.blueprints.length > 1 ? 's' : '' }}
              </span>
            </div>
          </div>

          <!-- Recommendation Banner (only for multi-blueprint items) -->
          <div v-if="blueprintAnalysis.hasMultiple" class="recommendation-banner">
            <div class="rec-icon-wrapper">
              <i class="pi pi-star-fill rec-star"></i>
            </div>
            <div class="rec-content">
              <div class="rec-title">
                Blueprint {{ blueprintAnalysis.blueprints[blueprintAnalysis.bestIndex].letter }} is recommended
                <span class="rec-label">({{ blueprintAnalysis.blueprints[blueprintAnalysis.bestIndex].label }})</span>
              </div>
              <div v-if="blueprintAnalysis.reasons.length > 0" class="rec-reasons">
                <span v-for="(reason, i) in blueprintAnalysis.reasons" :key="i" class="rec-reason-tag">
                  <i class="pi pi-check"></i> {{ reason }}
                </span>
              </div>
            </div>
          </div>

          <!-- Blueprint Cards Grid -->
          <div class="blueprints-grid" :class="{ 'single-col': blueprintAnalysis.blueprints.length === 1 }">
            <div 
              v-for="bp in blueprintAnalysis.blueprints" 
              :key="bp.recipeId" 
              :class="['blueprint-card', { 'is-best': blueprintAnalysis.hasMultiple && bp.index === blueprintAnalysis.bestIndex }]"
            >
              <!-- Card Header -->
              <div class="bp-card-header">
                <div class="bp-letter-circle" :class="{ 'best-circle': blueprintAnalysis.hasMultiple && bp.index === blueprintAnalysis.bestIndex }">
                  {{ bp.letter }}
                </div>
                <div class="bp-header-info">
                  <div class="bp-header-title">Blueprint {{ bp.letter }}</div>
                  <div class="bp-header-label">{{ bp.label }}</div>
                </div>
                <div v-if="blueprintAnalysis.hasMultiple && bp.index === blueprintAnalysis.bestIndex" class="best-badge">
                  <i class="pi pi-star-fill"></i> Best
                </div>
              </div>

              <!-- Yield Info -->
              <div class="bp-yield-row">
                <span class="yield-label">Yield per craft:</span>
                <span class="yield-value">{{ bp.yield }}x {{ blueprintAnalysis.itemName }}</span>
              </div>

              <!-- Direct Inputs -->
              <div class="bp-section">
                <div class="bp-section-header">
                  <i class="pi pi-box section-icon"></i>
                  <span>Direct Inputs</span>
                  <span class="section-meta">{{ bp.distinctInputs }} ingredient{{ bp.distinctInputs > 1 ? 's' : '' }}</span>
                </div>
                <div class="inputs-list">
                  <div v-for="input in bp.directInputs" :key="input.id" class="input-row">
                    <div class="input-left">
                      <span class="input-qty">{{ input.quantity }}x</span>
                      <span class="input-name">{{ input.name }}</span>
                    </div>
                    <span class="input-cost">{{ formatCurrency(input.totalPrice) }}</span>
                  </div>
                  <div class="input-total-row">
                    <span>Direct Cost (per unit)</span>
                    <span class="input-total-value">{{ formatCurrency(bp.directCostPerUnit) }}</span>
                  </div>
                </div>
              </div>

              <!-- Raw Materials -->
              <div class="bp-section">
                <div class="bp-section-header">
                  <i class="pi pi-sitemap section-icon"></i>
                  <span>Raw Materials (per unit)</span>
                  <span class="section-meta">depth {{ bp.craftingDepth }}</span>
                </div>
                <div class="inputs-list">
                  <div v-for="res in bp.rawResources" :key="res.id" class="input-row">
                    <div class="input-left">
                      <span class="input-qty">{{ formatQty(res.quantity) }}x</span>
                      <span class="input-name">{{ res.name }}</span>
                    </div>
                    <span class="input-cost">{{ formatCurrency(res.totalPrice) }}</span>
                  </div>
                  <div class="input-total-row raw-total">
                    <span>Raw Cost (per unit)</span>
                    <span class="raw-total-value">{{ formatCurrency(bp.rawCostPerUnit) }}</span>
                  </div>
                </div>
              </div>

              <!-- Stats Summary -->
              <div class="bp-stats">
                <div class="stat-item">
                  <span class="stat-label">Inputs/craft</span>
                  <span class="stat-value">{{ bp.totalDirectInputCount }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Unique ingredients</span>
                  <span class="stat-value">{{ bp.distinctInputs }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Raw resources</span>
                  <span class="stat-value">{{ bp.distinctRawResources }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Crafting depth</span>
                  <span class="stat-value">{{ bp.craftingDepth }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Comparison Table (for multi-blueprint) -->
          <div v-if="blueprintAnalysis.hasMultiple" class="comparison-section">
            <div class="comparison-header">
              <i class="pi pi-chart-bar"></i>
              <span>Side-by-Side Comparison</span>
            </div>
            <div class="comparison-table-container">
              <table class="comparison-table">
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th v-for="bp in blueprintAnalysis.blueprints" :key="bp.recipeId" :class="{ 'best-col': bp.index === blueprintAnalysis.bestIndex }">
                      BP {{ bp.letter }}
                      <span v-if="bp.index === blueprintAnalysis.bestIndex" class="col-best-tag">★</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="metric-label">Yield / craft</td>
                    <td v-for="bp in blueprintAnalysis.blueprints" :key="bp.recipeId" 
                        :class="['metric-value', { 'highlight-best': bp.yield === Math.max(...blueprintAnalysis.blueprints.map(b => b.yield)) && blueprintAnalysis.blueprints.some(b => b.yield !== bp.yield) }]">
                      {{ bp.yield }}x
                    </td>
                  </tr>
                  <tr>
                    <td class="metric-label">Direct cost / unit</td>
                    <td v-for="bp in blueprintAnalysis.blueprints" :key="bp.recipeId"
                        :class="['metric-value', { 'highlight-best': bp.directCostPerUnit === Math.min(...blueprintAnalysis.blueprints.map(b => b.directCostPerUnit)) && blueprintAnalysis.blueprints.some(b => b.directCostPerUnit !== bp.directCostPerUnit) }]">
                      {{ formatCurrency(bp.directCostPerUnit) }}
                    </td>
                  </tr>
                  <tr>
                    <td class="metric-label">Raw cost / unit</td>
                    <td v-for="bp in blueprintAnalysis.blueprints" :key="bp.recipeId"
                        :class="['metric-value', { 'highlight-best': bp.rawCostPerUnit === Math.min(...blueprintAnalysis.blueprints.map(b => b.rawCostPerUnit)) && blueprintAnalysis.blueprints.some(b => b.rawCostPerUnit !== bp.rawCostPerUnit) }]">
                      {{ formatCurrency(bp.rawCostPerUnit) }}
                    </td>
                  </tr>
                  <tr>
                    <td class="metric-label">Unique ingredients</td>
                    <td v-for="bp in blueprintAnalysis.blueprints" :key="bp.recipeId"
                        :class="['metric-value', { 'highlight-best': bp.distinctInputs === Math.min(...blueprintAnalysis.blueprints.map(b => b.distinctInputs)) && blueprintAnalysis.blueprints.some(b => b.distinctInputs !== bp.distinctInputs) }]">
                      {{ bp.distinctInputs }}
                    </td>
                  </tr>
                  <tr>
                    <td class="metric-label">Crafting depth</td>
                    <td v-for="bp in blueprintAnalysis.blueprints" :key="bp.recipeId"
                        :class="['metric-value', { 'highlight-best': bp.craftingDepth === Math.min(...blueprintAnalysis.blueprints.map(b => b.craftingDepth)) && blueprintAnalysis.blueprints.some(b => b.craftingDepth !== bp.craftingDepth) }]">
                      {{ bp.craftingDepth }} level{{ bp.craftingDepth !== 1 ? 's' : '' }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
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
          <p>The search field supports standard text search and <strong>Regular Expressions (Regex)</strong>. The search is case-insensitive.</p>
          
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
                <div class="example"><code>^copper</code> &rarr; matches "Copper Ingot", but not "refined copper".</div>
              </li>
              <li>
                <span class="code-badge">.*</span> 
                <strong>Wildcard:</strong> Match anything in between.
                <div class="example"><code>crystal.*matrix</code> &rarr; matches "m-Crystal Matrix" and "c-Crystal Matrix".</div>
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
.blueprint-compare {
  display: flex;
  flex-direction: column;
}

.main-card {
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
  color: #8b5cf6; /* violet-500 */
}

.subtitle {
  color: var(--p-surface-400);
  margin: 0 0 1.5rem 0;
  font-size: 0.95rem;
}

/* --- Selector --- */
.selector-section {
  position: relative;
  margin-bottom: 2rem;
}

.search-wrapper {
  position: relative;
  width: 100%;
  max-width: 500px;
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

.dropdown-results {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-width: 500px;
  max-height: 320px;
  overflow-y: auto;
  background-color: var(--p-surface-900);
  border: 1px solid var(--p-surface-600);
  border-top: none;
  border-radius: 0 0 var(--p-border-radius) var(--p-border-radius);
  z-index: 100;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.dropdown-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 1rem;
  cursor: pointer;
  transition: background-color 0.15s ease;
  border-bottom: 1px solid var(--p-surface-800);
}

.dropdown-item:hover {
  background-color: var(--p-surface-800);
}

.dropdown-item:last-child {
  border-bottom: none;
}

.dropdown-item-name {
  color: var(--p-surface-100);
  font-weight: 500;
  font-size: 0.95rem;
}

.multi-badge {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background: rgba(139, 92, 246, 0.15);
  color: #a78bfa;
  padding: 0.2rem 0.55rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid rgba(139, 92, 246, 0.3);
}

.single-badge {
  color: var(--p-surface-500);
  font-size: 0.75rem;
  font-weight: 500;
}

.dropdown-empty {
  padding: 1rem;
  color: var(--p-surface-500);
  text-align: center;
  font-style: italic;
}

/* --- Empty State --- */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  background-color: var(--p-surface-950);
  border: 1px dashed var(--p-surface-700);
  border-radius: var(--p-border-radius);
  text-align: center;
}

.empty-icon {
  font-size: 3rem;
  color: var(--p-surface-600);
  margin-bottom: 1rem;
}

.empty-state p {
  color: var(--p-surface-400);
  font-size: 1.05rem;
  margin: 0 0 1.5rem 0;
}

.quick-picks {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.quick-picks-label {
  color: var(--p-surface-500);
  font-size: 0.85rem;
}

.quick-picks-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
}

.quick-pick-btn {
  background-color: var(--p-surface-800);
  border: 1px solid var(--p-surface-700);
  color: var(--p-surface-200);
  padding: 0.4rem 0.85rem;
  border-radius: 9999px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.quick-pick-btn:hover {
  background-color: rgba(139, 92, 246, 0.15);
  border-color: rgba(139, 92, 246, 0.4);
  color: #c4b5fd;
}

/* --- Analysis Results --- */
.analysis-results {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.item-header {
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--p-surface-700);
}

.item-title-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.item-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--p-surface-0);
  margin: 0;
}

.bp-count-badge {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background: rgba(139, 92, 246, 0.1);
  color: #a78bfa;
  padding: 0.3rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 600;
  border: 1px solid rgba(139, 92, 246, 0.25);
}

/* --- Recommendation Banner --- */
.recommendation-banner {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(52, 211, 153, 0.04));
  border: 1px solid rgba(16, 185, 129, 0.25);
  border-radius: var(--p-border-radius);
}

.rec-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(16, 185, 129, 0.15);
  border-radius: 50%;
  flex-shrink: 0;
}

.rec-star {
  color: #34d399;
  font-size: 1rem;
}

.rec-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.rec-title {
  color: #34d399;
  font-weight: 600;
  font-size: 1rem;
}

.rec-label {
  color: var(--p-surface-400);
  font-weight: 400;
  font-size: 0.9rem;
}

.rec-reasons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.rec-reason-tag {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background: rgba(16, 185, 129, 0.1);
  color: #6ee7b7;
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 500;
}

.rec-reason-tag .pi {
  font-size: 0.7rem;
}

/* --- Blueprint Cards Grid --- */
.blueprints-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 1.5rem;
}

.blueprints-grid.single-col {
  grid-template-columns: 1fr;
  max-width: 550px;
}

.blueprint-card {
  background-color: var(--p-surface-950);
  border: 1px solid var(--p-surface-700);
  border-radius: var(--p-border-radius);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.blueprint-card.is-best {
  border-color: rgba(16, 185, 129, 0.4);
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.06);
}

/* --- Card Header --- */
.bp-card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.bp-letter-circle {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--p-surface-800);
  color: var(--p-surface-200);
  font-weight: 700;
  font-size: 1.1rem;
  flex-shrink: 0;
  border: 2px solid var(--p-surface-600);
}

.bp-letter-circle.best-circle {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
  border-color: rgba(16, 185, 129, 0.4);
}

.bp-header-info {
  flex: 1;
}

.bp-header-title {
  color: var(--p-surface-100);
  font-weight: 600;
  font-size: 1.05rem;
}

.bp-header-label {
  color: var(--p-surface-400);
  font-size: 0.85rem;
  text-transform: capitalize;
}

.best-badge {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
  padding: 0.3rem 0.7rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 700;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.best-badge .pi {
  font-size: 0.7rem;
}

/* --- Yield Row --- */
.bp-yield-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: var(--p-surface-900);
  border-radius: calc(var(--p-border-radius) - 2px);
  font-size: 0.9rem;
}

.yield-label {
  color: var(--p-surface-400);
}

.yield-value {
  color: #34d399;
  font-weight: 600;
}

/* --- Sections --- */
.bp-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.bp-section-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--p-surface-300);
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--p-surface-800);
}

.section-icon {
  color: var(--p-surface-500);
  font-size: 0.85rem;
}

.section-meta {
  margin-left: auto;
  font-size: 0.75rem;
  color: var(--p-surface-500);
  font-weight: 500;
  text-transform: none;
}

.inputs-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.input-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.35rem 0.5rem;
  border-radius: 4px;
  transition: background-color 0.15s ease;
}

.input-row:hover {
  background-color: var(--p-surface-900);
}

.input-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.input-qty {
  color: var(--p-primary-400);
  font-weight: 700;
  font-size: 0.9rem;
  min-width: 40px;
}

.input-name {
  color: var(--p-surface-200);
  font-size: 0.9rem;
}

.input-cost {
  color: var(--p-surface-500);
  font-family: monospace;
  font-size: 0.85rem;
}

.input-total-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.5rem;
  border-top: 1px solid var(--p-surface-800);
  margin-top: 0.25rem;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--p-surface-300);
}

.input-total-value {
  font-family: monospace;
  color: var(--p-surface-200);
}

.raw-total {
  border-top: 2px solid var(--p-surface-700);
}

.raw-total-value {
  font-family: monospace;
  color: #fbbf24; /* amber-400 */
  font-weight: 700;
}

/* --- Stats Summary --- */
.bp-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--p-surface-800);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.4rem;
  background: var(--p-surface-900);
  border-radius: 4px;
}

.stat-label {
  font-size: 0.7rem;
  color: var(--p-surface-500);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.stat-value {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--p-surface-100);
}

/* --- Comparison Table --- */
.comparison-section {
  background-color: var(--p-surface-950);
  border: 1px solid var(--p-surface-700);
  border-radius: var(--p-border-radius);
  overflow: hidden;
}

.comparison-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1rem;
  background-color: var(--p-surface-900);
  color: var(--p-surface-200);
  font-weight: 600;
  font-size: 0.95rem;
  border-bottom: 1px solid var(--p-surface-700);
}

.comparison-table-container {
  overflow-x: auto;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
}

.comparison-table th {
  background-color: var(--p-surface-800);
  color: var(--p-surface-300);
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.04em;
  padding: 0.75rem 1rem;
  border-bottom: 2px solid var(--p-surface-700);
  text-align: center;
}

.comparison-table th:first-child {
  text-align: left;
}

.comparison-table th.best-col {
  color: #34d399;
}

.col-best-tag {
  color: #34d399;
  margin-left: 0.25rem;
}

.comparison-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--p-surface-800);
  color: var(--p-surface-200);
  text-align: center;
  font-family: monospace;
  font-size: 0.95rem;
}

.comparison-table td:first-child {
  text-align: left;
  font-family: inherit;
}

.comparison-table tbody tr {
  transition: background-color 0.15s;
}

.comparison-table tbody tr:hover {
  background-color: rgba(var(--p-primary-color-rgb, 100, 116, 139), 0.05);
}

.metric-label {
  color: var(--p-surface-400) !important;
  font-weight: 500;
  font-size: 0.9rem !important;
}

.metric-value.highlight-best {
  color: #34d399 !important;
  font-weight: 700;
}

/* --- Modals --- */
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
