<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/configStore'
import BaseDashboardCard from '../components/BaseDashboardCard.vue'

const route = useRoute()
const router = useRouter()
const configStore = useConfigStore()

const mockCityDetails = {
  city_01: {
    id: 'city_01',
    name: '서울',
    temp: 28,
    status: '맑음',
    humidity: 45,
    windSpeed: 2.1,
    dust: '좋음 (18㎍/㎥)',
    description:
      '쾌청한 날씨가 지속되고 있으며 야외 활동에 적합합니다. 자외선 지수가 다소 높으니 선크림을 챙기세요.',
  },
  city_02: {
    id: 'city_02',
    name: '수원',
    temp: 24,
    status: '비',
    humidity: 85,
    windSpeed: 3.5,
    dust: '좋음 (12㎍/㎥)',
    description:
      '오후까지 비가 이어질 예정입니다. 빗길 안전운전에 유의하시고 외출 시 우산을 준비하세요.',
  },
  city_03: {
    id: 'city_03',
    name: '부산',
    temp: 26,
    status: '구름',
    humidity: 65,
    windSpeed: 4.2,
    dust: '보통 (35㎍/㎥)',
    description: '구름이 다소 많으나 바다 바람이 시원하게 불고 있어 산책하기 좋은 날씨입니다.',
  },
  city_04: {
    id: 'city_04',
    name: '제주',
    temp: 29,
    status: '맑음',
    humidity: 55,
    windSpeed: 1.8,
    dust: '좋음 (15㎍/㎥)',
    description: '따뜻한 햇살과 온화한 기후가 유지되고 있어 여행 및 관광에 최적의 날씨입니다.',
  },
  city_05: {
    id: 'city_05',
    name: '강릉',
    temp: 22,
    status: '바람',
    humidity: 50,
    windSpeed: 6.0,
    dust: '좋음 (10㎍/㎥)',
    description:
      '동해안을 따라 강한 바람이 불고 있으니 시설물 관리 및 안전사고에 주의하시기 바랍니다.',
  },
}

const city = ref(null)

onMounted(() => {
  const cityId = route.params.cityId
  console.log(`[WeatherDetailView] 동적 파라미터 수신: ${cityId}`)
  if (mockCityDetails[cityId]) {
    city.value = mockCityDetails[cityId]
  }
})

const displayTemp = computed(() => {
  if (!city.value) return 0
  const rawTemp = city.value.temp
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return rawTemp
})

const handleGoBack = () => {
  router.push('/')
}
</script>

<template>
  <div class="detail-container">
    <BaseDashboardCard>
      <div v-if="city" class="detail-content">
        <div class="header">
          <h2>📍 {{ city.name }} 상세 기상정보</h2>
          <span v-if="city.temp >= 25" class="badge hot">🔥 더움</span>
          <span v-else class="badge cool">❄️ 선선함</span>
        </div>

        <div class="main-temp">
          <span class="temp-val">{{ displayTemp }}{{ configStore.unitSymbol }}</span>
          <span class="status-val">{{ city.status }}</span>
        </div>

        <hr />

        <div class="grid-info">
          <div class="info-card">
            <span class="label">💧 습도</span>
            <strong class="val">{{ city.humidity }}%</strong>
          </div>
          <div class="info-card">
            <span class="label">💨 풍속</span>
            <strong class="val">{{ city.windSpeed }} m/s</strong>
          </div>
          <div class="info-card">
            <span class="label">😷 미세먼지</span>
            <strong class="val">{{ city.dust }}</strong>
          </div>
        </div>

        <div class="desc-box">
          <p>📝 {{ city.description }}</p>
        </div>

        <div class="btn-group">
          <button class="btn-back" @click="handleGoBack">← 대시보드로 돌아가기</button>
        </div>
      </div>

      <div v-else class="not-found-city">
        <p>⚠️ 도시 정보(ID: {{ route.params.cityId }})를 찾을 수 없습니다.</p>
        <button class="btn-back" @click="handleGoBack">메인으로 돌아가기</button>
      </div>
    </BaseDashboardCard>
  </div>
</template>

<style scoped>
.detail-container {
  width: 600px;
  margin: 0 auto;
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
}
.main-temp {
  display: flex;
  align-items: baseline;
  gap: 15px;
  margin: 15px 0;
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
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
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
  font-size: 15px;
  color: #2c3e50;
}
.desc-box {
  background: #f1f8ff;
  border-left: 4px solid #3498db;
  padding: 12px 15px;
  border-radius: 4px;
  margin-bottom: 20px;
}
.desc-box p {
  margin: 0;
  color: #34495e;
  line-height: 1.5;
  font-size: 14px;
}
.btn-group {
  text-align: center;
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
.not-found-city {
  text-align: center;
  padding: 30px 0;
  color: #e74c3c;
}
</style>
