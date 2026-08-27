<script setup>
import { ref } from 'vue'

const userAge = ref(20)
const isExactAge = ref(false)

const checkAgeStrict = () => {
  if (userAge.value === 20) {
    isExactAge.value = true
  } else {
    isExactAge.value = false
  }
}

const myRegion = 'Suwon'
const regionGreeting = `웰컴 투 ${myRegion}`

const currentApiUrl = import.meta.env.VITE_API_URL || '기본 로컬 API'
const currentMode = import.meta.env.MODE || 'development'

console.log(`[BuildDeployment] 로드된 API URL: ${currentApiUrl}`)
console.log(`[BuildDeployment] 현재 실행 모드: ${currentMode}`)
</script>

<template>
  <div class="deployment-challenge">
    <h2>🛠️ Code Challenge: Build & Deployment (270p ~ 273p)</h2>
    <p class="subtitle">ESLint 정적 분석, Prettier 포맷팅, Mode별 환경 변수, Vite 번들링 실습</p>

    <div class="challenge-card">
      <h3>1. ESLint Custom Rules 검증 (270p)</h3>
      <div class="card-content">
        <p>엄격한 일치 연산자 (<code>===</code>) 강제 및 <code>no-console: off</code> 규칙 검증</p>
        <div class="test-row">
          <span>나이 입력:</span>
          <input v-model.number="userAge" type="number" style="width: 80px" />
          <button @click="checkAgeStrict">엄격 비교 검증</button>
        </div>
        <p class="result-box">
          검증 결과: <strong>{{ isExactAge ? '✅ 20세 일치 (===)' : '❌ 20세 불일치' }}</strong>
        </p>
      </div>
    </div>

    <div class="challenge-card">
      <h3>2. Prettier 코드 포맷팅 자동화 (271p)</h3>
      <div class="card-content">
        <p>템플릿 리터럴 및 공백 자동 교정 결과</p>
        <div class="code-preview">
          <code>const myRegion = '{{ myRegion }}'</code><br />
          <code>const regionGreeting = '{{ regionGreeting }}'</code>
        </div>
        <p class="greeting-display">
          👉 <strong>{{ regionGreeting }}</strong>
        </p>
      </div>
    </div>

    <div class="challenge-card">
      <h3>3. Vite Mode별 환경 변수 (.env) 로드 (272p)</h3>
      <div class="card-content">
        <div class="env-table">
          <div class="env-row">
            <span class="env-key">현재 빌드 모드 (MODE):</span>
            <span class="env-val mode-badge">{{ currentMode }}</span>
          </div>
          <div class="env-row">
            <span class="env-key">VITE_API_URL:</span>
            <span class="env-val url-text">{{ currentApiUrl }}</span>
          </div>
        </div>
        <p class="env-tip">
          💡 <code>npm run build:staging</code> 실행 시 Staging 서버 주소로 자동 교체됩니다.
        </p>
      </div>
    </div>

    <div class="challenge-card">
      <h3>4. Vite 프로덕션 빌드 (273p)</h3>
      <div class="card-content">
        <p>
          <code>npm run build</code> 실행 시 <code>dist/</code> 배포 폴더가 생성되고
          자바스크립트/CSS 파일명 뒤에 브라우저 캐시 방지용 해시(Hash)가 자동 부여됩니다.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.deployment-challenge {
  max-width: 700px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
.subtitle {
  color: #64748b;
  font-size: 14px;
  margin-bottom: 20px;
}
.challenge-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px 20px;
  margin-bottom: 16px;
}
.challenge-card h3 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 16px;
  color: #1e293b;
}
.card-content {
  font-size: 13.5px;
  color: #475569;
  line-height: 1.6;
}
.test-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
}
.test-row button {
  padding: 5px 12px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.result-box {
  background: #f8fafc;
  padding: 8px 12px;
  border-radius: 4px;
  margin-top: 8px;
}
.code-preview {
  background: #0f172a;
  color: #38bdf8;
  padding: 10px 14px;
  border-radius: 6px;
  font-family: monospace;
  font-size: 13px;
  margin: 10px 0;
}
.greeting-display {
  color: #059669;
  font-size: 14px;
}
.env-table {
  background: #f1f5f9;
  padding: 12px 16px;
  border-radius: 6px;
  margin: 10px 0;
}
.env-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
}
.env-key {
  font-weight: 600;
  color: #334155;
}
.mode-badge {
  background: #3b82f6;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}
.url-text {
  color: #2563eb;
  font-family: monospace;
  font-weight: bold;
}
.env-tip {
  font-size: 12.5px;
  color: #64748b;
  margin: 6px 0 0 0;
}
code {
  background: #f1f5f9;
  padding: 2px 5px;
  border-radius: 4px;
  color: #d97706;
}
</style>
