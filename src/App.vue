<template>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <router-link class="navbar-brand" to="/">{{ title }}</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav mr-auto">
          <router-link tag="li" class="nav-item" to="/phones" exact>
            <a class="nav-link">Phones</a>
          </router-link>
          <router-link tag="li" class="nav-item" to="/users" exact>
            <a class="nav-link">Users</a>
          </router-link>
          <router-link tag="li" class="nav-item" to="/add" exact>
            <a class="nav-link">Add user</a>
          </router-link>
        </ul>
      </div>
    </nav>

    <main role="main" class="container">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    title() {
      return this.$store.state.navbarTitle + ' ' + this.$store.getters.titleCount
    }
  }
}
</script>

<style>
#app {
  margin-top: 80px;
}
</style>
