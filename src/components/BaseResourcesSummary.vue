<script setup lang="ts">
import { computed } from 'vue'
import Checkbox from 'primevue/checkbox'

const props = defineProps<{
  resources: any[]
}>()

const emit = defineEmits(['resource-selected'])

const resourcesList = computed(() => props.resources)

const selectResource = (res: any) => {
  emit('resource-selected', res)
}
</script>

<template>
  <div class="summary">
    <p class="summary-desc">Click base resources as you gather them to add to inventory:</p>
    <div v-for="res in resourcesList" :key="res.id" class="resource-item clickable" @click="!res.isAlternative ? selectResource(res) : null">
      <div class="flex align-items-center gap-2 w-full">
        <Checkbox v-if="!res.isAlternative" :modelValue="false" :inputId="res.id" name="resource" :value="res.id" style="pointer-events: none;" />
        
        <div v-if="res.isAlternative" class="alternative-container w-full">
          <div v-if="res.optionA.quantity > 0" class="alt-option-btn" @click.stop="selectResource(res.optionA)">
            <span class="alt-qty">{{ res.optionA.quantity }}</span> {{ res.optionA.name }}
          </div>
          <span v-if="res.optionA.quantity > 0 && res.optionB.quantity > 0" class="alt-or">OR</span>
          <div v-if="res.optionB.quantity > 0" class="alt-option-btn" @click.stop="selectResource(res.optionB)">
            <span class="alt-qty">{{ res.optionB.quantity }}</span> {{ res.optionB.name }}
          </div>
        </div>
        
        <label v-else :for="res.id" class="res-name flex-1" style="pointer-events: none;">
          {{ res.name }}
        </label>
      </div>
      
      <span v-if="!res.isAlternative" class="res-qty">
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

.align-items-center {
  align-items: center;
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

.res-qty {
  color: var(--p-primary-400);
  font-weight: 700;
  font-size: 1.1rem;
}

.alternative-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.alt-option-btn {
  background-color: var(--p-surface-900);
  border: 1px solid var(--p-surface-600);
  padding: 0.25rem 0.75rem;
  border-radius: var(--p-border-radius);
  color: var(--p-surface-100);
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
}

.alt-option-btn:hover {
  border-color: var(--p-primary-500);
  background-color: var(--p-surface-800);
}

.alt-qty {
  color: var(--p-primary-400);
  font-weight: 700;
  font-size: 1.1rem;
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
</style>
