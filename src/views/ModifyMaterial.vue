<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';

const id_material = ref();
const name = ref('');
const description = ref('');
const price = ref('');
const state = ref('');
const cat = ref('');
const errorMessage = ref('');
const file = ref(null);
const is_exist = ref(false);
const picture = ref("")
console.log(is_exist.value)

function search(){
    if(isNaN(id_material.value)||id_material.value < 0){
        errorMessage.value = "id > 0";
        throw new Error("L'identifiant doit être positif")
    }
    axios.get("http://localhost:3008/api/materials/" + id_material.value).then(response => {
    if(response.data){
        is_exist.value = true
        name.value = response.data.name;
        description.value = response.data.description;
        price.value = response.data.price;
        state.value = response.data.state;
        cat.value = response.data.category;
        picture.value = "http://localhost:3008/pictures/materials/" + id_material.value + ".jpeg"
        console.log(picture.value)
    }else{
        is_exist.value = false
    }})
}


function modify() {
  const data = new FormData();
  data.append('id', id_material.value);
  data.append('name', name.value);
  data.append('file', file.value.files[0]);
  data.append('description', description.value);
  data.append('price', price.value);
  data.append('state', state.value);
  data.append('category', cat.value);

  const config = {
    headers: {
      enctype: "multipart/form-data"
    }
  }
  console.log(data)
  axios.put("http://localhost:3008/api/materials", data, config).then(response => {
    if (response.data) {
      console.log("Material modifié: ", response.data);
      name.value = '';
      description.value = '';
      price.value = '';
      state.value = '';
      cat.value = '';
      picture.value = ''
      errorMessage.value = '';
      is_exist.value = false;
      alert("Matériel modifie");
      window.location.reload()
    } else {
      errorMessage.value = "Erreur lors de la modification du matériel. Veuillez réessayer.";
    }
  }).catch(error => {
    console.error("Erreur lors de la modification du matériel: ", error);
    errorMessage.value = "Erreur lors de la modification du matériel. Veuillez réessayer.";
  });
}
</script>

<template>
    <div class='w-full flex flex-col items-center justify-center bg-white text-black shadow-md rounded-md p-5'>
        <h3 class="mb-4 text-3xl font-medium m-10">Modifier un objet</h3>
        <div class="flex flex-row justify-center align-center"> <!-- CHERCHER UN OBJET -->
            <input class="tshadow-inner border-b-2 w-50 mb-1 text-black rounded-md h-8 px-4" v-model='id_material' type='number' placeholder="Chercher l'id de l'objet"/>
            <input type='submit' @click="search()" value='Chercher' class="w-40 bg-purple-500 mt-2 mb-2 rounded-md text-white h-8"/>
        </div>
        <div v-if="is_exist"> 
            <div class="flex flex-col items-start w-full">
            <label class="mb-2 text-black-400"> Nom de l'objet : </label>
            <input class="tshadow-inner border-b-2 w-full mb-1 text-black rounded-md h-8 px-4" v-model='name' type='text' />

            <label class="mb-2 text-black-400"> Description de l'objet : </label>
            <input class="shadow-inner border-b-2 w-full mb-1 text-black rounded-md h-8 px-4" v-model='description' />

            <label class="mb-2 text-black-400"> Image de l'objet : </label>
            <input type="image" :src="picture" id="image" value='votre image'>
            <input class="w-full mb-1 text-black rounded-md h-8 px-4" ref="file" type='file'/>

            <label class="mb-2 text-black-400"> Prix de la réservation à la journée : </label>
            <input class="shadow-inner border-b-2 w-full mb-1 text-black rounded-md h-8 px-4" type='number' v-model='price' />

            <label class="mb-2 text-black-400"> Catégorie : </label>
            <select class="shadow-inner border-b-2 w-full mb-1 text-black rounded-md h-8 px-4" v-model='cat'>
                <option value="Equipement Camping">Equipement Camping</option>
                <option value="Equipement Tente">Equipement Tente</option>
                <option value="Equipement Divertissement">Equipement Divertissement</option>
                <option value="Equipement Plein air">Equipement Plein air</option>
                <option value="Equipement Sécurité">Equipement Sécurité</option>
            </select>

            <label class="mb-2 text-black-400"> Etat de l'objet : </label>
            <select class="shadow-inner border-b-2 w-full mb-1 text-black rounded-md h-8 px-4" v-model='state'>
                <option value="Neuf">Neuf</option>
                <option value="Très Bon Etat">Très bon état</option>
                <option value="Bon Etat">Bon état</option>
                <option value="Satisfaisant">Satisfaisant</option>
            </select>
            <p>{{ errorMessage }}</p>
            </div>
            <input type='submit' @click='modify()' value='Modifier cet objet'
            class="w-80 bg-purple-500 mt-2 mb-2 rounded-md text-white h-8" />
        </div>
        <div v-else>
            Veuillez entrer un nombre valide ou ajouter un materiel 
        </div>
    </div>
</template>