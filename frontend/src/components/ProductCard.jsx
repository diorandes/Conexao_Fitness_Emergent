import React, { useState } from 'react';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { addToCart } from '../data/mockData';
import { useToast } from '../hooks/use-toast';

const ProductCard = ({ product, onProductClick }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setIsLoading(true);
    
    setTimeout(() => {
      addToCart(product);
      setIsLoading(false);
      toast({
        title: "Produto adicionado!",
        description: `${product.name} foi adicionado ao carrinho.`,
      });
    }, 500);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removido da lista" : "Adicionado à lista",
      description: isWishlisted 
        ? `${product.name} foi removido da lista de desejos.`
        : `${product.name} foi adicionado à lista de desejos.`,
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <Card 
      className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] bg-white border border-gray-200 hover:border-purple-300 overflow-hidden"
      onClick={() => onProductClick(product)}
    >
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative overflow-hidden bg-gray-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-40 md:h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          
          {/* Discount Badge - Estilo Netshoes */}
          {product.discount > 0 && (
            <div className="absolute top-2 left-2">
              <Badge className="bg-green-500 hover:bg-green-600 text-white font-bold text-xs px-2 py-1">
                -{product.discount}% OFF
              </Badge>
            </div>
          )}

          {/* Wishlist Button */}
          <Button
            size="sm"
            variant="ghost"
            onClick={handleWishlist}
            className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-200 ${
              isWishlisted 
                ? 'bg-red-500 text-white hover:bg-red-600 shadow-md' 
                : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-white hover:text-red-500 shadow-sm'
            }`}
          >
            <Heart size={14} fill={isWishlisted ? 'currentColor' : 'none'} />
          </Button>

          {/* Quick Add to Cart - Aparece no hover */}
          <div className="absolute inset-x-0 bottom-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/50 to-transparent p-3">
            <Button
              onClick={handleAddToCart}
              disabled={isLoading || !product.inStock}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm py-2 rounded-lg shadow-lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Adicionando...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <ShoppingCart size={14} />
                  <span>Comprar</span>
                </div>
              )}
            </Button>
          </div>
        </div>

        {/* Product Info - Layout Netshoes */}
        <div className="p-3">
          {/* Brand */}
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1 font-medium">
            {product.brand}
          </p>

          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 mb-2 text-sm leading-tight line-clamp-2 group-hover:text-purple-600 transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={i < Math.floor(product.rating) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300'
                  }
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">
              ({product.reviews})
            </span>
          </div>

          {/* Pricing - Estilo Netshoes */}
          <div className="space-y-1">
            {product.originalPrice > product.price && (
              <p className="text-sm text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </p>
            )}
            <div className="flex items-baseline space-x-2">
              <p className="text-lg font-bold text-gray-900">
                {formatPrice(product.price)}
              </p>
            </div>
            
            {/* Payment Options - Mais destaque */}
            <div className="space-y-1">
              <p className="text-xs text-gray-600">
                ou <span className="font-semibold">12x de {formatPrice(product.price / 12)}</span> sem juros
              </p>
              <p className="text-xs text-green-600 font-medium">
                {formatPrice(product.price * 0.95)} no PIX (5% desc.)
              </p>
            </div>
            
            {/* Free Shipping Badge */}
            {product.price > 199.90 && (
              <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 border-green-200">
                Frete grátis
              </Badge>
            )}
          </div>

          {/* Stock Status */}
          {!product.inStock && (
            <Badge variant="destructive" className="mt-2 text-xs">
              Fora de Estoque
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;