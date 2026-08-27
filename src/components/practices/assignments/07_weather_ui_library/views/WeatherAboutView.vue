<script setup>
import { useRouter } from 'vue-router'
import BaseDashboardCard from '../components/BaseDashboardCard.vue'

const router = useRouter()

const handleGoHome = () => {
  router.push('/')
}

const timelineActivities = [
  { content: '1단계: Weather Mockup (기본 템플릿 & 반응형 상태)', timestamp: 'Day 1' },
  { content: '2단계: Weather Composition (computed 필터링 & watch 감시자)', timestamp: 'Day 2' },
  { content: '3단계: Weather Component (컴포넌트 분리 & Slot 레이아웃)', timestamp: 'Day 3' },
  { content: '4단계: Weather Router (SPA 페이지 전환 & 동적 라우팅)', timestamp: 'Day 4' },
  { content: '5단계: Weather Store (Pinia 전역 단위 변환 상태 관리)', timestamp: 'Day 5' },
  { content: '6단계: Weather Axios (OpenWeatherMap & Advice 실시간 API 연동)', timestamp: 'Day 6' },
  {
    content: '7단계: Weather UI Library (Element Plus 풀스택 대시보드 고도화)',
    timestamp: 'Day 7 (완성)',
  },
]
</script>

<template>
  <div class="about-container">
    <BaseDashboardCard>
      <h2>ℹ️ 실시간 기상 관측 플랫폼 소개</h2>
      <p class="subtitle">Vue 3 + Vue Router + Pinia + Axios + Element Plus UI</p>

      <hr />

      <h3 style="color: #303133; margin-top: 20px">🚀 프로젝트 진화 타임라인</h3>
      <el-timeline style="margin: 20px 0 10px 10px">
        <el-timeline-item
          v-for="(activity, index) in timelineActivities"
          :key="index"
          :timestamp="activity.timestamp"
          :type="index === timelineActivities.length - 1 ? 'primary' : 'success'"
          :hollow="index !== timelineActivities.length - 1"
          size="large"
        >
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>

      <h3 style="color: #303133; margin-top: 25px">🔗 연동된 외부 오픈 API</h3>
      <el-descriptions :column="1" border>
        <el-descriptions-item label="OpenWeatherMap API">
          실시간 5개 도시 기상 위성 관측치 & 날씨 아이콘 이미지 CDN
        </el-descriptions-item>
        <el-descriptions-item label="Advice Slip API">
          오늘의 라이프 & 날씨 추천 조언/명언 API
        </el-descriptions-item>
        <el-descriptions-item label="UI 디자인 시스템">
          Element Plus 2.x 반응형 컴포넌트 프레임워크
        </el-descriptions-item>
      </el-descriptions>

      <div class="btn-group">
        <el-button type="primary" size="large" @click="handleGoHome">
          🏠 메인 대시보드로 돌아가기
        </el-button>
      </div>
    </BaseDashboardCard>
  </div>
</template>

<style scoped>
.about-container {
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
  margin-bottom: 15px;
}
.btn-group {
  text-align: center;
  margin-top: 25px;
}
</style>
