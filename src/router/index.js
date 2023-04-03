import { createRouter, createWebHistory } from 'vue-router'
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
      component: () => import('../views/UserRoleView.vue'),
    },




    {
      path: '/doctor-form',
      component: () => import('../views/Doctor/DoctorFormView.vue'),
    },
    {
      path: '/doctor-dashboard',
      component: () => import('../views/Doctor/Doctor-DboardView.vue'),
    },
    {
      path: '/doctor-patient-profile',
      component: () => import('../views/Doctor/Doctor-PatientViewProfile.vue'),
    },
    {
      path: '/doctor-patient-result',
      component: () => import('../views/Doctor/Doctor-PatientCheckResult.vue'),
    },









    {
      path: '/patient-form',
      component: () => import('../views/Patient/PatientFormView.vue'),
    },
    {
      path: '/patient-dashboard',
      component: () => import('../views/Patient/Patient-DboardView.vue'),
    }
  ]
})

export default router
