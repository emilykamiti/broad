import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, MapPin, Package } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Textarea } from '../ui/textarea';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner@2.0.3';

interface ShippingInfo {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  additionalInfo: string;
}

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: '',
    additionalInfo: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [mpesaPhone, setMpesaPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const deliveryFee = getTotalPrice() >= 2000 ? 0 : 300;
  const finalTotal = getTotalPrice() + deliveryFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!shippingInfo.fullName.trim()) {
      toast.error('Please enter your full name');
      return false;
    }
    if (!shippingInfo.phone.trim()) {
      toast.error('Please enter your phone number');
      return false;
    }
    if (!shippingInfo.address.trim()) {
      toast.error('Please enter your address');
      return false;
    }
    if (!shippingInfo.city.trim()) {
      toast.error('Please enter your city');
      return false;
    }
    if (paymentMethod === 'mpesa' && !mpesaPhone.trim()) {
      toast.error('Please enter your M-Pesa phone number');
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (paymentMethod === 'mpesa') {
        // Simulate M-Pesa payment
        toast.success('M-Pesa payment request sent! Please check your phone.');
        await new Promise(resolve => setTimeout(resolve, 3000));
        toast.success('Payment confirmed!');
      }

      // Create order (in real app, this would be an API call)
      const orderId = Date.now().toString();
      
      toast.success('Order placed successfully!');
      clearCart();
      navigate(`/order-confirmation/${orderId}`);
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Information */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="h-5 w-5" />
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="w-full">
                    <Label htmlFor="fullName" className="block mb-2 text-sm font-medium">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={shippingInfo.fullName}
                      onChange={handleInputChange}
                      placeholder="Full name"
                      className="w-full h-10 px-3 text-sm border rounded-md"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <Label htmlFor="phone" className="block mb-2 text-sm font-medium">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleInputChange}
                      placeholder="+254700000000"
                      className="w-full h-10 px-3 text-sm border rounded-md"
                      required
                    />
                  </div>
                </div>

                <div className="w-full">
                  <Label htmlFor="address" className="block mb-2 text-sm font-medium">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleInputChange}
                    placeholder="Street address, building, apartment"
                    className="w-full h-10 px-3 text-sm border rounded-md"
                    required
                  />
                </div>

                <div className="w-full md:w-1/2">
                  <Label htmlFor="city" className="block mb-2 text-sm font-medium">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                    placeholder="e.g., Nairobi"
                    className="w-full h-10 px-3 text-sm border rounded-md"
                    required
                  />
                </div>

                <div className="w-full">
                  <Label htmlFor="additionalInfo" className="block mb-2 text-sm font-medium">Additional Information (Optional)</Label>
                  <Textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={shippingInfo.additionalInfo}
                    onChange={handleInputChange}
                    placeholder="Delivery instructions..."
                    rows={3}
                    className="w-full px-3 text-sm border rounded-md resize-none"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <CreditCard className="h-5 w-5" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="mpesa" id="mpesa" />
                    <Label htmlFor="mpesa" className="flex items-center gap-3 cursor-pointer flex-1">
                      <Smartphone className="h-5 w-5 text-green-600 shrink-0" />
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">M-Pesa</span>
                        <span className="text-xs text-gray-600">Pay with M-Pesa</span>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-4 border rounded-lg opacity-50 bg-gray-50">
                    <RadioGroupItem value="card" id="card" disabled />
                    <Label htmlFor="card" className="flex items-center gap-3 cursor-not-allowed flex-1">
                      <CreditCard className="h-5 w-5 text-blue-600 shrink-0" />
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">Credit/Debit Card</span>
                        <span className="text-xs text-gray-600">Coming soon</span>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === 'mpesa' && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                    <Label htmlFor="mpesaPhone" className="block mb-2 text-sm font-medium">M-Pesa Phone Number</Label>
                    <Input
                      id="mpesaPhone"
                      value={mpesaPhone}
                      onChange={(e) => setMpesaPhone(e.target.value)}
                      placeholder="254700000000"
                      className="w-full md:w-1/2 h-10 px-3 text-sm border rounded-md"
                    />
                    <p className="text-xs text-gray-600 mt-2 flex items-center gap-1">
                      <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      You'll receive a payment request on this number
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Package className="h-5 w-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-5">
                {/* Order Items */}
                <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-100 last:border-0">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium line-clamp-2">{item.name}</h4>
                        <p className="text-xs text-gray-600 mt-1">
                          Qty: {item.quantity} × KSH {item.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-sm font-medium whitespace-nowrap">
                        KSH {(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">KSH {getTotalPrice().toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className={deliveryFee === 0 ? 'text-green-600 font-medium' : 'font-medium'}>
                      {deliveryFee === 0 ? 'FREE' : `KSH ${deliveryFee.toLocaleString()}`}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between items-center text-base font-bold">
                      <span>Total</span>
                      <span className="text-blue-600">KSH {finalTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="w-full h-11 text-sm font-medium"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </span>
                  ) : `Place Order • KSH ${finalTotal.toLocaleString()}`}
                </Button>

                {/* Security Notice */}
                <div className="text-xs text-gray-600 space-y-2 bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span>Secure SSL encryption</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span>Your payment information is protected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span>30-day money-back guarantee</span>
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