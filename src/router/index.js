import { createRouter, createWebHistory } from 'vue-router'
// import LoginRegisterView from '../views/LoginRegisterView.vue'
import UserRoleView from  '../views/UserRoleView.vue'
import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
    path: '/',
    name: 'user-role',
    component: UserRoleView,
    // children:[
    //   {
    //     path: 'login',
    //     component: LoginRegisterView,
    //   }
    // ]
    },
    {
      path: '/login',
      component: () => import('../views/LoginRegisterView.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    }
  ]
})

export default router
