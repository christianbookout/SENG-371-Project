import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import Reset from "./components/Login/Reset";
import Stocks from "./components/Stocks";
import News from "./components/News/News";
import { Buy } from "./components/Buy/Buy";
import { Sell } from "./components/Sell/Sell";
import { useState } from "react";
import { useContext } from "react";
import { store } from "./store";
import { Analytics } from "./components/Analytics";

function App() {
  const state = useContext(store);

  return (
    <div className="bg-white">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/buy" element={<Buy user={state.state.user}/>} />
          <Route exact path="/sell" element={<Sell key={1}/>} />
          <Route exact path="/news" element={<News />} />
          <Route exact path="/analytics" element={<Analytics/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
