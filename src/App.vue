<template>
  <div class="bg-white grid grid-flow-rows grid-cols-2 gap-4 sm:grid-cols-4" >
    <div 
    class="mx-auto px-4 border-l-4 border-black box-content text-black text-nowrap" 
    v-for="(material, index) in materials" :key="index">
      <img src="C:\Users\jojoe\Documents\USMB\Project\S4\logo\RentaVan\bleu\logo.png" alt="test">
      <div class="underline decoration-violet-500 hover:no-underline hover:text-violet-500 cursor-pointer"> <!-- Added text-purple-500 class -->
        {{ material.name }}
      </div>
      <div>          
        {{ material.price }}€/j
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      materials: [
        { name: 'Vélo Enfant', description: 'Description 1', price: '15', state : 'good' },
        { name: 'Material 2', description: 'Description 2', price: '20', state: 'bad' },
        { name: 'Material 3', description: 'Description 3', price: '20', state: 'bad' },
        { name: 'Material 4', description: 'Description 4', price: '20', state: 'bad' },
        { name: 'Material 5', description: 'Description 5', price: '20', state: 'bad' },
        // Add more materials as needed
      ],
    };
  },
};
</script>
