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
            <div class="field is-grouped">
              <p class="control">
                <a class="button">
                  <span class="icon">
                    <i class="fas fa-plus"></i>
                  </span>
                  <span>New Player</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column is-4 is-offset-1">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title is-centered">
                  PI Fighter One: {{ selected }}
                </p>
              </header>
              <div class="card-content">
                <b-autocomplete
                  rounded
                  v-model="name"
                  :data="filteredDataArray"
                  placeholder="e.g. Michael!!!!!"
                  icon="magnify"
                  @select="option => selected = option">
                  <template slot="empty">No results found</template>
                </b-autocomplete>
              </div>
            </div>
          </div>

          <div class="column is-2">
              <h1 class="versus title is-1 has-text-centered">Versus</h1>
          </div>

          <div class="column is-4">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title is-centered">
                  PI Fighter One: {{ selected }}
                </p>
              </header>
              <div class="card-content">
                <b-autocomplete
                  rounded
                  v-model="name"
                  :data="filteredDataArray"
                  placeholder="e.g. Michael!!!!!"
                  icon="magnify"
                  @select="option => selected = option">
                  <template slot="empty">No results found</template>
                </b-autocomplete>
              </div>
            </div>
          </div>


        </div>
        <div class="columns is-centered">
          <div class="column is-6">
            <a class="button is-large is-fullwidth is-primary">Go</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        data: [
          'Ian',
          'Jameson',
          'Jay',
          'Keys',
          'Christian',
          'Brad',
          'Anne',
          'Katy',
          'Isabel'
        ],
        name: '',
        selected: null
      }
    },
    computed: {
      filteredDataArray() {
        return this.data.filter((option) => {
          return option
            .toString()
            .toLowerCase()
            .indexOf(this.name.toLowerCase()) >= 0
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
