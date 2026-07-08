import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { itemsData } from '../../data/items'
import { calculatePossibilities } from '../../utils/calculator'
import { useCraftingStore } from '../craftingStore'

describe('Pyrite recipe for c-Crystal Matrix', () => {
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

  it('should find the diamond recipe and the pyrite recipe for c-Crystal Matrix', () => {
    const matrix = itemsData['crystal_lattice_c']
    expect(matrix).toBeDefined()
    expect(matrix.recipes).toBeDefined()
    expect(matrix.recipes!).toHaveLength(2)

    const diamondRecipe = matrix.recipes!.find(r => r.id === 'crystal_lattice_c_recipe')
    expect(diamondRecipe).toBeDefined()
    expect(diamondRecipe?.yield).toBe(130)
    expect(diamondRecipe?.inputs).toEqual({ diamond: 1 })

    const pyriteRecipe = matrix.recipes!.find(r => r.id === 'crystal_lattice_c_from_pyrite')
    expect(pyriteRecipe).toBeDefined()
    expect(pyriteRecipe?.yield).toBe(3)
    expect(pyriteRecipe?.inputs).toEqual({ pyrite: 1 })
  })

  it('should correctly calculate resources using pyrite preference', () => {
    // Calculate recipe possibilities with preference 'pyrite'
    const results = calculatePossibilities('crystal_lattice_c', 3, itemsData, {}, 'pyrite')
    expect(results).toHaveLength(1)
    
    // We expect exactly 1 pyrite to yield 3 c-Crystal Matrix
    expect(results[0].baseResources).toEqual({ pyrite: 1 })
  })

  it('should list Diamond and Pyrite as alternatives in the store when c-Crystal Matrix is in the cart', () => {
    const store = useCraftingStore()
    
    // Add c-Crystal Matrix to cart
    store.addToCart('crystal_lattice_c', 3)
    
    // Check if the store correctly identifies that alternative recipes exist
    expect(store.hasAlternatives).toBe(true)

    // The merged base resources should group Diamond and Pyrite
    const alternativeResource = store.mergedBaseResources.find(r => r.id === 'diamond_alt')
    expect(alternativeResource).toBeDefined()
    expect(alternativeResource?.isAlternative).toBe(true)
    expect(alternativeResource?.optionA).toEqual({ id: 'diamond', name: 'Diamond', quantity: 1 })
    expect(alternativeResource?.optionB).toEqual({ id: 'pyrite', name: 'Pyrite', quantity: 1 })
  })
})
