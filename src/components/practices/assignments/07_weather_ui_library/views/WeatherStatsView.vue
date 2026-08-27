<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/configStore'
import axios from 'axios'
import BaseDashboardCard from '../components/BaseDashboardCard.vue'

const router = useRouter()
const configStore = useConfigStore()

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || '30985f709248fb2218e4b0910b2e44d9'
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
    weatherList.value = await fetchStatsData(API_KEY)
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
  if (weatherList.value.length === 0) return 0
  const sum = weatherList.value.reduce((acc, cur) => acc + cur.temp, 0)
  const rawAvg = sum / weatherList.value.length
  if (configStore.unit === 'fahrenheit') {
    return parseFloat(((rawAvg * 9) / 5 + 32).toFixed(1))
  }
  return parseFloat(rawAvg.toFixed(1))
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
      <h2>📊 전국 실시간 기상 통계 (Element Plus)</h2>
      <p class="subtitle">기상청 위성 데이터 기반 전국 기온 분석 리포트</p>

      <div v-if="isLoading" style="padding: 20px 0">
        <el-skeleton :rows="5" animated />
      </div>

      <div v-else-if="errorMessage">
        <el-alert :title="errorMessage" type="error" show-icon :closable="false" />
      </div>

      <template v-else>
        <div class="statistics-row">
          <el-card shadow="never" class="stat-card">
            <el-statistic title="🌡️ 전국 평균 기온" :value="avgTemp">
              <template #suffix>{{ configStore.unitSymbol }}</template>
            </el-statistic>
          </el-card>

          <el-card shadow="never" class="stat-card hot-stat">
            <el-statistic
              title="🔥 최고 기온 도시"
              :value="configStore.convertTemp(Math.round(highestCity.temp))"
            >
              <template #prefix>{{ highestCity.name }} (</template>
              <template #suffix>{{ configStore.unitSymbol }})</template>
            </el-statistic>
          </el-card>

          <el-card shadow="never" class="stat-card cool-stat">
            <el-statistic
              title="❄️ 최저 기온 도시"
              :value="configStore.convertTemp(Math.round(lowestCity.temp))"
            >
              <template #prefix>{{ lowestCity.name }} (</template>
              <template #suffix>{{ configStore.unitSymbol }})</template>
            </el-statistic>
          </el-card>
        </div>

        <h3 style="margin-top: 25px; margin-bottom: 12px; color: #303133">
          🏆 실시간 기온 랭킹 리포트
        </h3>

        <el-table :data="sortedList" stripe style="width: 100%; border-radius: 8px">
          <el-table-column type="index" label="순위" width="80" align="center">
            <template #default="scope">
              <el-tag
                :type="scope.$index === 0 ? 'danger' : scope.$index === 1 ? 'warning' : 'info'"
                size="small"
                effect="dark"
              >
                {{ scope.$index + 1 }}위
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column prop="name" label="도시명" width="130">
            <template #default="scope">
              <strong>{{ scope.row.name }}</strong>
            </template>
          </el-table-column>

          <el-table-column prop="status" label="기상 현황" />

          <el-table-column label="현재 기온" align="right" width="120">
            <template #default="scope">
              <span style="font-weight: bold; color: #409eff">
                {{ configStore.convertTemp(Math.round(scope.row.temp))
                }}{{ configStore.unitSymbol }}
              </span>
            </template>
          </el-table-column>

          <el-table-column label="상세" align="center" width="100">
            <template #default="scope">
              <el-button size="small" type="primary" link @click="handleDetail(scope.row.id)">
                보기
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <div class="btn-group">
        <el-button type="primary" size="large" @click="router.push('/')">
          🏠 메인 대시보드로 돌아가기
        </el-button>
      </div>
    </BaseDashboardCard>
  </div>
</template>

<style scoped>
.stats-container {
  width: 100%;
  margin: 0 auto;
}
h2 {
  margin-top: 0;
  color: #303133;
}
.subtitle {
  color: #909399;
  font-size: 13.5px;
  margin-bottom: 20px;
}
.statistics-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}
.stat-card {
  text-align: center;
  background: #f8fafc;
}
.hot-stat {
  border-left: 4px solid #f56c6c;
}
.cool-stat {
  border-left: 4px solid #409eff;
}
.btn-group {
  text-align: center;
  margin-top: 25px;
}
</style>
