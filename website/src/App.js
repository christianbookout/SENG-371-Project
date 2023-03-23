import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import Reset from "./components/Login/Reset";
import Stocks from "./components/Stocks";
import News from "./components/News/News";
import { Buy } from "./components/Buy/Buy";
import { Sell } from "./components/Sell/Sell";
import { useState } from "react";

function App() {
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
    <div className="bg-white">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/buy" element={<Buy user={user}/>} />
          <Route exact path="/sell" element={<Sell user={user}/>} />
          <Route exact path="/news" element={<News />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
