<script setup lang="ts">
import { computed } from 'vue'
import Checkbox from 'primevue/checkbox'
import { itemsData } from '../data/items'

const props = defineProps<{
  resources: any[]
  activePreference: string
}>()

const emit = defineEmits(['resource-selected'])

const resourcesList = computed(() => props.resources)

const selectResource = (res: any) => {
  emit('resource-selected', res)
}

const getWeight = (id: string): number => {
  return itemsData[id]?.weight ?? 0
}

const totalSU = computed(() => {
  return props.resources.reduce((sum, res) => {
    if (res.isAlternative) {
      const activeOption = props.activePreference === 'ore' ? res.optionA : res.optionB
      return sum + (activeOption.quantity * getWeight(activeOption.id))
    } else {
      return sum + (res.quantity * getWeight(res.id))
    }
  }, 0)
})
</script>

<template>
  <div class="summary">
    <p class="summary-desc">Click base resources as you gather them to add to inventory:</p>
    <div v-for="res in resourcesList" :key="res.id" class="resource-item clickable" @click="!res.isAlternative ? selectResource(res) : null">
      <div class="flex align-items-center gap-2 w-full">
        <Checkbox v-if="!res.isAlternative" :modelValue="false" :inputId="res.id" name="resource" :value="res.id" style="pointer-events: none;" />
        
        <div v-if="res.isAlternative" class="alternative-container w-full">
          <div v-if="res.optionA.quantity > 0" class="alt-option-btn" @click.stop="selectResource(res.optionA)">
            <span class="alt-qty">{{ res.optionA.quantity }}</span>
            <span class="alt-name">{{ res.optionA.name }}</span>
            <span class="alt-su-badge">({{ (res.optionA.quantity * getWeight(res.optionA.id)).toFixed(1) }} SU)</span>
          </div>
          <span v-if="res.optionA.quantity > 0 && res.optionB.quantity > 0" class="alt-or">OR</span>
          <div v-if="res.optionB.quantity > 0" class="alt-option-btn" @click.stop="selectResource(res.optionB)">
            <span class="alt-qty">{{ res.optionB.quantity }}</span>
            <span class="alt-name">{{ res.optionB.name }}</span>
            <span class="alt-su-badge">({{ (res.optionB.quantity * getWeight(res.optionB.id)).toFixed(1) }} SU)</span>
          </div>
        </div>
        
        <label v-else :for="res.id" class="res-name flex-1" style="pointer-events: none; display: flex; flex-direction: column;">
          <span>{{ res.name }}</span>
          <span class="res-su-badge">{{ getWeight(res.id) }} SU/ea</span>
        </label>
      </div>
      
      <div v-if="!res.isAlternative" class="flex flex-column align-items-end">
        <span class="res-qty">
          {{ res.quantity }}
        </span>
        <span class="res-su-total">
          {{ (res.quantity * getWeight(res.id)).toFixed(1) }} SU
        </span>
      </div>
    </div>

    <!-- Total SU Display -->
    <div v-if="resourcesList.length > 0" class="total-su-container">
      <div class="flex justify-content-between align-items-center">
        <span class="total-su-label">
          <i class="pi pi-box mr-2 icon-blue"></i>
          Total Cargo Space Required:
        </span>
        <span class="total-su-value">{{ totalSU.toFixed(1) }} SU</span>
      </div>
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

.resource-item.clickable {
  cursor: pointer;
}

.resource-item:hover {
  border-color: var(--p-primary-500);
  background-color: var(--p-surface-700);
}

.flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.align-items-center {
  align-items: center;
}

.align-items-end {
  align-items: flex-end;
}

.gap-2 {
  gap: 0.75rem;
}

.w-full {
  width: 100%;
}

.flex-1 {
  flex: 1;
}

.res-name {
  color: var(--p-surface-100);
  font-weight: 500;
}

.res-su-badge {
  font-size: 0.75rem;
  color: var(--p-surface-400);
  margin-top: 0.15rem;
}

.res-su-total {
  font-size: 0.8rem;
  color: var(--p-surface-400);
  margin-top: 0.15rem;
}

.res-qty {
  color: var(--p-primary-400);
  font-weight: 700;
  font-size: 1.1rem;
}

.alternative-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.alt-option-btn {
  background-color: var(--p-surface-900);
  border: 1px solid var(--p-surface-600);
  padding: 0.75rem 1.25rem;
  border-radius: var(--p-border-radius);
  color: var(--p-surface-100);
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
  min-width: 150px;
  text-align: center;
}

.alt-option-btn:hover {
  border-color: var(--p-primary-500);
  background-color: var(--p-surface-800);
}

.alt-qty {
  color: var(--p-primary-400);
  font-weight: 700;
  font-size: 1.3rem;
  line-height: 1;
}

.alt-name {
  color: var(--p-surface-100);
  font-weight: 500;
  font-size: 0.95rem;
}

.alt-su-badge {
  font-size: 0.75rem;
  color: var(--p-surface-400);
}

.alt-or {
  color: var(--p-surface-400);
  font-size: 0.75rem;
  font-style: italic;
  font-weight: bold;
}

.total-su-container {
  margin-top: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, var(--p-surface-800) 0%, var(--p-surface-900) 100%);
  border: 1px dashed var(--p-primary-500);
  border-radius: var(--p-border-radius);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.total-su-label {
  font-size: 0.95rem;
  color: var(--p-surface-300);
  display: flex;
  align-items: center;
}

.total-su-value {
  font-size: 1.25rem;
  color: var(--p-primary-400);
  font-weight: 700;
}

.mr-2 {
  margin-right: 0.5rem;
}

.icon-blue {
  color: var(--p-primary-400);
}
</style>
