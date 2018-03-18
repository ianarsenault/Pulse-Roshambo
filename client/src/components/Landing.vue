<template>

  <section class="hero is-dark is-fullheight">
    <nav class="navbar is-transparent">
        <div class="navbar-end">
          <div class="navbar-item">
            <router-link v-bind:to="{ name: 'NewPlayer' }" class="button">
               <span class="icon">
                    <i class="fas fa-plus"></i>
               </span>
              <span>New Player</span>
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column is-4 is-offset-1">
            <div class="card" v-bind:class="playerOneAdded">
              <header class="card-header">
                <p class="card-header-title is-centered">
                  PI Fighter One: {{ playerone }}
                </p>
              </header>
              <div class="card-content">
                <b-autocomplete
                  v-model="nameone"
                  :data="filteredPlayerOneDataArray"
                  placeholder="e.g. Michael!!!!!"
                  icon="magnify"
                  @select="option => playerone = option">
                  <template slot="empty">No results - Please Add New Player</template>
                </b-autocomplete>
              </div>
            </div>
          </div>

          <div class="column is-2">
              <h1 class="versus title is-1 has-text-centered">Versus</h1>
          </div>

          <div class="column is-4">
            <div class="card" v-bind:class="playerTwoAdded">
              <header class="card-header">
                <p class="card-header-title is-centered">
                  PI Fighter Two: {{ playertwo }}
                </p>
              </header>
              <div class="card-content">
                <b-autocomplete
                  v-model="nametwo"
                  :data="filteredPlayerTwoDataArray"
                  placeholder="e.g. Michael!!!!!"
                  icon="magnify"
                  @select="option => playertwo = option">
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
  export default {
    data() {
      return {
        data: [
          'Ian',
          'Jameson',
          'Jay',
          'Keys',
          'Christian',
          'Brad',
          'Anne',
          'Katy',
          'Isabel'
        ],
        nameone: '',
        nametwo: '',
        playerone: null,
        playertwo: null,
        displayBtn: false
      }
    },
    computed: {
      playerOneAdded() {
        return this.playerone ?  'player-added animated jackInTheBox' : '';
      },
      playerTwoAdded() {
        return this.playertwo ? 'player-added animated jackInTheBox' : '';
      },
      filteredPlayerOneDataArray() {
        return this.data.filter((option) => {
          return option
            .toString()
            .toLowerCase()
            .indexOf(this.nameone.toLowerCase()) >= 0
        })
      },
      filteredPlayerTwoDataArray() {
        return this.data.filter((option) => {
          return option
            .toString()
            .toLowerCase()
            .indexOf(this.nametwo.toLowerCase()) >= 0
        })
      },
      showButton () {
        if (this.playerone && this.playertwo)  {
          this.displayBtn = true
          return 'animated-delay fadeInUp'
        }
      },
      debounceBtn: function () {
        if (this.playerone && this.playertwo)  {
          this.displayBtn = true
          return 'animated-delay fadeInUp'

        }
      }
    },
    methods: {}
  }
</script>

<style>
  @import '../assets/style/main.css';
  @import '../assets/style/animate.min.css';
</style>
