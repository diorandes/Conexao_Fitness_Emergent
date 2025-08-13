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
      className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white border-gray-200 hover:border-purple-300"
      onClick={() => onProductClick(product)}
    >
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          
          {/* Discount Badge */}
          {product.discount > 0 && (
            <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600 text-white font-bold">
              -{product.discount}% OFF
            </Badge>
          )}

          {/* Wishlist Button */}
          <Button
            size="sm"
            variant="ghost"
            onClick={handleWishlist}
            className={`absolute top-2 right-2 p-2 rounded-full ${
              isWishlisted 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
            }`}
          >
            <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
          </Button>

          {/* Quick Add to Cart */}
          <div className="absolute inset-x-0 bottom-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <Button
              onClick={handleAddToCart}
              disabled={isLoading || !product.inStock}
              className="w-full rounded-none bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Adicionando...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <ShoppingCart size={16} />
                  <span>Adicionar ao Carrinho</span>
                </div>
              )}
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Brand */}
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            {product.brand}
          </p>

          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
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

          {/* Pricing */}
          <div className="space-y-1">
            {product.originalPrice > product.price && (
              <p className="text-sm text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </p>
            )}
            <div className="flex items-center space-x-2">
              <p className="text-xl font-bold text-purple-600">
                {formatPrice(product.price)}
              </p>
            </div>
            
            {/* Payment Options */}
            <p className="text-xs text-gray-500">
              ou 12x de {formatPrice(product.price / 12)} no Pix
            </p>
            
            {/* Free Shipping */}
            {product.price > 199.90 && (
              <p className="text-xs text-green-600 font-medium">
                Frete grátis disponível
              </p>
            )}
          </div>

          {/* Stock Status */}
          {!product.inStock && (
            <Badge variant="destructive" className="mt-2">
              Fora de Estoque
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;