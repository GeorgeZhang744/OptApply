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

# Load the env variables from .env file
load_dotenv()

# ----------------- OpenAI Client ------------------
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
MODEL_NAME = "gpt-4-turbo"

# ----------------- JSON Extraction Helper ------------------
def extract_json_from_text(text: str) -> dict:
  """
  Extracts valid JSON from a string. Cleans up markdown code blocks if present.
  Raises ValueError if the text cannot be parsed as JSON.
  """
  try:
    # Remove Markdown code block formatting if present from the result returned by OpenAI 
    if text.strip().startswith("```json"):
      # Remove Markdown formatting if wrapped in ```json
      text = re.sub(r"^```json\s*", "", text.strip(), flags=re.IGNORECASE)
      text = re.sub(r"\s*```$", "", text.strip())

    return json.loads(text)
  except json.JSONDecodeError as e:
    # Raises ValueError if the text cannot be parsed as JSON.
    raise ValueError(f"Failed to parse JSON: {e}\n--- Raw Output ---\n{text}")


# ----------------- HTML to Visible Text Extraction ------------------
def extract_main_content(html: str) -> str:
  """
  Extracts the main readable text content from an HTML document.
  Uses BeautifulSoup to strip away non-visible elements like scripts, styles, headers, etc.
  """
  soup = BeautifulSoup(html, 'html.parser')

  # Remove elements that are unlikely to contain job content
  for tag in soup(['script', 'style', 'nav', 'footer', 'header', 'noscript']):
    tag.decompose()

  #  Look for large blocks of content that is job-related (e.g., job descriptions)
  candidates = soup.find_all(['div', 'section', 'article'], recursive=True)
  best_block = max(candidates, key=lambda tag: len(tag.get_text(strip=True)), default=None)

  if best_block:
    # Clean up extra newlines and whitespace
    text = best_block.get_text(separator='\n', strip=True)
    text = re.sub(r'\n{2,}', '\n\n', text)
    return text

  return "No main content found."


# ----------------- Scrape HTML from URL ------------------
async def fetch_html_content(url: str) -> str:
  """
  Launches a headless Chromium browser using Playwright and retrieves full page HTML.
  Stealth mode is applied to bypass simple bot detection.
  """
  async with async_playwright() as p:
    # Launch browser in headless mode (without having a GUI for the browser opened)
    browser = await p.chromium.launch(headless=False)
    context = await browser.new_context()
    page = await context.new_page()

    # Enable stealth to avoid bot detection
    await stealth_async(page) 

    # Go to the job page with the url given and set a 60s timeout
    await page.goto(url, timeout=60000)

    # Wait for page and network to settle
    await page.wait_for_load_state("networkidle")

    # Retrieve the html content on the job page
    content = await page.content()

    await browser.close()
    return content

# ----------------- Extract Job Info ------------------
async def extract_job_info(html: str, application_url: str) -> dict:
  """
  Uses the OpenAI API (GPT-4) to extract structured job details from raw visible text.
  Returns a dictionary with fields like company, position, salary, etc.
  """

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
    
  # Send to OpenAI and get structured job data back
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


# ----------------- Full Flow: Given a URL, Return Job Info ------------------
async def get_job_info_from_url(url: str) -> dict:
  """
  The full scraping and extraction process:
  1. Fetch raw HTML from the job page
  2. Extract main visible text from the raw HTML
  3. Send to OpenAI to extract job details
  """
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
