import { SearchBar } from "../SearchBar";
import { Content } from "../Content";
import { useState } from "react";
import { SellCard } from "./SellCard";

export const Sell = (props) => {
  const [search, setSearch] = useState("");

  return (
    <Content title="Sell Stocks">
      <div className="flex w-full flex-col">
        <SearchBar value={search} onChange={setSearch} />
        <h2 className="mt-8 text-xl">Your stocks:</h2>
        <div className="flex flex-col divide-y-2 rounded border-gray-600 bg-white shadow">
          {props.user.stocks.map((stock) => {
            return (
              <SellCard
                ticker={stock.ticker}
                quantity={stock.quantity}
                buyPrice={stock.buyPrice}
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
