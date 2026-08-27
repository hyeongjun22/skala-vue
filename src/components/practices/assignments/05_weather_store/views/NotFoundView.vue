<script setup>
import { useRouter } from 'vue-router'
import BaseDashboardCard from '../components/BaseDashboardCard.vue'

const router = useRouter()

const handleGoHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="notfound-container">
    <BaseDashboardCard>
      <div class="notfound-content">
        <h1>404</h1>
        <h2>페이지를 찾을 수 없습니다</h2>
        <p>요청하신 주소가 잘못되었거나 삭제된 페이지입니다.</p>

        <button class="btn-home" @click="handleGoHome">🏠 메인 대시보드로 돌아가기</button>
      </div>
    </BaseDashboardCard>
  </div>
</template>

<style scoped>
.notfound-container {
  width: 600px;
  margin: 40px auto;
}
.notfound-content {
  text-align: center;
  padding: 30px 10px;
}
h1 {
  font-size: 4rem;
  color: #e74c3c;
  margin: 0;
}
h2 {
  color: #2c3e50;
  margin: 10px 0;
}
p {
  color: #7f8c8d;
  margin-bottom: 25px;
  font-size: 14px;
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
}
.btn-home:hover {
  background-color: #2980b9;
}
</style>
