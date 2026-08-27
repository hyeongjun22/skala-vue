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
      <div v-if="isLoading" class="loading-box">
        <p>🌐 위성 서버로부터 실시간 상세 기상 관측 데이터를 수신 중입니다...</p>
      </div>

      <div v-else-if="errorMessage" class="error-box">
        <p>⚠️ {{ errorMessage }}</p>
        <button class="btn-back" @click="handleGoBack">메인으로 돌아가기</button>
      </div>

      <div v-else-if="cityData" class="detail-content">
        <div class="header">
          <h2>📍 {{ cityData.name }} 상세 기상정보</h2>
          <span v-if="cityData.temp >= 25" class="badge hot">🔥 더움</span>
          <span v-else class="badge cool">❄️ 선선함</span>
        </div>

        <div class="main-temp">
          <img
            v-if="cityData.icon"
            :src="`https://openweathermap.org/img/wn/${cityData.icon}@2x.png`"
            :alt="cityData.status"
            class="weather-icon-large"
          />
          <span class="temp-val">{{ displayTemp }}{{ configStore.unitSymbol }}</span>
          <span class="status-val">{{ cityData.status }}</span>
        </div>

        <hr />

        <div class="grid-info">
          <div class="info-card">
            <span class="label">🌡️ 체감 기온</span>
            <strong class="val">{{ displayFeelsLike }}{{ configStore.unitSymbol }}</strong>
          </div>
          <div class="info-card">
            <span class="label">💧 습도</span>
            <strong class="val">{{ cityData.humidity }}%</strong>
          </div>
          <div class="info-card">
            <span class="label">💨 풍속</span>
            <strong class="val">{{ cityData.windSpeed }} m/s</strong>
          </div>
          <div class="info-card">
            <span class="label">🧭 기압</span>
            <strong class="val">{{ cityData.pressure }} hPa</strong>
          </div>
        </div>

        <div class="btn-group">
          <button class="btn-back" @click="handleGoBack">← 대시보드로 돌아가기</button>
        </div>
      </div>
    </BaseDashboardCard>
  </div>
</template>

<style scoped>
.detail-container {
  width: 600px;
  margin: 0 auto;
}
.loading-box {
  text-align: center;
  padding: 40px 10px;
  color: #3498db;
  font-weight: 500;
}
.error-box {
  text-align: center;
  padding: 30px 10px;
  color: #e74c3c;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.header h2 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.3rem;
}
.main-temp {
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 10px 0;
}
.weather-icon-large {
  width: 64px;
  height: 64px;
}
.temp-val {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
}
.status-val {
  font-size: 1.3rem;
  color: #7f8c8d;
}
.badge {
  display: inline-block;
  padding: 5px 10px;
  font-size: 13px;
  border-radius: 4px;
  color: #fff;
  font-weight: bold;
}
.hot {
  background-color: #ff7675;
}
.cool {
  background-color: #74b9ff;
}
.grid-info {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin: 20px 0;
}
.info-card {
  background: #ffffff;
  border: 1px solid #e9ecef;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.info-card .label {
  font-size: 12px;
  color: #888;
}
.info-card .val {
  font-size: 14px;
  color: #2c3e50;
}
.btn-group {
  text-align: center;
  margin-top: 15px;
}
.btn-back {
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  transition: background-color 0.2s;
}
.btn-back:hover {
  background-color: #2980b9;
}
</style>
