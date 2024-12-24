from pydantic import BaseModel
from typing import Literal
from datetime import date

class Investment(BaseModel):
    stock_code: str
    investment_type: Literal['espp', 'RSU']
    stock_quantity: int
    stock_price: str
    investment_date: date