<template>
  <section class="hero is-dark is-fullheight">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          Full Height title
        </h1>
        <h2 class="subtitle">
          Full Height subtitle
        </h2>
      </div>
    </div>
  </section>
</template>

<script>
  export  default {}
</script>

<style lang="css">
  .hero.is-dark.is-fullheight {
    background: linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.88)
    ), url('../assets/images/office.jpg') no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }

</style>
