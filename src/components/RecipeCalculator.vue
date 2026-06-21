<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import Dropdown from 'primevue/dropdown'
import InputNumber from 'primevue/inputnumber'
import Card from 'primevue/card'
import Message from 'primevue/message'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import SelectButton from 'primevue/selectbutton'

import { itemsData } from '../data/items'
import { useCraftingStore } from '../stores/craftingStore'
import SupplyChainTree from './SupplyChainTree.vue'
import BaseResourcesSummary from './BaseResourcesSummary.vue'

const store = useCraftingStore()

const {
  cart,
  inventory,
  activePreference,
  cartSearchQuery,
  inventorySearchQuery,
  cartError,
  inventoryError,
  filteredCart,
  filteredInventoryList,
  activePossibility,
  hasAlternatives,
  mergedBaseResources,
  itemsToCraft,
  inventoryList
} = storeToRefs(store)

const {
  removeFromCart,
  updateCartQty,
  toggleCartItemActive,
  removeFromInventory,
  updateInventoryQty
} = store

const itemsOptions = Object.keys(itemsData).map(key => ({
  label: itemsData[key].name,
  value: key,
  isBase: itemsData[key].isBase
}))

// --- Local UI State for inputs ---
const selectedItem = ref('wire')
const quantity = ref(1)

const inventoryItem = ref('wire')
const inventoryQty = ref(1)

const isCartExpanded = ref(false)
const isInventoryExpanded = ref(false)

const deletingItemId = ref(null)

const confirmDeleteInventory = (id) => {
  removeFromInventory(id)
  deletingItemId.value = null
}

const handleAddToCart = () => {
  store.addToCart(selectedItem.value, quantity.value)
}

const handleAddToInventory = () => {
  store.addToInventory(inventoryItem.value, inventoryQty.value)
}

const preferenceOptions = [
  { label: 'Prioritize Ore', value: 'ore' },
  { label: 'Prioritize Nuggets', value: 'nugget' }
]
</script>

