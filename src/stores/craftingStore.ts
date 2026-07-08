import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { itemsData } from '../data/items'
import { calculateCartPossibilities, createSmartRegex } from '../utils/calculator'
import type { CartItem } from '../types'

export const useCraftingStore = defineStore('crafting', () => {
  // --- State ---
  const cart = ref<CartItem[]>(JSON.parse(localStorage.getItem('spacecraft-calc-cart') || '[]'))
  const inventory = ref<Record<string, number>>(JSON.parse(localStorage.getItem('spacecraft-calc-inventory') || '{}'))
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
    const query = cartSearchQuery.value.trim()
    try {
      const regex = createSmartRegex(query)
      return cart.value.filter(item => regex.test(item.name))
    } catch (e) {
      const lowerQuery = query.toLowerCase()
      return cart.value.filter(item => item.name.toLowerCase().includes(lowerQuery))
    }
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
        id: 'titanium_alt',
        name: 'Titanium Ore or Titanium Nugget',
        items: ['titanium_ore', 'titanium_nugget']
      },
      {
        id: 'aluminum_alt',
        name: 'Aluminum Ore or Aluminum Nugget',
        items: ['aluminium_ore', 'aluminium_nugget']
      },
      {
        id: 'diamond_alt',
        name: 'Diamond or Pyrite',
        items: ['diamond', 'pyrite']
      },
      {
        id: 'crystal_lattice_m_alt',
        name: 'Azurite Stone or Malachite Stone',
        items: ['azurite_stone', 'malachite_stone']
      }
    ]

    // Group alternative options
    for (const group of ALTERNATIVE_GROUPS) {
      const itemA = group.items[0]
      const itemB = group.items[1]

      const qtyA = oreRes[itemA as string] || 0
      const qtyB = nuggetRes[itemB as string] || 0

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

  const accumulateCraftedItems = (node: any, accumulated: Record<string, number> = {}) => {
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
    
    const accumulated: Record<string, number> = {}
    for (const tree of activePossibility.value.trees) {
      accumulateCraftedItems(tree, accumulated)
    }

    const totalAccumulated: Record<string, number> = {}
    if (activeCart.value.length > 0) {
      try {
        const noInvPossibilities = calculateCartPossibilities(activeCart.value, itemsData, {}, activePreference.value)
        const noInvPossibility = noInvPossibilities[0]
        if (noInvPossibility && noInvPossibility.trees) {
          for (const tree of noInvPossibility.trees) {
            accumulateCraftedItems(tree, totalAccumulated)
          }
        }
      } catch (e) {
        console.error(e)
      }
    }
    
    // Sort nodes alphabetically by name initially for a stable order
    const nodes = Object.keys(totalAccumulated).sort((a, b) => {
      const nameA = itemsData[a]?.name || a
      const nameB = itemsData[b]?.name || b
      return nameA.localeCompare(nameB)
    })
    
    const visited = new Set<string>()
    const temp = new Set<string>()
    const sortedIds: string[] = []
    
    const visit = (id: string) => {
      if (temp.has(id)) return // Circular dependency guard
      if (visited.has(id)) return
      
      temp.add(id)
      
      const item = itemsData[id]
      if (item && item.recipes) {
        const inputs = new Set<string>()
        for (const recipe of item.recipes) {
          if (recipe.inputs) {
            for (const inputId of Object.keys(recipe.inputs)) {
              inputs.add(inputId)
            }
          }
        }
        
        for (const inputId of inputs) {
          if (totalAccumulated[inputId] !== undefined) {
            visit(inputId)
          }
        }
      }
      
      temp.delete(id)
      visited.add(id)
      sortedIds.push(id)
    }
    
    for (const id of nodes) {
      visit(id)
    }
    
    const activeList = []
    
    for (const key of sortedIds) {
      const qty = accumulated[key] || 0
      const total = totalAccumulated[key] || qty
      activeList.push({
        id: key,
        name: itemsData[key]?.name || key,
        quantity: qty,
        total: total
      })
    }

    const remainingItems = activeList.filter(item => item.quantity > 0)
    const completedItems = activeList.filter(item => item.quantity === 0)
    
    return [...remainingItems, ...completedItems]
  })

  const inventoryList = computed(() => {
    const itemIds = new Set(Object.keys(inventory.value))
    
    let needed: Record<string, number> = {}
    if (activeCart.value.length > 0) {
      try {
        const result = calculateCartPossibilities(activeCart.value, itemsData, inventory.value, activePreference.value)
        const possibility = result[0]
        if (possibility && possibility.trees) {
          const collectNeeded = (node: any) => {
            if (!node) return
            needed[node.id] = (needed[node.id] || 0) + node.quantity
            if (node.children) {
              for (const child of node.children) {
                collectNeeded(child)
              }
            }
          }
          for (const tree of possibility.trees) {
            collectNeeded(tree)
          }
        }
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
    const query = inventorySearchQuery.value.trim()
    try {
      const regex = createSmartRegex(query)
      return inventoryList.value.filter(item => regex.test(item.name))
    } catch (e) {
      const lowerQuery = query.toLowerCase()
      return inventoryList.value.filter(item => item.name.toLowerCase().includes(lowerQuery))
    }
  })

  // --- Actions ---
  const getRequiredItems = (itemId: string, visited = new Set<string>()) => {
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

  const addToCart = (selectedItem: any, quantity: number) => {
    const itemId = (selectedItem && typeof selectedItem === 'object') ? selectedItem.value : selectedItem
    if (itemId && quantity > 0) {
      const item = itemsData[itemId]
      if (!item) {
        console.warn(`Item with ID "${itemId}" not found in database.`, selectedItem)
        return
      }


      const existing = cart.value.find(i => i.id === itemId)
      if (existing) {
        existing.quantity += quantity
        existing.active = true
      } else if (itemId) {
        cart.value.push({ id: itemId, name: item.name, quantity: quantity, active: true })
      }

      // Add selected item and all recursive dependencies to inventory with 0 if not present
      const reqItems = getRequiredItems(itemId)
      for (const reqId of reqItems) {
        if (inventory.value[reqId] === undefined) {
          inventory.value[reqId] = 0
        }
      }

      // Remove the base items (recipe inputs) used to craft it from the inventory
      if (item.recipes && item.recipes.length > 0) {
        let recipe = item.recipes[0]
        if (activePreference.value) {
          const prefIdx = item.recipes.findIndex(r => r.id.includes(activePreference.value))
          if (prefIdx !== -1) {
            recipe = item.recipes[prefIdx]
          }
        }

        if (recipe && recipe.inputs) {
          const runs = Math.ceil(quantity / recipe.yield)
          for (const [inputId, qtyPerRun] of Object.entries(recipe.inputs)) {
            const requiredQty = qtyPerRun * runs
            const currentQty = inventory.value[inputId] || 0
            inventory.value[inputId] = Math.max(0, currentQty - requiredQty)
          }
        }
      }

      inventory.value = { ...inventory.value }
    }
  }

  const removeFromCart = (id: string) => {
    cart.value = cart.value.filter(item => item.id !== id)
  }

  const updateCartQty = (id: string | number, newQty: number) => {
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

  const toggleCartItemActive = (id: string | number) => {
    const item = cart.value.find(i => i.id === id)
    if (item) {
      item.active = item.active === false ? true : false
    }
  }

  const addToInventory = (inventoryItem: any, inventoryQty: number) => {
    const itemId = (inventoryItem && typeof inventoryItem === 'object') ? inventoryItem.value : inventoryItem
    if (itemId && inventoryQty > 0) {
      const item = itemsData[itemId]
      if (!item) {
        console.warn(`Item with ID "${itemId}" not found in database.`, inventoryItem)
        return
      }

      inventory.value[itemId] = (inventory.value[itemId] || 0) + inventoryQty

      // Add all recursive dependencies to inventory with 0 if not present
      const reqItems = getRequiredItems(itemId)
      for (const reqId of reqItems) {
        if (inventory.value[reqId] === undefined) {
          inventory.value[reqId] = 0
        }
      }
      inventory.value = { ...inventory.value }
    }
  }

  const removeFromInventory = (itemId: string) => {
    delete inventory.value[itemId]
  }

  const updateInventoryQty = (itemId: string, newQty: number) => {
    if (newQty === null) return
    if (newQty < 0) {
      inventoryError.value = "Quantity cannot be negative."
      inventory.value[itemId] = 0
      return
    }
    inventoryError.value = ''
    inventory.value[itemId] = newQty
  }

  const clearInventory = () => {
    inventory.value = {}
  }

  const markCartItemCompleted = (id: string) => {
    const item = cart.value.find(i => i.id === id)
    if (item) {
      const currentQty = inventory.value[item.id] || 0
      const diff = currentQty - item.quantity
      inventory.value[item.id] = (currentQty === 0 || diff < 0) ? 0 : diff
      removeFromCart(item.id)
    }
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
    updateInventoryQty,
    clearInventory,
    markCartItemCompleted
  }
})
