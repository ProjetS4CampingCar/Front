<script setup lang="ts">
import { ref } from 'vue'
import QrGen from '../components/qr-code/QrGen.vue'
import QrRead from '../components/qr-code/QrRead.vue'

const value = ref<string>("");
const genValue = ref<string>("Salut, est ce que ce super QR code te plait ?")

function printValue(v: string): void {
  value.value = v;
}
</script>

<template>
  <main>
    <QrGen :value="genValue" level="M" renderAs='canvas'></QrGen>
    <QrRead @detection="printValue"></QrRead>
    {{ value }}
  </main>
</template>

<style></style>