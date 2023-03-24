import { SearchBar } from "../SearchBar";
import { Content } from "../Content";
import { useEffect, useState } from "react";
import { SellCard } from "./SellCard";

export const Sell = (props) => {
  const { user } = props;
  const [search, setSearch] = useState("");

  console.log(props.user.stocks);
  return (
    <Content title="Sell Stocks">
      <div className="flex w-full flex-col">
        <SearchBar value={search} onChange={setSearch} />
        <h2 className="mt-8 text-xl">Your stocks:</h2>
        <div className="flex flex-col divide-y-2 rounded border-gray-600 bg-white shadow">
          {/* return stock.ticker.toLowerCase().includes(search.toLowerCase()); */}
          {props.user.stocks.map((stock) => {
            return (
              <SellCard
                ticker={stock.ticker}
                quantity={stock.quantity}
                key={stock.ticker}
                user={props.user}
              />
            );
          })}
        </div>
      </div>
    </Content>
  );
};
