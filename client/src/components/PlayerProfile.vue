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
                    Most Recent Battles and Player Statistics!
                  </h2>
                </div>
              </div>
            </section>

            <div class="tabs is-boxed">
              <ul>
                <li v-for="tab in tabs" v-bind:class="{'is-active': tab.isActive}">
                  <a @click="selectTab(tab)">
                    <span class="icon is-small">
                      <i  v-bind:class=[tab.icon]  aria-hidden="true"></i>
                    </span>
                    <span> {{ tab.displayName }} </span>
                  </a>
                </li>
              </ul>
            </div>

            <loading-indicator :data-loaded="dataLoaded"></loading-indicator>

            <div v-if="!showStats">
              <div v-if="(games && games.length > 0)"
                   v-for="game in games"
                   class="columns is-centered">
                <div class="column is-11">
                  <game-card :game="game"></game-card>
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
            </div>

            <div v-show="showStats">
              <div class="columns">
                <div class="column is-4">
                  <div class="card">
                    <div class="card-content has-text-centered">
                      <p class="title is-5">
                        Games Played
                      </p>
                      <p class="subtitle">
                        {{ playerStats.gamesCount }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="column is-4">
                  <div class="card">
                    <div class="card-content has-text-centered">
                      <p class="title is-5">
                        Games Won
                      </p>
                      <p class="subtitle">
                        {{ playerStats.winCount }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="column is-4">
                  <div class="card">
                    <div class="card-content has-text-centered">
                      <p class="title is-5">
                        Overall Average
                      </p>
                      <p class="subtitle">
                        {{ playerStats.average }}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="columns is-centered">
                <div class="column is-11">
                  <div class="card bottom-space">
                    <canvas id="barChart" width="400" height="200"></canvas>
                  </div>
                  <div class="card bottom-space">
                    <canvas id="pieChart" width="400" height="200"></canvas>
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
  import LoadingIndicator from "./LoadingIndicator.vue"
  import GameCard from "./GameCard.vue"
  import chartjs from 'chart.js'
  import chartsdefered from 'chartjs-plugin-deferred'

  import defaultImage from '@/assets/images/default-avatar.png'

  export default {
    name: 'PlayerProfile',
    components: {LoadingIndicator, GameCard},
    data() {
      return {
        player: [],
        games: [],
        errors: [],
        dataLoaded: false,
        isActive: false,
        showStats: false,
        tabs: [
          {
            name: 'battles',
            displayName: 'Recent Battles',
            icon: 'fas fa-list-alt'

          }, {
            name: 'stats',
            displayName: 'Player Statistics',
            icon: 'fas fa-signal'
          }
        ],
        playerStats: {
          gamesCount: 0,
          winCount: 0,
          lossCount: 0,
          rockCount: 0,
          scissorCount: 0,
          paperCount: 0,
          average: 0,
          stats: null
        }
      }
    },
    mounted() {
      this.getPlayer()
      this.getPlayerGames()
      this.getPlayerGameCount()
      this.getPlayerWinCount()
      this.getPlayerLossCount()
      /** WIP **/
      this.getPlayerThrows()
      /** END WIP **/
      this.tabs[0].isActive = true
    },
    methods: {
      moment: function (date) {
        return moment(date)
      },
      async getPlayer() {
        const response = await PlayerService.getPlayer({
          id: this.$route.params.id
        })
        this.player = response.data
      },
      async getPlayerGames() {
        const response = await GameLogsService.getPlayerGames({
          id: this.$route.params.id,
        })
        this.games = response.data
        this.dataLoaded = true
      },
      async getPlayerGameCount() {
        const response = await GameLogsService.getPlayerGameCount({
          id: this.$route.params.id,
        })
        this.playerStats.gamesCount = response.data.count
      },
      async getPlayerWinCount() {
        const response = await GameLogsService.getPlayerWinsCount({
          id: this.$route.params.id,
        })
        this.playerStats.winCount = response.data.length
        if (this.playerStats.winCount && this.playerStats.gamesCount) {
          this.playerStats.average = (this.playerStats.winCount / this.playerStats.gamesCount ).toFixed(2)
        } else {
          this.playerStats.average = 0
        }
      },
      async getPlayerLossCount() {
        const response = await GameLogsService.getPlayerLossCount({
          id: this.$route.params.id,
        })
        this.playerStats.lossCount = response.data.length
      },
      /** WIP **/
      async getPlayerThrows() {
        const response = await GameLogsService.getPlayerThrows({
          id: this.$route.params.id,
        })
        this.playerStats.stats = response.data
      },
      /** END WIP **/
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
      },
      selectTab(selectedTab) {
        this.tabs.forEach(
          function(tab){
            tab.isActive = (selectedTab.name === tab.name)
          }
        )
        if (selectedTab.name === 'stats') {
          this.showStats = true
          this.loadGraphs()
        } else {
          this.showStats = false
        }
      },
      loadGraphs() {
        let barchart = document.getElementById("barChart").getContext("2d")
        let winsData = {
          label: '# of Wins',
          data: [this.playerStats.winCount],
          backgroundColor: 'rgba(0, 128, 0, 1)',
          borderColor: 'rgba(0, 128, 0, 0.2)',
          borderWidth: 3
        }
        let lossesData = {
          label: '# of Losses',
          data: [this.playerStats.lossCount],
          backgroundColor: 'rgba(190, 67, 78, 1)',
          borderColor: 'rgba(190, 67, 78, 0.2)',
          borderWidth: 3
        }
        let barChart = new Chart(barchart, {
          type: 'bar',
          data: {
            datasets: [winsData, lossesData]
          },
          options: {
            plugins: {
              deferred: {
                xOffset: 150,
                delay: 250
              }
            },
            title: {
              display: true,
              text: this.player.name + '\'s Win Loss Data',
              fontSize: 18
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                  stepSize: 1
                }
              }]
            }
          }
        })

        let piechart = document.getElementById("pieChart").getContext("2d")
        let pieChart = new Chart(piechart, {
          type: 'pie',
          data: {
            labels: ["Rock", "Paper", "Scissors"],
            datasets: [{
              backgroundColor: ['#d62d1e', '#ff634a', '#ff9300'],
              data: [12, 14, 9]
            }]
          },
          options: {
            plugins: {
              deferred: {
                xOffset: 150,
                delay: 250
              }
            },
            title: {
              display: true,
              text: this.player.name + '\'s Most Thrown Hand',
              fontSize: 18
            }
          }
        })

        pieChart.update()
        barChart.update()

      }
    }
  }
</script>
