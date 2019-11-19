<template>
  <div>
    <h2>Phones list</h2>
    <div v-if="!phones.length" class="alert alert-warning">
      Loading...
    </div>
    <phone-list v-else :users="phones">
      <template slot="table-header">
        <th scope="col">id</th>
        <th scope="col">name</th>
        <th scope="col">phone</th>
      </template>
      <template slot="table-row" slot-scope="{ item }">
        <th scope="col">{{ item.id }}</th>
        <th scope="col">{{ item.name }}</th>
        <th scope="col">{{ item.phone }}</th>
      </template>
    </phone-list>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PhonePage',
  components: {
    'phone-list': () => import('@/components/UserList.vue')
  },
  data: function() {
    return {
      phones: []
    }
  },
  mounted: function() {
    this.loadData()
  },
  methods: {
    loadData() {
      axios.get('http://localhost:3000/phones').then(response => (this.phones = response.data))
    }
  }
}
</script>
