<script setup>
defineProps({
  currentQuery: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update-query'])
</script>

<template>
  <div class="search-inner">
    <h3>🔍 도시 검색</h3>
    <el-input
      :model-value="currentQuery"
      @update:model-value="emit('update-query', $event)"
      placeholder="검색할 도시 이름 입력 (예: 서울, 부산)"
      clearable
      size="large"
    />
    <p class="query-status">
      검색 대상: <el-tag size="small" type="info">{{ currentQuery || '전체 도시' }}</el-tag>
    </p>
  </div>
</template>

<style scoped>
.search-inner h3 {
  margin-top: 0;
  margin-bottom: 12px;
  color: #2c3e50;
}
.query-status {
  margin: 10px 0 0 0;
  font-size: 13px;
  color: #606266;
}
</style>
