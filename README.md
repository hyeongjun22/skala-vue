# skala-vue

## 📌 단원별 실습 및 과제 기록

### 1. Vue 기초 문법 & 반응형 시스템 실습 (`src/components/practices/basic/`)

| 파일명               | 학습 주제 및 핵심 문법        | 주요 실습 내용                                                                              |
| :------------------- | :---------------------------- | :------------------------------------------------------------------------------------------ |
| **SampleOne.vue**    | 반응성 기초 (`ref`)           | 일반 변수와 `ref` 반응형 변수의 화면 갱신 차이 비교                                         |
| **SampleTwo.vue**    | 템플릿 문법                   | 텍스트 보간법(`{{ }}`)과 자바스크립트 표현식 활용                                           |
| **SampleThree.vue**  | 클래스 바인딩 (`:class`)      | 객체(`{ 'text-danger': isWarning }`) 및 배열 문법을 통한 동적 클래스 제어                   |
| **SampleFour.vue**   | 스타일 바인딩 (`:style`)      | 객체/배열 형태의 인라인 스타일 동적 바인딩                                                  |
| **SampleFive.vue**   | 조건부 렌더링 (`v-if`)        | `v-if`, `v-else-if`, `v-else`를 이용한 상태별 화면 분기                                     |
| **SampleSix.vue**    | 조건부 표시 (`v-show`)        | DOM 제거 없이 `display: none`으로 토글 제어                                                 |
| **SampleSeven.vue**  | 이벤트 객체 (`$event`)        | `v-on` 클릭 이벤트 시 `$event` 좌표 및 대상 태그 추출                                       |
| **SampleEight.vue**  | 이벤트 핸들링 (`v-on`)        | 인라인 연산(`count++`) 및 script 함수 핸들러 연결                                           |
| **SampleNine.vue**   | 이벤트 수식어                 | `@click.prevent`(기본 동작 차단), `@click.stop`(버블링 방지)                                |
| **SampleTen.vue**    | 양방향 바인딩 수식어          | `.lazy`, `.number`, `.trim` 수식어 실습                                                     |
| **SampleEleven.vue** | Form 요소 바인딩              | Textarea, Checkbox(단일/다중), Radio, Select 바인딩                                         |
| **Sample12.vue**     | `v-model` 동작 원리           | `:value` + `@input` 단방향 바인딩과 이벤트 조합을 script 함수로 분리                        |
| **Sample13.vue**     | 계산된 속성 (`computed`)      | 일반 메서드와 `computed`의 캐싱 동작 및 성능 차이 비교                                      |
| **Sample14.vue**     | 감시자 기초 (`watch`)         | 단일 `ref` 감시 및 `newValue`, `oldValue` 파라미터 활용                                     |
| **Sample15.vue**     | 다중 감시 (`watch`)           | 배열 형태로 여러 `ref` 변수를 묶어 동시 감시                                                |
| **Sample16.vue**     | 깊은 감시 (`deep watch`)      | 객체 내부 프로퍼티 변경 감지를 위한 `{ deep: true }` 및 Getter 타겟 감시 실습               |
| **Sample17.vue**     | 반응형 객체 감시 (`reactive`) | `reactive` 객체 감시 시 전체 감시 vs 특정 속성(`() => state.prop`) 감시의 이전 값 보존 차이 |
| **Sample18.vue**     | 자동 감시자 (`watchEffect`)   | 명시적 감시 대상 지정 없이 반응형 의존성을 자동 추적하여 즉시 실행                          |

---

### 2. 과제 및 Customization 내역

#### 🌤️ 1) 과제 1: Weather Mockup ([Weather_Mockup.vue](src/components/practices/basic/Weather_Mockup.vue))

- **교재**: PDF 116p (Hands on - Weather Mockup)
- **무엇을 했는가**:
  - **배열 렌더링 & `:key` 바인딩**: `v-for="item in weatherList" :key="item.id"`를 이용한 날씨 카드 렌더링
  - **조건부 렌더링**: 기온 25도 기준으로 `🔥 더움` / `❄️ 선선함` 뱃지 분기
  - **한글 검색어 처리**: `:value`와 `handleSearchInput`(`@input`) 함수를 분리하여 한글 입력값 즉시 반영
  - **이벤트 전파 제어**: 날씨 카드 클릭 시 선택 도시 상태바 갱신(`selectCity`), [상세보기] 버튼 클릭 시 `@click.stop`으로 이벤트 버블링 차단 및 `window.alert` 알림
  - **[Customization]**:
    - 키보드 이벤트 수식어 `@keyup.enter="handleEnterKey"` 추가로 엔터 입력 시 검색 알림/상태바 처리
    - 제주, 강릉 등 추가 도시 데이터 확장 및 `exercise.css` 대시보드 레이아웃 적용
- **느낀 점**:
  - 템플릿에 인라인으로 이벤트를 작성하기보다 `<script setup>`에 함수로 분리하는 것이 코드 가독성과 유지보수 면에서 훨씬 깔끔하다는 점을 체감함.
  - `@click.stop` 수식어 하나로 부모 카드의 클릭 이벤트와 버튼 클릭 이벤트를 명확히 분리할 수 있어 이벤트 버블링 제어의 중요성을 이해함.

---

#### ⚡ 2) 과제 2: Weather Composition ([Weather_Composition.vue](src/components/practices/basic/Weather_Composition.vue))

- **교재**: PDF 145p (Hands on - Weather Composition)
- **무엇을 했는가**:
  - **반응형 상태 관리**: `searchQuery`, `selectedCityInfo`, `weatherList`를 `ref()` 반응형 상태로 정의
  - **`computed` 실시간 검색 필터링**:
    - 검색어가 없을 땐 전체 목록을 반환하고, 검색어 입력 시 `toLowerCase()`와 `includes()`로 필터링된 배열 `filteredWeatherList` 생성
    - 검색 결과가 없을 때 `v-if="filteredWeatherList.length === 0"`를 통한 예외 안내 문구 표시
  - **`watch` & `watchEffect` 상태 감시**:
    - `watch(selectedCityInfo, (newVal, oldVal) => ...)`: 상태바 문구 변경 시 이전 값과 새 값을 함께 로깅
    - `watchEffect(() => ...)`: 의존성 파라미터 없이 `searchQuery`의 변화를 자동 감지하여 콘솔 로그 기록
  - **[Customization]**:
    - **추가 상태(`ref`)**: `filterStatus` (날씨 상태별 필터)
    - **추가 `computed`**: `averageTemp` (등록된 전체 도시들의 평균 기온을 실시간 연산하여 화면 상단에 표시)
    - **추가 `watch`**: `watch(filteredWeatherList)` (검색 결과 개수 변화 추적 로깅)
- **느낀 점**:
  - 일반 함수와 달리 `computed`는 의존하는 반응형 데이터가 바뀔 때만 재연산되고 캐싱되므로, 검색 필터링이나 평균 기온 계산 같은 연산 로직에 왜 `computed`를 써야 하는지 확실히 이해함.
  - `watch`는 이전 값(`oldValue`)과 새 값(`newValue`)을 비교할 수 있어 상태 추적에 유리하고, `watchEffect`는 반응형 변수를 명시하지 않아도 코드를 읽어 자동으로 감시해 주므로 실시간 검색 로깅처럼 즉각적인 반응 처리에 매우 편리함을 느낌.
  - 객체 내부 값 감시 시 `{ deep: true }`나 화살표 함수(`() => target`)를 사용하는 패턴을 실습을 통해 체득할 수 있었음.
