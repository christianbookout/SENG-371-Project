import { Modal } from "../Modal";
import { StockInfo } from "../StockInfo/StockInfo";
import { useState, useEffect, useContext } from "react";
import { fetchCompanyInfo, fetchStockInfo } from "../../finnhub";
import { SellForm } from "./SellForm";
import { store } from "../../store";

export const SellCard = (props) => {
  const { ticker, quantity } = props.stock;

  const [infoModal, setInfoModal] = useState(false);
  const [sellModal, setSellModal] = useState(false);

  const [stockInfo, setStockInfo] = useState({});
  const [companyInfo, setCompanyInfo] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchStockInfo(setStockInfo, setLoading, setError, ticker);
    fetchCompanyInfo(setCompanyInfo, setLoading, setError, ticker);
  }, [fetchStockInfo, fetchCompanyInfo]);

  return (
    !loading &&
    !error && (
      <div className="grid w-full grid-cols-4 items-center justify-between p-3">
        <Modal visible={infoModal} setVisible={setInfoModal}>
          <StockInfo
            ticker={ticker}
            price={stockInfo.c}
            companyInfo={companyInfo}
          />
        </Modal>

        <Modal visible={sellModal} setVisible={setSellModal} small={true}>
          <SellForm
            setVisible={setSellModal}
            stockInfo={stockInfo}
            companyInfo={companyInfo}
          />
        </Modal>

        <p>Stock: {ticker}</p>
        <p>Quantity: {quantity}</p>
        <p>Current Price: {stockInfo.c}</p>

        <div className="flex gap-2">
          <button
            className="w-100 h-8 items-center justify-center rounded-sm bg-blue-400 px-2 text-white shadow-lg hover:scale-[1.01] hover:bg-blue-300"
            onClick={() => {
              setInfoModal(true);
            }}
          >
            View Info
          </button>
          <button
            className="w-100 h-8 items-center justify-center rounded bg-red-500 px-6 text-white shadow-lg hover:scale-[1.01] hover:bg-red-400"
            onClick={() => setSellModal(true)}
          >
            Sell
          </button>
        </div>
      </div>
    )
  );
};
