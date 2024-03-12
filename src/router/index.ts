
import { createRouter, createWebHistory } from 'vue-router'

import afficheMateriaux from "@/views/AfficheMateriaux.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path : '/info8/afficheMateriaux',
      name :'afficheMateriaux',
      componant : afficheMateriaux
    }
    
  ]
})

export default router
