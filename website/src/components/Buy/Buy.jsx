import { useState } from "react";
import { Content } from "../Content";
import { SearchBar } from "../SearchBar";
import { StockInfo } from "../StockInfo";

export const Buy = () => {
  const [stock, setStock] = useState();

  return (
    <Content title="Buy Stocks">
      <div className="flex h-full w-full flex-col">
        <SearchBar value={stock} onChange={setStock} />
        <StockInfo ticker={stock && stock.toUpperCase()} key={stock} />
      </div>
    </Content>
  );
};
