<template>
  <div>
    <h2>Users edit {{ id }}</h2>
    <div v-if="!user" class="alert alert-warning">
      Loading...
    </div>

    <div class="fullWidth">
      <router-link
        v-if="parseInt(id) - 1 > 0"
        tag="button"
        type="button"
        class="btn btn-primary left"
        :to="'/users/' + (parseInt(id) - 1)"
        exact
      >
        Prev user
      </router-link>

      <router-link
        tag="button"
        type="button"
        class="btn btn-primary right"
        :to="'/users/' + (parseInt(id) + 1)"
        exact
      >
        Next user
      </router-link>
    </div>

    <ValidationObserver ref="validationObserver">
      <user-form v-if="user" v-model="user" />
      <button class="btn btn-success" @click="changeUser()">Change</button>
    </ValidationObserver>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'UserEditPage',
  components: {
    'user-form': () => import('@/components/UserForm.vue')
  },
  data: function() {
    return {
      user: null
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  mounted: function() {
    this.loadData()
  },
  watch: {
    id: function() {
      this.loadData()
    }
  },
  methods: {
    loadData() {
      axios
        .get('http://localhost:3000/users/' + this.id)
        .then(response => (this.user = response.data))
        .catch(() => (this.user = null))
    },
    async changeUser() {
      const isValid = await this.$refs.validationObserver.validate()
      if (!isValid) {
        alert('Enter data')
        return
      }
      axios
        .put('http://localhost:3000/users/' + this.id, this.user)
        .then(() => this.$router.push('/users'))
    }
  }
}
</script>

<style>
.fullWidth {
  width: 100%;
  display: inline-block;
}
.left {
  float: left;
}
.right {
  float: right;
}
</style>
