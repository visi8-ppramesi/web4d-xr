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
  betterHoldDrag,
  hologram4dsComponent,
  hologram4dsPrimitive,
} from "@/web4d/aframeComponents";
import mitt from "@/utils/emitter";

export default {
  data() {
    return {
      baseHtml: require("../web4d/aframeSceneTrio.html"),
      pauseBtn: require("../assets/icons/pause.svg"),
      muteBtn: require("../assets/icons/mute.svg"),
    };
  },
  watch: {
    $route() {
      this.destroyXr();
    },
  },
  methods: {
    mountScene() {
      document.body.insertAdjacentHTML("beforeend", this.baseHtml.default);
    },
    destroyXr() {
      mitt.emit("destroyModel");
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
  unmounted() {
    this.destroyXr();
  },
  mounted() {
    let scriptPromise;
    // const { promptText, progressBar, playProgress, pauseBtn, muteBtn } =
    //   this.$refs;
    let runFunc = this.mountScene;
    if (!document.getElementById("8thwall-script")) {
      scriptPromise = Promise.all([
        this.injectScript(
          "8thwall-script",
          `https://apps.8thwall.com/xrweb?appKey=${process.env.VUE_APP_8THWALL_APP_KEY}`
        ),
        this.injectScript(
          "8frame-script",
          `https://cdn.8thwall.com/web/aframe/8frame-1.3.0.min.js`,
          () => {
            return Promise.all([
              this.injectScript(
                "xrextras-script",
                `https://cdn.8thwall.com/web/xrextras/xrextras.js`,
                () => {
                  hologram4dsComponent(window.AFRAME); /*, {
                    promptText,
                    progressBar,
                    playProgress,
                    pauseBtn,
                    muteBtn,
                  });*/
                  hologram4dsPrimitive(window.AFRAME);
                  betterHoldDrag(window.AFRAME);
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
      runFunc = () => {
        window.addEventListener("xrloaded", this.mountScene);
      };
    } else {
      scriptPromise = Promise.resolve(true);
    }
    scriptPromise.then(() => {
      runFunc();
    });
  },
};
</script>

<style>
#progressBar {
  position: absolute;
  width: 60vw;
  bottom: 3vh;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10px;
  box-shadow: #00000052 0px 0px 30px;
}
#playProgress {
  position: absolute;
  width: 1vh;
  height: 1vh;
  border-radius: 10px;
  background-color: #ad50ff; /* progress bar color */
}
#loadProgress {
  height: 1vh;
  border-radius: 10px;
  background-color: #ffffff; /* load bar color */
}
.over {
  z-index: 10;
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  text-align: center;
  color: white;
  font-family: "Nunito", monospace;
  text-shadow: 0px 0px 5px black;
}
/* "Tap to Place/Loading..." Text */
#promptText {
  font-size: 2em;
  bottom: 12vh;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
}
.media-btn {
  position: absolute;
  pointer-events: auto;
  width: 7vw;
  bottom: 2vh;
}
#pauseBtn {
  left: 4vw;
}
#muteBtn {
  right: 4vw;
}
#gradient-box {
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.5)
  );
  z-index: -1;
  width: 100vw;
  height: 20vh;
  position: absolute;
  bottom: 0;
}
@media only screen and (min-width: 768px) {
  /* For Desktop */
  #promptText {
    font-size: 3em;
  }
  #progressBar {
    position: absolute;
    bottom: 5.5vh;
  }
  .media-btn {
    bottom: 4vh;
    width: 4vw;
  }
}
</style>
