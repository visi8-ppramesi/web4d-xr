<template>
  <div class="home">
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
};
</script>

<style>
.home {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
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
