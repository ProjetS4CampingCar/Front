import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserLoginVue from '@/components/login/UserLogin.vue'
import UserInscriptionVue from '@/components/login/UserInscription.vue'
import AddMaterialVue from '@/views/AddMaterial.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/info8',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/info8/login',
      name: 'login',
      component: UserLoginVue
    },
    {
      path: '/info8//inscription',
      name: 'inscription',
      component: UserInscriptionVue
    },
    {
      path: '/info8/reservation',
      name: 'reservation',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ReservationView.vue')
    },
    {
      path: '/info8/material/add',
      name: 'addmaterials',
      component: AddMaterialVue
    }
  ]
})

export default router
