import { Sidebar } from "./Sidebar";
import { useState } from "react";

export const Content = (props) => {
  const userData = {
    balance: 21000,
    stocks: [
      { ticker: "AAPL", quantity: 100, buyPrice: 22.77 },
      { ticker: "TSLA", quantity: 100, buyPrice: 21.77 },
      { ticker: "GME", quantity: 100, buyPrice: 20.77 },
      { ticker: "AA", quantity: 100, buyPrice: 25.77 },
      { ticker: "GO", quantity: 100, buyPrice: 23.77 },
    ],
  };

  const [user, setUser] = useState(userData);

  return (
    <div className="flex h-screen w-screen bg-neutral-100">
      <Sidebar balance={user.balance} />
      <div className="flex h-screen w-full flex-col">
        <div className="flex h-min w-full flex-col items-start justify-center p-8 pb-0">
          <h1 className="text-2xl">{props.title}</h1>
          <div className="my-2 h-0.5 w-full rounded bg-gray-300 px-16" />
        </div>
        <div className="no-scrollbar my-2 flex h-full w-full overflow-hidden overflow-y-scroll rounded px-8">
          {props.children}
        </div>
      </div>
    </div>
  );
};
