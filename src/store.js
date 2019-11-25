import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    navbarTitle: 'test vue storage',
    users: []
  },
  getters: {
    titleCount: state => state.navbarTitle.length
  },
  mutations: {
    changeTitle: (state, payload) => (state.navbarTitle = payload),
    setUsers: (state, payload) => (state.users = payload)
  },
  actions: {
    loadUsers(context) {
      axios
        .get('http://localhost:3000/users')
        .then(response => context.commit('setUsers', response.data))
    }
  }
})

export default store
