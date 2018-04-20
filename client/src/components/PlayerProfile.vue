<template>
  <section>
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-3">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title is-centered card-name is-primary">
                  {{ player.name }}
                </p>
              </header>
              <div class="card-image">
                <div class="image players-avatar">
                  <img :src="playerImage(player.avatar)" class="u-margin--top" alt="Player Avatar">
                </div>
                <p class="has-text-centered chant">"{{ player.chant }}"</p>
              </div>
              <div class="card-content">
                <div class="content">
                  <div class="field">
                    <label class="label">Nickname: </label>
                    {{ player.nickname }}
                  </div>
                  <div class="field">
                    <label class="label">Chant: </label>
                    {{ player.chant }}
                  </div>
                  <!--<div class="field">-->
                    <!--<label class="label">Conquered: </label>-->
                    <!--&lt;!&ndash; {{ conquered }} &ndash;&gt;-->
                  <!--</div>-->
                  <!--<div class="field">-->
                    <!--<label class="label">Nemesis: </label>-->
                    <!--&lt;!&ndash; {{ nemesis }} &ndash;&gt;-->
                  <!--</div>-->
                </div>
              </div>
              <footer class="card-footer">
                <router-link v-bind:to="{ name: 'EditPlayer', params: { id: player._id } }"
                             class="card-footer-item is-primary">Edit
                </router-link>
                <a href="#" class="card-footer-item is-primary"
                   @click="deleteAlert(player._id, player.name)">Delete</a>
              </footer>
            </div>
          </div>
          <div class="column is-7">
            <section class="hero">
              <div class="hero-body">
                <div class="container">
                  <h1 class="title">
                    Player Overview
                  </h1>
                  <h2 class="subtitle">
                    Most Recent Battles and more!
                  </h2>
                </div>
              </div>
            </section>

            <div class="tabs is-boxed">
              <ul>
                <li class="is-active">
                  <a>
                    <span class="icon is-small">
                      <i class="fas fa-list-alt" aria-hidden="true"></i>
                    </span>
                    <span>Recent Battles</span>
                  </a>
                </li>
              </ul>
            </div>

            <loading-indicator :data-loaded="dataLoaded"></loading-indicator>
            <template v-if="dataLoaded">
              <div v-if="games && games.length > 0"
                   v-for="game in games"
                   class="columns is-centered">
                <div class="column is-11 card u-margin--bottom">
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
              <div v-else>
                <div class="columns is-centered">
                  <div class="column is-half">
                    <figure class="image">
                      <img src="../assets/images/nothing2see.gif" alt="Nothing Here">
                    </figure>
                  </div>
                </div>
              </div>
            </template>
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
  import LoadingIndicator from "./LoadingIndicator.vue"
  import GameResult from "./GameResult.vue"

  import defaultImage from '@/assets/images/default-avatar.png'
  import Rock from '../assets/images/rock.svg'
  import Paper from '../assets/images/paper.svg'
  import Scissors from '../assets/images/scissors.svg'

  export default {
    components: {LoadingIndicator, GameResult},
    name: 'PlayerProfile',
    data () {
      return {
        player: [],
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
      this.getPlayer()
      this.getPlayerGames()
    },
    methods: {
      moment: function (date) {
        return moment(date)
      },
      async getPlayer () {
        const response = await PlayerService.getPlayer({
          id: this.$route.params.id
        })
        this.player = response.data
      },
      async getPlayerGames () {
        const response = await GameLogsService.getPlayerGames({
          id: this.$route.params.id,
        })
        this.games = response.data
        this.dataLoaded = true
      },
      async deletePlayer(id) {
        await PlayerService.deletePlayer(id)
        this.$router.push({name: 'Players'})
      },
      deleteAlert(id, name) {
        this.$snackbar.open({
          duration: 5000,
          message: 'Do you want to delete  ' + name + '? ',
          type: 'is-danger',
          position: 'is-bottom',
          actionText: 'Yes',
          onAction: () => {
            this.deletePlayer(id)
            this.$toast.open({
              message: 'Player Deleted',
              type: 'is-danger',
              queue: false
            })
          }
        })
      },
      playerImage(image) {
        return image ? `/static/uploads/${image}` : defaultImage
      }
    }
  }
</script>
