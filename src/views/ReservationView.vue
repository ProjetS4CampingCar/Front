<!-- this is to display the Reservation fonctionnality, not at all final -->

<script setup>
import { ref } from 'vue'

// hard coded material choices
const articles = ref([{
  id: 1,
  name: "article 1"
},
{
  id: 2,
  name: "article 2"
},
{
  id: 3,
  name: "article 3"
}]);

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
  ) {
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
      if ("err" in resp) {
        errorMessage.value = resp.err
        // if success
      } else {
        reservationValidated.value = resp
      }
    })

  return true;
}

</script>

<template>
  <main>

    <form @submit.prevent="makeReservation">

      <!-- Materials to choose (by id) -->
      <fieldset>
        <legend>Choisir un ou plusieurs articles à reserver</legend>

        <!-- create check box matching the variable articles -->
        <div v-for="article in articles" :key="article.id">
          <input type="checkbox" :id=article.id.toString() :name=article.name :value="article.id"
            v-model="reservation.id_materials" />
          <label :for=article.name>{{ article.name }}</label>
        </div>
      </fieldset>

      <!-- Date picker -->
      <div id="dates">
        <label for="start">De but de la reservation</label>
        <input type="date" name="start" v-model=reservation.start
          class="border-b border-black focus:border-b focus:outline-none">
        <label for="end">Fin de la reservation</label>
        <input type="date" name="end" v-model=reservation.end
          class="border-b border-black focus:border-b focus:outline-none">
      </div>

      <!-- Submit button -->
      <button type="submit">Reserver</button>
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
#dates {
  display: flex;
  flex-direction: column;
  width: 10rem;
}
</style>