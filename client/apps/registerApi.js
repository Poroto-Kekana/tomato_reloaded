document.addEventListener('alpine:init', () => {
    Alpine.data('registerForm', () => ({

        first_name: "",
        last_name: "",

        email: "",
        username: "",
        password: "",
        contacts: "",

        manager_id : "",
        project_id: "",


        register() {
            console.log(this.username)

            let url = `http://localhost:4001/api/forms/register/create`;
            

            let params = {
                first_name : this.first_name,
                last_name : this.last_name,
                email: this.email,
                username : this.username,
                password: this.password,
                contacts: this.contacts,
                manager_id: this.manager_id,
                project_id: this.project_id,
            }

            axios
                .post(url, params)
                .then( (res) => {
                    console.log(res)
                
                    window.location.href ='http://localhost:4001/login.html'
                })
        }

        


    }))
})