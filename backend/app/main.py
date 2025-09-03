from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
async def main():
  return {
    "message": "Hello World from Backend!!"
  }

@app.get('/items/{id}')
async def read_item(
  id: str, needy: str, q: str | None = None , short: bool = False
):
  item = {"item_id": id, "needy": needy}
  if q:
    item.update({"q": q})
  return item

@app.get('/marketing')
async def get_data():
  file_path = Path(__file__).parent / 'data.json'
  with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)
  return data

@app.get('/dose')
async def get_data_by_month():
  file_path = Path(__file__).parent / 'dose_volume_extracted.json'
  with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)
  return data