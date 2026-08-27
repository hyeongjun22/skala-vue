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

---

### 2. 과제 및 실습 기록 (Hands-on)

#### 🌤️ 1) 과제 1: Weather Mockup ([Weather_Mockup.vue](src/components/practices/assignments/01_weather_mockup/Weather_Mockup.vue))

- **교재**: PDF 116p (Hands on - Weather Mockup)
- **진행한 내용**:
  - `weatherList` 배열을 `v-for`로 돌려서 날씨 카드 목록 렌더링 (`:key="item.id"`)
  - 기온 25도 기준으로 `v-if` 써서 더움/선선함 뱃지 띄우기
  - 한글 검색할 때 글자 밀리는 문제 때문에 `v-model` 대신 `:value`랑 `@input` 조합으로 처리
  - 카드 누르면 아래 상태바에 선택한 도시 뜨게 하고, 상세보기 버튼 누를 땐 카드 클릭이랑 안 겹치게 `@click.stop`으로 버블링 막고 `alert()` 띄움
  - **[추가]**: 검색창에서 엔터 누르면 검색 결과 상태바에 뜨도록 `@keyup.enter` 추가하고, 제주/강릉 데이터 추가
- **느낀 점**:
  - 카드 안에 상세보기 버튼이 있어서 버튼을 누르면 부모 카드의 클릭 이벤트까지 같이 터지는 문제가 있었는데, `@click.stop` 하나 붙이니까 바로 해결돼서 이벤트 버블링 막는 법을 확실히 배웠다.
  - 한글 입력할 때 한 박자씩 늦게 반응하는 현상이 왜 일어나는지, `:value` + `@input`으로 어떻게 잡는지 알게 됨.

---

#### ⚡ 2) 과제 2: Weather Composition ([Weather_Composition.vue](src/components/practices/assignments/02_weather_composition/Weather_Composition.vue))

- **교재**: PDF 145p (Hands on - Weather Composition)
- **진행한 내용**:
  - `searchQuery`, `selectedCityInfo`, `weatherList`를 `ref()`로 선언해서 반응형으로 관리
  - 검색창에 도시 이름 칠 때마다 실시간으로 목록 걸러지도록 `computed()`로 `filteredWeatherList` 구현 (결과 없을 땐 안내 문구 표시)
  - `watch`로 상태바 문구 바뀔 때마다 콘솔 찍고, `watchEffect`로 검색어 입력할 때마다 실시간 로그 남김
  - **[추가]**: 전체 도시 평균 기온 계산하는 `averageTemp` computed 추가
- **느낀 점**:
  - 검색 필터링을 일반 함수가 아니라 `computed`로 만들어두니까 검색어가 바뀔 때만 알아서 다시 계산해주고 캐싱도 돼서 엄청 편했다.
  - `watch`는 이전 값이랑 비교할 때 쓰고 `watchEffect`는 안에서 쓴 반응형 변수를 알아서 잡아주니까, 실시간 검색 로그처럼 즉각 반응해야 하는 곳엔 `watchEffect`가 훨씬 쓰기 편하다는 걸 느낌.

---

#### 🧩 3) 과제 3: Weather Component ([WeatherParent.vue](src/components/practices/assignments/03_weather_component/WeatherParent.vue))

- **교재**: PDF 178p (Hands on - Weather Component)
- **진행한 내용**:
  - 한 파일에 다 들어있던 코드를 역할별로 컴포넌트 4개(`WeatherParent`, `BaseDashboardCard`, `SearchBar`, `WeatherCard`)로 분리
  - `BaseDashboardCard`: 공통 카드 박스 스타일만 잡고 안에 들어갈 내용은 `<slot>`으로 뚫어둠
  - `SearchBar`: 부모한테서 `:query` 받고 타이핑할 때마다 `update-query` 이벤트 `emit`
  - `WeatherCard`: 도시 객체 `:item` 받아서 카드 그리고 클릭/상세보기 이벤트 부모로 `emit`
  - `WeatherParent`: 전체 데이터랑 상태(`searchQuery`, `filteredWeatherList`)를 관리하면서 자식 컴포넌트들을 Slot 안에 조립
  - **[추가]**:
    - 검색창에 글자 있을 때 한 번에 싹 지울 수 있는 `✕` 초기화 버튼 추가 (`v-if` + `@click`)
    - 하단 상태바도 재사용하기 좋게 `WeatherStatusBar` 컴포넌트로 분리
