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
      <el-result
        icon="warning"
        title="404 Not Found"
        sub-title="요청하신 주소가 잘못되었거나 삭제된 페이지입니다."
      >
        <template #extra>
          <el-button type="primary" size="large" @click="handleGoHome">
            🏠 메인 대시보드로 이동
          </el-button>
        </template>
      </el-result>
    </BaseDashboardCard>
  </div>
</template>

<style scoped>
.notfound-container {
  width: 100%;
  margin: 20px auto;
}
</style>
