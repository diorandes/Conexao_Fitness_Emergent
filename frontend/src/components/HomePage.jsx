import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Truck, Shield, CreditCard, Headphones } from 'lucide-react';
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
      {/* Hero Banner */}
      <section className="relative">
        <div className="relative h-96 md:h-[500px] overflow-hidden">
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
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                  <div className="max-w-4xl px-4">
                    <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                      {banner.title}
                    </h2>
                    <p className="text-xl md:text-2xl mb-8 text-white">
                      {banner.subtitle}
                    </p>
                    <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-200">
                      {banner.cta}
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
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-2"
          >
            <ChevronLeft size={24} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={nextBanner}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-2"
          >
            <ChevronRight size={24} />
          </Button>

          {/* Banner Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentBanner ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Category Circles */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
            VOCÊ TAMBÉM TEM
          </h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-6 max-w-6xl mx-auto">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-full flex items-center justify-center text-2xl md:text-3xl group-hover:scale-110 transition-transform duration-200 shadow-lg">
                  {category.icon}
                </div>
                <span className="text-xs md:text-sm font-medium mt-2 text-center text-gray-700">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
              PRODUTOS EM DESTAQUE
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
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
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            {selectedCategory 
              ? `CATEGORIA: ${categories.find(c => c.slug === selectedCategory)?.name.toUpperCase() || 'PRODUTOS'}`
              : 'TODOS OS PRODUTOS'
            }
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
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

      {/* Benefits Section */}
      <section className="py-12 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Truck size={48} className="mb-4 text-yellow-400" />
              <h3 className="font-semibold mb-2">Frete Grátis</h3>
              <p className="text-sm opacity-90">Nas compras acima de R$ 199,90</p>
            </div>
            <div className="flex flex-col items-center">
              <Shield size={48} className="mb-4 text-yellow-400" />
              <h3 className="font-semibold mb-2">Compra Segura</h3>
              <p className="text-sm opacity-90">Seus dados protegidos</p>
            </div>
            <div className="flex flex-col items-center">
              <CreditCard size={48} className="mb-4 text-yellow-400" />
              <h3 className="font-semibold mb-2">Parcele em 12x</h3>
              <p className="text-sm opacity-90">Sem juros no cartão</p>
            </div>
            <div className="flex flex-col items-center">
              <Headphones size={48} className="mb-4 text-yellow-400" />
              <h3 className="font-semibold mb-2">Suporte 24/7</h3>
              <p className="text-sm opacity-90">Atendimento especializado</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            O QUE NOSSOS CLIENTES DIZEM
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <div className="flex items-center">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={16} className="text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.text}"</p>
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