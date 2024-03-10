<!-- this is to display the Reservation fonctionnality, not at all final -->

<script setup >
  import { ref } from 'vue'
  
  const articles = ref(null);

  // contains the date for the reservation that the user want to do
  const reservation = ref({
    id_materials: [],
    end: null,
    start: null,
  })

  // contains error message when attempting to create reservation
  const errorMessage = ref(null);
  // contains the reservation created by the server
  const reservationValidated = ref(null)

  // make a reservation based on the data in reservation
  // return a bool wheter or not the reservation was made
  async function makeReservation() {
    // reset both variables
    errorMessage.value = null;
    reservationValidated.value = null;
    
    // basic verification before making the request
    if (reservation.value.end == null || 
        reservation.value.start == null ||
        reservation.value.id_materials.length == 0
        ) 
    {
      // information incomplet error message
      errorMessage.value = "Les informations renseignees sont insuffisantes pour reserver un ou plusieurs articles"
      return false;
    }

    // try to create a reservation
    fetch("http://localhost:3008/api/reservation/", {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify(reservation.value)
    })
    .then(resp => resp.json())
    .then((resp) => {
      // if error
      if ("err" in resp){
        errorMessage.value = resp.err
      // if success
      } else {
        reservationValidated.value = resp
      }
    })
    
    return true;
  }

  async function getThreeFirstMaterials(){
    let res = await fetch("http://localhost:3008/api/materials/")
    let value = await res.json();
    if (value.length >= 3) {
      articles.value = value.slice(0,3);
    } else {
      articles.value = value;
    }
  }

  getThreeFirstMaterials();
</script>

<template>
  <main class='w-full flex flex-col items-center justify-center bg-white text-black shadow-md rounded-md p-5'>

    <form class='flex flex-col items-start' @submit.prevent="makeReservation">

      <!-- Materials to choose (by id) -->
      <fieldset>
      <legend class="mb-4 text-2xl font-medium text-center">Choisir un ou plusieurs articles à reserver</legend>

      <!-- create check box matching the variable articles -->
      <div v-for="article in articles" :key="article.id">
        <input class="w-5 mr-2 inline-block align-middle text-black rounded-md h-8 px-4" type="checkbox" :id=article.id.toString() :name=article.name :value="article.id" v-model="reservation.id_materials"/>
        <label  class="mb-2" :for=article.name>{{ article.name }}, {{ article.price }} euros / jours</label>
      </div>
      </fieldset>

      <!-- Date picker -->
        <label  class="mb-2" for="start">Debut de la reservation</label>
        <input type="date" name="start" v-model=reservation.start class="w-full shadow-inner border-b-2 w-full mb-1 text-black rounded-md h-8 px-4">
        <label  class="mb-2 " for="end">Fin de la reservation</label>
        <input type="date" name="end" v-model=reservation.end class= "w-full shadow-inner border-b-2 w-full mb-1 text-black rounded-md h-8 px-4">


      <!-- Submit button -->
      <div class=" w-full flex flex-col items-center">
        <button class="w-80 items-center bg-purple-500 mt-2 mb-2 rounded-md text-white h-8" type="submit">Reserver</button>
      </div>
     
    </form>

    <!-- Display error message -->
    <p v-if="errorMessage != null">Erreur : {{ errorMessage }}</p>

    <!-- Display the reservation if everything went well -->
    <p v-if="reservationValidated != null">
      Votre reservation commence le {{ reservationValidated.start }}
      et finit le {{ reservationValidated.end }},
      pour un total de {{ reservationValidated.total_price }} euros.
    </p>

  </main>
</template>

<style>

/* display dates in column */


</style>