- **느낀 점**:
  - 파일 하나로 짤 때는 편했는데 컴포넌트로 쪼개려니까 props랑 emit 맞추는 게 처음엔 헷갈렸다. 근데 쪼개고 나니까 데이터는 `WeatherParent` 한 곳에서만 쥐고 있고 자식은 뷰만 그리니까 코드가 훨씬 덜 꼬이고 깔끔해짐.
  - 특히 `BaseDashboardCard`에 `<slot>`을 뚫어두니까 똑같은 카드 디자인을 검색창에도 쓰고 날씨 목록에도 그대로 재사용할 수 있어서 슬롯의 편리함을 제대로 이해했다.

---

#### 🚀 4) 과제 4: Weather Router ([04_weather_router](src/components/practices/assignments/04_weather_router/))

- **교재**: PDF 196~197p (Hands on - Weather Router)
- **진행한 내용**:
  - **Vue Router 설정 (`router/index.js`)**: 모든 뷰 컴포넌트에 지연 로딩(`() => import(...)`)을 걸어두고, 없는 경로 처리용 Catch-all(`/:pathMatch(.*)*`) 라우트 추가
  - **네비게이션 & 레이아웃 (`App.vue`)**: `<RouterLink>`로 상단 메뉴바(대시보드, 기상 통계, 서비스 소개)를 두고 `<RouterView />`로 동적 페이지 화면 전환
  - **메인 뷰 (`WeatherHomeView.vue`)**: 상세보기 버튼 클릭 시 `window.alert()` 대신 `router.push('/weather/' + id)`를 써서 상세 화면으로 이동
  - **상세 뷰 (`WeatherDetailView.vue`)**: `:cityId` 동적 파라미터(`useRoute().params.cityId`)를 받아와 해당 도시의 상세 기상 정보(습도, 풍속, 미세먼지 등) 출력 및 뒤로가기 버튼
  - **소개 뷰 (`WeatherAboutView.vue`)**: 프로젝트 소개 정적 페이지 및 홈 이동 버튼
  - **404 뷰 (`NotFoundView.vue`)**: 잘못된 URL 입력 시 안내 페이지 출력
  - **[추가 뷰] 기상 통계 (`WeatherStatsView.vue`)**: 전국 평균/최고/최저 기온 및 순위 랭킹을 보여주는 `/stats` 추가 라우트 구현
- **느낀 점**:
  - `<a>` 태그 대신 `<RouterLink>`와 `<RouterView>`를 쓰니까 페이지를 매번 새로고침하지 않고도 가상 DOM에서 화면만 쏙쏙 바뀌는 SPA의 매력을 제대로 느꼈다.
  - 상세보기 누르면 `router.push()`로 주소 넘기고, 상세 페이지에서 `useRoute()`로 `cityId` 뽑아서 그 도시 데이터만 골라 보여주는 동적 라우팅の流れ를 직접 만들어보면서 라우터의 핵심 원리를 잡을 수 있었음.

---

#### 🏪 5) 과제 5: Weather Store ([05_weather_store](src/components/practices/assignments/05_weather_store/), [stores/configStore.js](src/stores/configStore.js))

