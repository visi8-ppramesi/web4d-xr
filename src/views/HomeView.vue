<template>
  <div class="home">
    <div>
      <img class="logo" :src="logo" />
    </div>
    <div class="buttons-container">
      <button class="button" @click="$router.push('/ar-fire')">
        Show AR Scene (Fire)
      </button>
      <button class="button" @click="$router.push('/viewer-fire')">
        Show 4D Viewer (Fire)
      </button>
      <button class="button" @click="$router.push('/ar-trio')">
        Show AR Scene (Trio)
      </button>
      <button class="button" @click="$router.push('/viewer-trio')">
        Show 4D Viewer (Trio)
      </button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomeView",
  data() {
    return {
      logo: require("../assets/visi8.png"),
    };
  },
};
</script>

<style>
.logo {
  width: 195px;
  margin-bottom: 30px;
}
.home {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.buttons-container {
  max-width: 360px;
  margin-left: auto;
  margin-right: auto;
  max-height: 360px;
  display: flex;
  flex-direction: column;
}

.button {
  padding: 5px 10px;
  margin: 5px;
}
</style>
