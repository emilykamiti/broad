import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart();
  const { user } = useAuth();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center py-16">
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/products">
            <Button size="lg" className="px-8">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  const deliveryFee = getTotalPrice() >= 2000 ? 0 : 300;
  const finalTotal = getTotalPrice() + deliveryFee;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <Link to={`/products/${item.id}`} className="flex-shrink-0">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </Link>

                  <div className="flex-1">
                    <Link to={`/products/${item.id}`}>
                      <h3 className="font-semibold text-lg mb-2 hover:text-blue-600">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center border rounded-lg">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="border-0 h-9 w-9 rounded-r-none hover:bg-gray-100"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </Button>
                          <span className="w-12 py-1.5 font-medium text-center text-sm border-x">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.stock}
                            className="border-0 h-9 w-9 rounded-l-none hover:bg-gray-100"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 px-3"
                        >
                          <Trash2 className="h-4 w-4 mr-1.5" />
                          Remove
                        </Button>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">
                          KSH {(item.price * item.quantity).toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          KSH {item.price.toLocaleString()} each
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-5">
                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Subtotal ({getTotalItems()} items)</span>
                    <span className="font-medium">KSH {getTotalPrice().toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className={deliveryFee === 0 ? 'text-green-600 font-medium' : 'font-medium'}>
                      {deliveryFee === 0 ? 'FREE' : `KSH ${deliveryFee.toLocaleString()}`}
                    </span>
                  </div>

                  {deliveryFee > 0 && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-xs text-blue-700">
                        Add KSH {(2000 - getTotalPrice()).toLocaleString()} more for free delivery
                      </p>
                    </div>
                  )}

                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between items-center text-base font-bold">
                      <span>Total</span>
                      <span className="text-blue-600">KSH {finalTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {user ? (
                    <Link to="/checkout" className="block">
                      <Button size="lg" className="w-full h-12 text-base font-medium">
                        Proceed to Checkout
                      </Button>
                    </Link>
                  ) : (
                    <div className="space-y-3">
                      <Link to="/login?redirect=/checkout" className="block">
                        <Button size="lg" className="w-full h-12 text-base font-medium">
                          Login to Checkout
                        </Button>
                      </Link>
                      <p className="text-sm text-gray-600 text-center">
                        New customer?{' '}
                        <Link to="/signup" className="text-blue-600 hover:underline font-medium">
                          Create an account
                        </Link>
                      </p>
                    </div>
                  )}

                  <Link to="/products" className="block">
                    <Button variant="outline" size="lg" className="w-full h-12 text-base font-medium">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>Secure Checkout</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>Free Returns within 30 days</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>24/7 Customer Support</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}