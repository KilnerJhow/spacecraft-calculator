import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { itemsData } from '../data/items'
import { calculateCartPossibilities } from '../utils/calculator'

export const useCraftingStore = defineStore('crafting', () => {
  // --- State ---
  const cart = ref(JSON.parse(localStorage.getItem('spacecraft-calc-cart')) || [])
  const inventory = ref(JSON.parse(localStorage.getItem('spacecraft-calc-inventory')) || {})
  const activePreference = ref('ore')
  const cartSearchQuery = ref('')
  const inventorySearchQuery = ref('')
  const cartError = ref('')
  const inventoryError = ref('')

  // Watch state changes to persist to localStorage
  watch(cart, (newVal) => {
    localStorage.setItem('spacecraft-calc-cart', JSON.stringify(newVal))
  }, { deep: true })

  watch(inventory, (newVal) => {
    localStorage.setItem('spacecraft-calc-inventory', JSON.stringify(newVal))
  }, { deep: true })

  // --- Getters (Computed) ---
  const activeCart = computed(() => {
    return cart.value.filter(item => item.active !== false)
  })

  const filteredCart = computed(() => {
    if (!cartSearchQuery.value.trim()) return cart.value
    const query = cartSearchQuery.value.toLowerCase().trim()
    return cart.value.filter(item => item.name.toLowerCase().includes(query))
  })

  const possibilityOre = computed(() => {
    if (activeCart.value.length === 0) return null
    try {
      const res = calculateCartPossibilities(activeCart.value, itemsData, inventory.value, 'ore')
      return res[0] || null
    } catch (e) {
      console.error(e)
      return null
    }
  })

  const possibilityNugget = computed(() => {
    if (activeCart.value.length === 0) return null
    try {
      const res = calculateCartPossibilities(activeCart.value, itemsData, inventory.value, 'nugget')
      return res[0] || null
    } catch (e) {
      console.error(e)
      return null
    }
  })

  const activePossibility = computed(() => {
    return activePreference.value === 'ore' ? possibilityOre.value : possibilityNugget.value
  })

  const hasAlternatives = computed(() => {
    if (!possibilityOre.value || !possibilityNugget.value) return false
    return JSON.stringify(possibilityOre.value.baseResources) !== JSON.stringify(possibilityNugget.value.baseResources)
  })

  const mergedBaseResources = computed(() => {
    const oreRes = possibilityOre.value?.baseResources || {}
    const nuggetRes = possibilityNugget.value?.baseResources || {}
    const list = []
    const processedItems = new Set()

    const ALTERNATIVE_GROUPS = [
      {
        id: 'copper_alt',
        name: 'Copper Ore or Copper Nugget',
        items: ['copper_ore', 'copper_nugget']
      },
      {
        id: 'iron_alt',
        name: 'Iron Ore or Iron Nugget',
        items: ['iron_ore', 'iron_nugget']
      },
      {
        id: 'aluminum_alt',
        name: 'Aluminum Ore or Aluminum Nugget',
        items: ['aluminum_ore', 'aluminum_nugget']
      }
    ]

    // Group alternative options
    for (const group of ALTERNATIVE_GROUPS) {
      const itemA = group.items[0]
      const itemB = group.items[1]

      const qtyA = oreRes[itemA] || 0
      const qtyB = nuggetRes[itemB] || 0

      if (qtyA > 0 || qtyB > 0) {
        list.push({
          id: group.id,
          isAlternative: true,
          name: group.name,
          optionA: { id: itemA, name: itemsData[itemA].name, quantity: qtyA },
          optionB: { id: itemB, name: itemsData[itemB].name, quantity: qtyB }
        })
        processedItems.add(itemA)
        processedItems.add(itemB)
      }
    }

    // Add all other non-alternative resources
    const allKeys = new Set([...Object.keys(oreRes), ...Object.keys(nuggetRes)])
    for (const key of allKeys) {
      if (processedItems.has(key)) continue

      const qty = oreRes[key] || nuggetRes[key] || 0
      if (qty > 0) {
        list.push({
          id: key,
          isAlternative: false,
          name: itemsData[key]?.name || key,
          quantity: qty
        })
      }
    }

    return list
  })

  const accumulateCraftedItems = (node, accumulated = {}) => {
    if (!node) return accumulated
    
    if (!node.isBase && node.crafted > 0) {
      const qty = node.yielded !== undefined ? node.yielded : node.crafted
      accumulated[node.id] = (accumulated[node.id] || 0) + qty
    }
    
    if (node.children) {
      for (const child of node.children) {
        accumulateCraftedItems(child, accumulated)
      }
    }
    
    return accumulated
  }

  const itemsToCraft = computed(() => {
    if (!activePossibility.value) return []
    
    const accumulated = {}
    for (const tree of activePossibility.value.trees) {
      accumulateCraftedItems(tree, accumulated)
    }
    
    return Object.keys(accumulated).map(key => ({
      id: key,
      name: itemsData[key]?.name || key,
      quantity: accumulated[key]
    })).sort((a, b) => b.quantity - a.quantity)
  })

  const inventoryList = computed(() => {
    const itemIds = new Set(Object.keys(inventory.value))
    
    let needed = {}
    if (activeCart.value.length > 0) {
      try {
        const result = calculateCartPossibilities(activeCart.value, itemsData, {}, activePreference.value)
        needed = result[0]?.baseResources || {}
      } catch (e) {
        console.error(e)
      }
    }

    for (const itemId of Object.keys(needed)) {
      itemIds.add(itemId)
    }

    return Array.from(itemIds).map(key => {
      const currentQty = inventory.value[key] || 0
      const neededQty = needed[key] || 0
      return {
        id: key,
        name: itemsData[key]?.name || key,
        quantity: currentQty,
        needed: neededQty,
        isSufficient: currentQty >= neededQty
      }
    })
  })

  const filteredInventoryList = computed(() => {
    if (!inventorySearchQuery.value.trim()) return inventoryList.value
    const query = inventorySearchQuery.value.toLowerCase().trim()
    return inventoryList.value.filter(item => item.name.toLowerCase().includes(query))
  })

  // --- Actions ---
  const getRequiredItems = (itemId, visited = new Set()) => {
    if (visited.has(itemId)) return visited
    visited.add(itemId)
    const item = itemsData[itemId]
    if (item && item.recipes) {
      for (const recipe of item.recipes) {
        if (recipe.inputs) {
          for (const inputId of Object.keys(recipe.inputs)) {
            getRequiredItems(inputId, visited)
          }
        }
      }
    }
    return visited
  }

  const addToCart = (selectedItem, quantity) => {
    if (selectedItem && quantity > 0) {
      const existing = cart.value.find(i => i.itemId === selectedItem)
      if (existing) {
        existing.quantity += quantity
        existing.active = true
      } else {
        cart.value.push({
          id: Date.now(),
          itemId: selectedItem,
          name: itemsData[selectedItem].name,
          quantity: quantity,
          active: true
        })
      }

      // Add selected item and all recursive dependencies to inventory with 0 if not present
      const reqItems = getRequiredItems(selectedItem)
      for (const itemId of reqItems) {
        if (inventory.value[itemId] === undefined) {
          inventory.value[itemId] = 0
        }
      }
      inventory.value = { ...inventory.value }
    }
  }

  const removeFromCart = (id) => {
    cart.value = cart.value.filter(item => item.id !== id)
  }

  const updateCartQty = (id, newQty) => {
    if (newQty === null) return
    if (newQty < 1) {
      cartError.value = "Quantity must be at least 1."
      const item = cart.value.find(i => i.id === id)
      if (item) item.quantity = 1
      return
    }
    cartError.value = ''
    const item = cart.value.find(i => i.id === id)
    if (item) {
      item.quantity = newQty
    }
  }

  const toggleCartItemActive = (id) => {
    const item = cart.value.find(i => i.id === id)
    if (item) {
      item.active = item.active === false ? true : false
    }
  }

  const addToInventory = (inventoryItem, inventoryQty) => {
    if (inventoryItem && inventoryQty > 0) {
      inventory.value[inventoryItem] = (inventory.value[inventoryItem] || 0) + inventoryQty

      // Add all recursive dependencies to inventory with 0 if not present
      const reqItems = getRequiredItems(inventoryItem)
      for (const itemId of reqItems) {
        if (inventory.value[itemId] === undefined) {
          inventory.value[itemId] = 0
        }
      }
      inventory.value = { ...inventory.value }
    }
  }

  const removeFromInventory = (itemId) => {
    delete inventory.value[itemId]
  }

  const updateInventoryQty = (itemId, newQty) => {
    if (newQty === null) return
    if (newQty < 0) {
      inventoryError.value = "Quantity cannot be negative."
      inventory.value[itemId] = 0
      return
    }
    inventoryError.value = ''
    inventory.value[itemId] = newQty
  }

  return {
    cart,
    inventory,
    activePreference,
    cartSearchQuery,
    inventorySearchQuery,
    cartError,
    inventoryError,
    activeCart,
    filteredCart,
    possibilityOre,
    possibilityNugget,
    activePossibility,
    hasAlternatives,
    mergedBaseResources,
    itemsToCraft,
    inventoryList,
    filteredInventoryList,
    addToCart,
    removeFromCart,
    updateCartQty,
    toggleCartItemActive,
    addToInventory,
    removeFromInventory,
    updateInventoryQty
  }
})
