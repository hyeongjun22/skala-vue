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

const weatherThemeClass = computed(() => {
  const status = props.cityItem.status || ''
  const temp = props.cityItem.temp

  if (status.includes('비') || status.includes('소나기')) {
    return 'theme-rain'
  }
  if (temp >= 28) {
    return 'theme-hot'
  }
  if (temp <= 22) {
    return 'theme-cool'
  }
  if (status.includes('구름') || status.includes('흐림')) {
    return 'theme-cloud'
  }
  return 'theme-clear'
})
</script>

<template>
  <div
    class="weather-item-card"
    :class="weatherThemeClass"
    @click="emit('select-card', cityItem.name)"
  >
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
  transition: all 0.25s ease;
}
.theme-hot {
  border-left: 5px solid #f87171;
}
.theme-hot:hover {
  border-color: #fca5a5;
  box-shadow: 0 4px 14px rgba(239, 68, 68, 0.15);
  transform: translateY(-2px);
}
.theme-cool {
  border-left: 5px solid #60a5fa;
}
.theme-cool:hover {
  border-color: #93c5fd;
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.15);
  transform: translateY(-2px);
}
.theme-rain {
  border-left: 5px solid #3b82f6;
}
.theme-rain:hover {
  border-color: #60a5fa;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.15);
  transform: translateY(-2px);
}
.theme-cloud {
  border-left: 5px solid #94a3b8;
}
.theme-cloud:hover {
  border-color: #cbd5e1;
  box-shadow: 0 4px 14px rgba(100, 116, 139, 0.15);
  transform: translateY(-2px);
}
.theme-clear {
  border-left: 5px solid #fbbf24;
}
.theme-clear:hover {
  border-color: #fde68a;
  box-shadow: 0 4px 14px rgba(245, 158, 11, 0.15);
  transform: translateY(-2px);
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
