import { Modal } from "../Modal";
import { StockInfo } from "../StockInfo/StockInfo";
import { useState } from "react";
import { fetchStockInfo } from "../../finnhub";

export const SellCard = (props) => {
  const [visible, setVisible] = useState(false);
  const [stockInfo, setStockInfo] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const useEffect = () => {
    fetchStockInfo(setStockInfo, setLoading, setError, props.ticker);
  };

  return (
    <div className="grid w-full grid-cols-5 items-center justify-between p-3">
      <Modal visible={visible} setVisible={setVisible}>
        <StockInfo ticker={props.ticker} user={props.user} />
      </Modal>
      <p>Stock: {props.ticker}</p>
      <p>Quantity: {props.quantity}</p>
      <p>Buy price: {props.buyPrice}</p>
      <p>Current Price: {20.85}</p>
      <div className="flex gap-2">
        <button
          className="w-100 h-8 items-center justify-center rounded-sm bg-blue-400 px-2 text-white shadow-lg hover:scale-[1.01] hover:bg-blue-300"
          onClick={() => {
            setVisible(true);
          }}
        >
          View Info
        </button>
        <button className="w-100 h-8 items-center justify-center rounded bg-red-500 px-6 text-white shadow-lg hover:scale-[1.01] hover:bg-red-400">
          Sell
        </button>
      </div>
    </div>
  );
};
