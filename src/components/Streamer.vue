<template>
  <div class="streamer-box">
    <div v-if="streamer.online" class="streamer-container online">
      <a :href="streamer.url" class="streamer-title" target="_blank" rel="noopener noreferrer">
        <div class="streamer-name--online">{{ streamer.display_name }}</div>
        <img class="streamer-logo" :src="streamer.logo"></img>
      </a>
      <div class="stream-info">
        <div class="streamer-game">{{ streamer.game }}</div>
        <div class="streamer-status">{{ streamer.status }}</div>
      </div>
      <img class="streamer-preview" :src="streamer.preview"></img>
    </a>

    <div v-if="!streamer.online && streamer.name" class="streamer-container offline">
      <div class="streamer-name">{{ streamer.display_name }}</div>
      <div class="streamer-online">OFFLINE</div>
    </div>

    <div v-if="streamer.message" class="streamer-container nonexistant">
      <div class="streamer-message">{{ streamer.message }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['streamer']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="styl" scoped>
.streamer-box {
  width: 100%;
}

.streamer-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100px;
}

.streamer-title {
  height: 100px;
  width: 100px;
}

.streamer-name {
  font-size: 1.5rem;
  font-weight: bold;

  &--online {
    position: absolute;
  }
}

.streamer-logo {
  position: relative;
  width: 100px;
  opacity: .5;
  z-index: -5;
}

.stream-info {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.streamer-game {
  font-size: 1.2rem;
  text-transform: uppercase;
}

.streamer-status {
  font-size: .8rem;
}

.streamer-preview {
  height: 100%;
}
</style>
