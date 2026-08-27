<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import UnitToggler from '@/components/practices/assignments/07_weather_ui_library/components/UnitToggler.vue'

const currentTime = ref('')
let timer = null

const updateCurrentTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

onMounted(() => {
  updateCurrentTime()
  timer = setInterval(updateCurrentTime, 1000)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <div class="brand-zone">
        <span class="brand-icon">🌤️</span>
        <div class="brand-text">
          <h2 class="brand-title">SKALA Weather</h2>
          <span class="brand-subtitle">실시간 기상 관측 플랫폼</span>
        </div>
      </div>

      <div class="header-controls">
        <div class="live-clock-badge">
          <span class="pulse-dot"></span>
          <span class="clock-text">실시간 {{ currentTime }}</span>
        </div>
        <UnitToggler />
      </div>
    </header>

    <nav class="navigation-bar">
      <RouterLink to="/" class="nav-item">🏠 날씨 대시보드</RouterLink>
      <span class="divider">|</span>
      <RouterLink to="/stats" class="nav-item">📊 전국 기상 통계</RouterLink>
      <span class="divider">|</span>
      <RouterLink to="/about" class="nav-item">ℹ️ 서비스 소개</RouterLink>
    </nav>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style>
@import '@/assets/exercise.css';

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
  padding-bottom: 14px;
  border-bottom: 1px solid #f1f5f9;
}
.brand-zone {
  display: flex;
  align-items: center;
  gap: 10px;
}
.brand-icon {
  font-size: 2rem;
}
.brand-text {
  display: flex;
  flex-direction: column;
}
.brand-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 800;
  color: #1e293b;
  letter-spacing: -0.5px;
}
.brand-subtitle {
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
}
.header-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}
.live-clock-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  color: #475569;
  font-weight: 600;
}
.pulse-dot {
  width: 7px;
  height: 7px;
  background-color: #10b981;
  border-radius: 50%;
}
</style>
