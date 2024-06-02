import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProductDetail from "./components/ProductDetail";
import Home from "./pages/Home";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {ToastContainer} from 'react-toastify' 
import 'react-toastify/dist/ReactToastify.css';
import CartDetails from "./pages/CartDetails";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {

  const [cartItems, setCartItems] = useState([]);

  return (
    <Router>
      <div className="App">
        <ToastContainer theme="dark" position="top-center" />
        <Header cartItems={cartItems}  />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/search" element={<Home />}></Route>
          <Route path="/product/:id" element={<ProductDetail cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/cart" element={<CartDetails cartItems={cartItems} setCartItems={setCartItems} />}></Route>

        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
