<template>
  <section class="hero is-dark is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column is-4">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title is-centered">
                  {{ name }}
                </p>
              </header>
              <div class="card-content">
                <div class="content">
                  <div class="field">
                    <label class="label">Nickname: </label>
                    {{ nickname }}
                  </div>
                  <div class="field">
                    <label class="label">Chant: </label>
                    {{ chant }}
                  </div>
                  <div class="field">
                    <label class="label">Conquered: </label>
                    <!-- {{ conquered }} -->
                  </div>
                  <div class="field">
                    <label class="label">Nemesis: </label>
                    <!-- {{ nemesis }} -->
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
  import LeaderBoardService from '@/services/LeaderBoardService'

  export default {
    name: 'PlayerProfile',
    data () {
      return {
        name: '',
        nickname: '',
        chant: '',
        games: [],
        errors: []
      }
    },
    mounted () {
      this.getPlayer()
      this.getLeaderBoard()
      this.getAllLeaderBoards()
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
      async getLeaderBoard () {
        const response = await LeaderBoardService.getPlayerGames({
          id: this.$route.params.id
        })
        this.games = response.data.games
        console.log(this.games)
      }
    }
  }
</script>
