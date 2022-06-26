
import Header from "./components/Header";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./templates/Home";
import Orders from "./templates/Orders";
import Lots from "./templates/Lots";



function App() {
 

  return (
    <div className="grid-container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/Search" element={<Lots />} />
      </Routes>
    </div>
  );
}

export default App;
