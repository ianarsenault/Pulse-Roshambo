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
                        <input class="input" type="text" placeholder="Ian A" name="name" v-model="player.name" required>
                        <p class="help is-danger" v-if="errors.name">{{ errors.name.message }}</p>
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Nickname</label>
                      <div class="control">
                        <input class="input" type="text" placeholder="GorgonsMaze" name="nickname" v-model="player.nickname"
                               required>
                        <p class="help is-danger" v-if="errors.nickname">{{ errors.nickname.message }}</p>
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Winner Saying</label>
                      <div class="control">
                        <input class="input" type="text" placeholder="Booyakasha!" name="chant" v-model="player.chant"
                               required>
                        <p class="help is-danger" v-if="errors.chant">{{ errors.chant.message }}</p>
                      </div>
                    </div>
                    <div class="field">
                      <img :src="imageSrc ? imageSrc : avatar" class="image">
                      <input @change="uploadImage" type="file" name="avatar" accept="image/*">
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
  import defaultImage from '@/assets/images/default-avatar.png'

  export default {
    name: 'EditPlayer',
    data () {
      return {
        player: {},
        errors: [],
        imageSrc: ''
      }
    },
    mounted () {
      this.getPlayer()
    },
    computed: {
      avatar() {
        return this.player.avatar ? `/static/uploads/${this.player.avatar}` : defaultImage
      }
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
        this.player = response.data
      },
      async UpdatePlayer () {
        await PlayerService.updatePlayer(this.player).then(res => {
          if (res.data.errors) {
            this.errors = res.data.errors
            this.errorMsg('Please fill out all form fields')
          } else {
            this.playerUpdated()
            this.$router.push({ name: 'Players' })
          }
        })
      },
      reset() {
        const input = this.$refs.fileInput
        input.type = 'text'
        input.type = 'file'
      },
      uploadImage(e) {
        let files = e.target.files
        if(!files[0]) {
          return
        }
        let data = new FormData()
        data.append('player', this.player.name)
        data.append('image', files[0])
        let reader = new FileReader()
        let fileName = files[0].name
        reader.onload = (e) => {
          this.player.avatar = `${this.player.name}.${fileName.substr(fileName.lastIndexOf('.') + 1)}`
          this.imageSrc = e.target.result
        };

        PlayerService.uploadAvatar(data).then(res => {
          reader.readAsDataURL(files[0]);
        }).catch(error => {
          console.log(error)
        });
      }
    }
  }
</script>
