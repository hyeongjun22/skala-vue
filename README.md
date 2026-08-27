# skala-vue

## 📌 단원별 실습 및 과제 기록

### 1. Vue 기초 문법 & 반응형 시스템 실습 (`src/components/practices/`)

#### 📂 기초 문법 및 반응형 (`basic/`)

| 파일명 | 학습 주제 | 주요 실습 내용 |
| :--- | :--- | :--- |
| **SampleOne.vue** | 반응성 기초 (`ref`) | 일반 변수와 `ref` 반응형 변수의 화면 갱신 차이 비교 |
| **SampleTwo.vue** | 템플릿 문법 | 텍스트 보간법(`{{ }}`)과 자바스크립트 표현식 활용 |
| **SampleThree.vue** | 클래스 바인딩 (`:class`) | 객체(`{ 'text-danger': isWarning }`) 및 배열 문법으로 동적 클래스 제어 |
| **SampleFour.vue** | 스타일 바인딩 (`:style`) | 객체/배열 형태의 인라인 스타일 동적 바인딩 |
| **SampleFive.vue** | 조건부 렌더링 (`v-if`) | `v-if`, `v-else-if`, `v-else` 상태별 화면 분기 |
| **SampleSix.vue** | 조건부 표시 (`v-show`) | DOM 제거 없이 `display: none`으로 토글 제어 |
| **SampleSeven.vue** | 이벤트 객체 (`$event`) | `v-on` 클릭 시 `$event` 마우스 좌표 및 대상 태그 추출 |
| **SampleEight.vue** | 이벤트 핸들링 (`v-on`) | 인라인 연산(`count++`)과 script 함수 핸들러 연결 |
| **SampleNine.vue** | 이벤트 수식어 | `@click.prevent`(기본 동작 차단), `@click.stop`(버블링 방지) |
| **SampleTen.vue** | 양방향 바인딩 수식어 | `.lazy`, `.number`, `.trim` 수식어 실습 |
| **SampleEleven.vue** | Form 요소 바인딩 | Textarea, Checkbox(단일/다중), Radio, Select 바인딩 |
| **Sample12.vue** | `v-model` 동작 원리 | `:value` + `@input` 조합을 스크립트 함수로 분리하여 한글 처리 |
| **Sample13.vue** | 계산된 속성 (`computed`) | 일반 메서드 호출과의 차이점 및 캐싱 동작 확인 |
| **Sample14.vue** | 감시자 기초 (`watch`) | 단일 `ref` 감시 및 `newValue`, `oldValue` 파라미터 활용 |
| **Sample15.vue** | 다중 감시 (`watch`) | 배열 형태로 여러 변수 묶어서 동시 감시 |
| **Sample16.vue** | 깊은 감시 (`deep watch`) | 객체 내부 값 변경 감지를 위한 `{ deep: true }` 및 Getter 감시 |
| **Sample17.vue** | 반응형 객체 감시 (`reactive`) | `reactive` 객체 전체 감시 vs 특정 속성(`() => state.prop`) 감시 |
| **Sample18.vue** | 자동 감시자 (`watchEffect`) | 감시 대상 지정 없이 반응형 의존성 자동 추적 및 즉시 실행 |
| **Sample19.vue** | 라이프사이클 훅 | `onMounted`, `onUpdated`, `onUnmounted` 흐름 및 `setInterval` 타이머 메모리 정리 |

#### 📂 컴포넌트 실습 (`lifecycle/`, `slot/`, `library/`)

| 파일명 | 학습 주제 | 주요 실습 내용 |
| :--- | :--- | :--- |
| **LifecycleParent.vue / LifecycleChild.vue** | 생명주기 훅 실습 | `v-if` 토글로 자식 컴포넌트 마운트/언마운트 시 생명주기 동작 확인 |
| **SlotDefaultParent.vue / SlotDefaultChild.vue** | 기본 슬롯 (Default Slot) | 자식 컴포넌트의 `<slot>` 위치에 부모 마크업 주입 |
| **SlotNamedParent.vue / SlotNamedChild.vue** | 이름 있는 슬롯 (Named Slot) | `#header`, `#content`, `#footer` 등 이름별 슬롯 분기 주입 |
| **SlotScopedParent.vue / SlotScopedChild.vue** | 범위 슬롯 (Scoped Slot) | 자식 컴포넌트 내부의 로컬 데이터를 `v-slot`으로 부모가 넘겨받아 렌더링 |
| **AxiosWeather.vue** | Axios 단발성 GET 통신 | OpenWeatherMap API로 실시간 날씨 데이터 비동기 호출 및 상태 표시 |
| **AxiosJson.vue** | REST API CRUD | JSONPlaceholder 가상 백엔드 대상 GET, POST, PUT, DELETE 실습 |
| **ElementPlus.vue** | UI 컴포넌트 라이브러리 | Form, Input-Number, Rate, MessageBox, Progress 등 UI 부품 실습 |

