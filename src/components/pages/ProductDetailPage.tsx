import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, Share2, Truck, Shield, RotateCcw, Plus, Minus } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useCart } from '../context/CartContext';
import { mockProducts } from '../data/mockData';
import { toast } from 'sonner@2.0.3';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = mockProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`Added ${quantity} ${product.name} to cart`);
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  // Mock additional images for demo
  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-blue-600">Products</Link>
        <span>/</span>
        <Link to={`/products?category=${product.category}`} className="hover:text-blue-600">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div>
          <div className="mb-4">
            <ImageWithFallback
              src={productImages[selectedImage]}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`border-2 rounded-lg overflow-hidden ${
                  selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                }`}
              >
                <ImageWithFallback
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-20 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">{product.category}</Badge>
            {product.stock < 10 && product.stock > 0 && (
              <Badge variant="destructive">Low Stock</Badge>
            )}
          </div>

          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-medium">{product.rating}</span>
            <span className="text-gray-600">({product.reviews} reviews)</span>
          </div>

          <div className="text-3xl font-bold text-blue-600 mb-6">
            KSH {product.price.toLocaleString()}
          </div>

          <p className="text-gray-700 mb-6 leading-relaxed">
            {product.description}
          </p>

          {/* Quantity and Add to Cart */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="border-0"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-4 py-2 font-medium">{quantity}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= product.stock}
                className="border-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <span className="text-sm text-gray-600">
              {product.stock} items available
            </span>
          </div>

          <div className="flex gap-4 mb-8">
            <Button
              size="lg"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1"
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
            <Button variant="outline" size="lg">
              <Heart className="h-4 w-4 mr-2" />
              Wishlist
            </Button>
            <Button variant="outline" size="lg">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Truck className="h-4 w-4" />
              <span>Free Delivery</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Shield className="h-4 w-4" />
              <span>1 Year Warranty</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <RotateCcw className="h-4 w-4" />
              <span>30 Day Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="description" className="mb-12">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Product Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                This is a high-quality product that meets all industry standards. 
                Perfect for both personal and professional use. Comes with full manufacturer warranty 
                and customer support.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="specifications" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <dt className="font-medium text-gray-900">Category</dt>
                  <dd className="text-gray-700">{product.category}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Stock Quantity</dt>
                  <dd className="text-gray-700">{product.stock} units</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Rating</dt>
                  <dd className="text-gray-700">{product.rating}/5 stars</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Reviews</dt>
                  <dd className="text-gray-700">{product.reviews} customer reviews</dd>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Customer Reviews</h3>
              <div className="space-y-6">
                {/* Mock Reviews */}
                <div className="border-b pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="font-medium">John K.</span>
                    <span className="text-gray-500 text-sm">2 weeks ago</span>
                  </div>
                  <p className="text-gray-700">
                    Excellent product! Exactly as described and delivered quickly. 
                    Would definitely recommend to others.
                  </p>
                </div>
                <div className="border-b pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                      <Star className="h-4 w-4 text-gray-300" />
                    </div>
                    <span className="font-medium">Sarah M.</span>
                    <span className="text-gray-500 text-sm">1 month ago</span>
                  </div>
                  <p className="text-gray-700">
                    Good quality product. Minor packaging issues but the item itself is perfect.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <Link to={`/products/${relatedProduct.id}`}>
                    <ImageWithFallback
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  </Link>
                  <div className="p-4">
                    <Link to={`/products/${relatedProduct.id}`}>
                      <h3 className="font-semibold mb-2 line-clamp-2 hover:text-blue-600">
                        {relatedProduct.name}
                      </h3>
                    </Link>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-blue-600">
                        KSH {relatedProduct.price.toLocaleString()}
                      </span>
                      <Button
                        size="sm"
                        onClick={() => addToCart(relatedProduct)}
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
      )}
    </div>
  );
}