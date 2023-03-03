import { useEffect, useState } from "react"
import { ApiClient, DefaultApi } from "finnhub/dist";



export const StockData = (props) => {
    const finnhub = require('finnhub');
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    // const api_key = ApiClient.instance.authentications['api_key'];
    // api_key.apiKey = "cfpv98pr01qmi6j4cj90cfpv98pr01qmi6j4cj9g"
    // const finnhubClient = new DefaultApi()
    
    // // Stock candles
    


    const fetchData = async () => {
        try {
            // const data = await (
            //     await fetch(
            //       `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${props.symbol}&interval=5min&apikey=GT2HOU06URGEHO0T`
            //     )
            //   ).json();
            // setData(data)

            const api_key = finnhub.ApiClient.instance.authentications['api_key'];
            api_key.apiKey = "cfpv98pr01qmi6j4cj90cfpv98pr01qmi6j4cj9g"
            const finnhubClient = new finnhub.DefaultApi()

            finnhubClient.stockCandles("AAPL", "D", 1590988249, 1591852249, (error, data, response) => {
                setData(data)
            });
            setLoading(false);
        } catch (err) {
            alert(err);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="w-full h-80 rounded-3xl shadow-xl bg-white">
            <div className="w-full h-full overflow-hidden text-sm">
                {loading ? "loading" : JSON.stringify(data)}
            </div>
        </div>
    )
}