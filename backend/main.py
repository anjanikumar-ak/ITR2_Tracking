from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import investments

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(investments.router)

@app.get("/")
async def root():
    return {"message": "Investment Portfolio Tracker API"}