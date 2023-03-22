import { stockInfoFields } from "../../finnhub";

export const StockInfoCard = (props) => {
  let { label, value } = props;
  console.log(props);

  return (
    <div className="flex h-full w-full flex-row justify-between p-2">
      <p className={label === "c" && "font-bold"}>{stockInfoFields[label]}: </p>
      <p>
        {label !== "dp" && "$"}
        {value && value.toFixed(2)}
        {label == "dp" && "%"}
      </p>
    </div>
  );
};
