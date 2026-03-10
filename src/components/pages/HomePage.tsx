import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, Headphones, CreditCard } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useCart } from '../context/CartContext';
import { mockProducts } from '../data/mockData';

export default function HomePage() {
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Catchy tech images for both local and international buyers
  const heroImages = [
    {
      src: 'https://images.unsplash.com/photo-1597049176495-60ca7846c7ba?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Smart home devices and gadgets'
    }
  ];

  // Auto-rotate images every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const featuredProducts = mockProducts.slice(0, 8);

  // Updated categories to match your electronics focus
  const categories = [
    {
      name: 'Gaming',
      image: 'https://images.unsplash.com/photo-1665041974623-d398d035023e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      count: '350+ items',
      description: 'Consoles & games'
    },
    {
      name: 'Networking',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&h=200&fit=crop',
      count: '120+ items',
      description: 'Routers & modems'
    },
    {
      name: 'Entertainment',
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=200&fit=crop',
      count: '280+ items',
      description: 'Speakers, TVs & audio'
    },
    {
      name: 'Solar Energy',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      count: '85+ items',
      description: 'Panels, inverters & batteries'
    },
    {
      name: 'Machinery',
      image: 'https://images.unsplash.com/photo-1770763233593-74dfd0da7bf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      count: '210+ items',
      description: 'Power tools & equipment'
    },
    {
      name: 'Computers',
      image: 'https://images.unsplash.com/photo-1554098415-4052459dc340?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      count: '450+ items',
      description: 'Laptops, desktops & parts'
    }
  ];

  const features = [
    {
      icon: Truck,
      title: 'Free Delivery',
      description: 'Free delivery on orders over KSH 2,000'
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: 'Your payment information is safe with us'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Get help whenever you need it'
    },
    {
      icon: CreditCard,
      title: 'M-Pesa Ready',
      description: 'Pay easily with M-Pesa integration'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className=" max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Shop Smart, Shop BroadTech
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Discover premium electronics at unbeatable prices. From gaming gear to solar solutions,
                we have everything you need delivered right to your doorstep.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Learn More
                </Button>
              </div>
            </div>

            {/* Fixed image container */}
            <div className="relative w-full" style={{ minHeight: '300px' }}>
              {/* Image changes based on currentImageIndex */}
              <div className="w-full rounded-lg shadow-2xl overflow-hidden transition-opacity duration-1000">
                <ImageWithFallback
                  key={currentImageIndex}
                  src={heroImages[currentImageIndex].src}
                  alt={heroImages[currentImageIndex].alt}
                  className="w-full h-auto"
                />
              </div>

              {/* 50% OFF badge */}
              <div className="absolute -bottom-4 -left-4 bg-yellow-400 text-black p-4 rounded-lg shadow-lg">
                <p className="font-bold text-lg">50% OFF</p>
                <p className="text-sm">First Order</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-8xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our wide range of electronics and find exactly what you're looking for.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Link key={index} to={`/products?category=${encodeURIComponent(category.name)}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-4">
                    <div className="relative overflow-hidden rounded-lg mb-3">
                      <ImageWithFallback
                        src={category.image}
                        alt={category.name}
                        className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-semibold text-center mb-1">{category.name}</h3>
                    <p className="text-xs text-gray-600 text-center">{category.count}</p>
                    <p className="text-xs text-blue-600 text-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-8xl px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
              <p className="text-gray-600">Check out our most popular electronics this week.</p>
            </div>
            <Link to="/products">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow group">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-lg group-hover:scale-110 transition-transform duration-300"
                    />
                    {product.stock < 10 && (
                      <Badge variant="destructive" className="absolute top-2 left-2">
                        Low Stock
                      </Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">
                        ({product.reviews})
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-blue-600">
                        KSH {product.price.toLocaleString()}
                      </span>
                      <Button
                        size="sm"
                        onClick={() => addToCart(product)}
                        className="text-xs"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
  {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Newsletter Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto max-w-8xl px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 text-blue-100">
            Subscribe to our newsletter and get exclusive deals on electronics.
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border-2 border-white rounded-l-lg text-gray-900 "
            />
            <Button className="bg-white py-4 text-blue-600 hover:bg-gray-100 rounded-l-none">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}