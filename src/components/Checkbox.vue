<template>
  <div>
    <input
      type="checkbox"
      class="form-check-input"
      :value="value"
      @change="updateValue"
      ref="checkbox"
    />
  </div>
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.$refs.checkbox.checked = this.value
  },
  methods: {
    updateValue() {
      this.$emit('input', this.$refs.checkbox.checked)
    }
  }
}
</script>
