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

          <router-link v-bind:to="{ name: 'Landing' }" class="button">
               <span class="icon">
                 <i class="fas fa-arrow-left"></i>
               </span>
            <span>Back</span>
          </router-link>
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
                  Add New Tier 3 Member
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

                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="columns is-centered">
          <div class="column is-3">
            <a class="button is-large is-fullwidth is-primary" @click="addPlayer">Add New Player</a>
          </div>
        </div>


      </div>
    </div>
  </section>
</template>

<script>
  import PlayerService from '@/services/PlayerService'

  export default {
    name: 'NewPlayer',
    data () {
      return {
        name: '',
        nickname: '',
        chant: ''
      }
    },
    methods: {
      playerSaved() {
        this.$toast.open({
          duration: 3500,
          message: `Player Information Saved!`,
          position: 'is-top',
          type: 'is-success'
        })
      },
      async addPlayer () {
        await PlayerService.addPlayer({
          name: this.name,
          nickname: this.nickname,
          chant: this.chant
        }).then(this.playerSaved())
        this.$router.push({ name: 'Players' })
      }
    }
  }
</script>

<style>
  @import '../assets/style/main.css';
</style>

