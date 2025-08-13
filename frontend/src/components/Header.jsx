import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Heart, User, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { categories, getCartCount, getCurrentUser, logoutUser } from '../data/mockData';

const Header = ({ onCartClick, onLoginClick, onCategorySelect }) => {
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setCartCount(getCartCount());
    setUser(getCurrentUser());

    const handleCartUpdate = (e) => {
      setCartCount(e.detail.count);
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Mock search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="bg-gradient-to-r from-purple-600 to-purple-700 text-white sticky top-0 z-50 shadow-lg">
      {/* Top Banner */}
      <div className="bg-purple-800 text-center py-2 text-sm">
        <p>⚡ FRETE GRÁTIS para compras acima de R$ 199,90 ⚡</p>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <button 
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              conexãofitness
            </h1>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="O que você está procurando?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-12 py-3 rounded-full bg-white text-gray-900 placeholder-gray-500"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 top-1 rounded-full bg-purple-600 hover:bg-purple-700"
              >
                <Search size={18} />
              </Button>
            </div>
          </form>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex items-center space-x-2 text-white hover:bg-purple-500"
            >
              <Heart size={20} />
              <span className="hidden lg:inline">Lista de Desejos</span>
            </Button>

            {user ? (
              <div className="flex items-center space-x-2">
                <span className="hidden md:inline text-sm">Olá, {user.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-white hover:bg-purple-500"
                >
                  Sair
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={onLoginClick}
                className="flex items-center space-x-2 text-white hover:bg-purple-500"
              >
                <User size={20} />
                <span className="hidden md:inline">Entrar</span>
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={onCartClick}
              className="flex items-center space-x-2 text-white hover:bg-purple-500 relative"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-purple-900 text-xs">
                  {cartCount}
                </Badge>
              )}
              <span className="hidden lg:inline">Carrinho</span>
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden mt-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="O que você está procurando?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-12 py-3 rounded-full bg-white text-gray-900 placeholder-gray-500"
            />
            <Button
              type="submit"
              size="sm"
              className="absolute right-1 top-1 rounded-full bg-purple-600 hover:bg-purple-700"
            >
              <Search size={18} />
            </Button>
          </div>
        </form>
      </div>

      {/* Navigation */}
      <nav className={`${isMenuOpen ? 'block' : 'hidden lg:block'} bg-purple-700 border-t border-purple-600`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center lg:space-x-8 py-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategorySelect(category.slug)}
                className="text-left lg:text-center py-2 lg:py-1 px-2 hover:bg-purple-600 rounded transition-colors duration-200 text-sm font-medium"
              >
                {category.name.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;