<template>
  <div id="viewer-container">
    <canvas id="viewer-canvas"></canvas>
  </div>
</template>

<script>
import Web4DScene from "@/web4d/build4dScene";
export default {
  mounted() {
    const canvas = document.getElementById("viewer-canvas");
    const container = document.getElementById("viewer-container");
    new Web4DScene(container, canvas, [
      "https://dev.fourdviews.com/ltd/Fire_8thWall_final_20fps.4ds",
      "https://dev.fourdviews.com/ltd/8th Wall_fire_desktop.4ds",
      "https://dev.fourdviews.com/ltd/8thWall_Fire_export_final.wav",
    ]);
  },
};
</script>

<style>
#viewer-canvas {
  height: 100vh;
  width: 100vw;
}
</style>
