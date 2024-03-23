<script setup lang="ts">
import QrcodeVue, { type Level, type RenderAs } from 'qrcode.vue'

withDefaults(defineProps<{
  // Value content of qrcode
  value: string
  // Error correction level (one of 'L', 'M', 'Q', 'H')
  level?: Level
  // Generate QRcode as canvas or svg
  renderAs?: RenderAs
  // Foreground color in hexa default is black
  foreground?: string
  // Background color in hexa default is white
  background?: string
  // Define how much wide the quiet zone should be.
  margin?: number
}>(), {
  level: 'M',
  renderAs: 'svg',
  foreground: '#000000',
  background: '#ffffff',
  margin: 1
})

</script>

<template>
  <main>
    <qrcode-vue :value="value" :level="level" :render-as="renderAs" :background="background" :foreground="foreground"
      :margin="margin" />
  </main>
</template>

<style></style>