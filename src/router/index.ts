import { createRouter, createWebHistory, createMemoryHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import PreEnrollment from '../views/PreEnrollment.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: PreEnrollment,
  },
]

const router = createRouter({
  history: createMemoryHistory(import.meta.env.VITE_BASE_URL),
  routes
})

export default router
