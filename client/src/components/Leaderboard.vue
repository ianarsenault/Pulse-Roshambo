<template>
  <div class="players">
    <section class="hero">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            Leaderboard
          </h1>
          <h2 class="subtitle">
            Leaderboard of all Roshambo Players
          </h2>
        </div>
      </div>
    </section>

    <div v-if="leaderboard && leaderboard.length > 0">
      <div class="columns is-centered">
        <div class="column is-half">
          <table class="table is-bordered is-narrow is-hoverable is-fullwidth">
            <thead>
            <tr>
              <th>Player</th>
              <th>Wins</th>
              <th>Loses</th>
              <th>Conquerer</th>
              <th>Nemesis</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="record in leaderboard">
              <td>{{ record.player }}</td>
              <td>{{ record.wins }}</td>
              <td>{{ record.loses }}</td>
              <td>{{ record.conquerer }}</td>
              <td>{{ record.nemesis }}</td>
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
  import LeaderboardService from '@/services/LeaderboardService'
  export default {
    name: 'Leaderboard',
    data () {
      return {
        games: [],
        errors: []
      }
    },
    mounted () {
      this.getLeaderboard()
    },
    methods: {
      async getLeaderboard () {
        const response = await LeaderboardService.getLeaderboard()
        this.games = response.data.leaderboard
      }
    }
  }
</script>

<style>
  .rc {
    border-radius: 25px !important;
  }
</style>
