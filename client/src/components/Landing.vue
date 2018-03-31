<template>
  <section class="hero is-dark is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column is-4 is-offset-1">
            <div class="card" v-bind:class="playerOneAdded">
              <header class="card-header">
                <p class="card-header-title is-centered">
                  PI Fighter One: {{ playerOne }}
                </p>
              </header>
              <div class="card-content">
                <b-autocomplete
                  v-model="nameOne"
                  :data="filteredPlayerOneDataArray"
                  placeholder="e.g. Michael!!!!!"
                  icon="magnify"
                  @select="option => playerOne = option">
                  <template slot="empty">No results - Please Add New Player</template>
                </b-autocomplete>

                <div v-if="gameResults.p1Throws" class="columns is-centered u-margin--top">
                  <img :src="images[gameResults.p1Throws]" class="thrown-image">
                </div>

              </div>
            </div>
          </div>

          <div class="column is-2">
              <h1 class="versus has-text-centered">Vs.</h1>
          </div>

          <div class="column is-4">
            <div class="card" v-bind:class="playerTwoAdded">
              <header class="card-header">
                <p class="card-header-title is-centered">
                  PI Fighter Two: {{ playerTwo }}
                </p>
              </header>
              <div class="card-content">
                <b-autocomplete
                  v-model="nameTwo"
                  :data="filteredPlayerTwoDataArray"
                  placeholder="e.g. Michael!!!!!"
                  icon="magnify"
                  @select="option => playerTwo = option">
                  <template slot="empty">No results - Please Add New Player</template>
                </b-autocomplete>

                <div v-if="gameResults.p2Throws" class="columns is-centered u-margin--top">
                  <img :src="images[gameResults.p2Throws]" class="thrown-image">
                </div>

              </div>
            </div>
          </div>
        </div>

        <div class="columns is-centered">
          <div class="column is-6" v-show="debounceBtn">
            <a class="button is-large is-fullwidth is-primary" v-bind:class="showButton" @click="playGame">ROSHAMBO!</a>
          </div>
        </div>

        <div class="columns is-centered" v-if="gameResults.winner">
          <div class="column is-4">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title is-centered">
                  Winner!
                </p>
              </header>
              <div class="card-content u-text-center">
                <p class="winner-title">
                  {{ gameResults.winner }}
                </p>
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

  import Rock from '../assets/images/rock.svg';
  import Paper from '../assets/images/paper.svg';
  import Scissors from '../assets/images/scissors.svg';

  export default {
    data() {
      return {
        data: [],
        playerMap: [],
        nameOne: '',
        nameTwo: '',
        playerOne: null,
        playerTwo: null,
        displayBtn: false,
        gameResults: {},
        images: {
          Rock,
          Paper,
          Scissors
        }
      }
    },
    mounted () {
      this.getPlayers()
    },
    computed: {
      playerOneAdded() {
        return this.playerOne ?  'player-added animated jackInTheBox' : '';
      },
      playerTwoAdded() {
        return this.playerTwo ? 'player-added animated jackInTheBox' : '';
      },
      filteredPlayerOneDataArray() {
        return this.data.filter((option) => {
          return option
            .toString()
            .toLowerCase()
            .indexOf(this.nameOne.toLowerCase()) >= 0
        })
      },
      filteredPlayerTwoDataArray() {
        return this.data.filter((option) => {
          return option
            .toString()
            .toLowerCase()
            .indexOf(this.nameTwo.toLowerCase()) >= 0
        })
      },
      showButton () {
        if (this.playerOne && this.playerTwo)  {
          this.displayBtn = true
          return 'animated-delay fadeInUp'
        }
      },
      debounceBtn: function () {
        if (this.playerOne && this.playerTwo)  {
          this.displayBtn = true
          return 'animated-delay fadeInUp'
        }
      }
    },
    methods: {
      playGame() {
        BattleService.submitBattle({player1: this.playerMap[0][1], player2: this.playerMap[1][1]}).then(res => {
          this.gameResults = res.data
        })
      },
      async getPlayers() {
        const response = await PlayerService.fetchPlayers()
        let obj = response.data.players
        Object.keys(obj).forEach(key => {
          this.data.push(obj[key].name)
          this.playerMap.push([obj[key].name, obj[key]._id])
        })
      }
    }
  }
</script>
