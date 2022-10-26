document.addEventListener('alpine:init', () => {
    Alpine.data('registerForm', () => ({

        username: "",
        email: "",
        password: "",

        register() {
            console.log(this.username)

            let url = `https://web-app-detect.herokuapp.com/api/forms/register/create`;

            let params = {
                username : this.username,
                email: this.email,
                password: this.password
            }

            axios
                .post(url, params)
                .then( (res) => {
                    console.log(res)
                
                    window.location.href ='./login.html'
                })
        }

        


    }))
})