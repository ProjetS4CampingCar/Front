import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserLoginVue from '@/components/login/UserLogin.vue'
import UserInscriptionVue from '@/components/login/UserInscription.vue'
import { tokenValid } from '../js/utils.js'
import AddMaterialVue from '@/views/AddMaterial.vue'
import ModifyMaterial from '@/views/ModifyMaterial.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
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
      path: '/login',
      name: 'login',
      props: {
        isConnect: await tokenValid() // FAIRE UNE REQUETE AU PRES DU SERVEUR+6
      },
      component: UserLoginVue
    },
    {
      path: '/inscription',
      name: 'inscription',
      props: {
        isConnect: await tokenValid()
      },
      component: UserInscriptionVue
    },
    {
      path: '/reservation',
      name: 'reservation',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ReservationView.vue')
    },
    {
      path: '/material/add',
      name: 'addmaterials',
      component: AddMaterialVue
    },
    {
      path: '/material/modify',
      name: 'modifymaterials',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: ModifyMaterial
    }
  ]
})

export default router
