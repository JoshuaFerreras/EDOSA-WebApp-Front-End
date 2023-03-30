import { createRouter, createWebHistory } from 'vue-router'
// import LoginRegisterView from '../views/LoginRegisterView.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home-view',
      component: HomeView,
    },
    {
      path: '/user-role',
      name: 'user-role',
      component: () => import('../views/UserRoleView.vue'),
    },
    {
      path: '/doctor-form',
      component: () => import('../views/DoctorFormView.vue'),
    },
    {
      path: '/patient-form',
      component: () => import('../views/PatientFormView.vue'),
    }
  ]
})

export default router
