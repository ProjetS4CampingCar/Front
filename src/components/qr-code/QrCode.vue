<script setup lang="ts">
import QrcodeVue, { type Level, type RenderAs } from 'qrcode.vue'

withDefaults(defineProps<{
  // Value content of qrcode
  value: string
  // Error correction level (one of 'L', 'M', 'Q', 'H')
  level?: Level
  // Generate QRcode as canvas or svg
  renderAs?: RenderAs
}>(), {
  level: 'M',
  renderAs: 'svg',
})

</script>

<template>
  <main>
    <qrcode-vue :value="value" :level="level" :render-as="renderAs" />
  </main>
</template>

<style></style>