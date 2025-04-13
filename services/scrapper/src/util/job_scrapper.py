import asyncio
from playwright.async_api import async_playwright
import os
from datetime import datetime
from openai import OpenAI
import json
import re
from bs4 import BeautifulSoup
from playwright_stealth import stealth_async
from dotenv import load_dotenv

# Load the env variables
load_dotenv()

# ----------------- OpenAI Client ------------------
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
MODEL_NAME = "gpt-4-turbo"


# ----------------- JSON Extraction Helper ------------------
def extract_json_from_text(text: str) -> dict:
  try:
    # Remove Markdown code block formatting if present
    if text.strip().startswith("```json"):
      text = re.sub(r"^```json\s*", "", text.strip(), flags=re.IGNORECASE)
      text = re.sub(r"\s*```$", "", text.strip())

    return json.loads(text)
  except json.JSONDecodeError as e:
    raise ValueError(f"Failed to parse JSON: {e}\n--- Raw Output ---\n{text}")


# ----------------- Main Content Fallback Extraction ------------------
def extract_main_content(html: str) -> str:
  soup = BeautifulSoup(html, 'html.parser')

  # Remove noise
  for tag in soup(['script', 'style', 'nav', 'footer', 'header', 'noscript']):
    tag.decompose()

  # Find the largest visible text block
  candidates = soup.find_all(['div', 'section', 'article'], recursive=True)
  best_block = max(candidates, key=lambda tag: len(tag.get_text(strip=True)), default=None)

  if best_block:
    text = best_block.get_text(separator='\n', strip=True)
    text = re.sub(r'\n{2,}', '\n\n', text)
    return text

  return "No main content found."


# ----------------- Scrape HTML from URL ------------------
async def fetch_html_content(url: str) -> str:
  async with async_playwright() as p:
    browser = await p.chromium.launch()
    context = await browser.new_context()
    page = await context.new_page()
    await stealth_async(page)  # Apply stealth
    await page.goto(url, timeout=60000)
    await page.wait_for_load_state("networkidle")
    content = await page.content()
    await browser.close()
    return content

# ----------------- Extract Job Info ------------------
async def extract_job_info(html: str, application_url: str) -> dict:
  prompt = f"""
    You are a helpful assistant that extracts structured information from job descriptions.

    Extract the following fields and return as strict JSON:
    - company: string
    - position: string
    - applicationUrl: string
    - deadline: Date 
    - workLocation: string
    - status: string (e.g., Applied, Not Applied, Interviewing)
    - salary: {{ min: number, max: number }}
    - skillsRequired: list of strings
    - jobDescription: string

    Only return valid JSON. If a field is missing, use null or reasonable defaults.

    Visible content starts here:
    -----
    {html[:20000]}
    -----
    Application URL: {application_url}
  """
    
  response = client.chat.completions.create(
    model=MODEL_NAME,
    messages=[
        {"role": "system", "content": "You extract structured job data from plain text."},
        {"role": "user", "content": prompt}
    ],
    temperature=0.2,
  )

  raw_content = response.choices[0].message.content
  return extract_json_from_text(raw_content)


# ----------------- Main Wrapper ------------------
async def get_job_info_from_url(url: str) -> dict:
  html = await fetch_html_content(url)
  visible_text = extract_main_content(html)
  return await extract_job_info(visible_text, url)

# ----------------- Test Entry ------------------
if __name__ == "__main__":
  test_url = "https://weworkremotely.com/remote-jobs/ellipsis-head-of-business-development-120k-ote"

  async def run():
    result = await get_job_info_from_url(test_url)
    print(json.dumps(result, indent=2))

  asyncio.run(run())
