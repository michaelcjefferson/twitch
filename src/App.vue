<template>
  <div class="app">
    <nav-bar
      :activeButton="activeButton"
      @updateNav="updateNav">
    </nav-bar>
    <streamer-list
      :liveStreamers="liveStreamers"
      :offlineStreamers="offlineStreamers"
      :notFoundStreamers="notFoundStreamers"
      :activeButton="activeButton">
    </streamer-list>
    <button type="button" name="button" @click="updateAllStreamerLists()">Update</button>
  </div>
</template>

<script>
import NavBar from './components/NavBar'
import StreamerList from './components/StreamerList'

function test () {
  console.log('test')
  testt()
}

function testt () {
  setTimeout(test, 1000)
}

test()

export default {
  components: {
    NavBar,
    StreamerList
  },
  data () {
    return {
      streamersNames: ['manvsgame', 'northernlion', 'lovelymomo', 'rockleesmile', 'brunofin', 'etozhemad', 'freecodecamp', 'dansgaming', 'baertaffy', 'quill18', 'roundtablepodcast', 'miamouz', 'kungentv'],
      liveStreamers: [],
      liveStreamersNames: [],
      offlineStreamers: [],
      offlineStreamersNames: [],
      notFoundStreamers: [],
      activeButton: 'online'
    }
  },
  methods: {
    updateAllStreamerLists: function () {
      console.log('called')
      this.updateLiveStreamerList(this.streamersNames)
    },
    updateLiveStreamerList: function (streamers) {
      this.$http.post('/getStreamerList', streamers).then((res) => {
        this.liveStreamers = []
        this.liveStreamersNames = []
        const streams = res.body.streams
        // BUG: Sometimes there is an 'Uncaught (in promise) TypeError: Cannot read property 'forEach' of undefined'
        // BUG: Preview picture doesn't update, though that may be because the actual preview doesn't update very often so it's just grabbing the same picture each time. However that doesn't seem be the case - the picture on this app and the picture at the end of the preview url were different when I checked. It could be to do with the way that I'm resetting the liveStreamers array: maybe I need to do it in a more vue aprropriate way, just like react has set state
        console.log(streams)
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
          this.liveStreamers.push(streamer)
          this.liveStreamersNames.push(streamer.name)
        })
        this.updateOfflineStreamerList(this.streamersNames)
      }, (res) => {
        console.log(res)
      })
      // BUG: For some reason setTimeout isn't working, and updates every second
      // RESOLVED: Perhaps because the parentheses were omitted from the end of the function call
      setTimeout(this.updateAllStreamerLists, 60000)
    },
    updateOfflineStreamerList: function (streamers) {
      this.offlineStreamers = []
      this.notFoundStreamers = []
      this.offlineStreamersNames = streamers.filter((s) => {
        return this.liveStreamersNames.indexOf(s) === -1
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
            this.offlineStreamers.push(streamer)
          } else {
            const streamer = {
              message: s.message
            }
            this.notFoundStreamers.push(streamer)
          }
        }, (res) => {
          console.log(res)
        })
      })
    },
    updateNav: function (buttonType) {
      this.activeButton = buttonType
    }
  },
  beforeMount () {
    this.updateAllStreamerLists()
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
