import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutComponent from '../components/AboutComponent.vue'
import ServicesComponent from '../components/ServicesComponent.vue'
import ContactComponent from '../components/ContactComponent.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home-view',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about-view',
      component: AboutComponent,
    },
    {
      path: '/services',
      name: 'services-view',
      component: ServicesComponent,
    },
    {
      path: '/contact',
      name: 'contact-view',
      component:  ContactComponent,
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
      path: '/patient-result',
      component: () => import('../views/Patient/Patient-Result.vue'),
    },
    {
      path: '/patient-form',
      component: () => import('../views/Patient/PatientFormView.vue'),
    },
    {
      path: '/patient-dashboard',
      component: () => import('../views/Patient/Patient-DboardView.vue'),
    },
    {
      path: '/profile',
      component: () => import('../views/ProfileView.vue'),
    }
    
  ]
})

export default router
