<template>
  <div class="app">
    <nav-bar></nav-bar>
    <streamer-list :streamers="streamers"></streamer-list>
    <button type="button" name="button" @click="updateLiveStreamerList(streamersNames)">Update</button>
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
      streamersNames: ['manvsgame', 'northernlion', 'lovelymomo', 'rockleesmile', 'brunofin', 'etozhemad', 'freecodecamp', 'dansgaming', 'baertaffy', 'quill18', 'roundtablepodcast'],
      streamers: [],
      liveStreamersNames: [],
      offlineStreamersNames: []
    }
  },
  methods: {
    updateLiveStreamerList: function (streamers) {
      this.$http.post('/getStreamerList', streamers).then((res) => {
        this.streamers = []
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
            preview: s.preview.medium,
            online: true
          }
          this.streamers.push(streamer)
          this.liveStreamersNames.push(streamer.name)
        })
        this.updateOfflineStreamerList(this.streamersNames, this.liveStreamersNames)
      }, (res) => {
        console.log(res)
      })
    },
    updateOfflineStreamerList: function (streamers, liveStreamers) {
      this.offlineStreamersNames = []
      this.offlineStreamersNames = streamers.filter((s) => {
        return liveStreamers.indexOf(s) === -1
      })
      this.offlineStreamersNames.forEach((streamer) => {
        this.$http.post('/getOfflineStreamers', {streamer: streamer}).then((res) => {
          const s = res.body
          if (s.name) {
            const streamer = {
              name: s.name,
              display_name: s.display_name,
              logo: s.logo,
              online: false
            }
            this.streamers.push(streamer)
          } else {
            const streamer = {
              message: s.message
            }
            this.streamers.push(streamer)
          }
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
  max-width: 920px;
}
</style>
