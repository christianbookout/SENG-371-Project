import { getStockCandles } from "../../finnhub";
import { Content } from "../Content";
import { useState, useEffect } from "react";

export const StockGraph = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const data = getStockCandles(
      "AAPL",
      "D",
      1679414400,
      1679425200,
      setData,
      setLoading,
      setError
    );
  }, []);

  return (
    <Content title="Graph">
      <div>
        <h1>Stock Graph</h1>
        {JSON.stringify(data)}
      </div>
    </Content>
  );
};
