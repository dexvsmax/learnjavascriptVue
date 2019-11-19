<template>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: page === 1 }">
        <a href="#" class="page-link" aria-label="Previous" @click.prevent="prev">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <li class="page-item" v-for="item in maxPages" :key="item" :class="{ active: page === item }">
        <a href="#" class="page-link" @click.prevent="select(item)">
          {{ item }}
        </a>
      </li>

      <li class="page-item" :class="{ disabled: page === maxPages }">
        <a href="#" class="page-link" aria-label="Next" @click.prevent="next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'TablePagination',
  model: {
    prop: 'page'
  },
  props: {
    page: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  computed: {
    maxPages() {
      return Math.ceil(this.total / this.perPage)
    }
  },
  methods: {
    prev() {
      var pageNum = this.page - 1
      if (pageNum > 0) {
        this.select(pageNum)
      }
    },
    next() {
      var pageNum = this.page + 1
      if (pageNum <= this.maxPages) {
        this.select(pageNum)
      }
    },
    select(page) {
      this.$emit('input', page)
    }
  }
}
</script>
