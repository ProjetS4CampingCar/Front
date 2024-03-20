<template>
  <div class="bg-primary5 flex flex-wrap gap-y-4 p-1 justify-center sm:justify-start">
    <div
    class="flex flex-col sm:flex-row sm:duration-700 ease-in-out "
    :class="clickedElement === id ? getWidth()  : 'md:w-1/3 lg:w-1/4 xl:w-1/5 '"
      v-for="(material, id) in materials"
      :key="id"
      :id="`material-${id}`"
    >

      <!-- Main content -->
      <div 
      class="flex flex-col sm:flex-row sm:block items-center items-right justify-center px-4 border-buttonColor text-black duration-500"
    :class="{ 'hover:scale-95 sm:border-l-4 ': clickedElement !== id, 'px-0 sm:pr-4': clickedElement === id}"
    @click="toggleDescription(id)"
      >
        <img class="rounded max-w-48 z-10 " src="../assets/camping_car.png" alt="test" />
        <router-link :to="{ name: 'AfficheMateriel', params: { id: id }}" class="">
          <div v-if="clickedElement != id" class="font-medium text-black hover:text-accent cursor-pointer">
            {{ material.name }}
          </div>
        </router-link>
        <div v-if="clickedElement != id" class="text-black">
          {{ material.price }}€/j
        </div>
      </div>
      
      <!-- Description content -->
      <div class="max-w-full">
        <router-link :to="{ name: 'AfficheMateriel', params: { id: id }}" class="">
          <div v-if="clickedElement === id" class="font-medium text-textColor1 hover:text-accent cursor-pointer
          flex justify-center sm:block">
            {{ material.name }}
          </div>
        </router-link>
        <div v-if="clickedElement === id" class="text-black flex justify-center sm:block" >
          {{ material.price }}€/j
        </div>
        <div v-if="clickedElement === id" class="text-text70 flex justify-center sm:block">
          Description: {{ material.description }} <br>
          <button @click="supprimer(id)">Supprimer ce materiel </button>
        </div>
      
      </div>
      
    </div>
  </div>
</template>

  
  
<script>
import axios from 'axios';
  
export default {

  name:'afficheMateriaux',
  data() {
    return {
      materials: [],
      clickedElement: null,
    };
  },
  mounted() {
    axios.get("http://localhost:3008/api/materials")
      .then(response => {
        this.materials = response.data['test'];
      })
      .catch(error => {
        console.error('Error fetching materials:', error);
      });
    },
    methods: {
      toggleDescription(id) {
        this.clickedElement = this.clickedElement === id ? null : id;
        const element = document.getElementById(`material-${id}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      },
      getWidth() {
      return `w-2/${this.getNbCols()} sm:pr-5 `;
    },
    getNbCols() {
        // Logique pour déterminer le nombre de colonnes en fonction de la largeur de l'écran
        const screenWidth = window.innerWidth;
        if (screenWidth < 640) {
          return 1;   
        } else if (screenWidth < 1024) {
          return 3; 
        } else if (screenWidth < 1280) {
          return 4; 
        } else {
          return 5; 
        }
      },
      supprimer(id) {
        axios.delete("http://localhost:3008/api/materials/" + id ).then(response => {
        this.materials = response
        alert("Votre produit a bien été supprimé");
        window.location.reload()
      })
    }
  }
  };
  </script>