Vue.component('user-add', {
    template: '#add',
    props: ['user'],
    data: function () {
        return {
            add: true,
            userData: this.user ? this.user : {
                    id: '',
                    name: '',
                    email: '',
                    phone: ''
                }
        }
    },
    watch: {
        user: 'checkUser'
    },
    methods: {
        checkUser: function () {
            this.add = (this.user);
        },
        addUser: function () {
            if (
                this.userData.name.length > 0 &&
                this.userData.email.length > 0 &&
                this.userData.phone.length > 0
            ) {
                var self = this;
                if (this.userData.id > 0) {
                    axios
                        .put('http://localhost:3000/users/' + this.userData.id, this.userData)
                        .then(function(response) {
                            self.$emit('edited', self.userData)
                        });
                } else {
                    axios
                        .post('http://localhost:3000/users', this.userData)
                        .then(function(response) {
                            self.userData = response.data;
                            self.$emit('added', self.userData)
                        });
                }

            } else {
                alert('Error in entered data. Check it!')
            }
        }
    }
});