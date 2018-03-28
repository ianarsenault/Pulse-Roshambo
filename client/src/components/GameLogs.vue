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

    <div v-if="games && games.length > 0">
      <div class="columns is-centered">
        <div class="column is-half">
          <table class="table is-bordered is-narrow is-hoverable is-fullwidth">
            <thead>
            <tr>
              <th>Date</th>
              <th>Player One</th>
              <th>Player Two</th>
              <th>Player One Throw</th>
              <th>Player Two Throw</th>
              <th>Winner</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="game in games">
              <td>{{ moment(game.date).format('dddd, MMMM Do YYYY, h:mm a') }}</td>
              <td>{{ game.playerOne }}</td>
              <td>{{ game.playerTwo }}</td>
              <td>{{ game.playerOneThrew }}</td>
              <td>{{ game.playerTwoThrew }}</td>
              <td>{{ game.winner }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div v-else>
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
    </div>
  </div>
</template>

<script>
  import GameLogsService from '@/services/GameLogsService'
  import moment from 'moment'
  export default {
    name: 'GameLogs',
    data () {
      return {
        games: [],
        errors: []
      }
    },
    mounted () {
      this.getAllGames()
    },
    methods: {
      moment: function () {
        return moment();
      },
      async getAllGames () {
        const response = await GameLogsService.fetchGames()
        this.games = response.data.gamelogs
      }
    }
  }
</script>

<style>
  .rc {
    border-radius: 25px !important;
  }
</style>
