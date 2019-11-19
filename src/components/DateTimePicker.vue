<template>
  <input class="form-control" id="inputCreatedAt" type="text" :value="createdDate" ref="datetime" />
</template>

<script>
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.css'

export default {
  name: 'DateTimePicker',
  model: {
    prop: 'createdDate'
  },
  props: {
    createdDate: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    fp: null
  }),
  watch: {
    createdDate: 'updateDatePicker'
  },
  mounted() {
    this.initDatePicker()
  },
  beforeDestroy() {
    if (this.fp) {
      this.fp.destroy()
    }
  },
  methods: {
    initDatePicker() {
      this.fp = flatpickr(this.$refs.datetime, {
        enableTime: true,
        dateFormat: 'Y-m-d H:i',
        onChange: (_, dateStr) => {
          this.$emit('input', dateStr)
        }
      })
    },
    updateDatePicker() {
      if (this.fp) {
        this.fp.setDate(this.value)
      }
    }
  }
}
</script>
