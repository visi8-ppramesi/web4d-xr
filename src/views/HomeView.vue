<template>
  <div class="home">
    <button @click="$router.push('/ar')">Show AR Scene</button>
    <button @click="$router.push('/viewer')">Show 4D Viewer</button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomeView",
};
</script>
