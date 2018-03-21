<template>
  <div class="players">
    <nav class="navbar is-transparent">
      <div class="navbar-end">
        <div class="navbar-item">
          <router-link v-bind:to="{ name: 'Leaderboard' }" class="navbar-item">
               <span class="icon">
                  <i class="fas fa-chart-line"></i>
               </span>
            <span>Leaderboard</span>
          </router-link>

          <router-link v-bind:to="{ name: 'Players' }" class="navbar-item">
               <span class="icon">
                  <i class="fas fa-users"></i>
               </span>
            <span>Players</span>
          </router-link>

          <router-link v-bind:to="{ name: 'Landing' }" class="button">
               <span class="icon">
                 <i class="fas fa-arrow-left"></i>
               </span>
            <span>Back</span>
          </router-link>
        </div>
      </div>
    </nav>

    <section class="hero">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            OOOOPS!
          </h1>
          <h2 class="subtitle">
            Looks like I haven't done a damn thing on this page
          </h2>
        </div>
      </div>
    </section>

    <div class="columns is-centered">
      <div class="column is-half">
        <figure class="image">
          <img class="rc" src="../assets/images/talosian-trapcard.jpg">
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'players',
    data () {
      return {
        data: []
      }
    },
    methods: {

    }
  }
</script>

<style>
  .rc {
    border-radius: 25px !important;
  }
</style>
