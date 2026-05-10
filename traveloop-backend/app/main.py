from fastapi import FastAPI

app = FastAPI(title="Traveloop API")

@app.get("/")
def home():
    return {"message": "Traveloop Backend Running"}