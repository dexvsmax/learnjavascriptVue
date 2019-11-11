window.app = new Vue({
    el: '#app',
    data: function () {
        return {
            currentPage: 'home',
            currentUser: null,
            users: []
        };
    },
    methods: {
        setCurrentPage: function (page) {
            this.currentPage = page;
            this.currentUser = null;
        },
        parentRemove: function (id) {
            axios
                .delete('http://localhost:3000/users/' + id)
                .then(response => (this.users = this.users.filter(function (item) {
                    return item.id !== id
                })));

        },
        parentEdit: function (id) {
            this.currentUser = this.users[id];
            this.currentPage = 'add'
        },
        parentAdded: function (user) {
            this.users.push(user);
            this.$set('users', this.users);
            this.currentUser = null;
            this.currentPage = 'home'
        },
        parentEdited: function (user) {
            var foundIndex = this.users.findIndex(x => x.id == user.id);
            this.$set(this.users, foundIndex, user);
            this.currentUser = null;
            this.currentPage = 'home'
        }
    },
    watch: {
        users: function () {
            console.log('Users loaded!');
        }
    },
    created: function () {
        axios
            .get('http://localhost:3000/users')
            .then(response => (this.users = response.data));
    }
});