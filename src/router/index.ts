import { createRouter, createWebHistory } from 'vue-router';
import afficheMateriaux from "../views/AfficheMateriaux.vue";
import AfficheMateriel from '@/views/AfficheMateriel.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/info8/afficheMateriaux',
      name: 'afficheMateriaux',
      component: afficheMateriaux
    },
    {
      // Add a route for AfficheMateriel with a dynamic parameter for the material ID
      path: '/info8/afficheMateriaux/:id',
      name: 'AfficheMateriel',
      component: AfficheMateriel,
      props: true // This allows route params to be sent as props to the component
    }
  ]
});

export default router;
