import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import Reset from "./components/Login/Reset";
import Stocks from "./components/Stocks";
import News from "./components/News/News";
import { Buy } from "./components/Buy/Buy";
import { Sell } from "./components/Sell/Sell";
import { StockGraph } from "./components/StockInfo/StockGraph";

function App() {
  return (
    <div className="bg-white">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/buy" element={<Buy/>} />
          <Route exact path="/sell" element={<Sell />} />
          <Route exact path="/news" element={<News />} />
          <Route exact path="/graph" element={<StockGraph />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
