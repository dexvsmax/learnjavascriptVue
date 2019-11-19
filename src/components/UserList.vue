<template>
  <div>
    <div class="row">
      <div class="col-md-2">
        <per-page v-model.number="perPage" />
      </div>
      <div class="col-md-7">
        <p class="form-control-static">Выбрано элементов на страницу {{ perPage }}</p>
      </div>
      <div class="col-md-3">
        <search v-model.trim="searchString" />
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <table class="table">
          <thead>
            <tr>
              <slot name="table-header">
                <th scope="col">id</th>
                <th scope="col">name</th>
                <th scope="col">username</th>
                <th scope="col">email</th>
                <th scope="col">phone</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </slot>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in sortedUsers" v-bind:key="item.id">
              <slot name="table-row" :item="item">
                <th scope="row">{{ item.id }}</th>
                <td>{{ item.name }}</td>
                <td>{{ item.username }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.phone }}</td>
                <td>
                  <router-link
                    tag="button"
                    type="button"
                    class="btn btn-primary"
                    :to="'/users/' + item.id"
                    exact
                  >
                    Edit
                  </router-link>
                </td>
                <td><button type="button" v-on:click="remove(item.id)">remove</button></td>
              </slot>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th colspan="7">Total count: {{ total }}</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <paginator v-model.number="currentPage" :per-page="perPage" :total="total" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserListTable',
  components: {
    paginator: () => import('@/components/TablePagination.vue'),
    search: () => import('@/components/TableSearch.vue'),
    'per-page': () => import('@/components/TablePerPage.vue')
  },
  props: {
    users: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    perPage: 5,
    currentPage: 1,
    searchString: ''
  }),
  computed: {
    total() {
      return this.filteredUsers.length
    },
    filteredUsers() {
      if (!this.searchString.length) return this.users

      return this.users.filter(item => {
        return item.name.indexOf(this.searchString) >= 0
      })
    },
    sortedUsers() {
      return this.filteredUsers.filter((item, index) => {
        var startIndex = (this.currentPage - 1) * this.perPage
        var finalIndex = startIndex + this.perPage
        return startIndex <= index && index < finalIndex
      })
    }
  },
  methods: {
    remove: function(id) {
      this.$emit('remove', id)
    }
  }
}
</script>