- **교재**: PDF 212p (Hands on - Weather Store)
- **진행한 내용**:
  - **Pinia 전역 스토어 (`stores/configStore.js`)**: 단위 상태(`unit`: 'celsius' / 'fahrenheit'), 기호 getter(`unitSymbol`: '℃' / '℉'), 단위 토글 action(`toggleUnit`), 온도 환산 헬퍼(`convertTemp`) 정의
  - **단위 변경 컴포넌트 (`UnitToggler.vue`)**: 상단 네비게이션 바 우측에 배치하여 실시간으로 단위를 변경하는 UI 버튼 구현
  - **전역 반응형 상태 연동**:
    - `WeatherCard`: 스토어의 `unit` 상태에 따라 메인 카드의 온도를 섭씨/화씨로 자동 환산하여 `unitSymbol`과 함께 표시
    - `WeatherDetailView`: 상세 페이지의 메인 기온 수치도 스토어 단위에 맞춰 동적으로 계산
    - `WeatherStatsView`: 전국 평균 기온, 최고/최저 기온, 랭킹 목록에도 동일하게 스토어 단위 연동
- **느낀 점**:
  - 부모-자식 관계가 아니거나 깊이 떨어진 컴포넌트들끼리 props를 여러 다리 거쳐 넘겨줄 필요 없이, Pinia 스토어 하나에 상태를 올려두고 필요한 곳에서 `useConfigStore()`로 바로 꺼내 쓰니까 코드가 훨씬 간결해졌다.
  - 상단에서 '단위 변경' 버튼을 한 번 눌렀을 때 메인 리스트, 상세 페이지, 통계 페이지까지 모든 온도가 일제히 화씨/섭씨로 실시간 바뀌는 걸 보면서 전역 상태 관리의 편리함을 제대로 체감함.

---

#### 🌐 6) 과제 6: Weather Axios ([06_weather_axios](src/components/practices/assignments/06_weather_axios/))

- **교재**: PDF 230p (Hands on - Weather Axios)
- **진행한 내용**:
  - **Axios 라이브러리 설치**: `npm install axios`로 비동기 HTTP 통신 환경 구성
  - **OpenWeatherMap API 연동**: 전달받은 API 키를 적용하여 서울, 수원, 부산, 제주, 강릉 5개 도시의 실시간 기상 데이터를 비동기 병렬(`Promise.all`)로 호출
  - **메인 뷰 (`WeatherHomeView.vue`)**: 실제 위성 날씨 데이터(현재 기온, 기상 상태, 날씨 아이콘 이미지)를 받아와 렌더링하고, 로딩 상태(`isLoading`) 및 새로고침(🔄) 기능 구현
  - **상세 뷰 (`WeatherDetailView.vue`)**: `:cityId`로 전달받은 도시의 실시간 상세 관측치(현재 기온, 체감 온도, 습도, 풍속, 기압, 대형 날씨 아이콘)를 외부 API로부터 단일 호출하여 카드 그리드로 시각화
  - **통계 뷰 (`WeatherStatsView.vue`)**: 실제 5개 도시 데이터를 기반으로 전국 실시간 평균 기온, 최고/최저 기온 도시, 랭킹을 산출하고 `configStore` 단위 변환 연동
  - **예외 처리 (Error Handling)**: `try ... catch` 구문으로 네트워크 오류 및 API 키 활성화 대기 상황에 대응
- **느낀 점**:
  - 지금까지는 코드 안에 적어둔 가짜(Mock) 데이터로만 실습했었는데, `axios.get()` 한 줄로 실제 위성에서 관측한 오늘 서울/부산 기온과 날씨 아이콘 이미지가 화면에 뜨는 걸 보니까 진짜 살아있는 서비스를 만든 것 같아서 엄청 뿌듯했다.
  - 외부 서버랑 통신할 때는 데이터를 받아오기 전까지 찰나의 대기 시간이 생기는데, `isLoading` 반응형 변수를 둬서 로딩 안내를 띄우고 `try...catch`로 실패했을 때 안내 메시지를 보여주는 예외 처리의 중요성을 배웠다.
