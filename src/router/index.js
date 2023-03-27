import { createRouter, createWebHistory } from 'vue-router'
import LoginRegisterView from '../views/LoginRegisterView.vue'
import UserRoleView from  '../views/UserRoleView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
    path: '/',
    name: 'user-role',
    component: UserRoleView,
    children:[
      {
        path: 'login',
        component: LoginRegisterView,
      }
    ]
    },

    // {
    //   path: '/',
    //   name: 'user-role',
    //   component: UserRoleView
    // },
    // {
    //   path: '/',
    //   name: 'login-register',
    //   component: LoginRegisterView
    // },
  ]
})

export default router
