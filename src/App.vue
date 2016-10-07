<template>
  <div class="app">
    <nav-bar></nav-bar>
    <streamer-list :streamers="liveStreamers"></streamer-list>
    <button type="button" name="button" @click="updateStreamerList(streamers)">Update</button>
  </div>
</template>

<script>
import NavBar from './components/NavBar'
import StreamerList from './components/StreamerList'

export default {
  components: {
    NavBar,
    StreamerList
  },
  data () {
    return {
      streamers: ['manvsgame', 'northernlion', 'lovelymomo', 'rockleesmile', 'brunofin', 'etozhemad', 'freecodecamp', 'dansgaming'],
      liveStreamers: []
    }
  },
  methods: {
    updateStreamerList: function (streamers) {
      this.$http.post('/getStreamerList', streamers).then((res) => {
        console.log(res)
        this.liveStreamers = res.body.streams
      }, (res) => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="styl">
@import "../node_modules/normalize.css/normalize.css";
@import "styles/base/_vars.styl";
@import "styles/base/_global.styl";

html {
  height: 100%;
}

.app {
  height: 100vh;
  width: 100%;
  max-width: 600px;
}
</style>
