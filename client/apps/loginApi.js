document.addEventListener('alpine:init', () => {
    Alpine.data('loginForm', () => ({

        username: "",
        email: "",
        password: "",

        login() {
            console.log(this.username)

            let url = "http://localhost:4001/api/forms/login";

            let params = {
                username : this.username,
                email: this.email,
                password: this.password
            }

            axios
                .post(url, params)
                .then( (res) => {
                    console.log(res)
                })
        }

        


    }))
})