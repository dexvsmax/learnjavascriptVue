<template>
  <div>
    <h2>Users list</h2>
    <div v-if="!users.length" class="alert alert-warning">
      Loading...
    </div>
    <user-list v-else :users="users" @remove="removeUser" @search="search" @paginate="paginate" />
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
      users: [],
      searchString: '',
      perPage: 5,
      currentPage: 1,
      query: ''
    }
  },
  watch: {
    searchString: 'generateQuery',
    perPage: 'generateQuery',
    currentPage: 'generateQuery'
  },
  mounted: function() {
    this.setToken()
    this.loadData('')
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
        .get('http://localhost:3000/users' + this.query, { headers })
        .then(response => (this.users = response.data))
    },
    removeUser: function(id) {
      axios.delete('http://localhost:3000/users/' + id).then(
        (this.users = this.users.filter(function(item) {
          return item.id !== id
        }))
      )
    },
    generateQuery() {
      this.query = ''
      if (this.searchString.length > 0) {
        this.query += '&q=' + this.searchString
      }
      if (this.currentPage > 0) {
        this.query += '&_page=' + this.currentPage
      }
      if (this.perPage > 0) {
        this.query += '&_limit=' + this.perPage
      }
      if (this.query.length > 0) {
        this.query = '?' + this.query.slice(1)
      }
    },
    search(s) {
      this.searchString = s
      this.generateQuery()
      this.loadData()
    },
    paginate(currentPage, perPage) {
      this.currentPage = currentPage
      this.perPage = perPage
      this.generateQuery()
      this.loadData()
    }
  }
}
</script>
