<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore'

const props = defineProps({
  cityItem: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['select-card', 'click-detail'])

const configStore = useConfigStore()

const displayTemp = computed(() => {
  const rawTemp = props.cityItem.temp
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return Math.round(rawTemp)
})
</script>

<template>
  <div class="weather-card" @click="emit('select-card', cityItem.name)">
    <div class="card-header">
      <h4>{{ cityItem.name }} ({{ cityItem.status }})</h4>
      <img
        v-if="cityItem.icon"
        :src="`https://openweathermap.org/img/wn/${cityItem.icon}.png`"
        :alt="cityItem.status"
        class="weather-icon"
      />
    </div>
    <p>현재 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>

    <span v-if="cityItem.temp >= 25" class="badge hot">🔥 더움</span>
    <span v-else class="badge cool">❄️ 선선함</span>

    <button class="btn-detail" @click.stop="emit('click-detail', cityItem.id)">상세보기</button>
  </div>
</template>

<style scoped>
.weather-card {
  background: #fff;
  border: 1px solid #dee2e6;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}
.weather-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
.card-header {
  display: flex;
  align-items: center;
  gap: 6px;
}
h4 {
  margin: 0;
  color: #2c3e50;
}
.weather-icon {
  width: 32px;
  height: 32px;
}
p {
  margin: 6px 0 8px 0;
  font-size: 14px;
  color: #555;
}
.badge {
  display: inline-block;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 4px;
  color: #fff;
}
.hot {
  background-color: #ff7675;
}
.cool {
  background-color: #74b9ff;
}
.btn-detail {
  position: absolute;
  right: 12px;
  top: 15px;
  padding: 6px 10px;
  cursor: pointer;
  background-color: #f1f2f6;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 12px;
}
.btn-detail:hover {
  background-color: #e4e7ea;
}
</style>
