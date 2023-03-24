import { useState } from "react";

export const SellForm = (props) => {
  const { companyInfo, stockInfo, user } = props;
  const { ticker, name } = companyInfo;
  const price = stockInfo.c;
  const { balance } = user;
  console.log(props);
  const max = user.stocks.find((stock) => stock.ticker === ticker)?.quantity;
  const [quantity, setQuantity] = useState(max || 0);

  const handleClick = () => {
    //send request to backend
    props.setVisible(false);
  };

  return (
    <div className="grid grid-cols-2 text-sm">
      <p className="col-span-2 text-2xl font-bold">Sell</p>
      <p className="col-span-2 text-sm">{name}</p>
      <p className="col-span-2 mb-8 h-full text-3xl">${price}</p>
      <div className="col-span-2 flex flex-col items-center">
        <p className="text-lg">Quantity:</p>
        <input
          type="number"
          pattern="[0-9]*"
          max={max}
          value={quantity}
          onChange={(e) =>
            setQuantity((v) => (e.target.validity.valid ? e.target.value : v))
          }
          className="h-12 w-24 rounded-sm text-center text-2xl shadow-lg"
        />
      </div>
      <p className="">Balance:</p>
      <p className="text-right">${balance.toFixed(2)}</p>
      <div className="w-100 col-span-2 my-1 mb-1 h-0.5 rounded bg-gray-700"></div>
      <p className="">Stock:</p>
      <p className="text-right">{companyInfo.ticker}</p>
      <p className="">Price:</p>
      <p className="text-right">${price}</p>
      <p className="">Quantity:</p>
      <p className="mb-16 text-right">{quantity || 0}</p>
      <p className="">Total:</p>
      <p className="text-right">+ ${(price * quantity).toFixed(2)}</p>
      <div className="w-100 col-span-2 mb-1 h-0.5 rounded bg-gray-700"></div>
      <p>New Balance:</p>
      <p className="mb-6 text-right">
        ${(balance + quantity * price).toFixed(2)}
      </p>

      <div className="col-span-2 flex items-end">
        <button
          className="h-8 w-full items-center justify-center rounded bg-red-500 text-lg text-white shadow hover:scale-[1.01] hover:bg-red-400"
          onClick={() => handleClick()}
        >
          Sell
        </button>
      </div>
    </div>
  );
};
