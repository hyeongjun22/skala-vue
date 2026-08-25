# skala-vue

Vue 3 (Composition API, `<script setup>`) 기반의 프론트엔드 기초 문법 학습 및 실습 레포지토리입니다.

---

## 📌 단원별 실습 및 과제 기록

### 1. Vue 기초 문법 실습 (`src/components/practices/basic/`)

| 파일명               | 학습 주제 및 핵심 문법   | 주요 실습 내용                                                            |
| :------------------- | :----------------------- | :------------------------------------------------------------------------ |
| **SampleOne.vue**    | 반응성 기초 (`ref`)      | 일반 변수와 `ref` 반응형 변수의 화면 갱신 차이 비교                       |
| **SampleTwo.vue**    | 템플릿 문법              | 텍스트 보간법(`{{ }}`)과 자바스크립트 표현식 활용                         |
| **SampleThree.vue**  | 클래스 바인딩 (`:class`) | 객체(`{ 'text-danger': isWarning }`) 및 배열 문법을 통한 동적 클래스 제어 |
| **SampleFour.vue**   | 스타일 바인딩 (`:style`) | 객체/배열 형태의 인라인 스타일 동적 바인딩                                |
| **SampleFive.vue**   | 조건부 렌더링 (`v-if`)   | `v-if`, `v-else-if`, `v-else`를 이용한 상태별 화면 분기                   |
| **SampleSix.vue**    | 조건부 표시 (`v-show`)   | DOM 제거 없이 `display: none`으로 토글 제어                               |
| **SampleSeven.vue**  | 이벤트 객체 (`$event`)   | `v-on` 클릭 이벤트 시 `$event` 좌표 및 대상 태그 추출                     |
| **SampleEight.vue**  | 이벤트 핸들링 (`v-on`)   | 인라인 연산(`count++`) 및 script 함수 핸들러 연결                         |
| **SampleNine.vue**   | 이벤트 수식어            | `@click.prevent`(기본 동작 차단), `@click.stop`(버블링 방지)              |
| **SampleTen.vue**    | 양방향 바인딩 수식어     | `.lazy`, `.number`, `.trim` 수식어 실습                                   |
| **SampleEleven.vue** | Form 요소 바인딩         | Textarea, Checkbox(단일/다중), Radio, Select 바인딩                       |
| **Sample12.vue**     | `v-model` 동작 원리      | `:value` + `@input` 단방향 바인딩과 이벤트 조합을 script 함수로 분리      |

---

### 2. 과제 및 Customization 내역

#### 🌤️ Weather Mockup ([Weather_Mockup.vue](src/components/practices/basic/Weather_Mockup.vue))

- **요구사항 구현 및 개인화(Customization) 내역**:
  - **1) 배열 렌더링 & `:key` 바인딩**: `v-for="item in weatherList" :key="item.id"`
  - **2) 조건부 렌더링**: 기온 25도 기준으로 `🔥 더움` / `❄️ 선선함` 뱃지 조건부 렌더링
  - **3) 한글 검색어 처리**: `:value`와 `handleSearchInput`(`@input`) 핸들러 함수를 분리하여 한글 입력값 즉시 반영
  - **4) 이벤트 & 버블링 제어**:
    - 날씨 카드 클릭 시 하단 상태바에 선택 도시 문구 반영 (`selectCity`)
    - [상세보기] 버튼 클릭 시 `@click.stop`으로 부모 카드 클릭 이벤트 전파 차단 및 `window.alert` 날씨 안내
  - **5) 개인화 및 확장 (Customization)**:
    - **키보드 이벤트 수식어 (`@keyup.enter`) 추가**: 검색창에서 `Enter` 입력 시 `handleEnterKey`를 호출하여 상태바에 검색 안내 문구 갱신
    - **도시 데이터 확장**: 기본 데이터(서울, 수원, 부산) 외에 **제주, 강릉** 날씨 데이터 추가
    - **스타일링**: `exercise.css` 스타일을 연동하여 카드형 대시보드 레이아웃 적용

---
