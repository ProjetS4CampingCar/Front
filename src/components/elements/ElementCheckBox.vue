<template>
  <div class="flex">
    <!-- Hidden default checkbox -->
    <input 
      type="checkbox" 
      class="hidden" 
      v-model="isChecked" 
      id="custom-checkbox"
    >
    
    <!-- Custom styled checkbox -->
    <label for="custom-checkbox" class="flex items-center cursor-pointer">
      <div class="relative">
        <!-- Checkbox background -->
        <div class="w-5 h-5 bg-white rounded-md hover:scale-110 duration-500 ease-in-out" :class="{ 'bg-secondary': isChecked }"></div>
        <!-- Checkmark -->
        <div 
          v-if="isChecked"
          class="absolute inset-0 flex items-center justify-center text-white dark:text-gray-800"
        >
          <svg 
            class="w-3 h-3 fill-current"
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20"
          >
            <path 
              fill-rule="evenodd" 
              d="M6.293 11.707a1 1 0 1 0 1.414 1.414l5-5a1 1 0 0 0-1.414-1.414L7 10.586l-2.293-2.293a1 1 0 1 0-1.414 1.414l3 3z" 
            />
          </svg>
        </div>
      </div>
      <!-- Label text -->
      <span class="pl-2 duration-500 ease-in-out" :class="{ 'text-secondary': isChecked }">{{ text }}</span>
    </label>
  </div>
</template>

<script>
export default {
  props: ['text'],
  data() {
    return {
      isChecked: false // Initialize isChecked data property to false
    }
  }
}
</script>
