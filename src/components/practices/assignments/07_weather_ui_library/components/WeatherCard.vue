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
  <div class="weather-item-card" @click="emit('select-card', cityItem.name)">
    <div class="card-left">
      <img
        v-if="cityItem.icon"
        :src="`https://openweathermap.org/img/wn/${cityItem.icon}.png`"
        :alt="cityItem.status"
        class="weather-icon"
      />
      <div class="card-info">
        <span class="city-name">{{ cityItem.name }} ({{ cityItem.status }})</span>
        <span class="temp-text">현재 기온: <strong>{{ displayTemp }}{{ configStore.unitSymbol }}</strong></span>
      </div>
    </div>

    <div class="card-right">
      <el-tag :type="cityItem.temp >= 25 ? 'danger' : 'primary'" effect="light" size="small">
        {{ cityItem.temp >= 25 ? '🔥 더움' : '❄️ 선선함' }}
      </el-tag>

      <el-button
        type="primary"
        size="small"
        @click.stop="emit('click-detail', cityItem.id)"
      >
        상세보기
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.weather-item-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #ffffff;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.weather-item-card:hover {
  transform: translateY(-2px);
  border-color: #c6e2ff;
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.1);
}
.card-left {
  display: flex;
  align-items: center;
  gap: 10px;
}
.weather-icon {
  width: 36px;
  height: 36px;
}
.card-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.city-name {
  font-weight: 600;
  color: #303133;
  font-size: 15px;
}
.temp-text {
  font-size: 13px;
  color: #606266;
}
.temp-text strong {
  color: #409eff;
}
.card-right {
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>