---

### 2. 과제 및 실습 기록 (Hands-on)

#### 🌤️ 1) 과제 1: Weather Mockup ([Weather_Mockup.vue](src/components/practices/assignments/01_weather_mockup/Weather_Mockup.vue))

- **진행한 내용**:
  weatherList 배열을 v-for로 돌려서 날씨 카드 목록 렌더링하였고 v-if 써서 더움/선선함을 표시했다. 한글을 검색할 때 글자가 밀리는 문제 때문에 v-model 대신 :value랑 @input를 사용하였다.
  상세보기 버튼을 누를 땐 카드 클릭이랑 안 겹치게 @click.stop으로 버블링을 막고 alert()을 띄움

  추가적으로 검색창에서 엔터 누르면 검색 결과가 상태바에 뜨도록 @keyup.enter 추가하였다.

- **느낀 점**:
  이번 실습을 통해 이벤트 버블링 막는 법을 배웠고 한글을 입력할 때 한글자씩 늦게 반응하는 현상이 왜 일어나는지, :value + @input 으로 해결하면 된다는것을 알게되었다.

---

#### ⚡ 2) 과제 2: Weather Composition ([Weather_Composition.vue](src/components/practices/assignments/02_weather_composition/Weather_Composition.vue))

- **진행한 내용**:
  searchQuery, selectedCityInfo, weatherList를 ref()로 선언하여 반응형 상태로 관리하였다. 검색창에 도시 이름을 입력할 때마다 실시간으로 목록이 걸러지도록 computed()로 filteredWeatherList를 구현하였고, watch와 watchEffect를 활용해 상태 문구와 실시간 검색어 로그를 추적하였다.

  추가적으로 전체 도시의 평균 기온을 실시간 계산해주는 averageTemp를 computed로 추가하였다.

- **느낀 점**:
  함수를 매번 호출하지 않고 computed를 쓰면 종속된 값이 바뀔 때만 알아서 다시 계산되고 캐싱까지 된다는 점이 편했다. 또한 watch와 watchEffect의 차이점을 직접 콘솔 로그를 찍어보며 확실히 익힐 수 있었다.

---

#### 🧩 3) 과제 3: Weather Component ([WeatherParent.vue](src/components/practices/assignments/03_weather_component/WeatherParent.vue))

- **진행한 내용**:
  한 파일에 모여있던 코드를 WeatherParent, BaseDashboardCard, SearchBar, WeatherCard 4개의 컴포넌트로 분리하였다. BaseDashboardCard는 slot을 뚫어 공통 카드 틀로 재사용하였고, 자식 컴포넌트들은 props와 emit으로 부모와 데이터를 주고받도록 구조화하였다.

  추가적으로 검색창에 글자가 있을 때 한 번에 지울 수 있는 ✕ 초기화 버튼과 하단 상태바 컴포넌트를 분리 추가하였다.

- **느낀 점**:
  컴포넌트로 분리하면서 처음엔 props와 emit 흐름이 조금 헷갈렸지만, 데이터 관리를 부모 한곳에 모으고 자식은 화면 렌더링에만 집중시키니 코드가 훨씬 깔끔해졌다. 특히 slot을 활용해 공통 카드 디자인을 재사용하는 방식을 배울 수 있었다.

---

#### 🚀 4) 과제 4: Weather Router ([04_weather_router](src/components/practices/assignments/04_weather_router/))

