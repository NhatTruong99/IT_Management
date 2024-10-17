<template>
  <app-header />

  <div class="main-screen">
      <router-view />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';

  export default {
    name: 'App', 
    components: {
      AppHeader
    }
  }
</script>

<style>
.main-screen {
  margin-left: 250px;
}
</style>
