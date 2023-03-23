import { useState } from "react";
import { Content } from "../Content";
import { SearchBar } from "../SearchBar";
import { StockInfo } from "../StockInfo/StockInfo";

export const Buy = (props) => {
  const [stock, setStock] = useState();

  return (
    <Content title="Buy Stocks">
      <div className="flex h-full w-full flex-col">
        <SearchBar value={stock} onChange={setStock} />
        <StockInfo
          ticker={stock && stock.toUpperCase()}
          key={stock}
          user={props.user}
        />
      </div>
    </Content>
  );
};
