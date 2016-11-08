<template>
  <div class="add-streamer-container">
    <form class="add-streamer-form" @submit.prevent="addStreamer">
      <input class="add-streamer-input" v-model="username" type="text" placeholder="Streamer's username" required />
      <input class="add-streamer-button" type="submit" value="Add" />
    </form>
    <div v-for="streamer in streamersNames" class="streamer-container">
      <div class="streamer-name">{{ streamer }}</div>
      <button class="remove-streamer-button" @click="removeStreamer(streamer)">X</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: ''
    }
  },
  props: ['streamersNames'],
  methods: {
    addStreamer: function () {
      this.$emit('addStreamer', this.username)
      this.username = ''
    },
    removeStreamer: function (username) {
      this.$emit('removeStreamer', username)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="styl" scoped>
@import "../styles/base/_vars.styl";

.add-streamer-container {
  margin: 20px;
}

.add-streamer-input {
  border: none;
  text-align: left;
  padding: 10px;
  user-select: none;

  &:focus {
    transition: border 0.5s ease;
    outline: none;
    border: 1px $green solid;
  }
}

.add-streamer-button {
  background: none;
  color: $green;
  text-transform: uppercase;
  border: 1px $green solid;
  padding: 10px 30px;
  transition: all 0.3s ease;
  cursor: pointer;
  outline: none;

  &:hover {
    background: $light-green;
  }
}

.streamer-container {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.streamer-name {
  font-weight: bold;
}

.remove-streamer-button {
  color: $red;
  text-transform: uppercase;
  border: 1px $red solid;
  padding: 10px 30px;
  transition: all 0.3s ease;

  &:hover {
    background: $light-red;
  }
}
</style>
