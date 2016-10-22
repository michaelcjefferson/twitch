<template>
  <div class="streamerlist">
    <div class="onlinestreamerlist-container">
      <streamer v-for="streamer in liveStreamers" :streamer="streamer"></streamer>
    </div>
    <div v-if="activeButton === 'all'" class="offlinestreamerlist-container">
      <streamer v-for="streamer in offlineStreamers" :streamer="streamer"></streamer>
    </div>
    <div v-if="activeButton === 'all'" class="notfoundstreamerlist-container">
      <streamer v-for="streamer in notFoundStreamers" :streamer="streamer"></streamer>
    </div>
  </div>
</template>

<script>
import Streamer from './Streamer'

export default {
  // data () {
  //   return {
  //     msg: 'Hello shoe!'
  //   }
  // },
  components: {
    Streamer
  },
  props: ['liveStreamers', 'offlineStreamers', 'notFoundStreamers', 'activeButton']
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
