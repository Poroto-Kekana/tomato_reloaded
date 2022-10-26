document.addEventListener('alpine:init', () => {
    Alpine.data('loginForm', () => ({

        username: "",
        email: "",
        password: "",
        message: "",

        login() {
            // console.log(this.username)

            let url = `https://web-app-detect.herokuapp.com/api/forms/login`;
            this.message = ""
            let params = {
                username : this.username,
                email: this.email,
                password: this.password
            }

            axios
                .post(url, params)
                .then( (res) => {
                    console.log(res)
                    if(res.data.isFound) {
                        localStorage.setItem("token", res.data.user.token)
                        window.location.href="https://web-app-detect.herokuapp.com/input.html"
                    }
                    else {
                        this.message = "Incorrect Unsername and Password"
                    }
                })
        }

        


    }))
})