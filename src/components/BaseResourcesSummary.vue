<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import Checkbox from 'primevue/checkbox'

const props = defineProps<{
  resources: any[]
}>()

// Track checked resource IDs
const selectedResources = ref<string[]>([])

// Clear checkboxes when the resource requirements change
watch(() => props.resources, () => {
  selectedResources.value = []
}, { deep: true })

const resourcesList = computed(() => props.resources)
</script>

<template>
  <div class="summary">
    <p class="summary-desc">Check off the base resources as you gather them:</p>
    <div v-for="res in resourcesList" :key="res.id" class="resource-item" :class="{'item-done': selectedResources.includes(res.id)}">
      <div class="flex align-items-center gap-2">
        <Checkbox v-model="selectedResources" :inputId="res.id" name="resource" :value="res.id" />
        
        <div v-if="res.isAlternative" class="alternative-container" :class="{'is-done': selectedResources.includes(res.id)}">
          <span v-if="res.optionA.quantity > 0" class="alt-option">
            <span class="alt-qty">{{ res.optionA.quantity }}</span> {{ res.optionA.name }}
          </span>
          <span v-if="res.optionA.quantity > 0 && res.optionB.quantity > 0" class="alt-or">OR</span>
          <span v-if="res.optionB.quantity > 0" class="alt-option">
            <span class="alt-qty">{{ res.optionB.quantity }}</span> {{ res.optionB.name }}
          </span>
        </div>
        
        <label v-else :for="res.id" class="res-name" :class="{'is-done': selectedResources.includes(res.id)}">
          {{ res.name }}
        </label>
      </div>
      
      <span v-if="!res.isAlternative" class="res-qty" :class="{'is-done': selectedResources.includes(res.id)}">
        {{ res.quantity }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.summary {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.summary-desc {
  font-size: 0.85rem;
  color: var(--p-surface-400);
  margin-bottom: 0.5rem;
}

.resource-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background-color: var(--p-surface-800);
  border: 1px solid var(--p-surface-700);
  border-radius: var(--p-border-radius);
  transition: all 0.2s;
}

.resource-item:hover {
  border-color: var(--p-primary-500);
}

.resource-item.item-done {
  opacity: 0.7;
  background-color: var(--p-surface-900);
  border-color: var(--p-surface-800);
}

.flex {
  display: flex;
}

.align-items-center {
  align-items: center;
}

.gap-2 {
  gap: 0.75rem;
}

.res-name {
  color: var(--p-surface-100);
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s, text-decoration 0.2s;
}

.res-qty {
  color: var(--p-primary-400);
  font-weight: 700;
  font-size: 1.1rem;
  transition: color 0.2s;
}

.alternative-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.alt-option {
  color: var(--p-surface-100);
  font-weight: 500;
  font-size: 0.95rem;
  transition: color 0.2s, text-decoration 0.2s;
}

.alt-qty {
  color: var(--p-primary-400);
  font-weight: 700;
  font-size: 1.1rem;
  transition: color 0.2s;
}

.alt-or {
  color: var(--p-surface-400);
  font-size: 0.7rem;
  font-style: italic;
  font-weight: bold;
  background-color: var(--p-surface-700);
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
}

.is-done {
  text-decoration: line-through;
  color: var(--p-surface-500) !important;
}

.is-done .alt-qty {
  color: var(--p-surface-500) !important;
}

.is-done .alt-option {
  color: var(--p-surface-500) !important;
  text-decoration: line-through;
}
</style>
