import { Modal } from "../Modal";
import { StockInfo } from "../StockInfo/StockInfo";
import { useState, useEffect } from "react";
import { fetchCompanyInfo, fetchStockInfo } from "../../finnhub";
import { SellForm } from "./SellForm";

export const SellCard = (props) => {
  const [infoModal, setInfoModal] = useState(false);
  const [sellModal, setSellModal] = useState(false);
  const [stockInfo, setStockInfo] = useState({});
  const [companyInfo, setCompanyInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchStockInfo(setStockInfo, setLoading, setError, props.ticker);
    fetchCompanyInfo(setCompanyInfo, setLoading, setError, props.ticker);
  }, [fetchStockInfo, fetchCompanyInfo]);

  return (
    stockInfo &&
    companyInfo && (
      <div className="grid w-full grid-cols-4 items-center justify-between p-3">
        <Modal visible={infoModal} setVisible={setInfoModal}>
          <StockInfo
            ticker={props.ticker}
            user={props.user}
            price={stockInfo.c}
            companyInfo={companyInfo}
          />
        </Modal>
        <Modal visible={sellModal} setVisible={setSellModal} small={true}>
          <SellForm
            setVisible={setSellModal}
            user={props.user}
            stockInfo={stockInfo}
            companyInfo={companyInfo}
          />
        </Modal>
        <p>Stock: {props.ticker}</p>
        <p>Quantity: {props.quantity}</p>
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
