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
            axios.post(`http://localhost:4000/api/diseases/`, {
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

    Alpine.data('image', () => ({
        fname: 'the image',
        imageUrl: '',
        imageData : null,
        status : "...",
        fileChosen(evt) {  
        this.fileToDataUrl(evt, (src) => (this.imageUrl = src));
        },
    
        fileToDataUrl(event, callback) {
        if (!event.target.files.length) return;
    
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.readAsDataURL(file);
        reader.onload = (e) => callback(e.target.result);
    
        const formData = new FormData();
        // this key name should match the name in the api route.
        formData.append('image', file);
        this.imageData = formData;
        
        },
        uploadPhoto(){
        axios
            .post('http://127.0.0.1:5000/api/upload', this.imageData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            })
            .catch((err) =>{
            this.status = "error uploading image"
            })
            .then(() => this.status = "image uploaded!");
        }
    }));
});
