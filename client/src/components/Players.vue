<template>
  <div class="players">
    <nav class="navbar is-transparent">
      <div class="navbar-end">
        <div class="navbar-item">
          <router-link v-bind:to="{ name: 'LeaderBoard' }" class="navbar-item">
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
            Players
          </h1>
          <h2 class="subtitle">
            A list of all ROSHAMBO players
          </h2>
        </div>
      </div>
    </section>

    <div v-if="players.length > 0">
      <router-link v-bind:to="{ name: 'NewPlayer' }" class="button is-primary is-fullwidth">Add Player</router-link>
      <div class="columns is-centered">
        <div class="column is-half">
          <table class="table is-bordered is-narrow is-hoverable is-fullwidth">
            <thead>
            <tr>
              <th>Name</th>
              <th>Nickname</th>
              <th>Chant</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="player in players">
              <td>{{ player.name }}</td>
              <td>{{ player.nickname }}</td>
              <td>{{ player.chant }}</td>
              <td align="center">
                <router-link v-bind:to="{ name: 'EditPlayer', params: { id: player._id } }" class="button">Edit</router-link>
              </td>
              <td>
                <a href="#" class="button">Delete</a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div v-else>
      There are no players.. Lets add one now <br /><br />
      <router-link v-bind:to="{ name: 'NewPlayer' }" class="add_post_link">Add Player</router-link>
    </div>
  </div>
</template>

<script>
  import PlayerService from '@/services/PlayerService'
  export default {
    name: 'players',
    data () {
      return {
        players: [],
        isPaginated: true,
        isPaginationSimple: false,
        defaultSortDirection: 'asc',
        currentPage: 1,
        perPage: 5
      }
    },
    mounted () {
      this.getPlayers()
    },
    methods: {
      async getPlayers() {
        const response = await PlayerService.fetchPlayers()
        this.players = response.data.players
      }
    }
  }
</script>

<style>
  @import '../assets/style/main.css';
</style>
