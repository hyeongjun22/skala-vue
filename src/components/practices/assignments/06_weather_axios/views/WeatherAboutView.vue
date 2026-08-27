<script setup>
import { useRouter } from 'vue-router'
import BaseDashboardCard from '../components/BaseDashboardCard.vue'

const router = useRouter()

const handleGoHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="about-container">
    <BaseDashboardCard>
      <h2>ℹ️ 실시간 기상 관측 플랫폼 소개</h2>
      <p class="subtitle">Vue 3 + Vue Router + Pinia + Axios + OpenWeatherMap REST API</p>

      <hr />

      <div class="feature-section">
        <h3>✨ 프로젝트 핵심 아키텍처 및 기능</h3>
        <ul class="feature-list">
          <li><strong>📡 Axios 실시간 API 연동:</strong> OpenWeatherMap 글로벌 기상청 서버와 통신하여 전국 5개 도시의 실시간 기상 관측 정보 렌더링</li>
          <li><strong>🔍 실시간 도시 검색:</strong> 양방향 이벤트 바인딩 및 원클릭 초기화(✕) 지원</li>
          <li><strong>📍 상세 기상 정보 조회:</strong> 동적 라우팅(`:cityId`)을 통한 도시별 체감온도, 습도, 풍속, 기압 상세 관측 데이터 제공</li>
          <li><strong>🌡️ 전역 단위 변경 (Pinia):</strong> 섭씨(℃) / 화씨(℉) 전역 스토어 실시간 스위칭 및 자동 환산</li>
          <li><strong>⚡ SPA 빠른 화면 전환:</strong> Vue Router 비동기 지연 로딩(Lazy Loading) 및 404 예외 처리</li>
        </ul>
      </div>

      <div class="api-info-section">
        <h3>🔗 사용 오픈 API 스펙</h3>
        <div class="api-card">
          <p><strong>Provider:</strong> OpenWeatherMap (Current Weather Data API 2.5)</p>
          <p><strong>Endpoint:</strong> <code>https://api.openweathermap.org/data/2.5/weather</code></p>
          <p><strong>Params:</strong> <code>units=metric</code>, <code>lang=kr</code></p>
        </div>
      </div>

      <div class="btn-group">
        <button class="btn-home" @click="handleGoHome">🏠 메인 대시보드로 돌아가기</button>
      </div>
    </BaseDashboardCard>
  </div>
</template>

<style scoped>
.about-container {
  width: 600px;
  margin: 0 auto;
}
h2 {
  margin-top: 0;
  color: #2c3e50;
}
.subtitle {
  color: #7f8c8d;
  font-size: 14px;
  margin-bottom: 15px;
}
.feature-section {
  margin: 20px 0;
}
.feature-section h3,
.api-info-section h3 {
  color: #34495e;
  font-size: 16px;
  margin-bottom: 12px;
}
.feature-list {
  padding-left: 20px;
  line-height: 1.8;
  color: #555;
  font-size: 14px;
}
.api-info-section {
  margin: 20px 0;
}
.api-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 12px 15px;
  font-size: 13px;
  line-height: 1.6;
}
.api-card p {
  margin: 4px 0;
  color: #475569;
}
code {
  background: #f1f5f9;
  padding: 2px 5px;
  border-radius: 4px;
  color: #0284c7;
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
  transition: background-color 0.2s;
}
.btn-home:hover {
  background-color: #2980b9;
}
</style>
