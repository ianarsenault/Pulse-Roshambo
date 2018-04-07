<template>
  <nav class="navbar is-transparent">
    <div class="navbar-brand">
      <router-link v-bind:to="{ name: 'Landing' }" class="navbar-item" exact>
        <img :src="logo" alt="Tier 3" style="width: 100px height: auto">
      </router-link>
      <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div id="navbarExampleTransparentExample" class="navbar-menu">
      <div class="navbar-start">
        <router-link v-bind:to="{ name: 'Landing' }" class="navbar-item" active-class="link-is-active" exact>
          <span class="icon">
            <i class="fas fa-hand-scissors"></i>
          </span>
          <span>Fight!</span>
        </router-link>
        <router-link v-bind:to="{ name: 'Players' }" class="navbar-item" active-class="link-is-active">
          <span class="icon">
            <i class="fas fa-users"></i>
          </span>
          <span>Players</span>
        </router-link>
        <router-link v-bind:to="{ name: 'GameLogs' }" class="navbar-item" active-class="link-is-active">
           <span class="icon">
              <i class="fas fa-calendar-alt"></i>
           </span>
          <span>Game Logs</span>
        </router-link>
        <router-link v-bind:to="{ name: 'Leaderboard' }" class="navbar-item" active-class="link-is-active">
           <span class="icon">
              <i class="fas fa-chart-bar"></i>
           </span>
          <span>Leaderboard</span>
        </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <router-link v-bind:to="{ name: 'NewPlayer' }" class="button is-primary">
               <span class="icon">
                    <i class="fas fa-plus"></i>
               </span>
            <span>New Player</span>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import logo from '../assets/images/death2.svg'

  export default {
    name: 'Navigation',
    data() {
      return {
        logo: logo
      }
    }
  }
</script>
