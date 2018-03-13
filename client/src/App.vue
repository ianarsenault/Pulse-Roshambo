<template>
  <div id="app">
    <router-view/>

    <footer></footer>
  </div>
</template>

<script>
  import Navigation from '@/components/Navigation.vue'

  export default {
    components: {
      Navigation,
    },
    name: 'App'
  }
</script>

