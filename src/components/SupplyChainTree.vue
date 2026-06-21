<script setup>
import { computed } from 'vue'

const props = defineProps({
  node: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="tree-node">
    <div class="node-content" :class="{ 'is-base': node.isBase, 'is-fully-inventory': node.crafted === 0 && node.gathered === 0 }">
      <div class="node-header">
        <span class="qty">{{ node.quantity }}x</span>
        <span class="name">{{ node.name }}</span>
      </div>
      <div class="node-meta">
        <span v-if="node.fromInventory > 0" class="inventory-badge">
          <i class="pi pi-box"></i> {{ node.fromInventory }} from Inventory
        </span>
        <span v-if="node.crafted > 0" class="meta-tag">
          <i class="pi pi-cog"></i> Craft {{ node.crafted }} ({{ node.runs }} runs, yields {{ node.yielded }})
        </span>
        <div v-if="node.recipeDetails && node.recipeDetails.length > 0" class="recipe-details">
          <div v-for="(detail, dIdx) in node.recipeDetails" :key="dIdx" class="recipe-detail-item">
            <i class="pi pi-angle-right text-xs"></i> {{ detail.runs }}x runs {{ detail.name }} (yields {{ detail.yielded }})
          </div>
        </div>
        <span v-if="node.gathered > 0" class="meta-tag">
          <i class="pi pi-arrow-down"></i> Gather {{ node.gathered }}
        </span>
      </div>
    </div>
    
    <div v-if="node.children && node.children.length > 0" class="children-list">
      <div class="child-wrapper" v-for="(child, index) in node.children" :key="index">
        <div class="connector"></div>
        <SupplyChainTree :node="child" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.tree-node {
  display: flex;
  flex-direction: column;
  position: relative;
}

.node-content {
  background-color: var(--p-surface-800);
  border: 1px solid var(--p-surface-700);
  padding: 0.75rem 1rem;
  border-radius: var(--p-border-radius);
  margin-bottom: 0.5rem;
  width: fit-content;
  z-index: 2;
  transition: all 0.2s;
}

.node-content:hover {
  border-color: var(--p-primary-500);
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.1);
}

.node-content.is-base {
  background-color: var(--p-surface-900);
  border-color: var(--p-primary-700);
}

.node-content.is-fully-inventory {
  background-color: var(--p-surface-900);
  border-color: var(--p-surface-700);
  opacity: 0.8;
}

.node-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: var(--p-surface-0);
}

.qty {
  color: var(--p-primary-400);
}

.node-meta {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 0.4rem;
}

.meta-tag {
  font-size: 0.8rem;
  color: var(--p-surface-400);
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.meta-tag i {
  font-size: 0.7rem;
}

.recipe-details {
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
  padding-left: 0.5rem;
  border-left: 2px solid var(--p-surface-600);
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.recipe-detail-item {
  font-size: 0.75rem;
  color: var(--p-surface-400);
  display: flex;
  align-items: center;
  gap: 0.2rem;
}

.text-xs {
  font-size: 0.6rem !important;
}

.inventory-badge {
  font-size: 0.75rem;
  background-color: var(--p-primary-900);
  color: var(--p-primary-200);
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  width: fit-content;
}

.inventory-badge i {
  font-size: 0.7rem;
}

.children-list {
  display: flex;
  flex-direction: column;
  padding-left: 2rem;
  position: relative;
}

.child-wrapper {
  position: relative;
  margin-top: 0.25rem;
}

.connector {
  position: absolute;
  left: -1rem;
  top: 1.5rem;
  width: 1rem;
  height: 1px;
  background-color: var(--p-surface-600);
}

.children-list::before {
  content: '';
  position: absolute;
  left: 1rem;
  top: 0;
  bottom: 1.5rem;
  width: 1px;
  background-color: var(--p-surface-600);
}
</style>
