# Steps to Run This Service Locally

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
JWT_SECRET=your-jwt-secret
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


# Steps to Run This Service in Docker Container

### 1. Create a `.env` file in the root of this service: `OptApply/services/scrapper`

```env
OPENAI_API_KEY=your-openai-api-key
```

### 2. Create a docker image named `scrapper`
```bash
docker build -t scrapper .
```

### 3. Run the `scrapper` container using your `.env` file
```bash
docker run --env-file .env -p 3004:3004 scrapper
```