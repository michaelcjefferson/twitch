<template>
  <nav class="nav-bar">
    <div class="buttons" :class="activeButton">
      <button class="button online" @click="updateNav('online')">ONLINE</button>
      <button class="button all" @click="updateNav('all')">ALL</button>
      <button class="button add" @click="updateNav('add')">ADD STREAMER</button>
    </div>
  </nav>
</template>

<script>
export default {
  props: ['activeButton'],
  methods: {
    updateNav: function (buttonType) {
      this.$emit('updateNav', buttonType)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="styl" scoped>
@import "../styles/base/_vars.styl";

.nav-bar {
  display: flex;
  justify-content: center;

  .buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    width: 100%;
    max-width: 540px;
  }
}

.button {
  border: 1px solid $red;
  height: 100px;
  flex-basis: 33.333333%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $white;
  color: $red;
  transition: all 0.3s ease;

  &:hover {
    background: $light-red;
  }
}

.all .all,
.online .online,
.add .add {
  background: $red;
  color: $white;
}
</style>
