Vue.component('users-list', {
    template: '#list',
    props: {
        list: {
            type: Array,
            required: true
        }
    },
    data: function () {
        return {

        }
    },
    computed: {
        haveUsers: function() {
            return this.list.length > 0;
        }
    },
    methods: {
        edit: function (id) {
            this.$emit('edit', id)
        },
        remove: function (id) {
            this.$emit('remove', id)
        }
    }
});