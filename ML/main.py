from fastapi import FastAPI
from contextlib import asynccontextmanager
from detoxify import Detoxify
from pydantic import BaseModel
import pandas as pd
import logging

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


app = FastAPI(lifespan=lifespan)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/toxicity/text")
async def tox_check(body: ToxText):
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

