import { useState } from "react";
import { Content } from "../Content";
import { SearchBar } from "../SearchBar";
import { StockInfo } from "../StockInfo";

export const Buy = () => {
  const [stock, setStock] = useState();
  const options = ["AAPL", "TEST", "SCOTT", "AARDVARK"];

  return (
    <Content title="Buy Stocks">
      <div className="flex h-full w-full flex-col">
        <SearchBar value={stock} onChange={setStock} />
        <StockInfo />
      </div>
    </Content>
  );
};
