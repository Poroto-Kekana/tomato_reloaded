document.addEventListener('alpine:init', () => {
    Alpine.data('loginForm', () => ({

        passWord: "",
        userName: "",

        login() {
            console.log(this.userName)

            let url = "http://localhost:6012/api/forms/login";

            let params = {
                username : this.userName,
                password : this.passWord
            }

            axios
                .post(url, params)
                .then( (res) => {
                    console.log(res)
                })
        }

        


    }))
})