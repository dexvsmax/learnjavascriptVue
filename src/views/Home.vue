<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <input type="text" v-model="title" />
  </div>
</template>

<script>
export default {
  name: 'home',
  computed: {
    title: {
      get() {
        return this.$store.state.navbarTitle
      },
      set(value) {
        this.$store.commit('changeTitle', value)
      }
    }
  }
}
</script>
