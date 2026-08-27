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
      <h2>ℹ️ 실시간 날씨 대시보드 소개</h2>
      <p class="subtitle">Vue 3 + Vue Router 기반 프론트엔드 기상 관측 플랫폼</p>

      <hr />

      <div class="feature-section">
        <h3>✨ 주요 기능 안내</h3>
        <ul class="feature-list">
          <li><strong>🔍 실시간 도시 검색:</strong> 한글 입력 최적화 및 양방향 이벤트 바인딩</li>
          <li><strong>🏙️ 지역별 날씨 모니터링:</strong> 반응형 카드 UI 및 기온별 직관적 뱃지 표시</li>
          <li><strong>📍 상세 기상 정보 조회:</strong> 동적 라우팅(`:cityId`)을 통한 도시별 습도, 풍속, 미세먼지 관측 정보 제공</li>
          <li><strong>⚡ SPA 빠른 화면 전환:</strong> Vue Router 기반 비동기 지연 로딩(Lazy Loading) 적용</li>
        </ul>
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
.feature-section h3 {
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
