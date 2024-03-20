<template>
  <div>
    <div class="flex flex-col sm:flex-row	border-b pb-2 h-1/2">
      <div class="sm:w-1/3 sm:border-r sm:mr-2">
        <img class=" sm:rounded-br-lg w-full" src="../assets/camping_car.png" alt="test" />
        <div class="pl-2">
          <div class="flex justify-between pr-2">
          <div class="uppercase">{{ materiel.name }}</div>
          <div>{{ materiel.price }}€/j</div>
          </div>
          <div>{{ materiel.description }}</div>
        </div>
      </div>
      <div class="bg-secondary flex-1 flex justify-center ">
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
