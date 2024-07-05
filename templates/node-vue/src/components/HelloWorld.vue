<!--
  Copyright (c) 2024, Oracle and/or its affiliates.
  All rights reserved
  Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
-->
  
<script setup>

const checkConnectionStatus=(isConnected)=>{
if (isConnected == undefined) {
      return 'Checking connection status...'
    } else if (isConnected) {
      return 'Database is working!'
    } else {
      return 'Something is wrong with the database!'
    }
}

const props = defineProps({
  status: Boolean,
})
</script>

<template>
  <h1>{{ checkConnectionStatus(props.status) }}</h1>

  <div class="card">
    <p>
      Edit <code>components/HelloWorld.vue</code> to test HMR.
    </p>
  </div>
 
  <p class="read-the-docs">Click on the Oracle and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>

