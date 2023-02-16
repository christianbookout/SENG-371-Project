import { useEffect, useState } from "react"

export const StockData = (props) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const data = await (
                await fetch(
                  `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${props.symbol}&interval=5min&apikey=GT2HOU06URGEHO0T`
                )
              ).json();
            setData(data)
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