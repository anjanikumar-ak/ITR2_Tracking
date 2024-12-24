import pandas as pd
from typing import List, Dict
import json
from datetime import datetime

class InvestmentService:
    def __init__(self):
        self.dataframes = {}
        self._load_dataframes()

    def _load_dataframes(self):
        """Load required CSV files into memory"""
        try:
            self.dataframes["QCOM_history"] = pd.read_csv("data/QCOM_HISTORY.csv")
            self.dataframes["SBI_REFERENCE_RATES_USD"] = pd.read_csv("data/SBI_REFERENCE_RATES_USD.csv")
            # Convert date columns
            self.dataframes["QCOM_history"]["Date"] = pd.to_datetime(self.dataframes["QCOM_history"]["Date"], utc=True)
            self.dataframes["SBI_REFERENCE_RATES_USD"]["DATE"] = pd.to_datetime(self.dataframes["SBI_REFERENCE_RATES_USD"]["DATE"], utc=True)
            print("Dataframes loaded successfully!")
        except Exception as e:
            print(f"Error loading dataframes: {str(e)}")
            raise

    def compute_investments(self, investments: List[Dict]) -> List[Dict]:
        """Compute investment metrics"""
        try:
            year = 2024
            iv_df = pd.DataFrame(investments)
            iv_df['investment_date'] = pd.to_datetime(iv_df['investment_date'], utc=True)
            
            hf = self.dataframes['QCOM_history']
            df = self.dataframes['SBI_REFERENCE_RATES_USD']
            
            # Rest of your computation logic from app.py
            # ... (copy the computation logic here)
            
            return iv_df.to_dict(orient='records')
        except Exception as e:
            print(f"Error computing investments: {str(e)}")
            raise