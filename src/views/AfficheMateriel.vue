<template>
  <div>
    <div class="flex flex-col md:flex-row	border-b pb-2 ">
      <div class="md:w-1/3 md:border-r md:mr-2">
        <img class=" md:rounded-br-lg w-full" src="C:\Users\jojoe\Documents\USMB\Project\S4\logo\RentaVan\bleu\logo.png" alt="test" />
        <div class="pl-2 h-1/3">
          <div class="flex justify-between pr-2">
          <div class="uppercase">{{ materiel.name }}</div>
          <div>{{ materiel.price }}€/j</div>
          </div>
          <div class="inline-block">{{ materiel.description }}</div>
        </div>
      </div>
      <div class="bg-secondary flex-1 flex justify-center h-[80vh]">
        <p>TEMPLATE LOCATION </p>
      </div>
    </div>
    <div>
      <afficheMateriaux/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import afficheMateriaux from '@/views/AfficheMateriaux.vue'; 

export default {
  components: {
    afficheMateriaux,
  },
  name: 'afficheMateriel',
  data() {
    return {
      materiel: {name: "Nom du matériel",
        price: 50, // Prix simulé en euros par jour
        description: "Description du matériel simulé."},
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    // Fetch the specific material using the ID from the route parameter
    const id = this.$route.params.id;
    axios.get(`http://localhost:3008/api/materials/${id}`)
      .then(response => {
        this.materiel = response.data;
        
      })
      .catch(error => {
        console.error('Error fetching material:', error);
      });
  },
};
</script>
