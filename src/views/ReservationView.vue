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
        reservation.value.start != null ||
        reservation.id_materials.length() == 0
        ) 
    {
      console.log("wrong informations")
      return false;
    }

    let res = await fetch("localhost:3008/api/reservation", {
      method: "POST",
      body: reservation.value
    })

    res_js = await res.json();

    console.log(res_js);

    return true;
  }

  function log (){
    console.log(reservation.value.start);
  }
</script>

<template>
  <main>
    <form @submit.prevent="makeReservation">
      <fieldset>
      <legend>Choisir un article à reserver</legend>

      <div v-for="article in articles" :key="article.id">
        <input type="checkbox" :id=article.id.toString() :name=article.name />
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