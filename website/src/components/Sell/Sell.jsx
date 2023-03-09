import { SearchBar } from "../SearchBar";
import { Content } from "../Content";
import { useState } from "react";
import { SellCard } from "./SellCard";

export const Sell = () => {
  const [search, setSearch] = useState("");

  return (
    <Content title="Sell Stocks">
      <div className="flex w-full flex-col">
        <SearchBar value={search} onChange={setSearch} />
        <h2 className="mt-8 text-xl">Your stocks:</h2>
        <div className="flex h-full max-h-96 max-h-full flex-col divide-y-2 overflow-hidden overflow-y-scroll rounded border-gray-600 bg-white shadow">
          <SellCard />
          <SellCard />
          <SellCard />
          <SellCard />
          <SellCard />
          <SellCard />
          <SellCard />
          <SellCard />
          <SellCard />
          <SellCard />
          <SellCard />
          <SellCard />
        </div>
      </div>
    </Content>
  );
};
