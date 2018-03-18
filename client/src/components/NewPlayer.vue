<template>

  <section class="hero is-dark is-fullheight">
    <nav class="navbar is-transparent">
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

<style>
  @import '../assets/style/main.css';
</style>

