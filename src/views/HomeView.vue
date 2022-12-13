<template>
  <div class="home">
    <div class="buttons-container">
      <button class="button" @click="$router.push('/ar')">Show AR Scene</button>
      <button class="button" @click="$router.push('/viewer')">
        Show 4D Viewer
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
