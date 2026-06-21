<script setup lang="ts">
import { ref, computed } from 'vue'
import { itemsData } from '../data/items'
import Card from 'primevue/card'

const searchQuery = ref('')
const activeFilter = ref('all') // 'all', 'crafted', 'base'

const itemsList = computed(() => {
  return Object.keys(itemsData).map(key => ({
    id: key,
    ...itemsData[key]
  }))
})

const filteredItems = computed(() => {
  return itemsList.value.filter(item => {
    const query = searchQuery.value.toLowerCase().trim()
    
    // Match by item name, or match if any of its inputs match the name
    let matchesSearch = item.name.toLowerCase().includes(query)
    
    if (!matchesSearch && item.recipes) {
      matchesSearch = item.recipes.some(recipe => {
        return Object.keys(recipe.inputs).some(inputId => {
          const inputName = itemsData[inputId]?.name || inputId
          return inputName.toLowerCase().includes(query)
        })
      })
    }
    
    // Type filter match
    if (activeFilter.value === 'crafted') {
      return matchesSearch && !item.isBase
    } else if (activeFilter.value === 'base') {
      return matchesSearch && item.isBase
    }
    return matchesSearch
  })
})

const formatName = (key: string) => {
  return itemsData[key]?.name || key
}
</script>

<template>
  <div class="recipe-database">
    <!-- Search and filter controls -->
    <div class="controls-bar">
      <div class="search-wrapper">
        <i class="pi pi-search search-icon"></i>
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search items or inputs..." 
          class="custom-search-input"
        />
        <button v-if="searchQuery" @click="searchQuery = ''" class="clear-btn">
          <i class="pi pi-times"></i>
        </button>
      </div>

      <div class="filter-tabs">
        <button 
          :class="['filter-tab', { active: activeFilter === 'all' }]"
          @click="activeFilter = 'all'"
        >
          All Items
        </button>
        <button 
          :class="['filter-tab', { active: activeFilter === 'crafted' }]"
          @click="activeFilter = 'crafted'"
        >
          Crafted
        </button>
        <button 
          :class="['filter-tab', { active: activeFilter === 'base' }]"
          @click="activeFilter = 'base'"
        >
          Base Resources
        </button>
      </div>
    </div>

    <!-- Items Grid -->
    <div v-if="filteredItems.length > 0" class="items-grid">
      <div v-for="item in filteredItems" :key="item.id" class="item-card-wrapper">
        <Card class="item-card">
          <template #title>
            <div class="card-header">
              <span class="item-name">{{ item.name }}</span>
              <span :class="['item-badge', item.isBase ? 'badge-base' : 'badge-crafted']">
                {{ item.isBase ? 'Base' : 'Crafted' }}
              </span>
            </div>
          </template>
          <template #content>
            <div class="card-body">
              <!-- Crafted Recipes -->
              <div v-if="!item.isBase && item.recipes && item.recipes.length > 0" class="recipes-container">
                <div v-for="recipe in item.recipes" :key="recipe.id" class="recipe-card">
                  <div class="recipe-header">
                    <span class="recipe-id">Recipe: {{ recipe.id.replace(/_/g, ' ') }}</span>
                  </div>

                  <div class="recipe-flow">
                    <!-- Inputs -->
                    <div class="flow-inputs">
                      <div v-for="(qty, inputId) in recipe.inputs" :key="inputId" class="flow-input-item">
                        <span class="input-qty">{{ qty }}x</span>
                        <span class="input-name">{{ formatName(inputId) }}</span>
                      </div>
                    </div>

                    <!-- Flow arrow -->
                    <div class="flow-arrow-container">
                      <i class="pi pi-arrow-right flow-arrow"></i>
                    </div>

                    <!-- Yield -->
                    <div class="flow-yield">
                      <span class="yield-qty">{{ recipe.yield }}x</span>
                      <span class="yield-name">{{ item.name }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Base Resource Info -->
              <div v-else-if="item.isBase" class="base-info">
                <i class="pi pi-info-circle info-icon"></i>
                <span v-if="item.description">{{ item.description }}</span>
                <span v-else>Raw material gathered from mining or exploration. Cannot be crafted.</span>
              </div>

              <div v-else class="warning-info">
                <i class="pi pi-exclamation-triangle warning-icon"></i>
                <span>No recipes defined for this item.</span>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="empty-results-state">
      <i class="pi pi-search-minus empty-icon"></i>
      <p>No items found matching "{{ searchQuery }}"</p>
    </div>
  </div>
</template>

<style scoped>
.recipe-database {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.controls-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  background-color: var(--p-surface-900);
  padding: 1rem 1.5rem;
  border-radius: var(--p-border-radius);
  border: 1px solid var(--p-surface-700);
}

.search-wrapper {
  position: relative;
  flex: 1;
  min-width: 280px;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1rem;
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

.clear-btn {
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: var(--p-surface-400);
  cursor: pointer;
  padding: 0.25rem;
}

.clear-btn:hover {
  color: var(--p-surface-100);
}

.filter-tabs {
  display: flex;
  background-color: var(--p-surface-950);
  padding: 0.25rem;
  border-radius: var(--p-border-radius);
  border: 1px solid var(--p-surface-700);
  gap: 0.25rem;
}

.filter-tab {
  background: none;
  border: none;
  color: var(--p-surface-400);
  padding: 0.5rem 1.25rem;
  border-radius: calc(var(--p-border-radius) - 2px);
  cursor: pointer;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.filter-tab:hover {
  color: var(--p-surface-100);
  background-color: var(--p-surface-900);
}

.filter-tab.active {
  background-color: var(--p-primary-color);
  color: var(--p-primary-contrast-color, #ffffff);
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 1.5rem;
}

.item-card-wrapper {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.item-card-wrapper:hover {
  transform: translateY(-4px);
}

.item-card {
  background-color: var(--p-surface-900);
  border: 1px solid var(--p-surface-700);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.item-card :deep(.p-card-body) {
  padding: 1.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.item-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--p-surface-0);
}

.item-badge {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.6rem;
  border-radius: 9999px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.badge-base {
  background-color: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.badge-crafted {
  background-color: rgba(16, 185, 129, 0.15);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.recipes-container {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
}

.recipe-block {
  background-color: var(--p-surface-800);
  border: 1px solid var(--p-surface-700);
  border-radius: var(--p-border-radius);
  padding: 1rem;
}

.recipe-header {
  border-bottom: 1px solid var(--p-surface-700);
  padding-bottom: 0.5rem;
  margin-bottom: 0.75rem;
}

.recipe-id {
  font-size: 0.8rem;
  color: var(--p-surface-400);
  text-transform: capitalize;
  font-family: monospace;
}

.recipe-flow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.flow-inputs {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.flow-input-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.input-qty {
  color: var(--p-primary-400);
  font-weight: 700;
  min-width: 20px;
}

.input-name {
  color: var(--p-surface-200);
}

.flow-arrow-container {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--p-surface-500);
  padding: 0 0.5rem;
}

.flow-arrow {
  font-size: 1rem;
}

.flow-yield {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  font-size: 0.9rem;
  text-align: right;
}

.yield-qty {
  color: #34d399;
  font-weight: 700;
}

.yield-name {
  color: var(--p-surface-50);
  font-weight: 500;
}

.base-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--p-surface-400);
  font-size: 0.9rem;
  line-height: 1.4;
  padding: 0.5rem 0;
}

.info-icon {
  font-size: 1.25rem;
  color: #3b82f6;
  flex-shrink: 0;
}

.warning-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--p-surface-400);
  font-size: 0.9rem;
  padding: 0.5rem 0;
}

.warning-icon {
  font-size: 1.25rem;
  color: #f59e0b;
  flex-shrink: 0;
}

.empty-results-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background-color: var(--p-surface-900);
  border: 1px dashed var(--p-surface-700);
  border-radius: var(--p-border-radius);
  color: var(--p-surface-400);
  text-align: center;
}

.empty-icon {
  font-size: 3rem;
  color: var(--p-surface-600);
  margin-bottom: 1rem;
}

.empty-results-state p {
  font-size: 1.1rem;
  margin: 0;
}
</style>
