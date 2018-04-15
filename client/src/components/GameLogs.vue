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
    <template v-if="dataLoaded">

      <div class="columns is-centered" v-if="games && games.length > 0">
        <div class="column is-8">
          <div v-for="game in games" class="columns">
            <div class="column is-full card u-margin--bottom">
              <div class="log">

                <div class="log-player">
                  <p class="log-player--name">{{ game.playerOne.name }}</p>
                  <img :src="playerImage(game.playerOne.avatar)" class="log-player--avatar">
                  <game-result :winner="game.winner" :player="game.playerOne"></game-result>
                </div>

                <div class="log-summary">
                  <p>{{ moment(game.date).format('dddd, MMMM Do YYYY, h:mm a') }}</p>

                  <div class="log-throws">
                      <img :src="images[game.playerOneThrew]" class="log-throws--image">
                      <img :src="images[game.playerTwoThrew]" class="log-throws--image">
                  </div>
                </div>

                <div class="log-player">
                  <p class="log-player--name">{{ game.playerTwo.name }}</p>
                  <img :src="playerImage(game.playerTwo.avatar)" class="log-player--avatar">
                  <game-result :winner="game.winner" :player="game.playerTwo"></game-result>
                </div>

              </div>
            </div>
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
    </template>

  </div>
</template>

<script>
  import GameLogsService from '@/services/GameLogsService'
  import moment from 'moment'
  import LoadingIndicator from "./LoadingIndicator.vue"
  import GameResult from "./GameResult.vue"

  import Rock from '../assets/images/rock.svg'
  import Paper from '../assets/images/paper.svg'
  import Scissors from '../assets/images/scissors.svg'
  import defaultImage from '@/assets/images/default-avatar.png'

  export default {
    components: {LoadingIndicator, GameResult},
    name: 'GameLogs',
    data () {
      return {
        games: [],
        errors: [],
        dataLoaded: false,
        images: {
          Rock,
          Paper,
          Scissors
        },
      }
    },
    mounted () {
      this.getAllGames()
    },
    methods: {
      moment: function (date) {
        return moment(date)
      },
      async getAllGames () {
        this.dataLoaded = false
        const response = await GameLogsService.fetchGames()
        this.games = response.data.gamelogs
        this.dataLoaded = true
      },
      playerImage(image) {
        return image ? `/static/uploads/${image}` : defaultImage
      }
    }
  }
</script>
