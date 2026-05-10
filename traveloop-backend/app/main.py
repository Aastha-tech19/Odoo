from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db import init_database
from app.routes import user_routes

app = FastAPI(title="Traveloop API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_routes.router)


@app.on_event("startup")
def startup():
    init_database()


@app.get("/")
def home():
    return {"message": "Traveloop Backend Running"}
