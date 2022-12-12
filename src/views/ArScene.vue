<template>
  <div class="over">
    <span ref="promptText" id="promptText">Loading...</span>
    <div ref="progressBar" id="progressBar" style="display: none">
      <div ref="playProgress" id="playProgress"></div>
      <div ref="loadProgress" id="loadProgress"></div>
    </div>
    <img
      ref="pauseBtn"
      id="pauseBtn"
      class="media-btn"
      :src="pauseBtn"
      style="display: none"
    />
    <img
      ref="muteBtn"
      id="muteBtn"
      class="media-btn"
      :src="muteBtn"
      style="display: none"
    />
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
  watch: {
    $route() {
      this.destroyXr();
      if (
        this.loadingComponent &&
        document.getElementsByClassName("vld-container").length > 0
      ) {
        this.loadingComponent.hide();
      }
    },
  },
  methods: {
    mountScene() {
      document.body.insertAdjacentHTML("beforeend", this.baseHtml.default);
    },
    destroyXr() {
      const ascene = document.getElementsByTagName("a-scene")[0];
      ascene.parentNode.removeChild(ascene);
      const eightWallLoading = document.getElementById("loadingContainer");
      if (eightWallLoading !== null) {
        eightWallLoading.parentNode.removeChild(eightWallLoading);
      }
      const html = document.getElementsByTagName("html")[0];
      html.className = this.origHtmlClass;
      window.removeEventListener("xrloaded", this.mountScene);
    },
  },
  mounted() {
    let scriptPromise;
    const { promptText, progressBar, playProgress, pauseBtn, muteBtn } =
      this.$refs;
    if (!document.getElementById("8thwall-script")) {
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
                  hologram4dsComponent(window.AFRAME, {
                    promptText,
                    progressBar,
                    playProgress,
                    pauseBtn,
                    muteBtn,
                  });
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
      window.addEventListener("xrloaded", this.mountScene);
    });
  },
};
</script>

<style></style>
