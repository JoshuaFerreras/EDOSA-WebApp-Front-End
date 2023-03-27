<script setup>
import { RouterView } from 'vue-router';
</script>


<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<style scoped>
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  #app {
    font-family: "Poppins", sans-serif;
    font-size: 1.6rem;
    color: #222;
    background: white;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
