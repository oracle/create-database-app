<!--
  Copyright (c) 2024, Oracle and/or its affiliates.
  All rights reserved
  Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
-->

<script setup>
import { ref, onMounted } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

const isConnected = ref()

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/api/connection/status');
    const data = await response.json();
    isConnected.value = data.status === 'ok';
  } catch (error) {
    console.error('Error fetching connection status:', error);
    isConnected.value = false;
  }
})
</script>

<template>
  <div>
    <a 
      href="https://www.oracle.com/database/"
      target="_blank"
    >
      <img
        src="./assets/ORCL.svg"
        class="logo"
        alt="Oracle logo"
      >
    </a>
    <a
      href="https://vuejs.org/"
      target="_blank"
    >
      <img
        src="./assets/vue.svg"
        class="logo vue"
        alt="Vue logo"
      >
    </a>
  </div>
  <HelloWorld :status="isConnected" />
</template>


<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
