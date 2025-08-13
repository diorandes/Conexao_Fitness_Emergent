import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Truck, Shield, CreditCard, Headphones, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import ProductCard from './ProductCard';
import { products, categories, banners, testimonials } from '../data/mockData';

const HomePage = ({ selectedCategory, onProductClick }) => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setFeaturedProducts(products.filter(p => p.featured));
    
    if (selectedCategory) {
      setFilteredProducts(products.filter(p => p.category === selectedCategory));
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory]);

  // Auto-rotate banner
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner - Estilo Netshoes */}
      <section className="relative">
        <div className="relative h-80 md:h-[450px] overflow-hidden">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                index === currentBanner ? 'translate-x-0' : 
                index < currentBanner ? '-translate-x-full' : 'translate-x-full'
              }`}
            >
              <div
                className="w-full h-full bg-cover bg-center relative"
                style={{ backgroundImage: `url(${banner.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
                <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                  <div className="max-w-4xl px-4">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
                      {banner.title}
                    </h2>
                    <p className="text-lg md:text-xl mb-6 text-white/90 drop-shadow">
                      {banner.subtitle}
                    </p>
                    <Button size="lg" className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3 rounded-lg text-lg font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg">
                      {banner.cta}
                      <ArrowRight size={20} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Banner Navigation */}
          <Button
            variant="ghost"
            size="sm"
            onClick={prevBanner}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 border border-white/20"
          >
            <ChevronLeft size={24} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={nextBanner}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 border border-white/20"
          >
            <ChevronRight size={24} />
          </Button>

          {/* Banner Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentBanner ? 'bg-white shadow-lg' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Category Circles - Estilo Netshoes "VOCÊ TAMBÉM TEM" */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-center mb-6 text-gray-900 uppercase tracking-wide">
            VOCÊ TAMBÉM TEM
          </h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 max-w-5xl mx-auto">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
              >
                <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-full flex items-center justify-center text-xl md:text-2xl group-hover:scale-110 group-hover:shadow-lg transition-all duration-200 shadow-md border-2 border-purple-200">
                  {category.icon}
                </div>
                <span className="text-xs md:text-sm font-medium mt-2 text-center text-gray-700 group-hover:text-purple-600 transition-colors">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Featured Products - Layout Netshoes */}
      {featuredProducts.length > 0 && (
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
                PRODUTOS EM DESTAQUE
              </h2>
              <Button variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-50">
                Ver todos
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onProductClick={onProductClick}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Products or Filtered Products */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
              {selectedCategory 
                ? `${categories.find(c => c.slug === selectedCategory)?.name.toUpperCase() || 'PRODUTOS'}`
                : 'TODOS OS PRODUTOS'
              }
            </h2>
            {selectedCategory && (
              <Badge variant="secondary" className="text-sm">
                {filteredProducts.length} produtos encontrados
              </Badge>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={onProductClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section - Estilo Netshoes */}
      <section className="py-12 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">FIQUE POR DENTRO DAS OFERTAS</h2>
          <p className="text-lg mb-8 text-purple-100">Receba em primeira mão as melhores promoções de suplementos</p>
          <div className="flex flex-col md:flex-row items-center justify-center max-w-md mx-auto space-y-4 md:space-y-0 md:space-x-4">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="w-full md:flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 border-0"
            />
            <Button className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-8 py-3 rounded-lg">
              CADASTRAR
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials - Mais compacto */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 uppercase tracking-wide">
            AVALIAÇÕES DOS CLIENTES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <div className="flex items-center">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={14} className="text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic text-sm">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;