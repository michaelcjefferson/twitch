<template>
  <div class="app">
    <nav-bar
      :activeButton="activeButton"
      @updateNav="updateNav">
    </nav-bar>
    <streamer-list
      v-if="activeButton !== 'add'"
      :streamersNames="streamersNames"
      :activeButton="activeButton">
    </streamer-list>
    <add-streamer
      v-if="activeButton === 'add'"
      :streamersNames="streamersNames"
      @addStreamer="addStreamer"
      @removeStreamer="removeStreamer">
    </add-streamer>
  </div>
</template>

<script>
import AddStreamer from './components/AddStreamer'
import NavBar from './components/NavBar'
import StreamerList from './components/StreamerList'

export default {
  components: {
    AddStreamer,
    NavBar,
    StreamerList
  },
  data () {
    return {
      streamersNames: ['manvsgame', 'northernlion', 'lovelymomo', 'rockleesmile', 'brunofin', 'etozhemad', 'freecodecamp', 'dansgaming', 'baertaffy', 'quill18', 'roundtablepodcast', 'miamouz', 'kungentv', 'bobross', 'edbergtv'],
      activeButton: 'online'
    }
  },
  methods: {
    updateNav: function (buttonType) {
      this.activeButton = buttonType
    },
    addStreamer: function (username) {
      this.streamersNames.push(username)
    },
    removeStreamer: function (username) {
      const index = this.streamersNames.indexOf(username)
      if (index > -1) {
        this.streamersNames.splice(index, 1)
      }
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
  max-width: 820px;
}
</style>
