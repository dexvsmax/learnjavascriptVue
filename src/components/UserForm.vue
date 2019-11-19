<template>
  <div>
    <form>
      <ValidationProvider name="Name" rules="required" v-slot="{ errors, invalid }">
        <div class="form-group">
          <label for="inputName">Name</label>
          <input
            type="text"
            class="form-control"
            :class="{ 'is-invalid': invalid }"
            id="inputName"
            name="name"
            placeholder="Enter name"
            v-model="localUser.name"
          />
          <span class="help-block text-danger" v-if="errors.length > 0">
            {{ errors[0] }}
          </span>
        </div>
      </ValidationProvider>
      <div class="form-group">
        <label for="inputUsername">Username</label>
        <input
          type="text"
          class="form-control"
          id="inputUsername"
          name="username"
          placeholder="Enter username"
          v-model="localUser.username"
        />
      </div>
      <ValidationProvider name="Email" rules="required|email" v-slot="{ errors, invalid }">
        <div class="form-group">
          <label for="inputEmail">Email</label>
          <input
            type="email"
            class="form-control"
            :class="{ 'is-invalid': invalid }"
            id="inputEmail"
            name="email"
            placeholder="Enter email"
            v-model="localUser.email"
          />
          <span class="help-block text-danger" v-if="errors.length > 0">
            {{ errors[0] }}
          </span>
        </div>
      </ValidationProvider>
      <div class="form-group">
        <label for="inputPhone">Phone</label>
        <input
          type="text"
          class="form-control"
          id="inputPhone"
          name="phone"
          placeholder="Enter phone"
          v-model="localUser.phone"
        />
      </div>
      <div class="form-group">
        <label for="inputCreatedAt">Registration date</label>
        <date-time-picker v-model="localUser.created_at" />
      </div>
      <div class="form-group">
        <label for="inputDescription">Description</label>
        <smart-editor v-model="localUser.description" />
      </div>
      <div class="form-group">
        <label for="inputAvatar">Avatar</label>
        <avatar v-model="localUser.avatar" />
      </div>
      <div class="form-check">
        <checkbox v-model="localUser.active" />
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
    </form>

    <pre>{{ user }}</pre>
  </div>
</template>

<script>
export default {
  name: 'UserForm',
  components: {
    avatar: () => import('@/components/ImgUpload.vue'),
    'date-time-picker': () => import('@/components/DateTimePicker.vue'),
    'smart-editor': () => import('@/components/SmartEditor.vue'),
    checkbox: () => import('@/components/Checkbox.vue')
  },
  model: {
    prop: 'user',
    event: 'change'
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    localUser: null
  }),
  watch: {
    user: {
      deep: true,
      handler() {
        if (!this.localUser || this.localUser.id != this.user.id)
          this.localUser = Object.assign({}, this.user)
      }
    },
    localUser: {
      deep: true,
      handler: 'updateUser'
    }
  },
  created() {
    this.localUser = Object.assign({}, this.user)
  },
  methods: {
    updateUser() {
      this.$emit('change', Object.assign({}, this.localUser))
    }
  }
}
</script>
