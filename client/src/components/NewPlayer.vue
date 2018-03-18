<template>

  <section class="hero is-dark is-fullheight">
    <nav class="navbar is-transparent">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
        </a>
        <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <router-link v-bind:to="{ name: 'Landing' }" class="button">
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
                  Add New Tier 3 Member
                </p>
              </header>
              <div class="card-content">
                <div class="content">
                  <form>

                    <div class="field">
                      <label class="label">Name</label>
                      <div class="control">
                        <input class="input" type="text" placeholder="Ian A">
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Nickname</label>
                      <div class="control">
                        <input class="input" type="text" placeholder="GorgonsMaze">
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Winner Saying</label>
                      <div class="control">
                        <input class="input" type="text" placeholder="Booyakasha!">
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
            <a class="button is-large is-fullwidth is-primary" @click="playerSaved">Add New Player</a>
          </div>
        </div>


      </div>
    </div>
  </section>
</template>

<script>
  export default {
    methods: {
      playerSaved() {
        this.$toast.open({
          duration: 5000,
          message: `Player Information Saved!`,
          position: 'is-bottom',
          type: 'is-success'
        })
      }
    }
  }
</script>

<style lang="css">
  @import url('https://fonts.googleapis.com/css?family=Quicksand');

  body {
    font-family: 'Quicksand', sans-serif;
  }

  .hero.is-dark.is-fullheight {
    background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.88)
    ), url('../assets/images/white.jpg') no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }

  .card {
    background-color: #ffffff08;
  }

  .versus {
    font-family: 'Quicksand', sans-serif;
    color: rgba(147, 147, 147, 0.62) !important;
  }
</style>
