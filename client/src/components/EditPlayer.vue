<template>

  <section class="hero is-dark is-fullheight">

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
                        <input class="input" type="text" placeholder="Ian A" name="name" v-model="name" required>
                        <p class="help is-danger" v-if="errors.name">{{ errors.name.message }}</p>
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Nickname</label>
                      <div class="control">
                        <input class="input" type="text" placeholder="GorgonsMaze" name="nickname" v-model="nickname"
                               required>
                        <p class="help is-danger" v-if="errors.nickname">{{ errors.nickname.message }}</p>
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Winner Saying</label>
                      <div class="control">
                        <input class="input" type="text" placeholder="Booyakasha!" name="chant" v-model="chant"
                               required>
                        <p class="help is-danger" v-if="errors.chant">{{ errors.chant.message }}</p>
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
        chant: '',
        errors: []
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
      errorMsg(message) {
        this.$toast.open({
          duration: 3500,
          message: message,
          position: 'is-top',
          type: 'is-danger'
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
        }).then(res => {
          if (res.data.errors) {
            this.errors = res.data.errors
            this.errorMsg('Please fill out all form fields')
          } else {
            this.playerUpdated()
            this.$router.push({ name: 'Players' })
          }
        })

      }
    }
  }
</script>
