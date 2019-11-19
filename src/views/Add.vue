<template>
  <div>
    <h2>Add user</h2>
    <ValidationObserver ref="validationObserver">
      <user-form v-model="user" />
      <button class="btn btn-success" @click="saveUser()">Save</button>
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
      user: {}
    }
  },
  methods: {
    async saveUser() {
      const isValid = await this.$refs.validationObserver.validate()
      if (!isValid) {
        alert('Enter data')
        return
      }
      axios.post('http://localhost:3000/users', this.user).then(() => this.$router.push('/users'))
    }
  }
}
</script>
