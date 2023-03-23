import { SearchBar } from "../SearchBar";
import { Content } from "../Content";
import { useEffect, useState, useContext } from "react";
import { SellCard } from "./SellCard";
import { store } from "../../store";

export const Sell = () => {
  const user = useContext(store).state.user;
  const [search, setSearch] = useState("");

  return (
    <Content title="Sell Stocks">
      <div className="flex w-full flex-col">
        <SearchBar value={search} onChange={setSearch} />
        <h2 className="mt-8 text-xl">Your stocks:</h2>
        <div className="flex flex-col divide-y-2 rounded border-gray-600 bg-white shadow">
          {user.stocks
            .filter((stock) => {
              return stock.ticker.toLowerCase().includes(search.toLowerCase());
            })
            .map((stock) => {
              return <SellCard stock={stock} />;
            })}
        </div>
      </div>
    </Content>
  );
};
