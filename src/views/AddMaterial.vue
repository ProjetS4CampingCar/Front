<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue'; 

const name = ref('');
const description = ref('');
const price = ref('');
const state = ref('');
const category = ref('');
const errorMessage = ref('')

function add(){
  if (!name.value || !description.value || !price.value || !state.value || !category.value) {
    errorMessage.value = "Veuillez remplir tous les champs.";
    return;
  }
  const data = {
    name : name.value,
    description: description.value,
    price: price.value,
    state: state.value,
    category: category.value
  }
  console.log(data)
  axios.post("http://localhost:3008/api/materials", data).then(response =>{
    console.log("Material créé: ", response.data);
    name.value = '';
    description.value = '';
    price.value = '';
    state.value = '';
    category.value = '';
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
    <div class='flex flex-col justify-center'>
      <label> Nom de l'objet : </label>
      <input class="text-black border-b border-black focus:border-b focus:outline-none" v-model='name' type='text' /> 

      <label> Description de l'objet : </label>
      <input class="text-black border-b border-black focus:border-b focus:outline-none" v-model='description'/>

      <label> Prix de l'objet : </label>
      <input class="text-black border-b border-black focus:border-b focus:outline-none" type='number'  v-model='price'/>

      <label> Etat de l'objet : </label>
      <select class="text-black border-b border-black focus:border-b focus:outline-none" v-model='state'>
          <option value="Neuf">Nouveau</option>
          <option value="Trés Bon Etat">Très bon état</option>
          <option value="Bon Etat">Bon état</option>
          <option value="Mauvais Etat">Mauvais état</option>
      </select>

      <label> Catégorie : </label>
      <select class="border-white text-black border-b border-black focus:border-b focus:outline-none" v-model='category'>
          <option value="Neuf">Equipement Camping</option>
          <option value="Trés Bon Etat">Equipement Tente</option>
          <option value="Bon Etat">Equipement Voiture</option>
          <option value="Mauvais Etat">Equipement Nature</option>
      </select>
        <p>{{ errorMessage }}</p>
      <input type='submit' @click='add()' value='Ajouter cet objet' class=""/> 
    </div>
</template>

