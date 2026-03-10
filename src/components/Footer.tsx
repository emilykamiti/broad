import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Plug } from 'lucide-react';
import BroadTechLogo from './BroadTechLogo';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info with BroadTech Branding */}
          <div>
            <BroadTechLogo className="mb-4 text-white" />
            <p className="text-gray-300 mb-4 text-sm">
              🔌 Your trusted electronics marketplace in Kenya. Premium gaming consoles, networking equipment, solar solutions, and industrial machinery at competitive prices with reliable delivery nationwide.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-300 transition-colors" 
                style={{ color: '#9CA3AF' }} 
                onMouseEnter={(e) => e.currentTarget.style.color = '#0A7AFF'} 
                onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-300 transition-colors" 
                style={{ color: '#9CA3AF' }} 
                onMouseEnter={(e) => e.currentTarget.style.color = '#0A7AFF'} 
                onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-300 transition-colors" 
                style={{ color: '#9CA3AF' }} 
                onMouseEnter={(e) => e.currentTarget.style.color = '#0A7AFF'} 
                onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Shop Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=Gaming" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Gaming
                </Link>
              </li>
              <li>
                <Link to="/products?category=Entertainment" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Entertainment
                </Link>
              </li>
              <li>
                <Link to="/products?category=Networking" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Networking
                </Link>
              </li>
              <li>
                <Link to="/products?category=Solar Energy" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Solar Energy
                </Link>
              </li>
              <li>
                <Link to="/products?category=Machinery" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Machinery
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/warranty" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Warranty Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">+254 712 345 678</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">support@broadtechplug.co.ke</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Westlands, Nairobi<br />
                  Kenya
                </span>
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="font-medium mb-2 text-white">Newsletter</h4>
              <p className="text-sm text-gray-300 mb-3">
                Get updates on new arrivals and exclusive deals.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 text-sm"
                  style={{ borderColor: '#374151' }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#0A7AFF'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#374151'}
                />
                <button 
                  className="px-4 py-2 rounded-r-md transition-colors text-sm font-medium"
                  style={{ background: 'linear-gradient(135deg, #0A7AFF 0%, #0062CC 100%)', color: 'white' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #0062CC 0%, #004A99 100%)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #0A7AFF 0%, #0062CC 100%)'}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-300 text-sm flex items-center gap-2">
              © 2024 BroadTech Plug. All rights reserved.
              <Plug className="h-4 w-4" style={{ color: '#FF6B35' }} />
              <span style={{ color: '#0A7AFF' }}>Powering Your Tech Needs</span>
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-300 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
