<template>
  <div class="bg-tertiary grid grid-flow-rows grid-cols-2 gap-4 sm:grid-cols-4 ">
    <div
      :class="{ 'col-span-full': clickedElement === id }"
      class="flex flex-row"
      v-for="(material, id) in materials"
      :key="id"
    >
      <!-- Main content -->
      <div 
        class="max-w-64 px-4 border-l-4 border-buttonColor box-content text-black  relative flex-col transition-all duration-1000"
        :class="{ 'hover:scale-95 duration-500': clickedElement !== id, 'transition-all duration-1000 ease-in-out': clickedElement === id}"
        @click="toggleDescription(id)"
      >
        <img class="rounded  max-w-40 sm:max-w-48 " src="C:\Users\jojoe\Documents\USMB\Project\S4\logo\RentaVan\bleu\logo.png" alt="test" />

        <div v-if="clickedElement != id" class="font-medium text-textColor1 decoration-buttonColor hover:text-hoverColor cursor-pointer ">
          {{ material.name }}
        </div>
        <div v-if="clickedElement != id" class="text-textColor2">
          {{ material.price }}€/j
        </div>
      </div>
      
      <!-- Description content -->
      <div>
        <div v-if="clickedElement === id" class="font-medium text-textColor1 decoration-buttonColor hover:text-hoverColor cursor-pointer ">
            {{ material.name }}
          </div>
          <div v-if="clickedElement === id" class="text-textColor2">
            {{ material.price }}€/j
          </div>
          
        <div v-if="clickedElement === id" class="col-span-full description">
          Description : 
          {{ material.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      materials: [],
      clickedElement: null,
    };
  },
  mounted() {
    axios.get("http://localhost:3008/api/materials")
      .then(response => {
        this.materials = response.data;
      })
      .catch(error => {
        console.error('Error fetching materials:', error);
      });
  },
  methods: {
    showDescription(id) {
      this.clickedElement = id;
    },
    hideDescription(id) {
      this.clickedElement = null;
    },
    toggleDescription(id) {
      if (this.clickedElement === id) {
        this.hideDescription(id);
      } else {
        this.showDescription(id);
      }
    },
  }
};
</script>
