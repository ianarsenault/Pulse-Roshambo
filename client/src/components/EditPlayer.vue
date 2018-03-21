<template>

  <section class="hero is-dark is-fullheight">
    <nav class="navbar is-transparent">
      <div class="navbar-end">
        <div class="navbar-item">
          <router-link v-bind:to="{ name: 'LeaderBoard' }" class="navbar-item">
               <span class="icon">
                  <i class="fas fa-chart-line"></i>
               </span>
            <span>Leaderboard</span>
          </router-link>

          <router-link v-bind:to="{ name: 'Players' }" class="navbar-item">
               <span class="icon">
                  <i class="fas fa-users"></i>
               </span>
            <span>Players</span>
          </router-link>

          <div class="navbar-item">
            <router-link v-bind:to="{ name: 'Landing' }" class="button">
               <span class="icon">
                 <i class="fas fa-arrow-left"></i>
               </span>
              <span>Home</span>
            </router-link>
          </div>

          <div class="navbar-item">
            <router-link v-bind:to="{ name: 'Players' }" class="button is-primary">
                <span class="icon">
                  <i class="fas fa-arrow-left"></i>
                </span>
              <span>Back</span>
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <div class="hero-body">
      <div class="container">

        <div class="columns is-centered">
          <div class="column is-4">

            <div class="card">
              <header class="card-header">
                <p class="card-header-title is-centered">
                  Update Tier 3 Member
                </p>
              </header>
              <div class="card-content">
                <div class="content">
                  <form>

                    <div class="field">
                      <label class="label">Name</label>
                      <div class="control">
                        <input class="input" type="text" placeholder="Ian A" name="name" v-model="name">
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Nickname</label>
                      <div class="control">
                        <input class="input" type="text" placeholder="GorgonsMaze" name="nickname" v-model="nickname">
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Winner Saying</label>
                      <div class="control">
                        <input class="input" type="text" placeholder="Booyakasha!" name="chant" v-model="chant">
                      </div>
                    </div>
                  </form>
                  <!-- END LOGIN FORM -->

                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="columns is-centered">
          <div class="column is-3">
            <a class="button is-large is-fullwidth is-primary" @click="UpdatePlayer">Update Player</a>
          </div>
        </div>


      </div>
    </div>
  </section>
</template>

<script>
  import PlayerService from '@/services/PlayerService'

  export default {
    name: 'EditPlayer',
    data () {
      return {
        name: '',
        nickname: '',
        chant: ''
      }
    },
    mounted () {
      this.getPlayer()
    },
    methods: {
      playerUpdated() {
        this.$toast.open({
          duration: 5000,
          message: `Player Information Updated!`,
          position: 'is-top',
          type: 'is-success'
        })
      },
      async getPlayer () {
        const response = await PlayerService.getPlayer({
          id: this.$route.params.id
        })
        this.name = response.data.name
        this.nickname = response.data.nickname
        this.chant = response.data.chant
      },
      async UpdatePlayer () {
        await PlayerService.updatePlayer({
          id: this.$route.params.id,
          name: this.name,
          nickname: this.nickname,
          chant: this.chant
        }).then(this.playerUpdated())
        this.$router.push({ name: 'Players' })
      }
    }
  }
</script>

<style>
  @import '../assets/style/main.css';
</style>

