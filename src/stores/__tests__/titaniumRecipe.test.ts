import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { itemsData } from '../../data/items'
import { calculatePossibilities } from '../../utils/calculator'
import { useCraftingStore } from '../craftingStore'

describe('Titanium Nugget recipe for Titanium Ingot', () => {
  beforeEach(() => {
    // mock localStorage if undefined
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

  it('should find the ore recipe and the nugget recipe for Titanium Ingot', () => {
    const titaniumIngot = itemsData['titanium_ingot']
    expect(titaniumIngot).toBeDefined()
    expect(titaniumIngot.recipes).toBeDefined()
    expect(titaniumIngot.recipes!).toHaveLength(2)

    const oreRecipe = titaniumIngot.recipes!.find(r => r.id === 'titanium_ingot_recipe')
    expect(oreRecipe).toBeDefined()
    expect(oreRecipe?.yield).toBe(1)
    expect(oreRecipe?.inputs).toEqual({ titanium_ore: 2 })

    const nuggetRecipe = titaniumIngot.recipes!.find(r => r.id === 'titanium_ingot_from_nugget')
    expect(nuggetRecipe).toBeDefined()
    expect(nuggetRecipe?.yield).toBe(1)
    expect(nuggetRecipe?.inputs).toEqual({ titanium_nugget: 4 })
  })

  it('should correctly calculate resources using nugget preference', () => {
    // Calculate recipe possibilities with preference 'nugget'
    const results = calculatePossibilities('titanium_ingot', 2, itemsData, {}, 'nugget')
    expect(results).toHaveLength(1)
    
    // We expect exactly 8 titanium nugget to yield 2 titanium ingot
    expect(results[0].baseResources).toEqual({ titanium_nugget: 8 })
  })

  it('should list alternative recipes in the store when Titanium Ingot is in the cart', () => {
    const store = useCraftingStore()
    
    // Add Titanium Ingot to cart
    store.addToCart('titanium_ingot', 2)
    
    // Check if the store correctly identifies that alternative recipes exist
    expect(store.hasAlternatives).toBe(true)
  })
})
