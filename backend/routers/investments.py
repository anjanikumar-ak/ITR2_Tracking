from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from services.investment_service import InvestmentService

router = APIRouter(prefix="/api")
investment_service = InvestmentService()

@router.post("/compute")
async def compute_investments(request: Request):
    try:
        json_data = await request.json()
        result = investment_service.compute_investments(json_data)
        return JSONResponse(content=result, status_code=200)
    except Exception as e:
        return JSONResponse(
            content={"error": str(e)},
            status_code=400
        )