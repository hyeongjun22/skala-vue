<script setup>
import { useConfigStore } from '@/stores/configStore'

const configStore = useConfigStore()
</script>

<template>
  <div class="unit-toggler">
    <span>
      날씨 단위: <strong>{{ configStore.unit === 'celsius' ? '섭씨(℃)' : '화씨(℉)' }}</strong>
    </span>
    <button @click="configStore.toggleUnit" class="toggle-btn">단위 변경</button>
  </div>
</template>

<style scoped>
.unit-toggler {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  font-size: 14px;
}
.toggle-btn {
  padding: 6px 12px;
  background-color: #4b6584;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 12px;
  transition: background-color 0.2s;
}
.toggle-btn:hover {
  background-color: #384e66;
}
</style>
