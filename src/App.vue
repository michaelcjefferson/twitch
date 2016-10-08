<template>
  <div class="app">
    <nav-bar></nav-bar>
    <streamer-list :streamers="liveStreamers"></streamer-list>
    <button type="button" name="button" @click="updateLiveStreamerList(streamers)">Update</button>
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
      liveStreamers: [],
      liveStreamersNames: [],
      offlineStreamers: [],
      offlineStreamersNames: []
    }
  },
  methods: {
    updateLiveStreamerList: function (streamers) {
      this.$http.post('/getStreamerList', streamers).then((res) => {
        this.liveStreamers = []
        this.liveStreamersNames = []
        const streams = res.body.streams
        streams.forEach((s) => {
          // Make a separate function to both build the streamer object and also check it against a model to make sure the parameters are of the correct type etc.
          const streamer = {
            name: s.channel.name,
            display_name: s.channel.display_name,
            game: s.game,
            status: s.channel.status,
            logo: s.channel.logo,
            preview: s.preview.medium
          }
          this.liveStreamers.push(streamer)
          this.liveStreamersNames.push(streamer.name)
        })
        this.updateOfflineStreamerList(this.streamers, this.liveStreamersNames)
      }, (res) => {
        console.log(res)
      })
    },
    updateOfflineStreamerList: function (streamers, liveStreamers) {
      this.offlineStreamersNames = []
      this.offlineStreamers = []
      this.offlineStreamersNames = streamers.filter((s) => {
        return !(liveStreamers.indexOf(s) !== -1)
      })
      this.offlineStreamersNames.forEach((streamer) => {
        console.log(streamer)
        this.$http.post('/getOfflineStreamers', {streamer: streamer}).then((res) => {
          console.log(res)
        }, (res) => {
          console.log(res)
        })
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
