import { getStockCandles } from "../../finnhub";
import { Content } from "../Content";
import { useState, useEffect } from "react";
import Plot from 'react-plotly.js';


export const StockGraph = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const data = getStockCandles(
      "AAPL",
      "D",
      1675314400,
      1679425200,
      setData,
      setLoading,
      setError
    );
    setData(data)
  }, []);

  return !loading && data?.c != null && (
    <Content title="Graph">
      <Plot
        data={[{
          x: data?.t.map(unixTime => new Date(unixTime * 1000)),
          close: data?.c,
          high: data?.h,
          low: data?.l,
          open: data?.o,
          type: 'candlestick',
        }
      ]}
        layout={{}}
      />
    </Content>
  );
};
