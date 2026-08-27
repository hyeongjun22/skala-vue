import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useConfigStore = defineStore('config', () => {
  const unit = ref('celsius')

  const unitSymbol = computed(() => {
    return unit.value === 'celsius' ? '℃' : '℉'
  })

  function toggleUnit() {
    unit.value = unit.value === 'celsius' ? 'fahrenheit' : 'celsius'
  }

  function convertTemp(celsiusTemp) {
    if (unit.value === 'fahrenheit') {
      return Math.round((celsiusTemp * 9) / 5 + 32)
    }
    return celsiusTemp
  }

  return { unit, unitSymbol, toggleUnit, convertTemp }
})
