<template>
  <div class="streamer-container">
    <div class="streamer-name">{{ streamer.channel.display_name }}</div>
    <div class="streamer-game">{{ streamer.game }}</div>
  </div>
</template>

<script>
export default {
  props: ['streamer'],
  data () {
    return {
      msg: 'Hello shoe!'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="styl" scoped>
.streamer-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 80px;
}
</style>
