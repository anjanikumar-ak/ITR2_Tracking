export interface Investment {
  stock_code: string;
  investment_type: 'ESPP' | 'RSU';
  stock_quantity: number;
  stock_price: string;
  investment_date: string;
}

export interface ComputedInvestment extends Investment {
  stock_price_yf: number;
  SBI_TT_BUY: number;
  investment_value_INR: number;
  investment_value_USD: number;
  peak_date: string;
  peak_price: number;
  SBI_TT_BUY_PEAK: number;
  peak_value_INR: number;
  peak_value_USD: number;
  closing_price: number;
  closing_date: string;
  SBI_TT_BUY_CLOSING: number;
  closing_value_INR: number;
  closing_value_USD: number;
  total_dividend_INR: number;
  total_dividend_USD: number;
}