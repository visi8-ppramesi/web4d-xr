<template>
  <div class="deleted">Storage Deleted</div>
</template>

<script>
import localforage from "localforage";

const forageStore = localforage.createInstance({
  driver: localforage.INDEXEDDB,
  name: "main-store",
});
export default {
  created() {
    forageStore.clear(() => {
      console.log("storage cleared");
    });
  },
};
</script>

<style>
.deleted {
  color: white;
  width: 100vw;
  height: 100vh;
  padding-top: calc(50vh - 20px);
}
</style>
