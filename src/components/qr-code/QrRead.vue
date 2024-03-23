<script setup lang="ts">
import { QrcodeStream } from 'vue-qrcode-reader'
import { ref } from 'vue'

async function onDetect(detectedValues: unknown): Promise<void> {
  console.log(detectedValues);
  detect.value = "det !"
}

const err = ref<string>("");
const detect = ref<string>("");

function onError(error: { name: string }): void {
  if (error.name === 'NotAllowedError') {
    // user denied camera access permission
    console.log("user denied camera access permission");
    err.value = "user denied camera access permission";
  } else if (error.name === 'NotFoundError') {
    // no suitable camera device installed
    console.log("no suitable camera device installed");
    err.value = "no suitable camera device installed";
  } else if (error.name === 'NotSupportedError') {
    // page is not served over HTTPS (or localhost)
    console.log("page is not served over HTTPS (or localhost)");
    err.value = "page is not served over HTTPS (or localhost)";
  } else if (error.name === 'NotReadableError') {
    // maybe camera is already in use
    console.log("maybe camera is already in use");
    err.value = "maybe camera is already in use"
  } else if (error.name === 'OverconstrainedError') {
    // did you request the front camera although there is none?
    console.log("did you request the front camera although there is none?");
    err.value = "did you request the front camera although there is none?";
  } else if (error.name === 'StreamApiNotSupportedError') {
    // browser seems to be lacking features
    console.log("browser seems to be lacking features");
    err.value = "browser seems to be lacking features";
  }
}
</script>

<template>
  <main>
    <p>Error : {{ err }}</p>
    <p>detect : {{ detect }}</p>
    <QrcodeStream constraints="environment" @detect="onDetect" @error="onError"></QrcodeStream>
  </main>
</template>

<style></style>