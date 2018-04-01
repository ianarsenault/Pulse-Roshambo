<template>
  <section class="hero is-dark is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column is-3">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title is-centered">
                  {{ name }}
                </p>
              </header>
              <div class="card-content">
                <div class="content">
                  <div class="field">
                    <label class="label">Nickname: </label>
                    {{ nickname }}
                  </div>
                  <div class="field">
                    <label class="label">Chant: </label>
                    {{ chant }}
                  </div>
                  <div class="field">
                    <label class="label">Conquered: </label>
                    <!-- {{ conquered }} -->
                  </div>
                  <div class="field">
                    <label class="label">Nemesis: </label>
                    <!-- {{ nemesis }} -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-7">
            <div v-if="games && games.length > 0">
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
                  <td>{{ game.playerOne.name }}</td>
                  <td>{{ game.playerTwo.name }}</td>
                  <td>{{ game.playerOneThrew }}</td>
                  <td>{{ game.playerTwoThrew }}</td>
                  <td>{{ game.winner.name }}</td>
                </tr>
                </tbody>
              </table>
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
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import PlayerService from '@/services/PlayerService'
  import GameLogsService from '@/services/GameLogsService'
  import moment from 'moment'

  export default {
    name: 'PlayerProfile',
    data () {
      return {
        name: '',
        nickname: '',
        chant: '',
        games: [],
        errors: []
      }
    },
    mounted () {
      this.getPlayer()
      this.getPlayerGames()
    },
    methods: {
      moment: function (date) {
        return moment(date);
      },
      async getPlayer () {
        const response = await PlayerService.getPlayer({
          id: this.$route.params.id
        })
        this.name = response.data.name
        this.nickname = response.data.nickname
        this.chant = response.data.chant
      },
      async getPlayerGames () {
        const response = await GameLogsService.getPlayerGames({
          id: this.$route.params.id
        })
        this.games = response.data
        console.log(this.games)
      }
    }
  }
</script>
