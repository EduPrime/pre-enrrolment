import { createRouter, createWebHistory, createMemoryHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import PreEnrollment from '../views/PreEnrollment.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: PreEnrollment,
  },
]

// Acessando variáveis de ambiente no lado do cliente com Vite
console.log("teste do vite1",process.env.VITE_BASE_URL);  // A variável VITE_BASE_URL
console.log("teste do vite2",process.env.VITE_DATABASE_URL);  // A variável VITE_DATABASE_URL
console.log("teste do vite3",process.env.VITE_JWT_TOKEN);  // A variável VITE_JWT_TOKEN



const router = createRouter({
  history: createMemoryHistory(import.meta.env.VITE_BASE_URL),
  routes
})

export default router
