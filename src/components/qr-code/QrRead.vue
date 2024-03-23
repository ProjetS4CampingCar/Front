<script setup lang="ts">
import { QrcodeStream } from 'vue-qrcode-reader'
import { ref } from 'vue'

async function onDetect(detectedValues: unknown): Promise<void> {
  console.log(detectedValues);
  detect.value = detectedValues
}

const err = ref<string>("");
const detect = ref<unknown>(null);


/*** track functons ***/

function paintOutline(detectedCodes: any, ctx: any) {
  for (const detectedCode of detectedCodes) {
    const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

    ctx.strokeStyle = 'red'

    ctx.beginPath()
    ctx.moveTo(firstPoint.x, firstPoint.y)
    for (const { x, y } of otherPoints) {
      ctx.lineTo(x, y)
    }
    ctx.lineTo(firstPoint.x, firstPoint.y)
    ctx.closePath()
    ctx.stroke()
  }
}
function paintBoundingBox(detectedCodes: any, ctx:any) {
  for (const detectedCode of detectedCodes) {
    const {
      boundingBox: { x, y, width, height }
    } = detectedCode

    ctx.lineWidth = 2
    ctx.strokeStyle = '#007bff'
    ctx.strokeRect(x, y, width, height)
  }
}
function paintCenterText(detectedCodes:any, ctx:any) {
  for (const detectedCode of detectedCodes) {
    const { boundingBox, rawValue } = detectedCode

    const centerX = boundingBox.x + boundingBox.width / 2
    const centerY = boundingBox.y + boundingBox.height / 2

    const fontSize = Math.max(12, (50 * boundingBox.width) / ctx.canvas.width)

    ctx.font = `bold ${fontSize}px sans-serif`
    ctx.textAlign = 'center'

    ctx.lineWidth = 3
    ctx.strokeStyle = '#35495e'
    ctx.strokeText(detectedCode.rawValue, centerX, centerY)

    ctx.fillStyle = '#5cb984'
    ctx.fillText(rawValue, centerX, centerY)
  }
}
const trackFunctionOptions = [
  { text: 'nothing (default)', value: undefined },
  { text: 'outline', value: paintOutline },
  { text: 'centered text', value: paintCenterText },
  { text: 'bounding box', value: paintBoundingBox }
]
const trackFunctionSelected = ref(trackFunctionOptions[1])



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
    <div id="cam">
      <QrcodeStream constraints="environment" @detect="onDetect" @error="onError" :track="trackFunctionSelected.value"></QrcodeStream>
    </div>
  </main>
</template>

<style>
#cam {
  height: 10rem;
  width: 10rem;
}
</style>