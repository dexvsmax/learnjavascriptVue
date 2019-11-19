<template>
  <div>
    <h2>Users list</h2>
    <div v-if="!users.length" class="alert alert-warning">
      Loading...
    </div>
    <user-list v-else :users="users" @remove="removeUser" />
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'UserPage',
  components: {
    'user-list': () => import('@/components/UserList.vue')
  },
  data: function() {
    return {
      token: null,
      users: []
    }
  },
  mounted: function() {
    this.setToken()
    this.loadData()
  },
  methods: {
    setToken() {
      var token = localStorage.getItem('vue-token-custom')
      if (!token) {
        token = 'customToken'
        localStorage.setItem('vue-token-custom', token)
      }
      this.token = token
    },
    loadData() {
      const headers = {
        Authorization: 'Bearer ' + this.token
      }
      axios
        .get('http://localhost:3000/users', { headers })
        .then(response => (this.users = response.data))
    },
    removeUser: function(id) {
      axios.delete('http://localhost:3000/users/' + id).then(
        (this.users = this.users.filter(function(item) {
          return item.id !== id
        }))
      )
    }
  }
}
</script>
