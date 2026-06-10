// App.tsx
import React from "react";
import "./styles/global.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Sale from "./pages/Sale";
import Footer from "./components/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import { AuthModalProvider } from "./contexts/AuthModalContext";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AuthModalProvider>
        <WishlistProvider>
          <CartProvider>
            <Router>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/men" element={<Sale />} />
                <Route path="/women" element={<Sale />} />
                <Route path="/children" element={<Sale />} />
                <Route path="/new-arrivals" element={<Sale />} />
                <Route path="/sale" element={<Sale />} />
                <Route path="/about" element={<Navigate to="/men" replace />} />
                <Route path="/services" element={<Navigate to="/women" replace />} />
                <Route path="/impact" element={<Navigate to="/children" replace />} />
                <Route
                  path="/impact-sdgs"
                  element={<Navigate to="/new-arrivals" replace />}
                />
              </Routes>
              <Footer />
            </Router>
          </CartProvider>
        </WishlistProvider>
      </AuthModalProvider>
    </AuthProvider>
  );
};

export default App;
