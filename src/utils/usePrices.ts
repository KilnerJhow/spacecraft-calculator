import { ref, watch } from 'vue'
import { itemsData } from '../data/items'

const customPrices = ref<Record<string, number>>({})

// Initialize from localStorage
const savedPrices = localStorage.getItem('spacecraft_calculator_prices')
if (savedPrices) {
  try {
    customPrices.value = JSON.parse(savedPrices)
  } catch (e) {
    console.error('Failed to parse saved prices')
  }
}

// Watch for changes and save to localStorage
watch(customPrices, (newPrices) => {
  localStorage.setItem('spacecraft_calculator_prices', JSON.stringify(newPrices))
}, { deep: true })

export function usePrices() {
  const getPrice = (itemId: string): number => {
    if (customPrices.value[itemId] !== undefined) {
      return customPrices.value[itemId]
    }
    return itemsData[itemId]?.basePrice || 0
  }

  const setPrice = (itemId: string, price: number) => {
    customPrices.value[itemId] = price
  }

  return {
    customPrices,
    getPrice,
    setPrice
  }
}
