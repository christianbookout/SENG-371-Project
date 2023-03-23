import { useEffect, useState } from "react";
import { StockInfoCard } from "./StockInfoCard";
import { fetchStockInfo, fetchCompanyInfo } from "../../finnhub";
import { Modal } from "../Modal";
import { BuyForm } from "../Buy/BuyForm";
import { useContext } from "react";
import { store } from "../../store";
import { ErrorMessage } from "./ErrorMessage";

export const StockInfo = (props) => {
  const { ticker } = props;
  const user = useContext(store).state.user;
  const [stockInfo, setStockInfo] = useState();
  const [companyInfo, setCompanyInfo] = useState();
  const [loadingStock, setLoadingStock] = useState(true);
  const [loadingInfo, setLoadingInfo] = useState(true);
  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const getData = setTimeout(() => {
      fetchStockInfo(setStockInfo, setLoadingStock, setError, ticker);
      fetchCompanyInfo(setCompanyInfo, setLoadingInfo, setError, ticker);
    }, 500);
    return () => clearTimeout(getData);
  }, [fetchStockInfo, fetchCompanyInfo]);

  return !ticker ? null : loadingStock || loadingInfo ? (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <p className="text-2xl font-bold">Loading...</p>
    </div>
  ) : error ? (
    <ErrorMessage />
  ) : (
    stockInfo &&
    companyInfo && (
      <div className="my-4 flex h-full w-full flex-col">
        <Modal visible={visible} setVisible={setVisible} small={true}>
          <BuyForm
            balance={user.balance}
            price={stockInfo.c}
            companyInfo={companyInfo}
            setVisible={setVisible}
          />
        </Modal>

        <div className="flex w-full flex-col">
          <p className="w-full text-left text-3xl">{companyInfo.ticker}</p>
          <p className="w-full text-left text-sm">{companyInfo.name}</p>
        </div>
        <div className="grid h-full w-full grid-cols-5 gap-2">
          <div className="col-span-4 row-span-2 flex h-full w-full items-center justify-center bg-gray-700">
            <p className="text-lg text-white">Stock Chart</p>
          </div>
          <div className="row-span-2 flex h-full w-full flex-col divide-y-2 rounded border-gray-600 bg-white shadow-lg">
            {Object.keys(stockInfo).map((key) => {
              return (
                <StockInfoCard key={key} label={key} value={stockInfo[key]} />
              );
            })}
          </div>
          <div className="col-span-4 flex h-full w-full divide-x-2 rounded border-gray-600 bg-white shadow">
            <div className="flex h-full w-full items-center justify-center hover:bg-gray-100">
              1 Day
            </div>
            <div className="flex h-full w-full items-center justify-center hover:bg-gray-100">
              1 Week
            </div>
            <div className="flex h-full w-full items-center justify-center hover:bg-gray-100">
              1 Month
            </div>
            <div className="flex h-full w-full items-center justify-center hover:bg-gray-100">
              YTD
            </div>
          </div>
          <div>
            <button
              className="h-full w-full items-center justify-center rounded bg-green-500 text-lg text-white shadow hover:scale-[1.01] hover:bg-green-400"
              onClick={() => setVisible(true)}
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    )
  );
};
