from fastapi import FastAPI, File, UploadFile
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf

app = FastAPI()

MODEL = tf.keras.models.load_model("./vgg16_model/saved_model.pd")
CLASS_NAMES = ["Tomato_Early_blight", "Tomato_Late_blight", "Tomato_healthy", "Tomato_Tomato_YellowLeaf_Curl_Virus", "Tomato_Bacterial_spot", "Tomato_Septoria_leaf_spot"]

@app.get("/ping")
async def ping():
    return "welcome"

def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data))) 
    return image
    
    
@app.post("/predict")
async def predict(
    file: UploadFile = File(...)
):
    image = read_file_as_image(await file.read())
    img_batch = np.expand_dims(image, 0)
    predictions = MODEL.predict(img_batch)
    predicted_class = [np.argmax(predictions[0])]
    confidence = np.max(predictions[0])
    
    return {
        'class': predicted_class,
        'confidence' : float(confidence)
    }


if __name__ == "__server__":
    uvicorn.run(app, host ='localhost', port=8000)
    
