import { useState, useContext, useEffect } from "react";
import { Content } from "../Content";
import { SearchBar } from "../SearchBar";
import { StockInfo } from "../StockInfo/StockInfo";
import { useNavigate } from "react-router-dom";
import { store } from "../../store";

export const Buy = (props) => {
  const user = useContext(store).state.user;
  const navigate = useNavigate();
  const [stock, setStock] = useState();

  useEffect(() => {
    if (!user) navigate("/");
  });

  return (
    <Content title="Buy Stocks">
      <div className="flex h-full w-full flex-col">
        <SearchBar value={stock} onChange={setStock} />
        <StockInfo ticker={stock && stock.toUpperCase()} key={stock} />
      </div>
    </Content>
  );
};
