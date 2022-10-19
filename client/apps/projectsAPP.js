document.addEventListener('alpine:init', () => {
    Alpine.data('projects', () => ({
        date: "",
        time: "",
        healthStatus: "",
        detect: { },
        filename: "",
        inspector: "",
        detect: True,

        // createReport() {
        //     return axios.get(`http://localhost:4000/api/detect/create`)
        // },

        showDetect() {
            const url = 'http://localhost:4000/api/detect';

            axios
                .get(url)
                .then((result) => {
                    this.detect = result.data;
                    
                });

        },
        
        createDetect(filename) {
            const url = 'http://localhost:4000/api/detect/create'
        }
    }))

    
});
