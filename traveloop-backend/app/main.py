from fastapi import FastAPI
from app.routes import user_routes

app = FastAPI(title="Traveloop API")

app.include_router(user_routes.router)

@app.get("/")
def home():
    return {"message": "Traveloop Backend Running"}
