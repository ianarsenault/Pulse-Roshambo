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
                      <input @change="onFileChange" type="file" name="photo" accept="image/*" ref="fileInput">
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="columns is-centered">
          <div class="column is-3">
            <a class="button is-large is-fullwidth is-primary" @click="addPlayer" type="button">Add New Player</a>
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
    data() {
      return {
        name: '',
        nickname: '',
        chant: '',
        errors: {},
        imageSrc: 'http://nahmdong.com/vitalhill/img/default.png'
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
      errorMsg(message) {
        this.$toast.open({
          duration: 3500,
          message: message,
          position: 'is-top',
          type: 'is-danger'
        })
      },
      async addPlayer() {
        await PlayerService.addPlayer({
          name: this.name,
          nickname: this.nickname,
          chant: this.chant
        }).then(res => {
          if (res.data.errors) {
            this.errors = res.data.errors
            this.errorMsg('Please fill out all form fields')
          } else {
            this.playerSaved()
            this.$router.push({name: 'Players'})
          }
        })
      },
      reset: function () {
        const input = this.$refs.fileInput;
        input.type = 'text';
        input.type = 'file';
      },
      onFileChange: function(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files) {
          return
        }
        this.createImage(files);
      },
      createImage: function(files) {
        let imageSize = files[0].size
        if (imageSize > 500000) {
          // if image size > 500kb -- can be changed
          this.errorMsg('Image Size is too large! Try a different image')
          this.reset()
          return
        }
        let reader = new FileReader();
        reader.onload = (e) => {
          this.imageSrc = e.target.result;
        };
        reader.readAsDataURL(files[0]);
      }
    }
  }
</script>

