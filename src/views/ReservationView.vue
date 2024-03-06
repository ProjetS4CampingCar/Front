<script setup >
  import { ref } from 'vue'
  
  const articles = ref([{
      id: 1,
      name: "article 1"
    },
    {
      id: 2,
      name: "article 1"
    },
    {
      id: 3,
      name: "article 1"
    }]);

  const reservation = ref([{
    id_materials: [],
    end: null,
    start: null,
  }])
    
  function makeReservation() {
    return false;
  }

</script>

<template>
  <main>
    HELLO
    <!-- <form @submit.prevent="makeReservation">
      <fieldset>
      <legend>Choisir un article à reserver</legend>

      <div v-for="article in articles" :key="article.id">
        <input type="checkbox" :id=article.id.toString() :name=article.name checked />
        <label :for=article.name>{{ article.name }}</label>
      </div>
      

      </fieldset>
      <input type="date" v-model=r.start>
      <input type="date" v-model=r.end>
    </form> -->
    <input type="date" >
    <input type="date" >
  </main>
</template>