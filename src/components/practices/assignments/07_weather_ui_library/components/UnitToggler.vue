<script setup>
import { useConfigStore } from '@/stores/configStore'
import { ElMessage } from 'element-plus'

const configStore = useConfigStore()

const handleToggle = () => {
  configStore.toggleUnit()
  const currentUnitName = configStore.unit === 'celsius' ? '섭씨(℃)' : '화씨(℉)'
  ElMessage.info(`기온 단위가 ${currentUnitName}로 전환되었습니다.`)
}
</script>

<template>
  <div class="unit-toggler">
    <span class="unit-text">
      단위: <strong>{{ configStore.unit === 'celsius' ? '섭씨(℃)' : '화씨(℉)' }}</strong>
    </span>
    <el-button type="primary" plain size="small" @click="handleToggle">
      단위 전환
    </el-button>
  </div>
</template>

<style scoped>
.unit-toggler {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
  font-size: 14px;
}
.unit-text {
  color: #303133;
}
</style>
