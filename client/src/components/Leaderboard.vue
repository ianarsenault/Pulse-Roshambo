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
              <td>{{ record.player.name }}</td>
              <td>{{ record.wins }}</td>
              <td>{{ record.losses }}</td>
              <td>{{ record.conquerer ? record.conquerer : "Unkown" }}</td>
              <td>{{ record.nemesis ? record.nemesis : "Unkown" }}</td>
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
        leaderboard: [],
        errors: []
      }
    },
    mounted () {
      this.fetchLeaderboard()
    },
    methods: {
      async fetchLeaderboard () {
        const response = await LeaderboardService.fetchLeaderboard()
        response.data.leaderboard.sort(function (playerOne, playerTwo) {
          return playerTwo.wins - playerOne.wins
        })
        this.leaderboard = response.data.leaderboard
      }
    }
  }
</script>
