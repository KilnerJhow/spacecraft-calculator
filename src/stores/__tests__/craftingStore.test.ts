import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCraftingStore } from '../craftingStore'

describe('craftingStore', () => {
  beforeEach(() => {
    // mock localStorage if undefined (just in case we run in node environment without window)
    if (typeof window === 'undefined' || !window.localStorage) {
      const store: Record<string, string> = {}
      ;(globalThis as any).localStorage = {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => { store[key] = value },
        removeItem: (key: string) => { delete store[key] },
        clear: () => { for (const key in store) delete store[key] },
        length: 0,
        key: (index: number) => Object.keys(store)[index] || null
      }
    } else {
      localStorage.clear()
    }
    setActivePinia(createPinia())
  })

  it('does not activate other items when adding an item to the crafting list', () => {
    const store = useCraftingStore()
    
    // Add first item and make it active (default)
    store.addToCart('wire', 1)
    expect(store.cart).toHaveLength(1)
    expect(store.cart[0].id).toBe('wire')
    expect(store.cart[0].active).toBe(true)

    // Deactivate the first item
    store.toggleCartItemActive('wire')
    expect(store.cart[0].active).toBe(false)

    // Add a second item
    store.addToCart('copper_ingot', 2)
    expect(store.cart).toHaveLength(2)

    // Verify the first item remains deactivated (false)
    const wireItem = store.cart.find(i => i.id === 'wire')
    expect(wireItem?.active).toBe(false)

    // Verify the second item is activated (true)
    const copperItem = store.cart.find(i => i.id === 'copper_ingot')
    expect(copperItem?.active).toBe(true)
  })

  it('correctly tracks itemsToCraft quantity and total when inventory changes', () => {
    const store = useCraftingStore()
    
    // Add 4 wire to cart
    store.addToCart('wire', 4)
    
    // With empty inventory, we expect wire (remaining: 4, total: 4) and copper_ingot (remaining: 1, total: 1)
    expect(store.itemsToCraft).toHaveLength(2)
    
    const wireCraftBefore = store.itemsToCraft.find(i => i.id === 'wire')
    const ingotCraftBefore = store.itemsToCraft.find(i => i.id === 'copper_ingot')
    
    expect(wireCraftBefore).toEqual({ id: 'wire', name: 'Wire', quantity: 4, total: 4 })
    expect(ingotCraftBefore).toEqual({ id: 'copper_ingot', name: 'Copper Ingot', quantity: 1, total: 1 })
    
    // Now add 1 copper_ingot to inventory
    store.addToInventory('copper_ingot', 1)
    
    // We expect wire (remaining: 4, total: 4) and copper_ingot (remaining: 0, total: 1)
    // The copper_ingot is completed, so it is sorted to the bottom
    expect(store.itemsToCraft).toHaveLength(2)
    
    const wireCraftAfter = store.itemsToCraft.find(i => i.id === 'wire')
    const ingotCraftAfter = store.itemsToCraft.find(i => i.id === 'copper_ingot')
    
    expect(wireCraftAfter).toEqual({ id: 'wire', name: 'Wire', quantity: 4, total: 4 })
    expect(ingotCraftAfter).toEqual({ id: 'copper_ingot', name: 'Copper Ingot', quantity: 0, total: 1 })
    
    // The completed item should be at the bottom (index 1)
    expect(store.itemsToCraft[0].id).toBe('wire')
    expect(store.itemsToCraft[1].id).toBe('copper_ingot')
  })
})
