<script setup>
import { RouterView } from 'vue-router';
import { ref } from 'vue';
const user = ref(null);
</script>

<template>
  <div id="app">
    <RouterView :user="user" />
  </div>
</template>

<style>
* {
  margin: 0;
}

#app {

  font-family: "Poppins", sans-serif;
  font-size: 1.6rem;
  color: #222;
  background: white;
  height: 100vh;
  justify-content: center;
  align-items: center;
}
</style>
