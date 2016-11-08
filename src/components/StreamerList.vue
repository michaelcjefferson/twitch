<template>
  <div class="streamerlist">
    <div class="streamerlist-container onlinestreamers">
      <streamer v-for="streamer in liveStreamers" :streamer="streamer"></streamer>
    </div>
    <div v-if="activeButton === 'all'" class="streamerlist-container offlinestreamers">
      <streamer v-for="streamer in offlineStreamers" :streamer="streamer"></streamer>
    </div>
    <div v-if="activeButton === 'all'" class="streamerlist-container notfoundstreamers">
      <streamer v-for="streamer in notFoundStreamers" :streamer="streamer"></streamer>
    </div>
    <button type="button" name="button" @click="updateAllStreamerLists()" class="streamerlist-button">Update</button>
  </div>
</template>

<script>
import Streamer from './Streamer'

export default {
  data () {
    return {
      liveStreamers: [],
      offlineStreamers: [],
      notFoundStreamers: [],
      liveStreamersNames: [],
      offlineStreamersNames: []
    }
  },
  components: {
    Streamer
  },
  props: ['streamersNames', 'activeButton'],
  mounted () {
    this.updateAllStreamerLists()
  },
  methods: {
    updateAllStreamerLists: function () {
      this.updateLiveStreamerList()
      this.updateOfflineStreamerList()
    },
    updateLiveStreamerList: function () {
      this.getLiveStreamers().then((streams) => {
        this.liveStreamers = []
        this.liveStreamersNames = []
        streams.forEach((s) => {
          const streamer = {
            name: s.channel.name,
            display_name: s.channel.display_name,
            url: s.channel.url,
            game: s.game,
            status: s.channel.status,
            logo: s.channel.logo,
            preview: s.preview.medium,
            online: true
          }
          this.liveStreamers.push(streamer)
          this.liveStreamersNames.push(streamer.name)
        })
      })
      setTimeout(this.updateAllStreamerLists, 60000)
    },
    getLiveStreamers: function () {
      return this.$http.post('/getStreamerList', this.streamersNames).then((res) => {
        const streams = res.body.streams
        return streams
      }, (res) => {
        console.log(res)
      })
    },
    updateOfflineStreamerList: function () {
      this.offlineStreamers = []
      this.notFoundStreamers = []
      this.offlineStreamersNames = this.streamersNames.filter((s) => {
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="styl" scoped>
@import "../styles/base/_vars.styl";

.streamerlist-button {
  margin: 20px;
  color: $blue;
  text-transform: uppercase;
  border: 1px $blue solid;
  padding: 20px 50px;
  transition: all 0.3s ease;

  &:hover {
    background: $light-blue;
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    width: 80px;
    height: 80px;
    margin-top: -50px;
    margin-left: -10px;
    background: $blue;
    border-radius: 100%;
    opacity: .6;
    transform: scale(0);
  }

  @keyframes ripple {
    0% {
      transform: scale(0);
    }
    20% {
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(1);
    }
  }

  &:not(:active):after {
    animation: ripple 1s ease-out;
  }

  /* fixes initial animation run, without user input, on page load.
   */
  &:after {
    visibility: hidden;
  }

  &:focus:after {
    visibility: visible;
  }
}
</style>
