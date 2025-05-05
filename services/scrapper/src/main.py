from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from src.util import job_scrapper
from src.util import validate
import os
from dotenv import load_dotenv

app = FastAPI()

SECRET_KEY = os.getenv("JWT_SECRET")
if not SECRET_KEY:
  raise ValueError("JWT_SECRET environment variable is not set.")

class ScrapeRequest(BaseModel):
  url: str

@app.post("/scrapper/fill")
async def scrape_job(request: ScrapeRequest, user: dict = Depends(validate.validate_token)):
  try:
    job_info = await job_scrapper.get_job_info_from_url(request.url)
    return { "result": job_info }
  except Exception as e:
    raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
  return {"message": "Scraper service is running!"}