<template>
  <div class="calculator">
    
    <div class="top-panels">
      <!-- Crafting List Panel -->
      <Card class="input-card flex-1">
        <template #title>Crafting List</template>
        <template #content>
          <div class="input-group">
            <div class="field">
              <label for="item-select">Item</label>
              <Dropdown 
                id="item-select"
                v-model="selectedItem" 
                :options="itemsOptions" 
                optionLabel="label" 
                optionValue="value" 
                placeholder="Select an Item" 
                :filter="true"
                filterPlaceholder="Search item..."
                class="w-full"
              />
            </div>
            <div class="field">
              <label for="quantity-input">Qty</label>
              <InputNumber 
                id="quantity-input"
                v-model="quantity" 
                inputId="minmax-buttons" 
                mode="decimal" 
                showButtons 
                :min="1" 
                class="w-full"
              />
            </div>
            <div class="field add-btn-field">
              <Button label="Add" icon="pi pi-plus" @click="handleAddToCart" class="w-full add-btn" />
            </div>
          </div>

          <div v-if="cart.length > 0" class="list-section mt-4">
            <div class="table-search-bar" style="padding: 0.5rem 1rem; border-bottom: 1px solid var(--p-surface-800); display: flex; align-items: center; position: relative;">
              <i class="pi pi-search" style="color: var(--p-surface-400); margin-right: 0.5rem; font-size: 0.9rem;"></i>
              <input 
                type="text" 
                v-model="cartSearchQuery" 
                placeholder="Search crafting list..." 
                style="background: transparent; border: none; color: var(--p-surface-50); outline: none; font-size: 0.9rem; width: 100%;"
              />
              <button v-if="cartSearchQuery" @click="cartSearchQuery = ''" style="background: none; border: none; color: var(--p-surface-400); cursor: pointer; padding: 0.25rem;">
                <i class="pi pi-times"></i>
              </button>
            </div>
            
            <div :class="['table-wrapper', { 'is-expanded': isCartExpanded }]">
              <DataTable v-if="filteredCart.length > 0" :value="filteredCart" responsiveLayout="scroll" class="p-datatable-sm">
                <Column headerStyle="width: 3rem; text-align: center" bodyStyle="text-align: center">
                    <template #body="slotProps">
                        <Button 
                          type="button" 
                          :icon="slotProps.data.active !== false ? 'pi pi-eye' : 'pi pi-eye-slash'" 
                          :severity="slotProps.data.active !== false ? 'success' : 'secondary'" 
                          text 
                          rounded 
                          :title="slotProps.data.active !== false ? 'Deactivate item' : 'Activate item'" 
                          aria-label="Toggle Active" 
                          @click="toggleCartItemActive(slotProps.data.id)" 
                        />
                    </template>
                </Column>
                <Column field="name" header="Item">
                    <template #body="slotProps">
                      <span :style="{ opacity: slotProps.data.active !== false ? 1 : 0.5, 'text-decoration': slotProps.data.active !== false ? 'none' : 'line-through' }">
                        {{ slotProps.data.name }}
                      </span>
                    </template>
                </Column>
                <Column header="Quantity">
                    <template #body="slotProps">
                      <div style="display: flex; align-items: center; gap: 0.25rem;" :style="{ opacity: slotProps.data.active !== false ? 1 : 0.5 }">
                        <Button icon="pi pi-minus" text rounded size="small" :disabled="slotProps.data.active === false" @click="updateCartQty(slotProps.data.id, slotProps.data.quantity - 1)" />
                        <InputNumber 
                          :modelValue="slotProps.data.quantity" 
                          :disabled="slotProps.data.active === false"
                          @update:modelValue="val => updateCartQty(slotProps.data.id, val)" 
                          class="qty-input"
                        />
                        <Button icon="pi pi-plus" text rounded size="small" :disabled="slotProps.data.active === false" @click="updateCartQty(slotProps.data.id, slotProps.data.quantity + 1)" />
                      </div>
                    </template>
                </Column>
                <Column headerStyle="width: 3rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
                    <template #body="slotProps">
                        <Button type="button" icon="pi pi-trash" severity="danger" text rounded aria-label="Remove" @click="removeFromCart(slotProps.data.id)" />
                    </template>
                </Column>
              </DataTable>
              <div v-else style="padding: 1.5rem; text-align: center; color: var(--p-surface-500); font-style: italic;">
                No items matching "{{ cartSearchQuery }}"
              </div>
            </div>
            <div v-if="cart.length > 3" class="expand-toggle-wrapper">
              <Button 
                :label="isCartExpanded ? 'Show Less' : 'Show All'" 
                :icon="isCartExpanded ? 'pi pi-chevron-up' : 'pi pi-chevron-down'" 
                severity="secondary" 
                text 
                size="small" 
                @click="isCartExpanded = !isCartExpanded" 
                class="w-full expand-btn"
              />
            </div>
            <Message v-if="cartError" severity="error" size="small" class="mt-2" :closable="true" @close="cartError = ''">{{ cartError }}</Message>
          </div>
          <div v-else class="empty-state mt-4">
            List is empty.
          </div>
        </template>
      </Card>

      <!-- Inventory Panel -->
      <Card class="input-card flex-1">
        <template #title>My Inventory <i class="pi pi-box ml-2"></i></template>
        <template #content>
          <div class="input-group">
            <div class="field">
              <label for="inv-item-select">Item</label>
              <Dropdown 
                id="inv-item-select"
                v-model="inventoryItem" 
                :options="itemsOptions" 
                optionLabel="label" 
                optionValue="value" 
                placeholder="Select an Item" 
                :filter="true"
                filterPlaceholder="Search item..."
                class="w-full"
              />
            </div>
            <div class="field">
              <label for="inv-quantity-input">Qty</label>
              <InputNumber 
                id="inv-quantity-input"
                v-model="inventoryQty" 
                inputId="inv-minmax-buttons" 
                mode="decimal" 
                showButtons 
                :min="1" 
                class="w-full"
              />
            </div>
            <div class="field add-btn-field">
              <Button label="Add" icon="pi pi-plus" severity="secondary" @click="handleAddToInventory" class="w-full add-btn" />
            </div>
          </div>

          <div v-if="inventoryList.length > 0" class="list-section mt-4">
            <div class="table-search-bar" style="padding: 0.5rem 1rem; border-bottom: 1px solid var(--p-surface-800); display: flex; align-items: center; position: relative;">
              <i class="pi pi-search" style="color: var(--p-surface-400); margin-right: 0.5rem; font-size: 0.9rem;"></i>
              <input 
                type="text" 
                v-model="inventorySearchQuery" 
                placeholder="Search inventory..." 
                style="background: transparent; border: none; color: var(--p-surface-50); outline: none; font-size: 0.9rem; width: 100%;"
              />
              <button v-if="inventorySearchQuery" @click="inventorySearchQuery = ''" style="background: none; border: none; color: var(--p-surface-400); cursor: pointer; padding: 0.25rem;">
                <i class="pi pi-times"></i>
              </button>
            </div>
            
            <div :class="['table-wrapper', { 'is-expanded': isInventoryExpanded }]">
              <DataTable v-if="filteredInventoryList.length > 0" :value="filteredInventoryList" responsiveLayout="scroll" class="p-datatable-sm">
                <Column field="name" header="Item"></Column>
                <Column header="Quantity">
                    <template #body="slotProps">
                      <div style="display: flex; align-items: center; gap: 0.25rem; flex-wrap: nowrap;">
                        <Button icon="pi pi-minus" text rounded size="small" @click="updateInventoryQty(slotProps.data.id, (inventory[slotProps.data.id] || 0) - 1)" />
                        <InputNumber 
                          :modelValue="inventory[slotProps.data.id] || 0" 
                          @update:modelValue="val => updateInventoryQty(slotProps.data.id, val)" 
                          class="qty-input"
                        />
                        <Button icon="pi pi-plus" text rounded size="small" @click="updateInventoryQty(slotProps.data.id, (inventory[slotProps.data.id] || 0) + 1)" />
                        
                        <!-- Quota Info -->
                        <span 
                          v-if="slotProps.data.needed > 0"
                          :style="{ color: slotProps.data.isSufficient ? '#34d399' : '#f87171' }" 
                          style="font-weight: bold; font-size: 1.05rem; margin-left: 0.5rem; white-space: nowrap;"
                        >
                          / {{ slotProps.data.needed }}
                        </span>
                      </div>
                    </template>
                </Column>
                <Column headerStyle="width: 6.5rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
                    <template #body="slotProps">
                        <div v-if="deletingItemId === slotProps.data.id" style="display: flex; gap: 0.25rem; justify-content: center; align-items: center;">
                          <Button type="button" icon="pi pi-check" severity="success" text rounded aria-label="Confirm Delete" title="Confirm Delete" @click="confirmDeleteInventory(slotProps.data.id)" />
                          <Button type="button" icon="pi pi-times" severity="secondary" text rounded aria-label="Cancel Delete" title="Cancel Delete" @click="deletingItemId = null" />
                        </div>
                        <Button v-else type="button" icon="pi pi-trash" severity="danger" text rounded aria-label="Remove" title="Remove" @click="deletingItemId = slotProps.data.id" />
                    </template>
                </Column>
              </DataTable>
              <div v-else style="padding: 1.5rem; text-align: center; color: var(--p-surface-500); font-style: italic;">
                No items matching "{{ inventorySearchQuery }}"
              </div>
            </div>
            <div v-if="inventoryList.length > 3" class="expand-toggle-wrapper">
              <Button 
                :label="isInventoryExpanded ? 'Show Less' : 'Show All'" 
                :icon="isInventoryExpanded ? 'pi pi-chevron-up' : 'pi pi-chevron-down'" 
                severity="secondary" 
                text 
                size="small" 
                @click="isInventoryExpanded = !isInventoryExpanded" 
                class="w-full expand-btn"
              />
            </div>
            <Message v-if="inventoryError" severity="error" size="small" class="mt-2" :closable="true" @close="inventoryError = ''">{{ inventoryError }}</Message>
          </div>
          <div v-else class="empty-state mt-4">
            Inventory is empty.
          </div>
        </template>
      </Card>
    </div>

    <div v-if="activePossibility" class="results mt-5">
      <h2 class="results-title">
        <i class="pi pi-sitemap" style="color: var(--p-primary-color)"></i> 
        Combined Supply Chain
      </h2>
      
      <div v-if="hasAlternatives" class="flex justify-content-center mb-4 toggle-bar">
        <SelectButton 
          v-model="activePreference" 
          :options="preferenceOptions" 
          optionLabel="label" 
          optionValue="value" 
        />
      </div>

      <div class="possibility-card">
        <Card>
          <template #title>
            <div class="flex justify-content-between align-items-center w-full">
              <span>Crafting Plan</span>
              <span class="text-sm font-normal text-surface-400" v-if="hasAlternatives" style="color: var(--p-surface-400); font-weight: normal; font-size: 0.85rem;">
                Showing: {{ activePreference === 'ore' ? 'Ore Prioritized' : 'Nugget Prioritized' }}
              </span>
            </div>
          </template>
          <template #content>
            <div class="possibility-layout">
              <div class="tree-section">
                <h3>Crafting Steps</h3>
                <div v-for="(tree, tIdx) in activePossibility.trees" :key="tIdx" class="tree-container">
                  <SupplyChainTree :node="tree" />
                </div>
              </div>
              <div class="summary-section">
                <h3>Required Base Resources</h3>
                <BaseResourcesSummary :resources="mergedBaseResources" />
                <div v-if="mergedBaseResources.length === 0" class="empty-state mt-3">
                  <i class="pi pi-check-circle" style="color: var(--p-primary-500); margin-right: 0.5rem;"></i>
                  You have everything you need in your inventory!
                </div>

                <h3 class="mt-4"><i class="pi pi-cog" style="color: var(--p-primary-color)"></i> Items to Craft</h3>
                <div v-if="itemsToCraft.length > 0" class="crafting-summary">
                  <div v-for="item in itemsToCraft" :key="item.id" class="craft-item">
                    <span class="craft-name">{{ item.name }}</span>
                    <span class="craft-qty">{{ item.quantity }}x</span>
                  </div>
                </div>
                <div v-else class="empty-state mt-2">
                  No items need to be crafted.
                </div>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
    
    <div v-else class="mt-5">
      <Message severity="info">
        <span v-if="cart.length > 0">All items in the crafting list are deactivated. Activate items to see the combined supply chain.</span>
        <span v-else>Add items to your crafting list to see the combined supply chain.</span>
      </Message>
    </div>
  </div>
