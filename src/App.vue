<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/camping_car.png" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="Nom du projet"></HelloWorld>

      <nav>
        <RouterLink v-if="!isConnect" to="/info8/inscription">Inscription</RouterLink>
        <RouterLink v-if="!isConnect" to="/info8/login">Connexion</RouterLink>
        <RouterLink v-else to="/info8">Accueil</RouterLink>
        <RouterLink to="/info8/material/add">Ajouter un materiel</RouterLink>
        <RouterLink to="/info8/reservation">Reserver du materiel</RouterLink>
        <RouterLink to="/info8/afficheMateriaux">Voir les Matériaux</RouterLink>

        <div v-if="isConnect">
          <a @click="logout(true)">Déconnexion</a> <br>
          <h2 class="mb-4 text-1xl font-medium m-10"> Bonjour {{ username }} {{ userLastname }}</h2>
        </div>



      </nav>
    </div>
  </header>


  <RouterView />

  <shopping></shopping>
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { tokenValid } from "./js/utils.js";
import shopping from "./components/shopping/Shopping.vue"

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
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: gray;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>./components/utils.js
