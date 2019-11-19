<template>
  <div ref="imagezone">
    <p>
      <img class="img-thumbnail maxWidth400" :src="picture" />
    </p>
    <input class="form-control" id="inputAvatar" type="text" :value="picture" />
    <input class="hidden" type="file" ref="avatar" @change="upload" />
    <button type="button" class="btn btn-primary" @click="selectFile">Select file</button>
  </div>
</template>

<script>
import axios from 'axios'
import Dropzone from 'dropzone'
import 'dropzone/dist/dropzone.css'

export default {
  name: 'ImgUpload',
  model: {
    prop: 'picture'
  },
  props: {
    picture: {
      type: String,
      default: ''
    }
  },
  mounted() {
    this.initDropzone()
  },
  methods: {
    selectFile() {
      this.$refs.avatar.click()
    },
    setNewAvatar(picture) {
      this.$emit('input', picture)
    },
    upload() {
      const url = 'https://api.imgur.com/3/image'
      const data = new FormData()
      data.append('image', this.$refs.avatar.files[0])
      const config = {
        headers: {
          Authorization: 'Client-ID f1395d5ebfeac3c'
        }
      }
      axios
        .post(url, data, config)
        .then(response => response.data)
        .then(response => {
          this.setNewAvatar(response.data.link)
          this.$refs.image.value = ''
        })
    },
    initDropzone() {
      new Dropzone(this.$refs.imagezone, {
        url: 'https://api.imgur.com/3/image',
        paramName: 'image',
        acceptedFiles: 'image/*',
        method: 'post',
        headers: {
          'Cache-Control': null,
          'X-Requested-With': null,
          Authorization: 'Client-ID f1395d5ebfeac3c'
        },
        createImageThumbnails: false,
        previewTemplate: '<div style="display:none"></div>',
        success: (file, response) => {
          this.setNewAvatar(response.data.link)
          this.$refs.image.value = ''
        }
      })
    }
  }
}
</script>

<style>
.hidden {
  display: none;
}
.maxWidth400 {
  max-width: 400px;
}
</style>
