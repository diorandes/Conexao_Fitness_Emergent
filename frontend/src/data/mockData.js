// Mock data for Conexão Fitness - Suplementos
export const categories = [
  { id: 1, name: 'Whey Protein', slug: 'whey-protein', icon: '💪' },
  { id: 2, name: 'Creatina', slug: 'creatina', icon: '⚡' },
  { id: 3, name: 'Pré-Treino', slug: 'pre-treino', icon: '🔥' },
  { id: 4, name: 'BCAA', slug: 'bcaa', icon: '🥤' },
  { id: 5, name: 'Massa Muscular', slug: 'massa-muscular', icon: '💊' },
  { id: 6, name: 'Queimadores', slug: 'queimadores', icon: '🎯' },
  { id: 7, name: 'Vitaminas', slug: 'vitaminas', icon: '🌿' },
  { id: 8, name: 'Barras Proteicas', slug: 'barras-proteicas', icon: '🍫' }
];

export const products = [
  {
    id: 1,
    name: 'Whey Protein Isolado 2kg',
    brand: 'Growth',
    category: 'whey-protein',
    price: 189.90,
    originalPrice: 249.90,
    discount: 24,
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 1245,
    description: 'Whey protein isolado de alta qualidade com 90% de pureza',
    inStock: true,
    featured: true
  },
  {
    id: 2,
    name: 'Creatina Monohidratada 300g',
    brand: 'Optimum Nutrition',
    category: 'creatina',
    price: 79.90,
    originalPrice: 99.90,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 892,
    description: 'Creatina pura micronizada para maior absorção',
    inStock: true,
    featured: true
  },
  {
    id: 3,
    name: 'Pré-Treino Haze Hardcore 300g',
    brand: 'RedCon1',
    category: 'pre-treino',
    price: 149.90,
    originalPrice: 199.90,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 567,
    description: 'Pré-treino com fórmula avançada para máxima performance',
    inStock: true,
    featured: true
  },
  {
    id: 4,
    name: 'BCAA 2:1:1 120 Cápsulas',
    brand: 'Integralmedica',
    category: 'bcaa',
    price: 54.90,
    originalPrice: 69.90,
    discount: 21,
    image: 'https://images.unsplash.com/photo-1556909114-4cb3ef363b2d?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 334,
    description: 'Aminoácidos essenciais na proporção ideal',
    inStock: true,
    featured: false
  },
  {
    id: 5,
    name: 'Hipercalórico Mass Titanium 3kg',
    brand: 'Max Titanium',
    category: 'massa-muscular',
    price: 129.90,
    originalPrice: 169.90,
    discount: 24,
    image: 'https://images.unsplash.com/photo-1594737626072-90dc274bc2bd?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 678,
    description: 'Hipercalórico para ganho de massa muscular',
    inStock: true,
    featured: false
  },
  {
    id: 6,
    name: 'Termogênico Black Mamba 90 caps',
    brand: 'Iridium Labs',
    category: 'queimadores',
    price: 89.90,
    originalPrice: 119.90,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop',
    rating: 4.4,
    reviews: 456,
    description: 'Termogênico potente para queima de gordura',
    inStock: true,
    featured: false
  },
  {
    id: 7,
    name: 'Multivitamínico A-Z 100 tabs',
    brand: 'Universal',
    category: 'vitaminas',
    price: 69.90,
    originalPrice: 89.90,
    discount: 22,
    image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400&h=400&fit=crop',
    rating: 4.3,
    reviews: 789,
    description: 'Complexo vitamínico completo para atletas',
    inStock: true,
    featured: false
  },
  {
    id: 8,
    name: 'Barra Proteica Chocolate 12un',
    brand: 'Probiótica',
    category: 'barras-proteicas',
    price: 48.90,
    originalPrice: 59.90,
    discount: 18,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
    rating: 4.2,
    reviews: 234,
    description: 'Barras proteicas saborosas e nutritivas',
    inStock: true,
    featured: false
  }
];

export const banners = [
  {
    id: 1,
    title: 'Suplementos da Cabeça aos Pés',
    subtitle: 'Tudo para sua evolução fitness',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=600&fit=crop',
    cta: 'Confira',
    active: true
  },
  {
    id: 2,
    title: 'Ofertas Black Friday',
    subtitle: 'Até 50% OFF em suplementos selecionados',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop',
    cta: 'Aproveitar',
    active: false
  }
];

export const testimonials = [
  {
    id: 1,
    name: 'João Silva',
    text: 'Produtos de excelente qualidade, entrega rápida e preços justos!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
  },
  {
    id: 2,
    name: 'Maria Santos',
    text: 'Melhor loja de suplementos online. Sempre compro aqui!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?w=100&h=100&fit=crop'
  }
];

// Cart functionality
export let cart = [];

export const addToCart = (product, quantity = 1) => {
  const existingItem = cart.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }
  updateCartCount();
};

export const removeFromCart = (productId) => {
  cart = cart.filter(item => item.id !== productId);
  updateCartCount();
};

export const updateCartQuantity = (productId, quantity) => {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity = quantity;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    }
  }
  updateCartCount();
};

export const getCartTotal = () => {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const getCartCount = () => {
  return cart.reduce((total, item) => total + item.quantity, 0);
};

const updateCartCount = () => {
  const event = new CustomEvent('cartUpdated', { detail: { count: getCartCount(), total: getCartTotal() } });
  window.dispatchEvent(event);
};

// User auth mock
export let currentUser = null;

export const loginUser = (email, password) => {
  // Mock login - in real app would validate against backend
  currentUser = {
    id: 1,
    name: 'João Silva',
    email: email,
    isAdmin: email === 'admin@conexaofitness.com.br'
  };
  localStorage.setItem('user', JSON.stringify(currentUser));
  return currentUser;
};

export const logoutUser = () => {
  currentUser = null;
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  if (!currentUser) {
    const stored = localStorage.getItem('user');
    if (stored) {
      currentUser = JSON.parse(stored);
    }
  }
  return currentUser;
};

// Orders mock
export const orders = [
  {
    id: 1001,
    userId: 1,
    items: [
      { ...products[0], quantity: 1 },
      { ...products[1], quantity: 2 }
    ],
    total: 349.70,
    status: 'delivered',
    date: '2025-01-10',
    shipping: {
      address: 'Rua das Flores, 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567'
    }
  }
];

export const createOrder = (orderData) => {
  const newOrder = {
    id: orders.length + 1001,
    ...orderData,
    date: new Date().toISOString().split('T')[0],
    status: 'processing'
  };
  orders.push(newOrder);
  cart.length = 0; // Clear cart
  updateCartCount();
  return newOrder;
};