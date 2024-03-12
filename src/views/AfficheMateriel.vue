<template>
<div> {{ materiel.name }}</div>
</template>
  
  
  <script>
  import axios from 'axios';
  
  export default {
  name:'afficheMateriel',
    data() {
      return {
        materiel: [],
        clickedElement: null,
      };
    },
    mounted() {
      axios.get("http://localhost:3008/api/materials")
        .then(response => {
          this.materials = response.data;
        })
        .catch(error => {
          console.error('Error fetching materials:', error);
        });
    },
    methods: {
      toggleDescription(id) {
        this.clickedElement = this.clickedElement === id ? null : id;
      },
      isEndOfRow(id) {
        var numCols = getNbCols(); // Change this to match your number of columns
        return (id + 1) % numCols === 0;
      },
      getNbCols() {
        // Logique pour déterminer le nombre de colonnes en fonction de la largeur de l'écran
        const screenWidth = window.innerWidth;
        if (screenWidth < 640) {
          console.log("2");
          return 2; 
          
        } else if (screenWidth < 1024) {
          console.log("3");
          return 3; 
        } else if (screenWidth < 1280) {
          console.log("4");
          return 4; 
        } else {
          console.log("5");
          return 5; 
        }
      },
    },
  };
  </script>