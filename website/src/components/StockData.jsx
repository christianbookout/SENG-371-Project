import { useEffect, useState } from "react";
import { ApiClient, DefaultApi } from "finnhub/dist";
import { fetchStockInfo } from "../finnhub";

export const StockData = (props) => {
  const finnhub = require("finnhub");
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStockInfo(setData, setLoading, "AAPL");
  }, [fetchStockInfo]);

  return (
    <div className="h-80 w-full rounded-3xl bg-white shadow-xl">
      <div className="h-full w-full overflow-hidden text-sm">
        {loading ? "loading" : JSON.stringify(data)}
      </div>
    </div>
  );
};
