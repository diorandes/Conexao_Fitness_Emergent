import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import ProductModal from "./components/ProductModal";
import CartModal from "./components/CartModal";
import LoginModal from "./components/LoginModal";
import Footer from "./components/Footer";
import AdminPanel from "./components/AdminPanel";
import { Toaster } from "./components/ui/toaster";
import { getCurrentUser } from "./data/mockData";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, []);

  const handleCategorySelect = (categorySlug) => {
    setSelectedCategory(categorySlug);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setIsLoginOpen(false);
    if (user.isAdmin) {
      setShowAdmin(true);
    }
  };

  const AdminRoute = () => {
    if (!currentUser?.isAdmin) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Acesso Negado</h1>
            <p className="text-gray-600 mb-4">Você precisa ser um administrador para acessar esta página.</p>
            <button 
              onClick={() => setIsLoginOpen(true)}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
            >
              Fazer Login
            </button>
          </div>
        </div>
      );
    }
    return <AdminPanel />;
  };

  const MainApp = () => (
    <div className="App">
      <Header
        onCartClick={() => setIsCartOpen(true)}
        onLoginClick={() => setIsLoginOpen(true)}
        onCategorySelect={handleCategorySelect}
      />
      <main>
        <HomePage
          selectedCategory={selectedCategory}
          onProductClick={handleProductClick}
        />
      </main>
      <Footer />

      {/* Modals */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {isCartOpen && (
        <CartModal onClose={() => setIsCartOpen(false)} />
      )}

      {isLoginOpen && (
        <LoginModal
          onClose={() => setIsLoginOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      <Toaster />
    </div>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/admin" element={<AdminRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;