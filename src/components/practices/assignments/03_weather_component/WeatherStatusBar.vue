<script setup>
defineProps({
  info: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="status-bar">
    {{ info }}
  </div>
</template>

<style scoped>
.status-bar {
  background: #e8f5e9;
  padding: 10px;
  text-align: center;
  color: #2e7d32;
  font-weight: bold;
  border-radius: 6px;
}
</style>
