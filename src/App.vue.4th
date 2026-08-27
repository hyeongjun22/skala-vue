<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container">
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
</style>
