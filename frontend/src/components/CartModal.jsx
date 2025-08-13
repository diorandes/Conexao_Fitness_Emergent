import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { cart, updateCartQuantity, removeFromCart, getCartTotal, createOrder } from '../data/mockData';
import { useToast } from '../hooks/use-toast';

const CartModal = ({ onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setCartItems([...cart]);
  }, []);

  useEffect(() => {
    const handleCartUpdate = () => {
      setCartItems([...cart]);
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const updateQuantity = (productId, newQuantity) => {
    updateCartQuantity(productId, newQuantity);
  };

  const removeItem = (productId) => {
    removeFromCart(productId);
    toast({
      title: "Produto removido",
      description: "O produto foi removido do seu carrinho.",
    });
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // Mock checkout process
    setTimeout(() => {
      const orderData = {
        items: [...cartItems],
        total: getCartTotal(),
        shipping: {
          address: 'Rua das Flores, 123',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01234-567'
        }
      };
      
      const newOrder = createOrder(orderData);
      setIsCheckingOut(false);
      
      toast({
        title: "Pedido realizado com sucesso!",
        description: `Pedido #${newOrder.id} foi criado. Você receberá um email de confirmação.`,
      });
      
      onClose();
    }, 2000);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const subtotal = getCartTotal();
  const shipping = subtotal > 199.90 ? 0 : 15.90;
  const total = subtotal + shipping;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-end z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white h-full w-full max-w-md overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-purple-600 text-white">
          <div className="flex items-center space-x-3">
            <ShoppingBag size={24} />
            <h2 className="text-xl font-semibold">Meu Carrinho</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-purple-700">
            <X size={24} />
          </Button>
        </div>

        {cartItems.length === 0 ? (
          // Empty Cart
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <ShoppingBag size={64} className="text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Seu carrinho está vazio
            </h3>
            <p className="text-gray-600 mb-6">
              Adicione produtos ao seu carrinho para continuar
            </p>
            <Button 
              onClick={onClose}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Continuar Comprando
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 p-6 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 mb-2">{item.brand}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="w-8 h-8 p-0"
                          >
                            <Minus size={12} />
                          </Button>
                          <span className="text-sm font-medium px-2">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Plus size={12} />
                          </Button>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                      
                      <div className="mt-2">
                        <p className="text-sm font-bold text-purple-600">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-gray-500">
                            {formatPrice(item.price)} cada
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="border-t bg-gray-50 p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Frete</span>
                  <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                    {shipping === 0 ? 'Grátis' : formatPrice(shipping)}
                  </span>
                </div>
                {shipping === 0 && (
                  <p className="text-xs text-green-600">
                    🎉 Você ganhou frete grátis!
                  </p>
                )}
                <hr className="my-2" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-purple-600">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-gray-600 text-center">
                  Em até 12x de {formatPrice(total / 12)} sem juros
                </p>
                <p className="text-xs text-green-600 text-center font-medium">
                  ou {formatPrice(total * 0.95)} no PIX (5% desconto)
                </p>
              </div>

              <Button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-semibold"
              >
                {isCheckingOut ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processando...</span>
                  </div>
                ) : (
                  `Finalizar Compra - ${formatPrice(total)}`
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                Compra 100% segura e protegida
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;