<script setup lang="ts">
import { ref, computed } from 'vue'
import { itemsData } from '../data/items'
import Card from 'primevue/card'
import { usePrices } from '../utils/usePrices'
import { createSmartRegex } from '../utils/calculator'

const { getPrice, setPrice } = usePrices()

const searchQuery = ref('')
const selectedItem = ref<string | null>(null)
const showHelpModal = ref(false)
const quantity = ref<number>(1)

const itemsList = computed(() => {
  return Object.keys(itemsData).map(key => ({
    id: key,
    ...itemsData[key]
  }))
})

const filteredItems = computed(() => {
  if (!searchQuery.value.trim()) return itemsList.value
  const query = searchQuery.value.trim()
  try {
    const regex = createSmartRegex(query)
    return itemsList.value.filter(item => regex.test(item.name))
  } catch (e) {
    const lowerQuery = query.toLowerCase()
    return itemsList.value.filter(item => item.name.toLowerCase().includes(lowerQuery))
  }
})


const totalPrice = computed(() => {
  if (!selectedItem.value) return 0
  return getPrice(selectedItem.value) * quantity.value
})

const formatCurrency = (value: number) => {
  return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
</script>

<template>
  <div class="price-calculator">
    <div class="calculator-layout">
      <!-- Left side: Item Selection and Pricing -->
      <Card class="pricing-panel">
        <template #title>
          <div class="panel-header">
            <i class="pi pi-tags icon"></i> Item Pricing
          </div>
        </template>
        <template #content>
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

          <div class="items-list">
            <div 
              v-for="item in filteredItems" 
              :key="item.id" 
              :class="['item-row', { selected: selectedItem === item.id }]"
              @click="selectedItem = item.id"
            >
              <div class="item-name">
                {{ item.name }}
              </div>
              <div class="item-price-input" @click.stop>
                <span class="currency-symbol">Credits</span>
                <input 
                  type="number" 
                  step="0.01" 
                  min="0"
                  :value="getPrice(item.id)" 
                  @input="(e) => setPrice(item.id, parseFloat((e.target as HTMLInputElement).value) || 0)"
                  class="price-input"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
        </template>
      </Card>

      <!-- Right side: Calculation -->
      <Card class="calculation-panel">
        <template #title>
          <div class="panel-header">
            <i class="pi pi-calculator icon"></i> Sell Calculator
          </div>
        </template>
        <template #content>
          <div v-if="selectedItem" class="calc-content">
            <div class="selected-item-display">
              <h3>{{ itemsData[selectedItem]?.name }}</h3>
              <p class="unit-price">Unit Price: {{ formatCurrency(getPrice(selectedItem)) }} credits</p>
            </div>

            <div class="calc-form">
              <div class="form-group">
                <label>Quantity to Sell:</label>
                <div class="quantity-input-wrapper">
                  <input 
                    type="number" 
                    v-model.number="quantity" 
                    min="1" 
                    class="qty-input"
                  />
                  <span class="qty-suffix">x</span>
                </div>
              </div>
            </div>

            <div class="result-display">
              <div class="result-label">Total Value</div>
              <div class="result-value">
                {{ formatCurrency(totalPrice) }} <span class="credits">credits</span>
              </div>
              <div class="result-equation">
                {{ quantity }}x {{ itemsData[selectedItem]?.name }} @ {{ formatCurrency(getPrice(selectedItem)) }} each
              </div>
            </div>
          </div>
          <div v-else class="empty-state">
            <i class="pi pi-box empty-icon"></i>
            <p>Select an item from the list to calculate its total value.</p>
          </div>
        </template>
      </Card>
    </div>

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
.price-calculator {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.calculator-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

@media (max-width: 768px) {
  .calculator-layout {
    grid-template-columns: 1fr;
  }
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
  color: var(--p-surface-0);
}

.icon {
  color: var(--p-primary-color);
}

/* Pricing Panel */
.pricing-panel {
  background-color: var(--p-surface-900);
  border: 1px solid var(--p-surface-700);
  height: 600px;
  display: flex;
  flex-direction: column;
}

.pricing-panel :deep(.p-card-body) {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.5rem;
  overflow: hidden;
}

.pricing-panel :deep(.p-card-content) {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 1rem;
}

.search-wrapper {
  position: relative;
  width: 100%;
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

.items-list {
  flex: 1;
  overflow-y: auto;
  border: 1px solid var(--p-surface-700);
  border-radius: var(--p-border-radius);
  background-color: var(--p-surface-950);
}

.item-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--p-surface-800);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.item-row:hover {
  background-color: var(--p-surface-800);
}

.item-row.selected {
  background-color: rgba(var(--p-primary-color-rgb, 100, 116, 139), 0.15);
  border-left: 3px solid var(--p-primary-color);
}

.item-name {
  font-weight: 500;
  color: var(--p-surface-100);
}

.item-price-input {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.currency-symbol {
  font-size: 0.8rem;
  color: var(--p-surface-400);
}

.price-input {
  width: 80px;
  padding: 0.4rem;
  background-color: var(--p-surface-900);
  border: 1px solid var(--p-surface-600);
  color: var(--p-surface-50);
  border-radius: 4px;
  text-align: right;
  font-family: monospace;
}

.price-input:focus {
  border-color: var(--p-primary-color);
  outline: none;
}

/* Calculation Panel */
.calculation-panel {
  background-color: var(--p-surface-900);
  border: 1px solid var(--p-surface-700);
  height: 600px;
}

.calc-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 100%;
}

.selected-item-display {
  text-align: center;
  padding: 1.5rem;
  background-color: var(--p-surface-950);
  border-radius: var(--p-border-radius);
  border: 1px solid var(--p-surface-800);
}

.selected-item-display h3 {
  font-size: 1.75rem;
  color: var(--p-primary-400);
  margin-bottom: 0.5rem;
}

.unit-price {
  color: var(--p-surface-300);
  font-size: 1.1rem;
}

.calc-form {
  display: flex;
  justify-content: center;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.form-group label {
  color: var(--p-surface-300);
  font-weight: 500;
}

.quantity-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.qty-input {
  width: 150px;
  padding: 1rem;
  font-size: 1.5rem;
  text-align: center;
  background-color: var(--p-surface-950);
  border: 2px solid var(--p-surface-600);
  color: var(--p-surface-0);
  border-radius: var(--p-border-radius);
  transition: all 0.2s ease;
}

.qty-input:focus {
  border-color: var(--p-primary-color);
  outline: none;
  box-shadow: 0 0 15px rgba(var(--p-primary-color-rgb, 100, 116, 139), 0.2);
}

.qty-suffix {
  position: absolute;
  right: 1rem;
  font-size: 1.25rem;
  color: var(--p-surface-400);
  pointer-events: none;
}

.result-display {
  margin-top: auto;
  text-align: center;
  padding: 2rem;
  background: linear-gradient(145deg, var(--p-surface-900), var(--p-surface-800));
  border-radius: var(--p-border-radius);
  border: 1px solid var(--p-primary-color);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.result-label {
  color: var(--p-surface-300);
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.result-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: #34d399; /* emerald-400 */
  margin-bottom: 0.5rem;
  text-shadow: 0 0 20px rgba(52, 211, 153, 0.3);
}

.credits {
  font-size: 1.25rem;
  color: var(--p-surface-400);
  font-weight: 500;
}

.result-equation {
  color: var(--p-surface-400);
  font-size: 0.95rem;
  font-style: italic;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 4rem 2rem;
  color: var(--p-surface-400);
  text-align: center;
}

.empty-icon {
  font-size: 4rem;
  color: var(--p-surface-700);
  margin-bottom: 1.5rem;
}

.empty-state p {
  font-size: 1.2rem;
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
