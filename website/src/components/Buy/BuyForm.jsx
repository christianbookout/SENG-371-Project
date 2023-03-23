import { useState, useContext } from "react";
import { store } from "../../store";

export const BuyForm = (props) => {
  const user = useContext(store).state.user;
  const { companyInfo, price } = props;
  const [quantity, setQuantity] = useState(0);

  const handleClick = () => {
    //send request to backend
    props.setVisible(false);
  };

  return (
    <div className="grid grid-cols-2 text-sm">
      <p className="col-span-2 text-lg">{companyInfo.ticker}</p>
      <p className="col-span-2 text-sm">{companyInfo.name}</p>
      <p className="col-span-2 mb-8 h-full text-3xl">${price}</p>
      <div className="col-span-2 flex flex-col items-center">
        <p className="text-lg">Quantity:</p>
        <input
          type="number"
          pattern="[0-9]*"
          min={0}
          value={quantity}
          onChange={(e) =>
            setQuantity((v) => (e.target.validity.valid ? e.target.value : v))
          }
          className="h-12 w-24 rounded-sm text-center text-2xl shadow-lg"
        />
      </div>
      <p className="">Balance:</p>
      <p className="text-right">${user.balance.toFixed(2)}</p>
      <div className="w-100 col-span-2 my-1 mb-1 h-0.5 rounded bg-gray-700"></div>
      <p className="">Stock:</p>
      <p className="text-right">{companyInfo.ticker}</p>
      <p className="">Price:</p>
      <p className="text-right">${price}</p>
      <p className="">Quantity:</p>
      <p className="mb-16 text-right">{quantity || 0}</p>
      <p className="">Total:</p>
      <p className="text-right">- ${(price * quantity).toFixed(2)}</p>
      <div className="w-100 col-span-2 mb-1 h-0.5 rounded bg-gray-700"></div>
      <p>Remaining Balance:</p>
      <p className="mb-6 text-right">
        ${(user.balance - quantity * price).toFixed(2)}
      </p>

      <div className="col-span-2 flex items-end">
        <button
          className="h-8 w-full items-center justify-center rounded bg-green-500 text-lg text-white shadow hover:scale-[1.01] hover:bg-green-400"
          onClick={() => handleClick()}
        >
          Buy
        </button>
      </div>
    </div>
  );
};
