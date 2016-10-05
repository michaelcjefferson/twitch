<template>
  <button @click.prevent="toggleActive" :class="{ selected: isSelected }" class="nav-bar__buttons__button">{{ this.buttonType }}</button>
</template>

<script>
export default {
  // data: {
  //   return {
  //   }
  // },
  props: ['buttonType', 'isSelected'],
  methods: {
    toggleActive: function (event) {
      this.$emit('button-selected', this.buttonType)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="styl" scoped>
/*@import "../styles/modules/_nav.styl";*/
</style>
