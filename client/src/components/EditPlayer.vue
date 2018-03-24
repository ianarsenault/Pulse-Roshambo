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
                    <div class="field">
                      <img :src="imageSrc" class="image">
                      <input @change="uploadImage" type="file" name="photo" accept="image/*">
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
  import Api from '@/services/Api'

  export default {
    name: 'EditPlayer',
    data () {
      return {
        name: '',
        nickname: '',
        chant: '',
        errors: [],
        imageSrc: 'http://nahmdong.com/vitalhill/img/default.png'
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
      },
      uploadImage: function(e) {
        let file = e.target.files[0]
        if(!file) {
          return
        }
        let data = new FormData()
        data.append('player', this.name)
        data.append('image', file)
        console.log(file)
        PlayerService.uploadAvatar(data).then(res => {
          let ext = file.name.substr(file.name.lastIndexOf('.') + 1);
          this.imageSrc = Api().get(`images/uploads/${this.name}.${ext}`)
        }).catch(error => {
          console.log(error)
        });
      }
    }
  }
</script>

