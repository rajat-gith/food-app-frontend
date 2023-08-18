import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screen/HomeScreen";
import ReceipeDescription from "./screen/ReceipeDescription";
import LoginScreen from "./screen/LoginScreen";
import RegisterScreen from "./screen/RegisterScreen";
import Nav from "./components/Nav";
import ReceipePage from "./screen/ReceipePage";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route exact path="/" element={<HomeScreen />} />
        <Route path="/receipes" element={<ReceipePage />} />
        <Route path="/receipes/:id" element={<ReceipeDescription />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
      </Routes>
    </div>
  );
}

export default App;
