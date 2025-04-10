from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class ScrapeRequest(BaseModel):
  url: str

@app.get("/")
async def root():
  return { "message": "Scraper service is running!" }
