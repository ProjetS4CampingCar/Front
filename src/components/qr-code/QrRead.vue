<script setup lang="ts">
import { QrcodeStream } from 'vue-qrcode-reader'
import { ref } from 'vue'

const emit = defineEmits<{
  detection: [value: string]
}>()

type fromScan = Array<{
  boundingBox: {
    x: number,
    y: number,
    width: number,
    height: number,
    top: number,
    right: number,
    bottom: number,
    left: number
  },
  rawValue: string,
  format: string,
  cornerPoints: Array<{ x: number, y: number }>,
}>

type TrackFunction = (detectedCodes: fromScan, ctx: CanvasRenderingContext2D) => void;
type TrackOption = { text: string, value: TrackFunction | undefined };


/*** dedection ***/
async function onDetect(detectedCodes: fromScan): Promise<void> {
  const rawValue = detectedCodes[0].rawValue;
  emit("detection", rawValue);
}

/*** track functons ***/
function paintOutline(detectedCodes: fromScan, ctx: CanvasRenderingContext2D) {
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
function paintBoundingBox(detectedCodes: fromScan, ctx: CanvasRenderingContext2D): void {
  for (const detectedCode of detectedCodes) {
    const {
      boundingBox: { x, y, width, height }
    } = detectedCode

    ctx.lineWidth = 2
    ctx.strokeStyle = '#007bff'
    ctx.strokeRect(x, y, width, height)
  }
}

const trackFunctionOptions: Array<TrackOption> = [
  { text: 'nothing (default)', value: undefined },
  { text: 'outline', value: paintOutline },
  { text: 'bounding box', value: paintBoundingBox }
]

/*** error ***/
const err = ref<string>("");
const trackFunctionSelected = ref<TrackOption>(trackFunctionOptions[1])


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
    {{ err }}
    <div id="cam">
      <QrcodeStream constraints="environment" @detect="onDetect" @error="onError" :track="trackFunctionSelected.value">
      </QrcodeStream>
    </div>
  </main>
</template>

<style>
#cam {
  height: 15rem;
  width: 15rem;
}
</style>