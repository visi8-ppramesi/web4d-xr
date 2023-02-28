<template>
  <div>
    <button
      id="btnPause"
      class="button4D"
      :disabled="isButtonDisabled"
      @click="pauseFn"
    >
      PAUSE
    </button>
    <button
      id="btnPlay"
      class="button4D"
      :disabled="isButtonDisabled"
      @click="playFn"
    >
      PLAY
    </button>
  </div>
  <div id="viewer-container">
    <canvas id="viewer-canvas"></canvas>
  </div>
</template>

<script>
import Web4DScene from "@/web4d/build4dScene";
export default {
  data() {
    return {
      fourDScene: null,
      isButtonDisabled: true,
    };
  },
  watch: {
    $route() {
      this.fourDScene.web4dmodel.destroy();
    },
  },
  unmounted() {
    this.fourDScene.web4dmodel.destroy();
  },
  mounted() {
    const canvas = document.getElementById("viewer-canvas");
    const container = document.getElementById("viewer-container");
    this.fourDScene = new Web4DScene(container, canvas, [
      "https://dev.fourdviews.com/ltd/Trio_Take_4_20_00fps_FILTERED_MOBILE_1440.4ds",
      "https://dev.fourdviews.com/ltd/Trio_Take_4_20_00fps_FILTERED_MOBILE_1440.4ds",
      "https://dev.fourdviews.com/ltd/Trio_Take_4.wav",
    ]);
    this.playFn = this.fourDScene.getPlayFunction();
    this.pauseFn = this.fourDScene.getPauseFunction();
    this.fourDScene.web4dmodel.getResolvedPromise().then(() => {
      this.isButtonDisabled = false;
    });
  },
  // methods: {
  //   pauseFn(){

  //   },
  //   playFn(){

  //   }
  // }
};
</script>

<style>
#viewer-canvas {
  height: 100vh;
  width: 100vw;
}
</style>
