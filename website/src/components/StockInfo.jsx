import { StockInfoCard } from "./StockInfoCard";

export const StockInfo = (props) => {
  return (
    <div className="my-4 flex h-full w-full flex-col">
      <div className="flex w-full flex-col">
        <p className="w-full text-left text-3xl">AAPL</p>
        <p className="w-full text-left text-sm">Apple Inc.</p>
      </div>
      <div className="grid h-full w-full grid-cols-5 gap-2">
        <div className="col-span-4 row-span-2 flex h-full w-full items-center justify-center bg-gray-700">
          <p className="text-lg text-white">Stock Chart</p>
        </div>
        <div className="row-span-2 flex h-full w-full flex-col divide-y-2 rounded border-gray-600 bg-white shadow-lg">
          <StockInfoCard title="Price" price={22.3} />
          <StockInfoCard title="Price" price={22.3} />
          <StockInfoCard title="Price" price={22.3} />
          <StockInfoCard title="Price" price={22.3} />
          <StockInfoCard title="Price" price={22.3} />
          <StockInfoCard title="Price" price={22.3} />
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
        <button className="h-full w-full items-center justify-center rounded bg-green-500 text-lg text-white shadow hover:scale-[1.01] hover:bg-green-400">
          Buy
        </button>
      </div>
    </div>
  );
};
