import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'WeatherHome',
    component: () =>
      import('@/components/practices/assignments/07_weather_ui_library/views/WeatherHomeView.vue'),
  },
  {
    path: '/weather/:cityId',
    name: 'WeatherDetail',
    component: () =>
      import('@/components/practices/assignments/07_weather_ui_library/views/WeatherDetailView.vue'),
  },
  {
    path: '/about',
    name: 'WeatherAbout',
    component: () =>
      import('@/components/practices/assignments/07_weather_ui_library/views/WeatherAboutView.vue'),
  },
  {
    path: '/stats',
    name: 'WeatherStats',
    component: () =>
      import('@/components/practices/assignments/07_weather_ui_library/views/WeatherStatsView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () =>
      import('@/components/practices/assignments/07_weather_ui_library/views/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
