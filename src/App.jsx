import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoutes"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Investments from "./pages/Investments";
import Payment from "./pages/Payment";
import AdminAddInvestment from "./pages/AdminAddInvestment";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/investments"
          element={
            <ProtectedRoute>
              <Investments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-investment"
          element={
            <ProtectedRoute>
              <AdminAddInvestment />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
