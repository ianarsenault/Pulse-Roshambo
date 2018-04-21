<template>
  <div class="players">
    <section class="hero">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            Game Logs
          </h1>
          <h2 class="subtitle">
            A list of all ROSHAMBO games
          </h2>
        </div>
      </div>
    </section>

    <loading-indicator :data-loaded="dataLoaded"></loading-indicator>

    <template v-if="dataLoaded && games && games.length > 0">
      <div v-for="game in games" class="columns is-centered" style="margin: 0 10%;">
        <div class="column is-three-quarters">
          <game-card :game="game"></game-card>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="columns is-centered">
        <div class="column is-4">
          <div class="card">
            <div class="card-image">
              <figure class="image">
                <img src="../assets/images/nothing2see.gif" alt="Nothing Here">
              </figure>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import GameLogsService from '@/services/GameLogsService'
  import moment from 'moment'
  import LoadingIndicator from "./LoadingIndicator.vue"
  import GameCard from "./GameCard.vue"

  export default {
    name: 'GameLogs',
    components: {LoadingIndicator, GameCard},
    data() {
      return {
        games: [],
        errors: [],
        dataLoaded: false,
      }
    },
    mounted() {
      this.getAllGames()
    },
    methods: {
      moment: function (date) {
        return moment(date)
      },
      async getAllGames() {
        this.dataLoaded = false
        const response = await GameLogsService.fetchGames()
        this.games = response.data.gamelogs
        this.dataLoaded = true
      }
    }
  }
</script>
