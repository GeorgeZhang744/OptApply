## Steps to run this service

### 1. Install Python dependencies

```bash
pip install -r requirements.txt
```

### 2. Install Playwright browser dependencies

```bash
playwright install
```

### 3. Create a `.env` file in the root of this service: `OptApply/services/scrapper`

```env
OPENAI_API_KEY=your-openai-api-key
```

### 4. Run the FastAPI server

```bash
uvicorn src.main:app --host 0.0.0.0 --port 3004
```

### 5. Test the API

- Open Postman to this url:  
  `http://localhost:3004`
- Use the `/scrape` POST endpoint with a JSON body like:

```json
{
  "url": "https://weworkremotely.com/remote-jobs/example-job"
}
```

### WARNING: 
If you run into any issues during setup or execution, it’s highly recommended to use a **Python virtual environment**. You can set one up and run it with:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```