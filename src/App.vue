<template >
  <div class="bg-white grid grid-flow-rows grid-cols-2 gap-4 sm:grid-cols-4 p-2">
    <div 
    class="mx-auto px-4 border-l-4 border-black box-content text-black text-nowrap" 
    v-for="(material, id) in materials" :key="id">
      <img src="C:\Users\jojoe\Documents\USMB\Project\S4\logo\RentaVan\bleu\logo.png" alt="test">
      <div class="underline decoration-violet-500 hover:no-underline hover:text-violet-500 cursor-pointer"> 
        {{ material.name }}
      </div>
      <div>          
        {{ material.price }}€/j
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  data() {
    return {
      materials: []
    };
  },
  mounted() {
    axios.get("http://localhost:3008/api/materials")
      .then(response => {
        // Assuming your API returns an array of materials
        this.materials = response.data;
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching materials:', error);
      });
  }
};
</script>
