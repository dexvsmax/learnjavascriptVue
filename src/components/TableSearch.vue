<template>
  <input
    class="form-control"
    placeholder="Search..."
    :value="value"
    @input="changed($event.target.value)"
  />
</template>

<script>
export default {
  name: 'TableSearch',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    changed(value) {
      this.$emit('input', value)
    }
  }
}
</script>
