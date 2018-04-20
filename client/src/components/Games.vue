<template>
  <section>
    <h2>Game cards should display...</h2>
    <div v-if="games && games.length > 0"
         v-for="game in games"
         class="columns is-centered">
      <div class="column is-12 card u-margin--bottom">
        <div class="log">

          <div class="log-player">
            <p class="log-player--name">{{ game.playerOne.name }}</p>
            <img :src="playerImage(game.playerOne.avatar)" class="log-player--avatar">
            <game-result :winner="game.winner" :player="game.playerOne"></game-result>
          </div>

          <div class="log-summary">
            <p>{{ moment(game.date).format('dddd, MMMM Do YYYY, h:mm a') }}</p>

            <div class="log-throws">
              <img :src="images[game.playerOneThrew]" class="log-throws--image">
              <img :src="images[game.playerTwoThrew]" class="log-throws--image">
            </div>
          </div>

          <div class="log-player">
            <p class="log-player--name">{{ game.playerTwo.name }}</p>
            <img :src="playerImage(game.playerTwo.avatar)" class="log-player--avatar">
            <game-result :winner="game.winner" :player="game.playerTwo"></game-result>
          </div>

        </div>
      </div>
    </div>
    <div v-else>
      <div class="columns is-centered">
        <div class="column is-half">
          <figure class="image">
            <img src="../assets/images/nothing2see.gif" alt="Nothing Here">
          </figure>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'Games',
    props: [],
    computed: {}
  }
</script>
