<template>
  <span class="log-result" :class="resultClass">
    {{ isWinner ? 'Winner!' : 'Loser!' }}
  </span>
</template>

<script>
  export default {
    name: 'GameResult',
    props: ['winner', 'player'],
    computed: {
      isWinner() {
        return this.winner._id === this.player._id
      },
      resultClass() {
        return this.isWinner ? 'log-result--winner' : 'log-result--loser'
      }
    }
  }
</script>
