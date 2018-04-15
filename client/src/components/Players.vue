<template>
  <div class="players">
    <section class="hero">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            Players
          </h1>
          <h2 class="subtitle">
            A list of all ROSHAMBO players
          </h2>
        </div>
      </div>
    </section>

    <loading-indicator :data-loaded="dataLoaded"></loading-indicator>
    <template v-if="dataLoaded">
      <div v-if="players && players.length > 0">
        <router-link v-bind:to="{ name: 'NewPlayer' }" class="button is-primary is-fullwidth u-margin--bottom">
          Add Player
        </router-link>

        <div class="container">
          <div class="columns is-multiline">
            <div class="column is-4" v-for="(player, index) in players">
              <div class="card bottom-space shadow-animate">
                <div class="card-image">
                  <div class="image players-avatar" v-if="player.avatar">
                    <img :src="playerImage(player.avatar)" class="u-margin--top" alt="Player Avatar">
                  </div>
                  <p class="has-text-centered chant">"{{ player.chant }}"</p>
                </div>
                <div class="card-content has-text-centered">
                  <p><strong class="title is-2 is-primary card-name">{{ player.name }}</strong></p>
                  <p><strong>Nickname:</strong> {{ player.nickname }}</p>
                  <!--<p>-->
                    <!--<strong>Wins:</strong> 1-->
                    <!--<strong>Losses:</strong> 1-->
                  <!--</p>-->
                </div>
                <footer class="card-footer">
                  <router-link v-bind:to="{ name: 'PlayerProfile', params: { id: player._id } }"
                               class="card-footer-item is-primary">Profile
                  </router-link>
                  <router-link v-bind:to="{ name: 'EditPlayer', params: { id: player._id } }"
                               class="card-footer-item is-primary">Edit
                  </router-link>
                  <a href="#" class="card-footer-item is-primary"
                     @click="deleteAlert(player._id, player.name)">Delete</a>
                </footer>
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
              <div class="card-content">
                <router-link v-bind:to="{ name: 'NewPlayer' }" class="add_post_link button is-fullwidth is-primary">
                  Add Player
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import PlayerService from '@/services/PlayerService'
  import LoadingIndicator from "./LoadingIndicator.vue"

  import defaultImage from '@/assets/images/default-avatar.png'

  export default {
    components: {LoadingIndicator},
    name: 'players',
    data() {
      return {
        players: [],
        isPaginated: true,
        isPaginationSimple: false,
        defaultSortDirection: 'asc',
        currentPage: 1,
        perPage: 5,
        dataLoaded: false
      }
    },
    mounted() {
      this.getPlayers()
    },
    methods: {
      async getPlayers() {
        this.dataLoaded = false
        const response = await PlayerService.fetchPlayers()
        this.players = response.data.players
        this.dataLoaded = true
      },
      async deletePlayer(id) {
        await PlayerService.deletePlayer(id)
        this.getPlayers()
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
