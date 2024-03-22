<template>
  <header class="z-10 w-screen h-auto bg-[#483A65] fixed text-white flex flex-wrap items-center phone:justify-center md:justify-between md:p-0">
    <div class="w-100 flex items-center" >
    <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="125" height="125" />
        <h1 class="text-3xl font-medium ">ResaNature</h1>
    </div>
    <div>
      <nav class="phone:mb-4 xl:mb-0 xl:mr-8">
        <RouterLink class="transition duration-300 hover:transition hover:duration-300 hover:bg-[#dfa3f5]/25" v-if="!isConnect" to="/info8/inscription">Inscription</RouterLink>
        <RouterLink class="transition duration-300 hover:transition hover:duration-300 hover:bg-[#dfa3f5]/25" v-if="!isConnect" to="/info8/login">Connexion</RouterLink>
        <RouterLink class="transition duration-300 hover:transition hover:duration-300 hover:bg-[#dfa3f5]/25" v-else to="/info8">Accueil</RouterLink>
        <RouterLink class="transition duration-300 hover:transition hover:duration-300 hover:bg-[#dfa3f5]/25" to="/info8/material/add">Ajouter un materiel</RouterLink>
        <RouterLink class="transition duration-300 hover:transition hover:duration-300 hover:bg-[#dfa3f5]/25" to="/info8/reservation">Reserver du materiel</RouterLink>
        <RouterLink class="transition duration-300 hover:transition hover:duration-300 hover:bg-[#dfa3f5]/25" to="/info8/afficheMateriaux">Voir les Matériaux</RouterLink>
        <RouterLink class="transition duration-300 hover:transition hover:duration-300 hover:bg-[#dfa3f5]/25" to="/info8/material/modify">Modifier un materiel</RouterLink>
        <div v-if="isConnect">
          <a @click="logout(true)">Déconnexion</a> <br>
          <h2 class="mb-4 text-1xl font-medium m-10"> Bonjour {{ username }} {{ userLastname }}</h2>
        </div>
      </nav>
    </div>
  </header>
  <div class="h-screen bg-no-repeat bg-cover" style="background-image: url('../src/assets/bg.jpg');">
    <div class="phone:h-[42vh] sm:h-[57vh] phone:w-[70vw] xl:w-[20vw] bg-[#483A65] flex flex-col items-center rounded-md block absolute phone:top-[40vh] xl:top-[30vh] right-[15vw]">
      <h3 class="text-white font-medium text-xl mb-5 mt-5">Rechercher</h3>
     
      <input type="text" class="w-56 p-1 text-white bg-transparent border-b border-white focus:border-b placeholder-white" placeholder="Votre recherche">
      <div class = "w-56 m-2">
        <label for="begin" class="text-white">Date de début</label>
        <input type="date"  class="w-56 p-1 text-white bg-transparent border-b border-white focus:border-b placeholder-white" name="begin" placeholder="Votre date de début">
      </div>
      <div class = "w-56 m-2">
        <label for="end" class="text-white" >Fin de début</label>
        <input type="date"  class="w-56 p-1 text-white bg-transparent border-b border-white focus:border-b placeholder-white" name="end" placeholder="Votre date de fin">
      </div>
      <div class = "w-56 m-2">
        <label for="price" class="text-white">Prix</label>
        <input type="number"  class="w-56 p-1 text-white bg-transparent border-b border-white focus:border-b placeholder-white" name="price" placeholder="Votre prix moyen ">
      </div>
      <button class="bg-indigo-900 p-2 px-8 text-white font-medium shadow rounded-xl mt-4 ">Chercher</button>
    </div>
  </div>
  <RouterView />

</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { tokenValid } from "./js/utils.js";

const isConnect = ref(false);
const username = ref("");
const userLastname = ref("");

const getInfoUser = async (token) => {

  const headers = {
    Authorization: `Bearer ${token}` // Ajoutez le token JWT dans les en-têtes de la requête
  };

  try {
    const response = await axios.post("http://localhost:3008/api/infoUser", null, { headers });
    if (response.data.foundUser) {
      return response.data.foundUser;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des informations de l'utilisateur:", error);
    throw error;
  }
}

const logout = (click) => {
  axios.delete("http://localhost:3008/api/infoUser/" + localStorage.getItem('token'));

  localStorage.removeItem('token');
  localStorage.removeItem('infoUser');

  if (click) {
    window.location.reload();
  }
};

const checkConnection = async () => {
  const isValidToken = await tokenValid();
  const user = localStorage.getItem('infoUser');

  if (isValidToken && user) {
    isConnect.value = true;
    const infoUser = JSON.parse(user);
    username.value = infoUser.name;
    userLastname.value = infoUser.lastname;
  } else {
    const token = localStorage.getItem("token");
    const infoUser = await getInfoUser(token);
    if (infoUser) {
      username.value = infoUser.name;
      userLastname.value = infoUser.lastname;
      localStorage.setItem("infoUser", JSON.stringify(infoUser));
      isConnect.value = true;
    } else {
      logout(false);
    }
  }
}

onMounted(checkConnection);


</script>

<style scoped>

::-webkit-calendar-picker-indicator {
    filter: invert(1);
}
.logo {

  margin: 0 auto 2rem;
}

 nav {
  width: 100%;
  text-align: center;
}
 
nav a.router-link-exact-active {
  color: rgb(205, 178, 217);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid white;
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

}
</style>