<template>
  <section class="hero is-dark is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column is-4 is-offset-1">

            <div class="card" v-bind:class="playerOneAdded" v-if="!isBattle">
              <header class="card-header">
                <p class="card-header-title is-centered">
                  PI Fighter One: {{ playerOne ? playerOne.name : '' }}
                </p>
              </header>
              <div class="card-content">
                <b-autocomplete
                  v-model="placeHolder.p1"
                  :data="filteredPlayerOneDataArray"
                  field="name"
                  placeholder="e.g. Michael!!!!!"
                  icon="magnify"
                  @select="option => playerOne = option">
                  <template slot="empty">No results - Please Add New Player</template>
                </b-autocomplete>
                <div class="battle-image" v-if="playerOne">
                  <img :src="playerOne.avatar" class="avatar">
                </div>
              </div>
            </div>

            <div class="card animated-delay-short fadeInDown" v-else>
              <header class="card-header">
                <p class="card-header-title is-centered">
                  PI Fighter One: {{ playerOne ? playerOne.name : '' }}
                </p>
              </header>
              <div class="card-content">
                <div v-if="gameResults.throwOne" class="columns is-centered u-margin--top">
                  <img :src="images[gameResults.throwOne]" class="thrown-image">
                </div>

              </div>
            </div>
          </div>

          <div class="column is-2">
              <h1 class="versus has-text-centered">vs.</h1>
          </div>

          <div class="column is-4">
            <div class="card" v-bind:class="playerTwoAdded" v-if="!isBattle">
              <header class="card-header">
                <p class="card-header-title is-centered">
                  PI Fighter Two: {{ playerTwo ? playerTwo.name : '' }}
                </p>
              </header>
              <div class="card-content">
                <b-autocomplete
                  v-model="placeHolder.p2"
                  :data="filteredPlayerTwoDataArray"
                  field="name"
                  placeholder="e.g. Michael!!!!!"
                  icon="magnify"
                  @select="option => playerTwo = option">
                  <template slot="empty">No results - Please Add New Player</template>
                </b-autocomplete>
                <div class="battle-image" v-if="playerTwo">
                  <img :src="playerTwo.avatar" class="avatar">
                </div>
              </div>
            </div>

            <div class="card animated-delay-short fadeInDown" v-else>
              <header class="card-header">
                <p class="card-header-title is-centered">
                  PI Fighter Two: {{ playerTwo ? playerTwo.name : '' }}
                </p>
              </header>
              <div class="card-content">
                <div v-if="gameResults.throwTwo" class="columns is-centered u-margin--top is-flex">
                  <img :src="images[gameResults.throwTwo]" class="thrown-image">
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="columns is-centered">
          <div class="column is-6" v-show="debounceBtn" v-if="!isBattle">
            <a
              class="button is-large is-fullwidth is-primary"
              v-bind:class="{ 'animated-delay fadeInUp': showButton}"
              @click="playGame">
              ROSHAMBO!
            </a>
          </div>
        </div>

        <div class="columns is-centered" v-if="gameResults.winner && isBattle">
          <div class="column is-4">
            <div class="card animated-delay flipInX">
              <header class="card-header">
                <p class="card-header-title is-centered">
                  Winner!
                </p>
              </header>
              <div class="card-content u-text-center">
                <p class="winner-title">
                  {{ gameResults.winner.name }}
                </p>
                <div class="battle-image">
                  <img :src="gameResults.winner.avatar" class="avatar">
                </div>
                <p class="winner-title">
                  {{ gameResults.winner.chant }}
                </p>
              </div>
              <div class="card-content has-text-centered">
                <a
                  class="button is-fullwidth is-primary"
                  v-bind:class="{ 'animated-delay zoomIn': showButton}"
                  @click="refresh">
                  New Match
                </a>
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
  import BattleService from '@/services/BattleService'
  import GameLogsService from '@/services/GameLogsService'
  import LeaderboardService from '@/services/LeaderboardService'

  import Rock from '../assets/images/rock.svg'
  import Paper from '../assets/images/paper.svg'
  import Scissors from '../assets/images/scissors.svg'

  export default {
    data() {
      return {
        players: [],
        placeHolder: {
          p1: '',
          p2: ''
        },
        playerOne: '',
        playerTwo: '',
        displayBtn: false,
        gameResults: {},
        images: {
          Rock,
          Paper,
          Scissors
        },
        isBattle: false
      }
    },
    mounted () {
      this.getPlayers()
    },
    computed: {
      playerOneAdded() {
        return this.playerOne ?  'player-added animated jackInTheBox' : ''
      },
      playerTwoAdded() {
        return this.playerTwo ? 'player-added animated jackInTheBox' : ''
      },
      filteredPlayerOneDataArray() {
        return this.players.filter(player => {
          return player.name
            .toString()
            .toLowerCase()
            .indexOf(this.placeHolder.p1.toLowerCase()) >= 0
        }).filter(player => {
          return this.playerTwo
              ? player.name
                .toString()
                .toLowerCase()
                .indexOf(this.playerTwo.name.toLowerCase()) === -1
              : player
        })
      },
      filteredPlayerTwoDataArray() {
        return this.players.filter(player => {
          return player.name
            .toString()
            .toLowerCase()
            .indexOf(this.placeHolder.p2.toLowerCase()) >= 0
        }).filter(player => {
          return this.playerOne
            ? player.name
              .toString()
              .toLowerCase()
              .indexOf(this.playerOne.name.toLowerCase()) === -1
            : player
        })
      },
      showButton () {
        return this.playerOne && this.playerOne.name !== '' && this.playerTwo && this.playerTwo.name !== ''
      },
      debounceBtn: function () {
        if (this.showButton)  {
          return 'animated-delay fadeInUp'
        }
      }
    },
    methods: {
      playGame() {
        this.isBattle = true
        BattleService.submitBattle({player1: this.playerOne, player2: this.playerTwo}).then(res => {
          this.gameResults = res.data

          let log = {
            date: this.gameResults.date,
            playerOne: this.gameResults.playerOne._id,
            playerTwo: this.gameResults.playerTwo._id,
            throwOne: this.gameResults.throwOne,
            throwTwo: this.gameResults.throwTwo,
            winner: this.gameResults.winner._id
          }

          GameLogsService.addGame(log)
          LeaderboardService.updateLeaderboards(log)
        })
      },
      async getPlayers() {
        const response = await PlayerService.fetchPlayers()
        this.players = response.data.players
      },
      refresh() {
        this.isBattle = false
        this.placeHolder.p1 = ''
        this.placeHolder.p2 = ''
        this.playerOne = ''
        this.playerTwo = ''
        this.playerOneAdded()
        this.playerTwoAdded()
      }
    }
  }
</script>
