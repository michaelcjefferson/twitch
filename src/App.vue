<template>
  <div class="app">
    <nav-bar></nav-bar>
    <streamer-list></streamer-list>
  </div>
</template>

<script>
import NavBar from './components/NavBar'
import StreamerList from './components/StreamerList'

export default {
  components: {
    NavBar,
    StreamerList
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
