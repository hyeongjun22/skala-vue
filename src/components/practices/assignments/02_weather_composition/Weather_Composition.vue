<script setup>
import { ref, computed, watch, watchEffect } from 'vue'

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
  { id: 'city_04', name: '제주', temp: 29, status: '맑음' },
  { id: 'city_05', name: '강릉', temp: 22, status: '바람' },
])

const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')
const filterStatus = ref('전체')

const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return weatherList.value.filter((city) => {
    const matchesQuery = !query || city.name.toLowerCase().includes(query)
    const matchesStatus = filterStatus.value === '전체' || city.status === filterStatus.value

    return matchesQuery && matchesStatus
  })
})

const averageTemp = computed(() => {
  if (weatherList.value.length === 0) return 0
  const total = weatherList.value.reduce((sum, city) => sum + city.temp, 0)
  return (total / weatherList.value.length).toFixed(1)
})

watch(selectedCityInfo, (newValue, oldValue) => {
  console.log(`[watch] 상태바 문구 변경 감지: "${oldValue}" ➡️ "${newValue}"`)
})

watchEffect(() => {
  console.log(`[watchEffect] 검색어 실시간 추적: "${searchQuery.value}"`)
})

watch(filteredWeatherList, (newList) => {
  console.log(`[watch] 검색 결과 변경됨: 총 ${newList.length}개의 도시 표시 중`)
})

const handleSearchInput = (e) => {
  searchQuery.value = e.target.value
}

const selectCity = (cityName) => {
  selectedCityInfo.value = `${cityName}이 선택되었습니다.`
}

const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
</script>

<template>
  <div class="dashboard-wrapper">
    <section class="search-box">
      <h3>🔍 도시 검색</h3>
      <input
        type="text"
        :value="searchQuery"
        @input="handleSearchInput"
        placeholder="검색할 도시 이름 입력"
      />
      <p>
        검색 중인 도시: <strong>{{ searchQuery || '전체' }}</strong>
      </p>

      <div style="margin-top: 10px; font-size: 14px; color: #555">
        📊 등록된 도시 평균 기온: <strong>{{ averageTemp }}°C</strong>
      </div>
    </section>

    <section class="list-box">
      <h3>🏙️ 지역별 날씨 현황</h3>

      <div
        v-for="item in filteredWeatherList"
        :key="item.id"
        class="weather-card"
        @click="selectCity(item.name)"
      >
        <h4>{{ item.name }} ({{ item.status }})</h4>
        <p>현재 기온: {{ item.temp }}°C</p>

        <span v-if="item.temp >= 25" class="badge hot">🔥 더움 (25도 이상)</span>
        <span v-else class="badge cool">❄️ 선선함 (25도 미만)</span>

        <button class="btn-detail" @click.stop="showDetail(item.name, item.status)">
          상세보기
        </button>
      </div>

      <div
        v-if="filteredWeatherList.length === 0"
        style="text-align: center; padding: 20px; color: #888"
      >
        ⚠️ 검색 결과와 일치하는 도시가 없습니다.
      </div>
    </section>

    <div class="status-bar">
      {{ selectedCityInfo }}
    </div>
  </div>
</template>

<style>
@import '@/assets/exercise.css';
</style>
