<template>
  <section class="hero is-dark is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column is-4 is-offset-1">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title is-centered">
                  PI Fighter One
                </p>
              </header>
              <div class="card-content">
                <div class="field">
                  <div class="control has-icons-left has-icons-right">
                    <input class="input is-success" type="text" placeholder="Enter Name" value="bulma">
                    <span class="icon is-small is-left">
                      <i class="fas fa-user"></i>
                    </span>
                    <span class="icon is-small is-right">
                      <i class="fas fa-check"></i>
                    </span>
                  </div>
                  <p class="help is-success">This username is available</p>
                </div>
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
                  PI Fighter Two
                </p>
              </header>
              <div class="card-content">
                <div class="field">
                  <div class="control has-icons-left has-icons-right">
                    <input class="input is-success" type="text" placeholder="Enter Name" value="bulma">
                    <span class="icon is-small is-left">
                      <i class="fas fa-user"></i>
                    </span>
                    <span class="icon is-small is-right">
                      <i class="fas fa-check"></i>
                    </span>
                  </div>
                  <p class="help is-success">This username is available</p>
                </div>
              </div>
            </div>
          </div>


        </div>
        <div class="column">
          <a class="button is-large is-fullwidth">Large</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export  default {}
</script>

<style lang="css">
  @import url('https://fonts.googleapis.com/css?family=Quicksand');

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
