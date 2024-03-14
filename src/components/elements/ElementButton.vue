<template>
    <button class="block border mt-3 mb-3 p-1 bg-primary text-white rounded pl-5 pr-5 hover:bg-white hover:text-primary ease-in-out duration-1000">{{ text }}</button>
  </template>
  
  <script>
  export default {
    props: ['text']
  }
  </script>