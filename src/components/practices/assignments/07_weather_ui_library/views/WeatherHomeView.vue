<script setup>
import { ref, computed, watch, watchEffect, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { ElMessage } from 'element-plus'
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

const fetchRealTimeWeather = async (showToast = false) => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    weatherList.value = await fetchCityWeather(USER_API_KEY)
    if (showToast) {
      ElMessage.success('실시간 기상 데이터가 성공적으로 갱신되었습니다!')
    }
  } catch (err) {
    try {
      weatherList.value = await fetchCityWeather(FALLBACK_API_KEY)
      if (showToast) {
        ElMessage.success('실시간 기상 데이터를 성공적으로 수신했습니다.')
      }
    } catch (fallbackErr) {
      errorMessage.value = '실시간 날씨 데이터를 가져오는데 실패했습니다. 네트워크 및 API 키를 확인해주세요.'
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
    ElMessage.success('오늘의 새로운 조언을 가져왔습니다!')
  } catch (err) {
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
      <SearchBar
        :current-query="searchQuery"
        @update-query="(val) => (searchQuery = val)"
      />
    </BaseDashboardCard>

    <BaseDashboardCard>
      <div class="advice-bar">
        <el-alert
          :title="`💡 오늘의 조언: ${adviceText || '오늘도 맑고 활기찬 하루 되세요!'}`"
          type="success"
          :closable="false"
          show-icon
        />
        <el-button
          size="small"
          type="success"
          plain
          :loading="isAdviceLoading"
          @click="fetchDailyAdvice"
        >
          🎲 다른 조언
        </el-button>
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
.advice-bar {
  display: flex;
  align-items: center;
  gap: 12px;
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
