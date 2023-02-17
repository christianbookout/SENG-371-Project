import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom";
import { Header } from "./components/Header";
import { logInWithEmailAndPassword } from "./firebase";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import Reset from "./components/Login/Reset";
import Stocks from "./components/Stocks";
import News from "./components/News";

function App() {
  return (
    <div className="bg-white">
      {/* <Header/> */}
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/stocks" element={<Stocks />} />
          <Route exact path="/buy" element={<Stocks />} />
          <Route exact path="/sell" element={<Stocks />} />
          <Route exact path="/progress" element={<Stocks />} />
          <Route exact path="/news" element={<News />} />
          <Route exact path="/settings" element={<Stocks />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
