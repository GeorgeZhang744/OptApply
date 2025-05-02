from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from src.util import job_scrapper

app = FastAPI()

class ScrapeRequest(BaseModel):
  url: str

@app.post("/scrapper/fill")
async def scrape_job(request: ScrapeRequest):
  try:
    job_info = await job_scrapper.get_job_info_from_url(request.url)
    return { "result": job_info }
  except Exception as e:
    raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
  return {"message": "Scraper service is running!"}
