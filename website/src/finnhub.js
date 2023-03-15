const finnhub = require('finnhub');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "cfpv98pr01qmi6j4cj90cfpv98pr01qmi6j4cj9g"
const finnhubClient = new finnhub.DefaultApi()

export const getStockCandles = async (symbol, resolution, from, to) => {    
    const res = await finnhubClient.stockCandles(symbol, resolution, from, to)
    return res
}