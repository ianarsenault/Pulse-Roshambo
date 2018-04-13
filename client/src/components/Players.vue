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
          <div class="columns is-centered">
              <div class="column is-6">
                <div v-for="(player, index) in players">
                  <div class="card bottom-space shadow-animate">
                    <header class="card-header">
                      <p class="card-header-title is-centered">
                        Player {{ index + 1 }}
                      </p>
                    </header>
                    <div class="card-content">
                      <article class="media">
                        <div class="media-left">
                          <figure class="image" v-if="player.avatar">
                            <img :src="player.avatar" alt="Player Avatar">
                          </figure>
                          <figure class="image" v-else>
                            <img src="http://via.placeholder.com/150x200" alt="Player Avatar">
                          </figure>

                        </div>
                        <div class="media-content">
                          <div class="content">
                            <p><strong class="title is-2 is-primary">{{ player.name }}</strong></p>
                            <p>Nickname: {{ player.nickname }}</p>
                            <p>Victory Chant: "{{ player.chant }}"</p>
                          </div>
                        </div>
                      </article>
                    </div>
                    <footer class="card-footer">
                      <router-link v-bind:to="{ name: 'PlayerProfile', params: { id: player._id } }" class="card-footer-item is-primary">Profile
                      </router-link>
                      <router-link v-bind:to="{ name: 'EditPlayer', params: { id: player._id } }" class="card-footer-item is-primary">Edit
                      </router-link>
                      <a href="#" class="card-footer-item is-primary" @click="deleteAlert(player._id, player.name)">Delete</a>
                    </footer>
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
      }
    }
  }
</script>
