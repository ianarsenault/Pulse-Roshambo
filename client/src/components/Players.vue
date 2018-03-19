<template>
  <div class="players">
    <h1>Players</h1>
    <div v-if="players.length > 0" class="table-wrap">
      <div>
        <router-link v-bind:to="{ name: 'NewPlayer' }">Add Player</router-link>
      </div>
      <table>
        <tr>
          <td>Name</td>
          <td width="550">Nickname</td>
          <td width="550">Chant</td>
          <td width="100" align="center">Action</td>
        </tr>
        <tr v-for="player in players">
          <td>{{ player.name }}</td>
          <td>{{ player.nickname }}</td>
          <td>{{ player.chant }}</td>
          <td align="center">
            <router-link v-bind:to="{ name: 'EditPlayer', params: { id: player._id } }">Edit</router-link> |
            <a href="#">Delete</a>
          </td>
        </tr>
      </table>
    </div>
    <div v-else>
      There are no players.. Lets add one now <br /><br />
      <router-link v-bind:to="{ name: 'NewPlayer' }" class="add_post_link">Add Player</router-link>
    </div>
  </div>
</template>

<script>
  import PlayerService from '@/services/PlayerService'
  export default {
    name: 'players',
    data () {
      return {
        players: []
      }
    },
    mounted () {
      this.getPlayers()
    },
    methods: {
      async getPlayers() {
        const response = await PlayerService.fetchPlayers()
        this.players = response.data.players
      }
    }
  }
</script>

<style>
  @import '../assets/style/main.css';
</style>
