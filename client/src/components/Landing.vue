<template>

  <section class="hero is-dark is-fullheight">
    <nav class="navbar is-transparent">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
        </a>
        <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

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
                  rounded
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
                  rounded
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
        <div class="columns is-centered" v-if="(playerone && playertwo)">
          <div class="column is-6">
            <a class="button is-large is-fullwidth is-primary">ROSHAMBO!</a>
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
        playertwo: null
      }
    },
    computed: {
      playerOneAdded() {
        return this.playerone ?  'player-added' : '';
      },
      playerTwoAdded() {
        return this.playertwo ? 'player-added' : '';
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
      }
    }
  }
</script>

<style lang="css">
  @import url('https://fonts.googleapis.com/css?family=Quicksand');

  body {
    font-family: 'Quicksand', sans-serif;
  }

  .hero.is-dark.is-fullheight {
    background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.88)
    ), url('../assets/images/white.jpg') no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }

  .card {
    background-color: #ffffff08;
  }

  .versus {
    font-family: 'Quicksand', sans-serif;
    color: rgba(147, 147, 147, 0.62) !important;
  }

  .player-added {
    box-shadow: 0 2px 3px rgba(15, 243, 43, 0.5), 0 0 0 1px rgb(25, 193, 86);
  }
</style>
