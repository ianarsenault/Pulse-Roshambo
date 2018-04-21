<template>
  <section>
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
  </section>
</template>

<script>
  import moment from 'moment'
  import defaultImage from '@/assets/images/default-avatar.png'
  import Rock from '../assets/images/rock.svg'
  import Paper from '../assets/images/paper.svg'
  import Scissors from '../assets/images/scissors.svg'

  export default {
    name: 'Games',
    props: ['dataLoaded', 'game'],
    data() {
      return {
        images: {
          Rock,
          Paper,
          Scissors
        },
      }
    },
    methods: {
      moment: function (date) {
        return moment(date)
      },
      playerImage(image) {
        return image ? `/static/uploads/${image}` : defaultImage
      }
    }
  }
</script>
