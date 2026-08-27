<script setup>
import { ref, computed, watch, watchEffect, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import BaseDashboardCard from '../components/BaseDashboardCard.vue'
import SearchBar from '../components/SearchBar.vue'
import WeatherCard from '../components/WeatherCard.vue'

const router = useRouter()

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || '30985f709248fb2218e4b0910b2e44d9'
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
const isAdviceLoading = ref(false)

const weatherTip = computed(() => {
  if (weatherList.value.length === 0) return '기상 데이터를 분석하는 중입니다...'
  const primaryCity = weatherList.value.find((w) => w.name === '서울') || weatherList.value[0]

  if (primaryCity.status.includes('비') || primaryCity.status.includes('소나기')) {
    return '☔ 비 소식이 있으니 외출 시 우산을 꼭 챙기시고 안전거리를 확보하세요.'
  } else if (primaryCity.temp >= 28) {
    return '☀️ 낮 기온이 높고 자외선이 강합니다. 시원한 옷차림과 충분한 수분 섭취를 권장합니다.'
  } else if (primaryCity.temp <= 22) {
    return '🍃 아침저녁으로 쌀쌀할 수 있으니 가벼운 겉옷을 준비해 체온을 유지하세요.'
  } else if (primaryCity.status.includes('구름') || primaryCity.status.includes('흐림')) {
    return '⛅ 햇빛이 강하지 않고 온화한 날씨입니다. 가벼운 야외 활동이나 산책에 좋습니다.'
  }
  return '✨ 쾌적하고 맑은 날씨입니다. 활기차고 기분 좋은 하루를 보내세요!'
})

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

const fetchRealTimeWeather = async (showToast = false) => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    weatherList.value = await fetchCityWeather(API_KEY)
    if (showToast) {
      ElMessage.success('실시간 기상 데이터가 성공적으로 갱신되었습니다!')
    }
  } catch {
    try {
      weatherList.value = await fetchCityWeather(FALLBACK_API_KEY)
      if (showToast) {
        ElMessage.success('실시간 기상 데이터를 성공적으로 수신했습니다.')
      }
    } catch {
      errorMessage.value =
        '실시간 날씨 데이터를 가져오는데 실패했습니다. 네트워크 및 API 키를 확인해주세요.'
      ElMessage.error('날씨 데이터 동기화에 실패했습니다.')
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
    ElMessage.success('오늘의 라이프스타일 조언을 새로고침했습니다!')
  } catch {
    adviceText.value = 'Always believe that something wonderful is about to happen.'
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
      <div class="weather-guide-card">
        <div class="guide-header">
          <div class="guide-title">
            <span class="guide-icon">🌤️</span>
            <h4>오늘의 기상 맞춤 생활 가이드</h4>
          </div>
          <el-button
            size="small"
            type="primary"
            plain
            :loading="isAdviceLoading"
            @click="fetchDailyAdvice"
          >
            🎲 명언 갱신
          </el-button>
        </div>

        <div class="weather-tip-box">
          <el-tag type="success" effect="dark" size="small">오늘의 외출 팁</el-tag>
          <p class="tip-text">{{ weatherTip }}</p>
        </div>

        <div v-if="adviceText" class="global-advice-box">
          <span class="advice-label">💡 Daily Quote (Advice API):</span>
          <span class="advice-quote">"{{ adviceText }}"</span>
        </div>
      </div>
    </BaseDashboardCard>

    <BaseDashboardCard>
      <div class="list-header">
        <h3>🏙️ 지역별 실시간 기상 관측소</h3>
        <el-button
          type="primary"
          size="small"
          :loading="isLoading"
          @click="fetchRealTimeWeather(true)"
        >
          {{ isLoading ? '동기화 중...' : '🔄 실시간 갱신' }}
        </el-button>
      </div>

      <div v-if="errorMessage" style="margin-bottom: 15px">
        <el-alert :title="errorMessage" type="error" show-icon :closable="false" />
      </div>

      <div v-if="isLoading && weatherList.length === 0" class="loading-state">
        <el-skeleton :rows="4" animated />
      </div>

      <template v-else>
        <WeatherCard
          v-for="item in filteredWeatherList"
          :key="item.id"
          :city-item="item"
          @select-card="(name) => (selectedCityInfo = `${name}이 선택되었습니다.`)"
          @click-detail="handleShowDetail"
        />

        <el-empty
          v-if="filteredWeatherList.length === 0 && !isLoading"
          description="검색 결과와 일치하는 도시가 없습니다."
          :image-size="70"
        />
      </template>
    </BaseDashboardCard>

    <div class="status-box">
      <el-alert :title="selectedCityInfo" type="info" :closable="false" center show-icon />
    </div>
  </div>
</template>

<style scoped>
.dashboard-wrapper {
  width: 100%;
  margin: 0 auto;
}
.weather-guide-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.guide-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.guide-title {
  display: flex;
  align-items: center;
  gap: 6px;
}
.guide-icon {
  font-size: 1.2rem;
}
.guide-title h4 {
  margin: 0;
  color: #303133;
  font-size: 15px;
  font-weight: 700;
}
.weather-tip-box {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 6px;
  padding: 10px 14px;
}
.tip-text {
  margin: 0;
  font-size: 13.5px;
  color: #166534;
  font-weight: 500;
  line-height: 1.4;
}
.global-advice-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f8fafc;
  border-left: 3px solid #60a5fa;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12.5px;
}
.advice-label {
  font-weight: 600;
  color: #3b82f6;
  white-space: nowrap;
}
.advice-quote {
  color: #475569;
  font-style: italic;
}
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}
.list-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #303133;
}
.loading-state {
  padding: 15px 0;
}
.status-box {
  margin-top: 10px;
}
</style>
