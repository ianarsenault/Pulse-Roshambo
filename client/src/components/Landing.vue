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
              </div>
            </div>
          </div>

        </div>
        <div class="columns is-centered">
          <div class="column is-6" v-show="debounceBtn">
            <a class="button is-large is-fullwidth is-primary" v-bind:class="showButton">ROSHAMBO!</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import PlayerService from '@/services/PlayerService'
  export default {
    data() {
      return {
        data: [],
        nameOne: '',
        nameTwo: '',
        playerOne: null,
        playerTwo: null,
        displayBtn: false
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
      async getPlayers() {
        const response = await PlayerService.fetchPlayers()
        let obj = response.data.players
        Object.keys(obj).forEach(key => {
          this.data.push(obj[key].name)
        })
      }
    }
  }
</script>