</template>

<style scoped>
.top-panels {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.flex-1 {
  flex: 1;
  min-width: 350px;
}

.input-card {
  background-color: var(--p-surface-900);
  border: 1px solid var(--p-surface-700);
}

.input-card :deep(.p-card-title) {
  display: flex;
  align-items: center;
}

.ml-2 {
  margin-left: 0.5rem;
}

.input-group {
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  flex-wrap: wrap;
}

.field {
  flex: 1 1 140px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.add-btn-field {
  flex: 1 1 100px;
  min-width: 100px;
}

.add-btn {
  height: 2.5rem;
  width: 100%;
}

.field label {
  color: var(--p-surface-300);
  font-size: 0.9rem;
}

.w-full {
  width: 100%;
}

.mt-4 {
  margin-top: 1.5rem;
}
.mt-5 {
  margin-top: 3rem;
}

.list-section {
  border: 1px solid var(--p-surface-800);
  border-radius: var(--p-border-radius);
  overflow: hidden;
}

.empty-state {
  color: var(--p-surface-500);
  font-style: italic;
  font-size: 0.9rem;
}

.results-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  color: var(--p-surface-0);
}

.possibility-card {
  margin-bottom: 2rem;
}

.possibility-card :deep(.p-card) {
  background-color: var(--p-surface-800);
  border: 1px solid var(--p-surface-700);
}

.possibility-layout {
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
}

.tree-section {
  flex: 2;
  min-width: 300px;
}

.tree-container {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px dashed var(--p-surface-700);
}

.tree-container:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.summary-section {
  flex: 1;
  min-width: 250px;
  background-color: var(--p-surface-900);
  padding: 1.5rem;
  border-radius: var(--p-border-radius);
  border: 1px solid var(--p-surface-700);
}

h3 {
  color: var(--p-surface-100);
  margin-bottom: 1rem;
  font-size: 1.1rem;
  border-bottom: 1px solid var(--p-surface-700);
  padding-bottom: 0.5rem;
}

.qty-input :deep(.p-inputtext) {
  width: 4rem;
  text-align: center;
  padding: 0.4rem;
}

.justify-content-center {
  justify-content: center;
}

.justify-content-between {
  justify-content: space-between;
}

.align-items-center {
  align-items: center;
}

.w-full {
  width: 100%;
}

.mb-4 {
  margin-bottom: 1.5rem;
}

.font-normal {
  font-weight: 400;
}

.crafting-summary {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.craft-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background-color: var(--p-surface-800);
  border: 1px solid var(--p-surface-700);
  border-radius: var(--p-border-radius);
  font-size: 0.95rem;
}

.craft-name {
  color: var(--p-surface-150);
  font-weight: 500;
}

.craft-qty {
  color: var(--p-primary-400);
  font-weight: 700;
}

.table-wrapper {
  max-height: 250px;
  overflow-y: auto;
  transition: max-height 0.3s ease;
}

.table-wrapper.is-expanded {
  max-height: 600px;
}

.expand-toggle-wrapper {
  border-top: 1px solid var(--p-surface-800);
  background-color: var(--p-surface-900);
  display: flex;
  justify-content: center;
}

.expand-btn {
  border-radius: 0 !important;
  width: 100%;
  padding: 0.5rem !important;
}
</style>
