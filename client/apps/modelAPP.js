document.addEventListener('alpine:init', () => {
    Alpine.data('image', () => ({
      fname: 'the image',
      imageUrl: '',
      imageData : null,
      status : "",
      message : "",
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
          .post('https://model-detect.herokuapp.com/api/detect', this.imageData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .catch((err) =>{
            this.status = "error uploading image"
          })
          .then((result) => {
            // console.log(result)

            this.status = result.data.pred_class
            this.message = result.data.confidence
            let diagnosis
            let id
            switch (this.status) {
              
              case "Tomato_Bacterial_spot":
                diagnosis = "Bacterial Spot"
                id = 3
                break;
              case "Tomato_healthy":
                diagnosis ="Healthy"
                id = 6
                break;
              case "Tomato_Late_blight":
                diagnosis = "Late blight"
                id = 2
                break;
              case "Tomato_Tomato_YellowLeaf_Curl_Virus":
                diagnosis = "Yellow leaf curl"
                id = 4
                break;
              case "Tomato_Early_blight":
                diagnosis = "Early blight"
                id = 1
                break;
              case "Tomato_Septoria_leaf_spot":
                diagnosis = "Spectorial spot"
                id = 5
              break;
              default:
                diagnosis = "Not Found"
                break;
            }
            this.inspection(id)
        });
      },

      inspection(id){
        const param = {
          "detect_time": "12H00",
          "detect_date": "07/March",
          "project_id": 1, 
          "customer_id": 1, 
          "health_status_id": id
        }
        axios
          .post('https://web-app-detect.herokuapp.com/api/detect/create', param)
          .then(() =>{
            
          })
      }


    }));

  });
  