from fastapi import FastAPI
from contextlib import asynccontextmanager
from detoxify import Detoxify
from pydantic import BaseModel
from sightengine.client import SightengineClient
import pandas as pd
import logging
from dotenv import load_dotenv
import os

load_dotenv()

logger = logging.getLogger("uvicorn")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # On load
    logger.info("Server initialise")
    yield
    logger.info("Server terminating")

class ToxText(BaseModel):
    text: str
    
class ToxReturn(BaseModel):
    toxtypes: list

class ToxImage(BaseModel):
    image_path: str


app = FastAPI(lifespan=lifespan)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/toxicity/text")
async def tox_text(body: ToxText):
    logger.info(body)
    text = body.text
    res:dict = Detoxify("original").predict(text)
    logger.info(res)
    max_key = max(res, key=res.get)
    max_val = res[max_key]
    logger.info(max_val.item())
    ret_list = []
    for key, value in res.items():
        if value > 0.75:
            ret_list.append(key)
    return ToxReturn(toxtypes=ret_list)

@app.post("/toxicity/image")
async def tox_image(body: ToxImage):
    logger.info(body)
    # binary image
    isUnsafe = False
    public = os.getenv("SE_PUBLIC")
    private = os.getenv("SE_SECRET")
    client = SightengineClient(public, private)
    output = client.check('nudity','wad','gore','offensive').set_file(body.image_path)
    logger.info(output)
    os.remove(body.image_path)
    if output["nudity"]["safe"]<0.9:
        isUnsafe = True
    if output["weapon"] > 0.8 or output["alcohol"] > 0.8 or output["drugs"] > 0.8:
        isUnsafe = True
    print(output["gore"]["prob"])
    if float(output["gore"]["prob"]) > 0.8:
        isUnsafe = True
    if output["offensive"]["prob"] > 0.8:
        isUnsafe = True
    if isUnsafe:
        return ToxReturn(toxtypes=["Explicit"])
    else:
        return ToxReturn(toxtypes=[])

