<template>
  <div class="streamerlist-container">
    <streamer v-for="streamer in streamers" :streamer="streamer"></streamer>
  </div>
</template>

<script>
import Streamer from './Streamer'

export default {
  components: {
    Streamer
  },
  props: ['streamers'],
  data () {
    return {
      msg: 'Hello shoe!'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="styl" scoped>
.streamerlist-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 920px;
}
</style>
