<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue'; 

const name = ref('');
const description = ref('');
const price = ref('');
const state = ref('');
const cat = ref('');
const errorMessage = ref('')

function add(){
  if (!name.value || !description.value || !price.value || !state.value || !cat.value) {
    errorMessage.value = "Veuillez remplir tous les champs.";
    return;
  }
  console.log(cat)
  const data = {
    name : name.value,
    description: description.value,
    price: price.value,
    state: state.value,
    category: cat.value
  }
  console.log(data)
  axios.post("http://localhost:3008/api/materials", data).then(response =>{
    console.log("Material créé: ", response.data);
    name.value = '';
    description.value = '';
    price.value = '';
    state.value = '';
    cat.value = '';
    errorMessage.value = '';
    /* generateQRCodeWithID(id, name);
    alert("Matériel ajouté");
    window.location.href= "./home" */
  }).catch(error => {
    console.error("Erreur lors de la création du matériel: ", error);
    errorMessage.value = "Erreur lors de la création du matériel. Veuillez réessayer.";
  });
}
</script>

<!-- TODO : créer le header -->
<!-- 
<script setup lang="ts">
    import Header from '../components/header.vue'
</script> 

<template>
  <main>
    <Header />
  </main>
</template>

-->
<template>
    <div class='w-full flex flex-col items-center justify-center bg-white text-black shadow-md rounded-md max-w-sm p-5'>
      <h3 class="mb-4 text-3xl font-medium m-10">Ajouter un objet</h3>
      <div class="flex flex-col items-start">
        <label class="mb-2 text-gray-400"> Nom de l'objet : </label>
        <input class="tshadow-inner border-b-2 w-full mb-1 text-black rounded-md h-8 px-4" v-model='name' type='text' /> 

        <label class="mb-2 text-gray-400"> Description de l'objet : </label>
        <input class="shadow-inner border-b-2 w-full mb-1 text-black rounded-md h-8 px-4" v-model='description'/>

        <label class="mb-2 text-gray-400"> Image de l'objet : </label>
        <input class=" w-full mb-1 text-black rounded-md h-8 px-4" type='file'/> 

        <label class="mb-2 text-gray-400"> Prix de la réservation à la journée : </label>
        <input class="shadow-inner border-b-2 w-full mb-1 text-black rounded-md h-8 px-4" type='number'  v-model='price'/>

        <label class="mb-2 text-gray-400"> Catégorie : </label>
        <select class="shadow-inner border-b-2 w-full mb-1 text-black rounded-md h-8 px-4" v-model='cat'>
            <option value="Equipement Camping">Equipement Camping</option>
            <option value="Equipement Tente">Equipement Tente</option>
            <option value="Equipement Voiture">Equipement Voiture</option>
            <option value="Equipement Nature">Equipement Nature</option>
        </select>

        <label class="mb-2 text-gray-400"> Etat de l'objet : </label>
        <select class="shadow-inner border-b-2 w-full mb-1 text-black rounded-md h-8 px-4" v-model='state'>
            <option value="Neuf">Nouveau</option>
            <option value="Trés Bon Etat">Très bon état</option>
            <option value="Bon Etat">Bon état</option>
            <option value="Mauvais Etat">Mauvais état</option>
        </select>
        <p>{{ errorMessage }}</p>
      </div>
      <input type='submit' @click='add()' value='Ajouter cet objet' class="w-80 bg-purple-500 mt-2 mb-2 rounded-md text-white h-8"/> 
    </div>
</template>

