import { getStockCandles } from "../../finnhub";
import { Content } from "../Content";
import { useState, useEffect } from "react";
import Plot from "react-plotly.js";

export const StockGraph = (props) => {
  let { symbol, timeLength } = props;
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Default to 1 day
  let timeDifference = 60 * 60 * 24 * 1000;
  let resolution = "15";
  switch (timeLength) {
    case "week":
      resolution = "60";
      timeDifference *= 7;
      break;
    case "month":
      resolution = "D";
      timeDifference *= 30;
      break;
    case "year":
      resolution = "W";
      timeDifference *= 365;
      break;
  }
  const curTime = Date.now();
  const to = new Date(curTime);
  const from = new Date(curTime - timeDifference);

  useEffect(() => {
    const getData = setTimeout(() => {
      getStockCandles(
        symbol,
        resolution,
        Math.floor(from.getTime() / 1000),
        Math.floor(to.getTime() / 1000),
        setData,
        setLoading,
        setError
      );
    }, 500);
    return () => clearTimeout(getData);
  }, [timeLength]);

  return (
    !loading &&
    data?.c != null && (
      <Plot
        data={[
          {
            x: data?.t.map((unixTime) => new Date(unixTime * 1000)),
            close: data?.c,
            high: data?.h,
            low: data?.l,
            open: data?.o,
            type: "candlestick",
          },
        ]}
        layout={{
          font: {
            size: 10,
            color: "black",
          },
          xaxis: {
            range: [from, to],
            rangeslider: { range: [from, to] },
          },
          yaxis: {
            tickformat: ",",
          },
          plot_bgcolor: "#f5f5f5",
          paper_bgcolor: "#f5f5f5",
        }}
        config={{
          modeBarButtonsToRemove: [
            "toImage",
            "lasso2d",
            "select2d",
            "zoom2d",
            "autoScale2d",
          ],
        }}
      />
    )
  );
};
