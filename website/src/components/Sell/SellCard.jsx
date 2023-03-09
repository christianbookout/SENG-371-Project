export const SellCard = (props) => {
  return (
    <div className="flex w-full items-center justify-between p-3">
      <p>Stock: {"AAPL"}</p>
      <p>Quantity: {100}</p>
      <p>Buy price: {21.77}</p>
      <p>Current Price: {20.85}</p>
      <div className="flex gap-2">
        <button className="w-100 h-8 items-center justify-center rounded bg-blue-400 px-2 text-white shadow-lg hover:scale-[1.01] hover:bg-blue-300">
          View Stock Info
        </button>
        <button className="w-100 h-8 items-center justify-center rounded bg-red-500 px-6 text-white shadow-lg hover:scale-[1.01] hover:bg-red-400">
          Sell
        </button>
      </div>
    </div>
  );
};
