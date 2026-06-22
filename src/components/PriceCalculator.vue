<script setup lang="ts">
import { ref, computed } from 'vue'
import { itemsData } from '../data/items'
import Card from 'primevue/card'
import { usePrices } from '../utils/usePrices'

const { getPrice, setPrice } = usePrices()

const searchQuery = ref('')
const selectedItem = ref<string | null>(null)
const quantity = ref<number>(1)

const itemsList = computed(() => {
  return Object.keys(itemsData).map(key => ({
    id: key,
    ...itemsData[key]
  }))
})

const filteredItems = computed(() => {
  return itemsList.value.filter(item => {
    return item.name.toLowerCase().includes(searchQuery.value.toLowerCase().trim())
  })
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
            />
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
</style>
