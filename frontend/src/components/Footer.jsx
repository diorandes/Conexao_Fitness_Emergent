import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter */}
      <div className="bg-purple-600 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Receba nossas ofertas</h3>
              <p className="text-purple-100">Cadastre-se e seja o primeiro a saber das promoções</p>
            </div>
            <div className="flex w-full md:w-auto max-w-md">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 placeholder-gray-500"
              />
              <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-6 py-3 rounded-r-lg transition-colors">
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              conexãofitness
            </h3>
            <p className="text-gray-300 mb-4">
              Sua loja online de suplementos e nutrição esportiva. 
              Produtos de qualidade para potencializar seus resultados.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Como Comprar
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Formas de Pagamento
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Entrega e Frete
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Trocas e Devoluções
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categorias</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Whey Protein
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Creatina
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Pré-Treino
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  BCAA
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Queimadores
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-purple-400" />
                <span className="text-gray-300">(11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-purple-400" />
                <span className="text-gray-300">contato@conexaofitness.com.br</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-purple-400 mt-1" />
                <span className="text-gray-300">
                  Rua dos Suplementos, 123<br />
                  São Paulo - SP<br />
                  CEP: 01234-567
                </span>
              </div>
            </div>

            {/* Business Hours */}
            <div className="mt-6">
              <h5 className="font-semibold mb-2">Horário de Atendimento</h5>
              <p className="text-gray-300 text-sm">
                Segunda a Sexta: 8h às 18h<br />
                Sábado: 8h às 14h
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Badges */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <div className="text-center">
                <div className="bg-green-600 text-white px-3 py-1 rounded text-xs font-semibold mb-1">
                  SSL
                </div>
                <p className="text-xs text-gray-400">Site Seguro</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold mb-1">
                  PCI DSS
                </div>
                <p className="text-xs text-gray-400">Pagamento Seguro</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-600 text-white px-3 py-1 rounded text-xs font-semibold mb-1">
                  ANVISA
                </div>
                <p className="text-xs text-gray-400">Produtos Regulamentados</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Formas de Pagamento:</span>
              <div className="flex space-x-2">
                <div className="bg-gray-700 rounded px-2 py-1">
                  <span className="text-xs text-white">VISA</span>
                </div>
                <div className="bg-gray-700 rounded px-2 py-1">
                  <span className="text-xs text-white">MASTER</span>
                </div>
                <div className="bg-gray-700 rounded px-2 py-1">
                  <span className="text-xs text-white">PIX</span>
                </div>
                <div className="bg-gray-700 rounded px-2 py-1">
                  <span className="text-xs text-white">BOLETO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
            <p>
              © 2025 Conexão Fitness. Todos os direitos reservados.
            </p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="hover:text-white transition-colors">
                LGPD
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;