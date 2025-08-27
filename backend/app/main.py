from pathlib import Path
from fastapi import FastAPI
from pydantic import BaseModel
from app import data
import json

app = FastAPI()

@app.get('/')
async def main():
  return {
    "message": "Hello World from Backend!!"
  }


@app.get('/items/{id}')
async def read_item(
  id: str, needy: str, q: str | None = None ,short: bool = False
):
  item = {"item_id": id, "needy": needy}
  if q:
    item.update({"q": q})
  return item

@app.get('/data')
async def get_data():
  file_path = Path(__file__).parent / 'data.json'
  with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)
  return data