- **진행한 내용**:
  Vue Router를 도입하여 페이지 새로고침 없이 상단 메뉴(대시보드, 기상 통계, 서비스 소개)를 누르면 화면만 렌더링되도록 SPA를 구성하였다. 메인 카드에서 상세보기 버튼을 누르면 router.push()로 이동하고, 상세 페이지에서는 :cityId 파라미터를 받아 해당 도시의 정보를 동적으로 보여주도록 처리하였다.

  추가적으로 전국 기온 통계와 랭킹을 볼 수 있는 /stats 라우트와 잘못된 주소 접근 시 띄워주는 NotFound(404) 페이지를 구현하였다.

- **느낀 점**:
  일반 a 태그와 달리 RouterLink와 RouterView를 쓰면 새로고침 없이 화면이 부드럽게 전환되는 SPA 구조를 이해하게 되었다. 동적 라우팅을 통해 URL 파라미터로 도시 ID를 넘겨받아 상세 화면을 그리는 흐름을 배울 수 있었다.

---

#### 🏪 5) 과제 5: Weather Store ([05_weather_store](src/components/practices/assignments/05_weather_store/))

- **진행한 내용**:
  Pinia를 이용해 configStore를 생성하고 온도 단위 상태(unit)와 기호(unitSymbol), 단위 변환 함수(convertTemp)를 전역으로 관리하였다. 상단 네비게이션에 UnitToggler 버튼을 배치하여 버튼 클릭 시 섭씨(℃)와 화씨(℉)가 토글되도록 하였다.

  추가적으로 메인 날씨 카드뿐만 아니라 상세 페이지와 전국 통계 페이지의 모든 기온 수치도 전역 스토어의 단위에 맞춰 일제히 환산되도록 연동하였다.

- **느낀 점**:
  부모-자식 간에 props를 여러 다리 거쳐 전달할 필요 없이, Pinia 스토어 하나에 상태를 올려두고 필요한 컴포넌트에서 꺼내 쓰니 상태 관리가 훨씬 수월했다. 전역 상태를 바꾸면 이를 참조하는 모든 화면이 즉시 함께 갱신되는 반응형의 편리함을 배웠다.

---

#### 🌐 6) 과제 6: Weather Axios ([06_weather_axios](src/components/practices/assignments/06_weather_axios/))

- **진행한 내용**:
  Axios를 설치하고 발급받은 OpenWeatherMap API 키를 연동하여 서울, 수원, 부산, 제주, 강릉 5개 도시의 실시간 기상 관측 데이터를 Promise.all로 병렬 호출하였다. 데이터 수신 중에는 isLoading으로 로딩 상태를 표시하고, try-catch로 통신 에러를 처리하였다.

  추가적으로 외부 조언 API(Advice Slip API)를 연동하여 날씨 맞춤 외출 팁과 글로벌 명언을 실시간으로 가져오는 기능을 추가하였다.

- **느낀 점**:
  가짜(Mock) 데이터가 아니라 실제 위성 날씨 데이터를 axios로 가져와 화면에 렌더링해보니 진짜 웹 서비스를 만드는 느낌이 들었다. 외부 서버와 비동기 통신을 할 때 로딩 상태 처리와 try-catch 예외 처리의 중요성을 알게 되었다.

---

#### 🎨 7) 과제 7: Weather UI Library ([07_weather_ui_library](src/components/practices/assignments/07_weather_ui_library/))

- **진행한 내용**:
  Element Plus UI 라이브러리를 설치하고 전역 등록하여 기본 HTML 태그들을 완성형 UI 컴포넌트로 교체하였다. el-card로 카드 그림자를 주고, el-input(clearable), el-tag, el-button, el-descriptions, el-statistic, el-table 등을 적용하여 대시보드 화면을 전면 고도화하였다.

  추가적으로 상세 화면에 습도 수치를 직관적인 el-progress 게이지 바로 시각화하고, 실시간 한국 표준시 시계와 날씨 상태별 다이내믹 컬러 테마를 적용하였다.

- **느낀 점**:
  일일이 CSS를 직접 짜지 않고도 Element Plus 컴포넌트들을 활용하니 개발 속도가 훨씬 빨라지고 완성도 높은 대시보드를 만들 수 있었다. 실무에서 왜 UI 라이브러리를 적극적으로 활용하는지 직접 체감할 수 있었다.
