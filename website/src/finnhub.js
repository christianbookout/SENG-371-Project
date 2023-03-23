
const finnhub = require('finnhub');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "cfpv98pr01qmi6j4cj90cfpv98pr01qmi6j4cj9g"
const finnhubClient = new finnhub.DefaultApi()

export const getStockCandles = async (symbol, resolution, from, to, setData, setLoading, setError) => {    
    finnhubClient.stockCandles(symbol, resolution, from, to, (error, data, response) => {
        setData(data);
        console.log(data);
        console.log(response);
        setError(error);
    }
    );
    setLoading(false);
}

export const fetchStockInfo = async (setData, setLoading, setError, ticker) => {
    finnhubClient.quote(
        ticker,
        (error, data, response) => {
            setData(data);
            if (data && data["c"] == 0) setError("Could not find Stock");
        }
    );
    setLoading(false)
}

export const fetchCompanyInfo = async (setData, setLoading, setError, ticker) => {
    finnhubClient.companyProfile2(
        {symbol: ticker},
        (error, data, response) => {
            setData(data);
            if (data && data.name == null) setError("Could not find Stock");
        }
    );
    setLoading(false)
}

export const stockInfoFields = {
    c: "Current Price",
    h: "Day High",
    l: "Day Low",
    o: "Open Price",
    pc: "Previous Close",
    dp: "Percent Change",
    d: "Price Change"
}