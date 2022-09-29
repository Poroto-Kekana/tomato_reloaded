document.addEventListener('alpine:init', () => {
    Alpine.data('disease', () => ({
        searchInput: '',
        message: '',
        open:false,
        results: {},
        treatment: {},
        symptoms: {},
        hideList: true,
        isFound: false,

        search() {
            axios.post(`http://localhost:5007/api/diseases/`, {
                disease_name: this.searchInput
            }).then(response => {
                this.isFound = response.data.isFound
                if (response.data.isFound) {
                    console.log(response.data.search_results[0]);
                    this.message = 'Results found'
                    this.results = response.data.search_results[0];
                    this.hideList = false;
                    this.open = true;
                } else {
                    this.message = response.data.status;
                }
            })
        },
    }))
})