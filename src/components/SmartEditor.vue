<template>
  <div>
    <vue-editor v-model="content"></vue-editor>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
  name: 'SmartEditir',
  components: {
    VueEditor
  },
  model: {
    prop: 'content'
  },
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  watch: {
    content: 'updateContent'
  },
  methods: {
    updateContent() {
      this.$emit('input', this.content)
    }
  }
}
</script>
