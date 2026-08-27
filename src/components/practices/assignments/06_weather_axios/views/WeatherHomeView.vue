<script setup>
import { ref, computed, watch, watchEffect, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import BaseDashboardCard from '../components/BaseDashboardCard.vue'
import SearchBar from '../components/SearchBar.vue'
import WeatherCard from '../components/WeatherCard.vue'

const router = useRouter()

const USER_API_KEY = '30985f709248fb2218e4b0910b2e44d9'
const FALLBACK_API_KEY = '8964edc63b366d27b5b728b7976570b7'
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'
const ADVICE_API_URL = 'https://api.adviceslip.com/advice'

const cityList = [
  { id: 'city_01', name: '서울', queryName: 'Seoul' },
  { id: 'city_02', name: '수원', queryName: 'Suwon' },
  { id: 'city_03', name: '부산', queryName: 'Busan' },
  { id: 'city_04', name: '제주', queryName: 'Jeju' },
  { id: 'city_05', name: '강릉', queryName: 'Gangneung' },
]

const weatherList = ref([])
const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')
const isLoading = ref(false)
const errorMessage = ref('')

const adviceText = ref('')
const adviceId = ref(null)
const isAdviceLoading = ref(false)

const fetchCityWeather = async (apiKey) => {
  const requests = cityList.map((city) =>
    axios.get(`${BASE_URL}?q=${city.queryName}&appid=${apiKey}&units=metric&lang=kr`),
  )
  const responses = await Promise.all(requests)
  return responses.map((res, index) => ({
    id: cityList[index].id,
    name: cityList[index].name,
    temp: res.data.main.temp,
    status: res.data.weather[0].description,
    icon: res.data.weather[0].icon,
    humidity: res.data.main.humidity,
    windSpeed: res.data.wind.speed,
  }))
}

const fetchRealTimeWeather = async () => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    weatherList.value = await fetchCityWeather(USER_API_KEY)
  } catch {
    try {
      weatherList.value = await fetchCityWeather(FALLBACK_API_KEY)
    } catch {
      errorMessage.value =
        '실시간 날씨 데이터를 가져오는데 실패했습니다. 네트워크 및 API 키를 확인해주세요.'
    }
  } finally {
    isLoading.value = false
  }
}

const fetchDailyAdvice = async () => {
  isAdviceLoading.value = true
  try {
    const res = await axios.get(ADVICE_API_URL)
    adviceText.value = res.data.slip.advice
    adviceId.value = res.data.slip.id
  } catch {
    adviceText.value = 'Always believe that something wonderful is about to happen.'
    adviceId.value = null
  } finally {
    isAdviceLoading.value = false
  }
}

onMounted(() => {
  fetchRealTimeWeather()
  fetchDailyAdvice()
})

const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return weatherList.value
  return weatherList.value.filter((item) => item.name.toLowerCase().includes(query))
})

watch(selectedCityInfo, (newVal) => {
  console.log(`[watch] 상태바 문구 변경: "${newVal}"`)
})

watchEffect(() => {
  console.log(`[watchEffect] 검색어 실시간 추적: "${searchQuery.value}"`)
})

const handleShowDetail = (cityId) => {
  router.push('/weather/' + cityId)
}
</script>

<template>
  <div class="dashboard-wrapper">
    <BaseDashboardCard>
      <SearchBar :current-query="searchQuery" @update-query="(val) => (searchQuery = val)" />
    </BaseDashboardCard>

    <BaseDashboardCard>
      <div class="advice-header">
        <h4>💡 오늘의 날씨 & 라이프 조언 (Advice Slip API)</h4>
        <button class="btn-advice" @click="fetchDailyAdvice" :disabled="isAdviceLoading">
          {{ isAdviceLoading ? '조언 받는 중...' : '🎲 다른 조언 뽑기' }}
        </button>
      </div>
      <blockquote class="advice-quote">
        "{{ adviceText || '오늘도 맑고 기분 좋은 하루 보내세요!' }}"
      </blockquote>
      <div v-if="adviceId" class="advice-footer">
        <span class="advice-badge">#Advice No.{{ adviceId }}</span>
      </div>
    </BaseDashboardCard>

    <BaseDashboardCard>
      <div class="list-header">
        <h3>🏙️ 지역별 실시간 날씨 현황 (OpenWeatherMap API)</h3>
        <button class="btn-refresh" @click="fetchRealTimeWeather" :disabled="isLoading">
          {{ isLoading ? '동기화 중...' : '🔄 새로고침' }}
        </button>
      </div>

      <div v-if="isLoading" class="loading-box">
        <p>🌐 기상 위성 서버로부터 실시간 날씨 데이터를 수신하는 중입니다...</p>
      </div>

      <div v-else-if="errorMessage" class="error-box">
        <p>⚠️ {{ errorMessage }}</p>
        <button class="btn-retry" @click="fetchRealTimeWeather">다시 시도</button>
      </div>

      <template v-else>
        <WeatherCard
          v-for="item in filteredWeatherList"
          :key="item.id"
          :city-item="item"
          @select-card="(name) => (selectedCityInfo = `${name}이 선택되었습니다.`)"
          @click-detail="handleShowDetail"
        />

        <p v-if="filteredWeatherList.length === 0" class="no-result">
          ⚠️ 검색 결과와 일치하는 도시가 없습니다.
        </p>
      </template>
    </BaseDashboardCard>

    <div class="status-bar">
      {{ selectedCityInfo }}
    </div>
  </div>
</template>

<style scoped>
.dashboard-wrapper {
  width: 600px;
  margin: 0 auto;
}
.advice-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.advice-header h4 {
  margin: 0;
  color: #2c3e50;
  font-size: 14px;
}
.btn-advice {
  padding: 4px 8px;
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 11px;
  font-weight: bold;
}
.btn-advice:hover {
  background-color: #059669;
}
.btn-advice:disabled {
  background-color: #a7f3d0;
  cursor: not-allowed;
}
.advice-quote {
  margin: 8px 0;
  padding: 10px 14px;
  background: #ecfdf5;
  border-left: 4px solid #10b981;
  border-radius: 4px;
  font-style: italic;
  color: #065f46;
  font-size: 13.5px;
  line-height: 1.5;
}
.advice-footer {
  text-align: right;
}
.advice-badge {
  font-size: 11px;
  color: #6ee7b7;
  background: #064e3b;
  padding: 2px 6px;
  border-radius: 4px;
}
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.list-header h3 {
  margin: 0;
  font-size: 1.1rem;
}
.btn-refresh {
  padding: 4px 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}
.btn-refresh:hover {
  background-color: #2980b9;
}
.btn-refresh:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}
.loading-box {
  text-align: center;
  padding: 30px 10px;
  color: #3498db;
  font-weight: 500;
}
.error-box {
  text-align: center;
  padding: 20px 10px;
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
.no-result {
  text-align: center;
  color: #e74c3c;
  padding: 10px 0;
}
.status-bar {
  background: #e8f5e9;
  padding: 10px;
  text-align: center;
  color: #2e7d32;
  font-weight: bold;
  border-radius: 6px;
}
</style>
