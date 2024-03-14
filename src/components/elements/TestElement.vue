<template>
    <div>
      <ELLabel text="Nom :" />
      <ELInput type="text" />
      <ELButton text="Soumettre" />
      <ElementCheckBox text = "Wow"/>
    </div>
  </template>
  
  <script>
  import ELLabel from '@/components/elements/ElementLabel.vue'
  import ELInput from '@/components/elements/ElementInput.vue'
  import ELButton from '@/components/elements/ElementButton.vue'
  import ElementCheckBox from './ElementCheckBox.vue'
  
  export default {
    components: {
      ELLabel,
      ELInput,
      ELButton,
      ElementCheckBox
    }
  }
  </script>