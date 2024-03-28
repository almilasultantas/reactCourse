import React from "react";
import { Container } from "reactstrap";
import Navi from "../navi/Navi";
import Dashboard from "./Dashboard";
import CartDetail from "../cart/CartDetail";
import { Route, Routes } from "react-router-dom";
import AddOrUpdateProduct from "../products/AddOrUpdateProduct";
function App() {
  return (
    <Container>
      <Navi />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/product" element={<Dashboard />} />
        <Route
          path="/saveproduct/:productId"
          element={<AddOrUpdateProduct />}
        />
        <Route path="/cart" element={<CartDetail />} />
      </Routes>
    </Container>
  );
}

export default App;
