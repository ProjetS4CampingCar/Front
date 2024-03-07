<script setup >
  import { ref } from 'vue'
  
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

  const reservation = ref({
    id_materials: [],
    end: null,
    start: null,
  })
   
  async function makeReservation() {

    // check data
    if (reservation.value.end == null || 
        reservation.value.start == null ||
        reservation.value.id_materials.length == 0
        ) 
    {
      console.log("wrong informations")
      return false;
    }

    // fetch("localhost:3008/api/reservation", {
    //   method: "POST",
    //   body: reservation.value
    // })
    // .then(resp => resp.value())
    // .then(resp => console.log(resp.json()))

    fetch("http://localhost:3008/api/reservation/").then(resp => resp.json()).then(data => console.log(data));
    return true;
  }

  function log (){
    console.log(reservation.value);
  }
</script>

<template>
  <main>
    <form @submit.prevent="makeReservation">
      <fieldset>
      <legend>Choisir un article à reserver</legend>

      <div v-for="article in articles" :key="article.id">
        <input type="checkbox" :id=article.id.toString() :name=article.name :value="article.id" v-model="reservation.id_materials"/>
        <label :for=article.name>{{ article.name }}</label>
      </div>
      
      </fieldset>
      <input type="date" v-model=reservation.start>
      <input type="date" v-model=reservation.end>
      <button type="submit">Reserver</button>
    </form>
    <button @click="log">logger</button>
  </main>
</template>

<style>
</style>