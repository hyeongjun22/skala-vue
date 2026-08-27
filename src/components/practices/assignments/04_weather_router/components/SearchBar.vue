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
    <div class="input-row">
      <input
        type="text"
        :value="currentQuery"
        @input="emit('update-query', $event.target.value)"
        placeholder="검색할 도시 이름 입력"
      />
      <button v-if="currentQuery" class="btn-clear" @click="emit('update-query', '')" type="button">
        ✕
      </button>
    </div>
    <p>
      검색 중인 도시: <strong>{{ currentQuery || '전체' }}</strong>
    </p>
  </div>
</template>

<style scoped>
.search-inner h3 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #2c3e50;
}
.input-row {
  position: relative;
  display: flex;
  align-items: center;
}
input {
  width: 100%;
  padding: 8px 30px 8px 10px;
  font-size: 14px;
  box-sizing: border-box;
}
.btn-clear {
  position: absolute;
  right: 8px;
  background: none;
  border: none;
  color: #888;
  font-size: 14px;
  cursor: pointer;
}
.btn-clear:hover {
  color: #333;
}
p {
  margin: 8px 0 0 0;
  font-size: 13px;
  color: #555;
}
</style>
