document.addEventListener('alpine:init', () => {
    Alpine.data('projectsForm', () => ({



        project_name: "",
        location: "",
        manager_id: "",

        projects() {
            // console.log(this.project_name)

            let url = "http://localhost:5007/api/projects/create";

            let params = {

                project_name: this.project_name,
                location: this.location,
                manager_id: this.manager_id


            }

            axios
                .post(url, params)
                .then((res) => {
                    console.log(res)
                })
        }




    }))
})