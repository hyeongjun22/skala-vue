<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/configStore'
import axios from 'axios'
import BaseDashboardCard from '../components/BaseDashboardCard.vue'

const router = useRouter()
const configStore = useConfigStore()

const USER_API_KEY = '30985f709248fb2218e4b0910b2e44d9'
const FALLBACK_API_KEY = '8964edc63b366d27b5b728b7976570b7'
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

const cityList = [
  { id: 'city_01', name: '서울', queryName: 'Seoul' },
  { id: 'city_02', name: '수원', queryName: 'Suwon' },
  { id: 'city_03', name: '부산', queryName: 'Busan' },
  { id: 'city_04', name: '제주', queryName: 'Jeju' },
  { id: 'city_05', name: '강릉', queryName: 'Gangneung' },
]

const weatherList = ref([])
const isLoading = ref(false)
const errorMessage = ref('')

const fetchStatsData = async (apiKey) => {
  const requests = cityList.map((city) =>
    axios.get(`${BASE_URL}?q=${city.queryName}&appid=${apiKey}&units=metric&lang=kr`),
  )
  const responses = await Promise.all(requests)
  return responses.map((res, index) => ({
    id: cityList[index].id,
    name: cityList[index].name,
    temp: res.data.main.temp,
    status: res.data.weather[0].description,
    humidity: res.data.main.humidity,
    windSpeed: res.data.wind.speed,
  }))
}

const loadStats = async () => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    weatherList.value = await fetchStatsData(USER_API_KEY)
  } catch {
    try {
      weatherList.value = await fetchStatsData(FALLBACK_API_KEY)
    } catch {
      errorMessage.value = '통계 데이터를 수신하지 못했습니다.'
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadStats()
})

const avgTemp = computed(() => {
  if (weatherList.value.length === 0) return '0.0'
  const sum = weatherList.value.reduce((acc, cur) => acc + cur.temp, 0)
  const rawAvg = sum / weatherList.value.length
  if (configStore.unit === 'fahrenheit') {
    return ((rawAvg * 9) / 5 + 32).toFixed(1)
  }
  return rawAvg.toFixed(1)
})

const highestCity = computed(() => {
  if (weatherList.value.length === 0) return { name: '-', temp: 0 }
  const sorted = [...weatherList.value].sort((a, b) => b.temp - a.temp)
  return sorted[0]
})

const lowestCity = computed(() => {
  if (weatherList.value.length === 0) return { name: '-', temp: 0 }
  const sorted = [...weatherList.value].sort((a, b) => a.temp - b.temp)
  return sorted[0]
})

const sortedList = computed(() => {
  return [...weatherList.value].sort((a, b) => b.temp - a.temp)
})

const handleDetail = (cityId) => {
  router.push('/weather/' + cityId)
}
</script>

<template>
  <div class="stats-container">
    <BaseDashboardCard>
      <h2>📊 전국 실시간 기상 통계 및 랭킹 (OpenWeatherMap)</h2>
      <p class="subtitle">기상청 위성 데이터 기반 전국 실시간 기온 분석 리포트</p>

      <hr />

      <div v-if="isLoading" class="loading-box">
        <p>🌐 전국 기상 통계 데이터를 집계하는 중입니다...</p>
      </div>

      <div v-else-if="errorMessage" class="error-box">
        <p>⚠️ {{ errorMessage }}</p>
        <button class="btn-retry" @click="loadStats">다시 시도</button>
      </div>

      <template v-else>
        <div class="summary-cards">
          <div class="summary-card">
            <span class="label">🌡️ 전국 평균 기온</span>
            <strong class="val">{{ avgTemp }}{{ configStore.unitSymbol }}</strong>
          </div>
          <div class="summary-card hot-card">
            <span class="label">🔥 최고 기온 도시</span>
            <strong class="val">
              {{ highestCity.name }} ({{ configStore.convertTemp(Math.round(highestCity.temp))
              }}{{ configStore.unitSymbol }})
            </strong>
          </div>
          <div class="summary-card cool-card">
            <span class="label">❄️ 최저 기온 도시</span>
            <strong class="val">
              {{ lowestCity.name }} ({{ configStore.convertTemp(Math.round(lowestCity.temp))
              }}{{ configStore.unitSymbol }})
            </strong>
          </div>
        </div>

        <div class="ranking-section">
          <h3>🏆 실시간 기온 순위 랭킹</h3>
          <ul class="ranking-list">
            <li
              v-for="(item, index) in sortedList"
              :key="item.id"
              class="ranking-item"
              @click="handleDetail(item.id)"
            >
              <span class="rank">{{ index + 1 }}위</span>
              <span class="city-name">{{ item.name }} ({{ item.status }})</span>
              <span class="temp"
                >{{ configStore.convertTemp(Math.round(item.temp))
                }}{{ configStore.unitSymbol }}</span
              >
              <button class="btn-sm">상세보기</button>
            </li>
          </ul>
        </div>
      </template>

      <div class="btn-group">
        <button class="btn-home" @click="router.push('/')">🏠 메인 대시보드로 돌아가기</button>
      </div>
    </BaseDashboardCard>
  </div>
</template>

<style scoped>
.stats-container {
  width: 600px;
  margin: 0 auto;
}
h2 {
  margin-top: 0;
  color: #2c3e50;
  font-size: 1.25rem;
}
.subtitle {
  color: #7f8c8d;
  font-size: 14px;
  margin-bottom: 15px;
}
.loading-box {
  text-align: center;
  padding: 40px 10px;
  color: #3498db;
}
.error-box {
  text-align: center;
  padding: 30px 10px;
  color: #e74c3c;
}
.btn-retry {
  padding: 6px 14px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  margin-top: 8px;
}
.summary-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin: 20px 0;
}
.summary-card {
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.summary-card .label {
  font-size: 12px;
  color: #7f8c8d;
}
.summary-card .val {
  font-size: 15px;
  color: #2c3e50;
}
.hot-card {
  border-color: #ff7675;
}
.cool-card {
  border-color: #74b9ff;
}
.ranking-section {
  margin-top: 25px;
}
.ranking-section h3 {
  font-size: 16px;
  color: #2c3e50;
  margin-bottom: 12px;
}
.ranking-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.ranking-item {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  background: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: transform 0.15s ease;
}
.ranking-item:hover {
  transform: translateY(-2px);
  background-color: #f8f9fa;
}
.rank {
  font-weight: bold;
  color: #3498db;
  width: 40px;
}
.city-name {
  flex: 1;
  font-weight: 500;
  color: #2c3e50;
}
.temp {
  font-weight: bold;
  margin-right: 12px;
  color: #e74c3c;
}
.btn-sm {
  padding: 4px 8px;
  font-size: 12px;
  background: #f1f2f6;
  border: 1px solid #ced4da;
  border-radius: 4px;
  cursor: pointer;
}
.btn-group {
  text-align: center;
  margin-top: 25px;
}
.btn-home {
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
}
.btn-home:hover {
  background-color: #2980b9;
}
</style>
