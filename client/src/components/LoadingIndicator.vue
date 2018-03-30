<template>
  <span class="icon" style="width: 100%; text-align: center;" v-if="!dataLoaded">
    <i class="fas fa-spinner fa-spin is-primary"></i>
   </span>
</template>

<script>
  export default {
    name: 'LoadingIndicator',
    props: ['dataLoaded']
  }
</script>
