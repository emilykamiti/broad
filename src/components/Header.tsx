import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';
import { useAuth } from './context/AuthContext';
import { useCart } from './context/CartContext';
import BroadTechLogo from './BroadTechLogo';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  const categories = [
    'Gaming',
    'Entertainment',
    'Networking',
    'Solar Energy',
    'Machinery'
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top Bar */}
      <div style={{ background: 'linear-gradient(135deg, #0A7AFF 0%, #0062CC 100%)' }} className="text-white">
        <div className="w-full mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <p className="text-sm">🔌 Free delivery on orders over KSH 5,000 • Premium Electronics</p>
            <div className="hidden md:flex items-center space-x-4 text-sm">
              {user?.role === 'admin' && (
                <Link to="/admin" className="hover:underline font-medium">🔧 Admin Panel</Link>
              )}
              <Link to="/help" className="hover:underline">Help</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="w-full mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BroadTechLogo />
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* User Account */}
            {user ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-1 px-3 py-2 hover:bg-gray-100 rounded-md"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <User className="h-4 w-4" />
                  <span className="hidden md:inline">{user.name}</span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </Button>

                {isUserMenuOpen && (
                  <>
                    {/* Backdrop to detect clicks outside */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsUserMenuOpen(false)}
                    />

                    {/* Dropdown Menu */}
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                      <Link
                        to="/profile"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 border-b border-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 border-b border-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        My Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}

            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-4 w-4" />
                {getTotalItems() > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden mt-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
            <Button
              type="submit"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>

      {/* Categories Navigation */}
      <div className="hidden md:block border-t" style={{ backgroundColor: '#E8F4FF' }}>
        <div className="w-full mx-auto px-4 py-2">
          <nav className="flex items-center space-x-6 overflow-x-auto">
            <Link
              to="/products"
              className="text-sm font-medium transition-colors whitespace-nowrap"
              style={{ color: '#1A1F36' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#0A7AFF'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#1A1F36'}
            >
              All Products
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                to={`/products?category=${encodeURIComponent(category)}`}
                className="text-sm transition-colors whitespace-nowrap"
                style={{ color: '#1A1F36' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#0A7AFF'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#1A1F36'}
              >
                {category}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <nav className="space-y-4">
              <Link 
                to="/products" 
                className="block text-sm font-medium hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                All Products
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/products?category=${encodeURIComponent(category)}`}
                  className="block text-sm hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {category}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200">
                <Link to="/help" className="block text-sm hover:text-primary mb-2">Help</Link>
                <Link to="/track-order" className="block text-sm hover:text-primary">Track Order</Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}