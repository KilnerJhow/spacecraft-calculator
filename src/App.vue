<script setup lang="ts">
import { ref } from 'vue'
import RecipeCalculator from './components/RecipeCalculator.vue'
import RecipeDatabase from './components/RecipeDatabase.vue'
import PriceCalculator from './components/PriceCalculator.vue'
import ProfitAnalyzer from './components/ProfitAnalyzer.vue'
import BlueprintCompare from './components/BlueprintCompare.vue'

const activeTab = ref('calculator')
</script>

<template>
  <div class="app-container">
    <header class="header">
      <h1><i class="pi pi-compass" style="font-size: 1.5rem; margin-right: 0.5rem; color: var(--p-primary-color)"></i> SpaceCraft Calculator</h1>
      <p class="subtitle">Calculate base resources and intermediate crafting steps.</p>
      
      <div class="tab-navigation">
        <button 
          :class="['nav-btn', { active: activeTab === 'calculator' }]"
          @click="activeTab = 'calculator'"
        >
          <i class="pi pi-calculator nav-icon"></i>
          Calculator
        </button>
        <button 
          :class="['nav-btn', { active: activeTab === 'recipes' }]"
          @click="activeTab = 'recipes'"
        >
          <i class="pi pi-database nav-icon"></i>
          Recipe Database
        </button>
        <button 
          :class="['nav-btn', { active: activeTab === 'prices' }]"
          @click="activeTab = 'prices'"
        >
          <i class="pi pi-tags nav-icon"></i>
          Prices
        </button>
        <button 
          :class="['nav-btn', { active: activeTab === 'analyzer' }]"
          @click="activeTab = 'analyzer'"
        >
          <i class="pi pi-chart-line nav-icon"></i>
          Value Analysis
        </button>
        <button 
          :class="['nav-btn', { active: activeTab === 'blueprints' }]"
          @click="activeTab = 'blueprints'"
        >
          <i class="pi pi-objects-column nav-icon"></i>
          Blueprint Compare
        </button>
      </div>
    </header>
    <main class="main-content">
      <RecipeCalculator v-show="activeTab === 'calculator'" />
      <RecipeDatabase v-show="activeTab === 'recipes'" />
      <PriceCalculator v-show="activeTab === 'prices'" />
      <ProfitAnalyzer v-show="activeTab === 'analyzer'" />
      <BlueprintCompare v-show="activeTab === 'blueprints'" />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--p-surface-700);
}

h1 {
  font-size: 2.5rem;
  color: var(--p-surface-0);
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.subtitle {
  color: var(--p-surface-400);
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.tab-navigation {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

.nav-btn {
  background-color: var(--p-surface-900);
  border: 1px solid var(--p-surface-700);
  color: var(--p-surface-400);
  padding: 0.6rem 1.25rem;
  border-radius: var(--p-border-radius);
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.nav-btn:hover {
  color: var(--p-surface-100);
  border-color: var(--p-surface-600);
  background-color: var(--p-surface-800);
}

.nav-btn.active {
  background-color: var(--p-primary-color);
  color: var(--p-primary-contrast-color, #ffffff);
  border-color: var(--p-primary-color);
  box-shadow: 0 0 12px rgba(var(--p-primary-color-rgb, 100, 116, 139), 0.2);
}

.nav-icon {
  font-size: 1rem;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
