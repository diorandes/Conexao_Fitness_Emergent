import React, { useState } from 'react';
import { X, ShoppingCart, Heart, Star, Plus, Minus, Share2 } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { addToCart } from '../data/mockData';
import { useToast } from '../hooks/use-toast';

const ProductModal = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(product.image);
  const { toast } = useToast();

  const handleAddToCart = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      addToCart(product, quantity);
      setIsLoading(false);
      toast({
        title: "Produto adicionado!",
        description: `${quantity}x ${product.name} foi adicionado ao carrinho.`,
      });
      onClose();
    }, 500);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Detalhes do Produto</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={24} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Additional product images would go here */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedImage(product.image)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                    selectedImage === product.image ? 'border-purple-600' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Brand */}
              <p className="text-sm text-gray-500 uppercase tracking-wide">
                {product.brand}
              </p>

              {/* Name */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.rating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                      }
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {product.rating} ({product.reviews} avaliações)
                </span>
              </div>

              {/* Pricing */}
              <div className="space-y-2">
                {product.originalPrice > product.price && (
                  <div className="flex items-center space-x-3">
                    <p className="text-lg text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </p>
                    <Badge className="bg-green-500 hover:bg-green-600">
                      -{product.discount}% OFF
                    </Badge>
                  </div>
                )}
                <div className="flex items-center space-x-4">
                  <p className="text-3xl font-bold text-purple-600">
                    {formatPrice(product.price)}
                  </p>
                </div>
                
                {/* Payment Options */}
                <div className="space-y-1 text-sm text-gray-600">
                  <p>ou 12x de {formatPrice(product.price / 12)} sem juros</p>
                  <p className="text-green-600 font-medium">
                    {formatPrice(product.price * 0.95)} no PIX (5% desconto)
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Descrição</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-900">Quantidade:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={isLoading || !product.inStock}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-semibold"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Adicionando...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <ShoppingCart size={20} />
                      <span>Adicionar ao Carrinho</span>
                    </div>
                  )}
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-purple-600 text-purple-600 hover:bg-purple-50"
                >
                  <Heart size={16} className="mr-2" />
                  Adicionar aos Favoritos
                </Button>

                <Button
                  variant="ghost"
                  className="w-full text-gray-600 hover:text-gray-900"
                >
                  <Share2 size={16} className="mr-2" />
                  Compartilhar Produto
                </Button>
              </div>

              {/* Free Shipping */}
              {product.price > 199.90 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-medium">
                    🚚 Frete grátis para todo o Brasil!
                  </p>
                </div>
              )}

              {/* Stock Status */}
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? 'Em estoque' : 'Fora de estoque'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;