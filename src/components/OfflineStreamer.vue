<template>
  <div class="streamer-box">
    <div class="streamer-container offline">
      <div class="streamer-name">{{ streamer.display_name }}</div>
      <div class="streamer-online">OFFLINE</div>
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

.streamer-name {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
