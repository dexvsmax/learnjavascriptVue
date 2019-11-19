<template>
  <select class="form-control" :value="value" @input="changed($event.target.value)">
    <option v-for="item in list" :key="item" :value="item">
      {{ item }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'TablePerPage',
  props: {
    value: {
      type: Number,
      required: true
    },
    list: {
      type: Array,
      default: () => [1, 5, 10, 25]
    }
  },
  methods: {
    changed(value) {
      this.$emit('input', value)
    }
  }
}
</script>
