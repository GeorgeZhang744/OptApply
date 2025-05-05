import httpx
from fastapi import HTTPException, Header

AUTH_SERVICE_URL = "http://localhost:3000/api/auth/validate"  # use internal service URL in Docker

async def validate_token(authorization: str = Header(...)):
  try:
    async with httpx.AsyncClient() as client:
      response = await client.post(
        AUTH_SERVICE_URL,
        headers={"Authorization": authorization}
      )
    if response.status_code != 200:
      raise HTTPException(status_code=401, detail="Unauthorized")
    return response.json()["user"]
  except Exception as e:
    raise HTTPException(status_code=401, detail="Token validation failed")
  