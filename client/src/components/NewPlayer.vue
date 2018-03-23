<template>
  <section class="hero is-dark is-fullheight">

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
                        <input class="input" type="text" placeholder="Ian A" name="name" v-model="name" required>
                        <p class="help is-danger" v-if="errors.nameErrorMessage">{{ errors.nameErrorMessage }}</p>
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Nickname</label>
                      <div class="control">
                        <input class="input" type="text" placeholder="GorgonsMaze" name="nickname" v-model="nickname" required>
                        <p class="help is-danger" v-if="errors.nicknameErrorMessage">{{ errors.nicknameErrorMessage }}</p>
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Winner Saying</label>
                      <div class="control">
                        <input class="input" type="text" placeholder="Booyakasha!" name="chant" v-model="chant" required>
                        <p class="help is-danger" v-if="errors.chantErrorMessage">{{ errors.chantErrorMessage }}</p>
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
            <a class="button is-large is-fullwidth is-primary" @click="addPlayer" href="">Add New Player</a>
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
        chant: '',
        errors: []
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
      validateForm() {
        return this.name !== '' && this.nickname !== '' && this.chant !== ''
      },
      async addPlayer () {
        if (this.validateForm()) {
          await PlayerService.addPlayer({
            name: this.name,
            nickname: this.nickname,
            chant: this.chant
          }).then(this.playerSaved()).catch(e => {
            console.log(e);
            this.errors.push(e)
          })
          this.$router.push({ name: 'Players' })
        } else {
          this.$toast.open({
            duration: 3500,
            message: `Please fill out all form fields`,
            position: 'is-top',
            type: 'is-danger'
          })
        }
      }
    }
  }
</script>

