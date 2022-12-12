<template>
  <div class="over">
    <span id="promptText">Loading...</span>
    <div id="progressBar" style="display: none">
      <div id="playProgress"></div>
      <div id="loadProgress"></div>
    </div>
    <img
      id="pauseBtn"
      class="media-btn"
      :src="pauseBtn"
      style="display: none"
    />
    <img id="muteBtn" class="media-btn" :src="muteBtn" style="display: none" />
    <div id="gradient-box"></div>
  </div>
  <div id="scene-container"></div>
</template>

<script>
import {
  hologram4dsComponent,
  hologram4dsPrimitive,
} from "@/web4d/aframeComponents";

export default {
  data() {
    return {
      baseHtml: require("../web4d/aframeSceneExample.html"),
      pauseBtn: require("../assets/icons/pause.svg"),
      muteBtn: require("../assets/icons/mute.svg"),
    };
  },
  methods: {
    mountScene() {
      document.body.insertAdjacentHTML("beforeend", this.baseHtml);
    },
  },
  created() {
    let scriptPromise;
    if (!document.getElementById("8thwall-script") && this.detectMobile()) {
      scriptPromise = Promise.all([
        this.injectScript(
          "8thwall-script",
          `https://apps.8thwall.com/xrweb?appKey=${process.env.VUE_APP_8THWALL_APP_KEY}`
        ),
        this.injectScript(
          "8frame-script",
          `https://cdn.8thwall.com/web/aframe/8frame-1.2.0.min.js`,
          () => {
            return Promise.all([
              this.injectScript(
                "xrextras-script",
                `https://cdn.8thwall.com/web/xrextras/xrextras.js`,
                () => {
                  hologram4dsComponent(window.AFRAME);
                  hologram4dsPrimitive(window.AFRAME);
                  return Promise.resolve(true);
                }
              ),
              this.injectScript(
                "aframe-extras-script",
                `https://cdn.8thwall.com/web/aframe/aframe-extras-6.1.1.min.js`
              ),
            ]);
          }
        ),
      ]);
    } else {
      scriptPromise = Promise.resolve(true);
    }
    scriptPromise.then(() => {
      this.mountScene();
    });
  },
};
</script>

<style></style>
