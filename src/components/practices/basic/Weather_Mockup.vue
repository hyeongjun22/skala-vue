<script setup>
import { ref } from 'vue'

// 1 & 5. 날씨 데이터 배열 (v-for 및 :key 실습 + 본인만의 Mockup 데이터 추가)
const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
  { id: 'city_04', name: '제주', temp: 29, status: '맑음' },
  { id: 'city_05', name: '강릉', temp: 22, status: '바람' },
])

// 3. 한글 검색어 입력용 데이터 (:value, @input)
const searchQuery = ref('')

// 4. 상태바 메시지 제어용 데이터
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')

// 3. input 이벤트 핸들러 (한글 입력 즉시 반영)
const handleSearchInput = (e) => {
  searchQuery.value = e.target.value
}

// [Customization] 키보드 Enter 이벤트 핸들러 (@keyup.enter)
const handleEnterKey = () => {
  if (searchQuery.value.trim()) {
    selectedCityInfo.value = `'${searchQuery.value.trim()}' 도시를 검색했습니다.`
  }
}

// 4. 카드 클릭 이벤트 핸들러
const selectCity = (cityName) => {
  selectedCityInfo.value = `${cityName}이 선택되었습니다.`
}

// 4. 상세보기 알림 함수
const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
</script>

<template>
  <div class="dashboard-wrapper">
    <!-- 3. 양방향 바인딩 및 한글 처리 (:value, @input) + [Customization] @keyup.enter -->
    <section class="search-box">
      <h3>🔍 도시 검색</h3>
      <input
        type="text"
        :value="searchQuery"
        @input="handleSearchInput"
        @keyup.enter="handleEnterKey"
        placeholder="도시 입력 후 Enter"
      />
      <p>
        검색 중인 도시: <strong>{{ searchQuery }}</strong>
      </p>
    </section>

    <!-- 1. 배열 렌더링 (v-for, :key) -->
    <section class="list-box">
      <h3>🏙️ 지역별 날씨 현황</h3>

      <div
        v-for="item in weatherList"
        :key="item.id"
        class="weather-card"
        @click="selectCity(item.name)"
      >
        <h4>{{ item.name }} ({{ item.status }})</h4>
        <p>현재 기온: {{ item.temp }}°C</p>

        <!-- 2. 조건부 렌더링 (v-if / v-else) -->
        <span v-if="item.temp >= 25" class="badge hot">🔥 더움 (25도 이상)</span>
        <span v-else class="badge cool">❄️ 선선함 (25도 미만)</span>

        <!-- 4. 버블링 방지 (@click.stop) 및 상세보기 알림 -->
        <button class="btn-detail" @click.stop="showDetail(item.name, item.status)">
          상세보기
        </button>
      </div>
    </section>

    <!-- 4. 하단 상태바 -->
    <div class="status-bar">
      {{ selectedCityInfo }}
    </div>
  </div>
</template>

<style>
@import '@/assets/exercise.css';
</style>
