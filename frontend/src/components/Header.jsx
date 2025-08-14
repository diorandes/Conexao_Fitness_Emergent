import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Heart, User, Menu, X, MapPin } from 'lucide-react';
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
      {/* Top Banner - mais parecido com Netshoes */}
      <div className="bg-purple-800 text-center py-2 text-sm font-medium">
        <p>⚡ FRETE GRÁTIS para compras acima de R$ 199,90 • Parcele em até 12x sem juros ⚡</p>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo Area */}
          <div className="flex items-center space-x-4">
            <button 
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            {/* Logo with Brand Name - Transparent Background */}
            <div className="flex items-center space-x-4">
              <div className="transform hover:scale-105 transition-transform duration-300">
                <img 
                  src="https://customer-assets.emergentagent.com/job_conexao-fitness/artifacts/86n8edqu_Logo%20Conex%C3%A3o%20Fitness%20Minimalista.png" 
                  alt="Conexão Fitness" 
                  className="h-14 w-14 md:h-16 md:w-16 object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-white leading-tight tracking-wide drop-shadow-sm">
                  conexão<span className="text-yellow-400">fitness</span>
                </h1>
                <p className="text-xs md:text-sm text-purple-200 font-medium">Suplementos & Nutrição Esportiva</p>
              </div>
            </div>
          </div>

          {/* CEP Area - Similar ao Netshoes */}
          <div className="hidden lg:flex items-center space-x-2 text-sm">
            <MapPin size={16} />
            <span>Informe seu CEP</span>
          </div>

          {/* Search Bar - Mais destaque como Netshoes */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="O que você está procurando?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-12 py-3 rounded-full bg-white text-gray-900 placeholder-gray-500 border-0 focus:ring-2 focus:ring-yellow-400"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 top-1 rounded-full bg-purple-600 hover:bg-purple-700 px-4"
              >
                <Search size={18} />
              </Button>
            </div>
          </form>

          {/* User Actions - Layout Netshoes */}
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex flex-col items-center space-y-1 text-white hover:bg-purple-500 px-3 py-2 h-auto"
            >
              <Heart size={20} />
              <span className="text-xs">Lista de Desejos</span>
            </Button>

            {user ? (
              <div className="flex items-center space-x-2">
                <div className="hidden md:flex flex-col items-center">
                  <span className="text-xs">Olá, {user.name.split(' ')[0]}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-xs text-purple-200 hover:text-white p-0 h-auto"
                  >
                    Sair
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={onLoginClick}
                className="flex flex-col items-center space-y-1 text-white hover:bg-purple-500 px-3 py-2 h-auto"
              >
                <User size={20} />
                <span className="text-xs">Entrar</span>
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={onCartClick}
              className="flex flex-col items-center space-y-1 text-white hover:bg-purple-500 px-3 py-2 h-auto relative"
            >
              <div className="relative">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-purple-900 text-xs h-5 w-5 flex items-center justify-center p-0 rounded-full">
                    {cartCount}
                  </Badge>
                )}
              </div>
              <span className="text-xs">Carrinho</span>
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden mt-3">
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

      {/* Navigation - Exatamente como Netshoes */}
      <nav className={`${isMenuOpen ? 'block' : 'hidden lg:block'} bg-purple-700 border-t border-purple-600`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-start lg:space-x-8 py-2">
            <button className="flex items-center space-x-2 py-2 lg:py-1 px-2 hover:bg-purple-600 rounded transition-colors duration-200 text-sm font-medium">
              <Menu size={16} />
              <span>Todas as categorias</span>
            </button>
            
            {categories.slice(0, 7).map((category) => (
              <button
                key={category.id}
                onClick={() => onCategorySelect(category.slug)}
                className="text-left lg:text-center py-2 lg:py-1 px-2 hover:bg-purple-600 rounded transition-colors duration-200 text-sm font-medium uppercase tracking-wide"
              >
                {category.name}
              </button>
            ))}
            
            <button className="text-left lg:text-center py-2 lg:py-1 px-2 hover:bg-purple-600 rounded transition-colors duration-200 text-sm font-medium uppercase tracking-wide text-yellow-400">
              OUTLET
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;