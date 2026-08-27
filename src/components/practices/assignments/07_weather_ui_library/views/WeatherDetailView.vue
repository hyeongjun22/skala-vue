<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/configStore'
import axios from 'axios'
import BaseDashboardCard from '../components/BaseDashboardCard.vue'

const route = useRoute()
const router = useRouter()
const configStore = useConfigStore()

const USER_API_KEY = '30985f709248fb2218e4b0910b2e44d9'
const FALLBACK_API_KEY = '8964edc63b366d27b5b728b7976570b7'
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

const cityMapping = {
  city_01: { queryName: 'Seoul', name: '대한민국 서울특별시' },
  city_02: { queryName: 'Suwon', name: '경기도 수원시' },
  city_03: { queryName: 'Busan', name: '부산광역시' },
  city_04: { queryName: 'Jeju', name: '제주특별자치도' },
  city_05: { queryName: 'Gangneung', name: '강원도 강릉시' },
}

const cityData = ref(null)
const isLoading = ref(false)
const errorMessage = ref('')

const fetchDetail = async (apiKey, queryName, koreanName) => {
  const res = await axios.get(
    `${BASE_URL}?q=${queryName}&appid=${apiKey}&units=metric&lang=kr`,
  )
  const raw = res.data
  cityData.value = {
    name: koreanName,
    temp: raw.main.temp,
    feelsLike: raw.main.feels_like,
    status: raw.weather[0].description,
    icon: raw.weather[0].icon,
    humidity: raw.main.humidity,
    windSpeed: raw.wind.speed,
    pressure: raw.main.pressure,
  }
}

const loadCityData = async () => {
  const cityId = route.params.cityId
  const target = cityMapping[cityId]

  if (!target) {
    errorMessage.value = `도시 ID (${cityId})를 찾을 수 없습니다.`
    return
  }

  isLoading.value = true
  errorMessage.value = ''
  try {
    await fetchDetail(USER_API_KEY, target.queryName, target.name)
  } catch (err) {
    try {
      await fetchDetail(FALLBACK_API_KEY, target.queryName, target.name)
    } catch (fallbackErr) {
      errorMessage.value = '실시간 상세 기상 데이터를 가져오지 못했습니다.'
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadCityData()
})

const displayTemp = computed(() => {
  if (!cityData.value) return 0
  const rawTemp = cityData.value.temp
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return Math.round(rawTemp)
})

const displayFeelsLike = computed(() => {
  if (!cityData.value) return 0
  const rawTemp = cityData.value.feelsLike
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return Math.round(rawTemp)
})

const handleGoBack = () => {
  router.push('/')
}
</script>

<template>
  <div class="detail-container">
    <BaseDashboardCard>
      <div v-if="isLoading" class="loading-state">
        <el-skeleton :rows="6" animated />
      </div>

      <div v-else-if="errorMessage">
        <el-alert :title="errorMessage" type="error" show-icon :closable="false" />
        <div style="margin-top: 15px; text-align: center">
          <el-button type="primary" @click="handleGoBack">메인으로 돌아가기</el-button>
        </div>
      </div>

      <div v-else-if="cityData" class="detail-content">
        <div class="header">
          <h2>📍 {{ cityData.name }}</h2>
          <el-tag :type="cityData.temp >= 25 ? 'danger' : 'primary'" size="large" effect="dark">
            {{ cityData.temp >= 25 ? '🔥 더움' : '❄️ 선선함' }}
          </el-tag>
        </div>

        <div class="main-temp-banner">
          <img
            v-if="cityData.icon"
            :src="`https://openweathermap.org/img/wn/${cityData.icon}@2x.png`"
            :alt="cityData.status"
            class="weather-icon-large"
          />
          <div class="temp-texts">
            <span class="temp-val">{{ displayTemp }}{{ configStore.unitSymbol }}</span>
            <span class="status-val">{{ cityData.status }}</span>
          </div>
        </div>

        <el-descriptions title="📊 상세 관측 지표" :column="2" border style="margin: 20px 0">
          <el-descriptions-item label="🌡️ 체감 기온">
            {{ displayFeelsLike }}{{ configStore.unitSymbol }}
          </el-descriptions-item>
          <el-descriptions-item label="💨 풍속">
            {{ cityData.windSpeed }} m/s
          </el-descriptions-item>
          <el-descriptions-item label="🧭 대기압">
            {{ cityData.pressure }} hPa
          </el-descriptions-item>
          <el-descriptions-item label="☁️ 날씨 상태">
            {{ cityData.status }}
          </el-descriptions-item>
        </el-descriptions>

        <div class="progress-section">
          <span class="progress-label">💧 실시간 습도 지수 ({{ cityData.humidity }}%)</span>
          <el-progress
            :percentage="cityData.humidity"
            :status="cityData.humidity >= 80 ? 'warning' : 'success'"
            :stroke-width="14"
          />
        </div>

        <div class="btn-group">
          <el-button type="primary" size="large" @click="handleGoBack">
            ← 메인 대시보드로 돌아가기
          </el-button>
        </div>
      </div>
    </BaseDashboardCard>
  </div>
</template>

<style scoped>
.detail-container {
  width: 100%;
  margin: 0 auto;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
.header h2 {
  margin: 0;
  color: #303133;
  font-size: 1.35rem;
}
.main-temp-banner {
  display: flex;
  align-items: center;
  gap: 15px;
  background: #f8fafc;
  padding: 12px 18px;
  border-radius: 8px;
  margin-bottom: 20px;
}
.weather-icon-large {
  width: 64px;
  height: 64px;
}
.temp-texts {
  display: flex;
  align-items: baseline;
  gap: 12px;
}
.temp-val {
  font-size: 2.6rem;
  font-weight: 700;
  color: #303133;
}
.status-val {
  font-size: 1.3rem;
  color: #909399;
}
.progress-section {
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.progress-label {
  font-size: 13.5px;
  font-weight: 600;
  color: #606266;
}
.btn-group {
  text-align: center;
  margin-top: 25px;
}
</style>
