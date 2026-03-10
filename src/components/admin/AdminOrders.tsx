import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag, Users, Package, DollarSign,
  TrendingUp, TrendingDown, Eye, MoreHorizontal, Zap,
  Search, Truck, CheckCircle
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { toast } from 'sonner@2.0.3';
import { mockOrders } from '../data/mockData';
import BroadTechLogo from '../BroadTechLogo';

export default function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);

  const filteredOrders = mockOrders
    .filter(order => {
      const matchesSearch = order.id.includes(searchTerm) ||
                           order.shippingAddress.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'amount-high':
          return b.total - a.total;
        case 'amount-low':
          return a.total - b.total;
        default: // newest
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'shipped': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'processing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'shipped':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    // In a real app, this would make an API call
    toast.success(`Order ${orderId} status updated to ${newStatus}!`);
    console.log(`Update order ${orderId} to ${newStatus}`);
  };

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setIsOrderDialogOpen(true);
  };

  const orderStats = {
    total: mockOrders.length,
    pending: mockOrders.filter(o => o.status === 'pending').length,
    processing: mockOrders.filter(o => o.status === 'processing').length,
    shipped: mockOrders.filter(o => o.status === 'shipped').length,
    delivered: mockOrders.filter(o => o.status === 'delivered').length,
    cancelled: mockOrders.filter(o => o.status === 'cancelled').length,
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
   {/* Dunamis Branded Header */}
        <div className="bg-gradient-to-r from-dunamis-primary to-dunamis-primary-dark text-white rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">

              <div>
                <h1 className="text-3xl font-bold flex items-center gap-2">

                  Order Management
                </h1>
                <p className="text-dunamis-accent mt-1">
                  Track and manage all customer orders with Dunamis power
                </p>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-lg p-4">
              <p className="text-sm text-dunamis-accent">Total Revenue</p>
              <p className="text-2xl font-bold">
                KSH {mockOrders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

      {/* Order Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{orderStats.total}</p>
            <p className="text-xs text-gray-600">Total Orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-gray-600">{orderStats.pending}</p>
            <p className="text-xs text-gray-600">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">{orderStats.processing}</p>
            <p className="text-xs text-gray-600">Processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{orderStats.shipped}</p>
            <p className="text-xs text-gray-600">Shipped</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{orderStats.delivered}</p>
            <p className="text-xs text-gray-600">Delivered</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-600">{orderStats.cancelled}</p>
            <p className="text-xs text-gray-600">Cancelled</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search orders by ID or customer name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="amount-high">Amount (High to Low)</SelectItem>
                <SelectItem value="amount-low">Amount (Low to High)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Orders ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="border rounded-lg p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <h4 className="font-medium text-sm">Order #{order.id}</h4>
                      <Badge className={`${getStatusColor(order.status)} flex items-center gap-1 text-xs px-2 py-0.5`}>
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="min-w-0">
                        <p className="text-gray-600 text-xs">Customer</p>
                        <p className="font-medium text-sm truncate">{order.shippingAddress.name}</p>
                        <p className="text-gray-500 text-xs truncate">{order.shippingAddress.phone}</p>
                      </div>
                      <div className="min-w-0">
                        <p className="text-gray-600 text-xs">Items</p>
                        <p className="font-medium text-sm">{order.items.length} items</p>
                        <p className="text-gray-500 text-xs truncate">
                          {order.items.slice(0, 2).map(item => item.name).join(', ')}
                          {order.items.length > 2 && ` +${order.items.length - 2} more`}
                        </p>
                      </div>
                      <div className="min-w-0">
                        <p className="text-gray-600 text-xs">Date</p>
                        <p className="font-medium text-sm">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {new Date(order.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <p className="text-lg font-bold">KSH {order.total.toLocaleString()}</p>
                      <p className="text-xs text-gray-600 capitalize">
                        {order.paymentMethod} • {order.paymentStatus}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewOrder(order)} className="h-9 px-3">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>

                      <Select
                        value={order.status}
                        onValueChange={(value) => handleStatusUpdate(order.id, value)}
                      >
                        <SelectTrigger className="w-32 h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No orders found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

     {/* Order Details Dialog */}
     {isOrderDialogOpen && selectedOrder && (
       <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
         <DialogContent className="max-w-4xl p-0">
           {/* Fixed Header - Sticky */}
           <div className="sticky top-0 bg-white z-10 border-b p-6">
             <DialogHeader>
               <DialogTitle className="flex items-center gap-2 text-xl">
                 <Package className="h-5 w-5" />
                 Order #{selectedOrder.id} Details
               </DialogTitle>
             </DialogHeader>
           </div>

           {/* Scrollable Content - THIS IS THE OVERFLOW SECTION */}
           <div className="overflow-y-auto p-6" style={{ maxHeight: "calc(90vh - 100px)" }}>
             <div className="space-y-6">
               {/* Order Status and Info */}
               <div className="flex flex-col sm:flex-row justify-between items-start gap-4 bg-gray-50 p-4 rounded-lg">
                 <div>
                   <Badge className={`${getStatusColor(selectedOrder.status)} flex items-center gap-1 mb-2 text-sm px-3 py-1`}>
                     {getStatusIcon(selectedOrder.status)}
                     {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                   </Badge>
                   <p className="text-sm text-gray-600">
                     Created: {new Date(selectedOrder.createdAt).toLocaleString()}
                   </p>
                 </div>
                 <div className="text-right bg-white p-3 rounded-lg shadow-sm min-w-[220px]">
                   <p className="text-2xl font-bold text-dunamis-primary">KSH {selectedOrder.total.toLocaleString()}</p>
                   <p className="text-sm text-gray-600 capitalize mt-1">
                     {selectedOrder.paymentMethod} • {selectedOrder.paymentStatus}
                   </p>
                 </div>
               </div>

               <div className="grid md:grid-cols-2 gap-6">
                 {/* Customer Information */}
                 <Card className="shadow-sm">
                   <CardHeader className="pb-2 border-b">
                     <CardTitle className="text-base flex items-center gap-2">
                       <Users className="h-4 w-4" />
                       Customer Information
                     </CardTitle>
                   </CardHeader>
                   <CardContent className="p-4">
                     <div className="space-y-2">
                       <p className="text-sm"><span className="text-gray-500 font-medium">Name:</span> {selectedOrder.shippingAddress.name}</p>
                       <p className="text-sm truncate"><span className="text-gray-500 font-medium">Email:</span> {selectedOrder.shippingAddress.email}</p>
                       <p className="text-sm"><span className="text-gray-500 font-medium">Phone:</span> {selectedOrder.shippingAddress.phone}</p>
                     </div>
                   </CardContent>
                 </Card>

                 {/* Shipping Address */}
                 <Card className="shadow-sm">
                   <CardHeader className="pb-2 border-b">
                     <CardTitle className="text-base flex items-center gap-2">
                       <Package className="h-4 w-4" />
                       Shipping Address
                     </CardTitle>
                   </CardHeader>
                   <CardContent className="p-4">
                     <div className="space-y-1">
                       <p className="text-sm">{selectedOrder.shippingAddress.street}</p>
                       <p className="text-sm">{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}</p>
                       <p className="text-sm">{selectedOrder.shippingAddress.zipCode}</p>
                       <p className="text-sm">{selectedOrder.shippingAddress.country}</p>
                     </div>
                   </CardContent>
                 </Card>
               </div>

               {/* Order Items */}
               <Card className="shadow-sm">
                 <CardHeader className="pb-2 border-b">
                   <CardTitle className="text-base flex items-center gap-2">
                     <ShoppingBag className="h-4 w-4" />
                     Order Items ({selectedOrder.items.length})
                   </CardTitle>
                 </CardHeader>
                 <CardContent className="p-4">
                   <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                     {selectedOrder.items.map((item: any, index: number) => (
                       <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                         <div className="min-w-0 flex-1">
                           <p className="font-medium text-base truncate">{item.name}</p>
                           <p className="text-sm text-gray-600 mt-1">Quantity: {item.quantity}</p>
                         </div>
                         <div className="text-right ml-4 shrink-0">
                           <p className="font-medium text-base">KSH {(item.price * item.quantity).toLocaleString()}</p>
                           <p className="text-sm text-gray-500">KSH {item.price.toLocaleString()} each</p>
                         </div>
                       </div>
                     ))}
                   </div>

                   {/* Order Summary */}
                   <div className="border-t border-gray-200 pt-4 mt-4">
                     <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                       <div className="flex justify-between text-base">
                         <span className="text-gray-600">Subtotal:</span>
                         <span className="font-medium">KSH {(selectedOrder.total - 500).toLocaleString()}</span>
                       </div>
                       <div className="flex justify-between text-base">
                         <span className="text-gray-600">Shipping:</span>
                         <span className="font-medium">KSH 500</span>
                       </div>
                       <div className="border-t border-gray-200 pt-2 mt-2">
                         <div className="flex justify-between font-bold text-lg">
                           <span>Total:</span>
                           <span className="text-dunamis-primary">KSH {selectedOrder.total.toLocaleString()}</span>
                         </div>
                       </div>
                     </div>
                   </div>
                 </CardContent>
               </Card>

               {/* Order Timeline */}
               <Card className="shadow-sm">
                 <CardHeader className="pb-2 border-b">
                   <CardTitle className="text-base flex items-center gap-2">
                     <Zap className="h-4 w-4" />
                     Order Timeline
                   </CardTitle>
                 </CardHeader>
                 <CardContent className="p-4">
                   <div className="space-y-4">
                     <div className="flex items-start gap-3">
                       <div className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0"></div>
                       <div className="min-w-0 flex-1">
                         <p className="font-medium text-base">Order Placed</p>
                         <p className="text-sm text-gray-500">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                       </div>
                     </div>

                     {selectedOrder.status === 'processing' && (
                       <div className="flex items-start gap-3">
                         <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 shrink-0"></div>
                         <div className="min-w-0 flex-1">
                           <p className="font-medium text-base">Processing</p>
                           <p className="text-sm text-gray-500">Order is being prepared</p>
                         </div>
                       </div>
                     )}

                     {(selectedOrder.status === 'shipped' || selectedOrder.status === 'delivered') && (
                       <div className="flex items-start gap-3">
                         <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"></div>
                         <div className="min-w-0 flex-1">
                           <p className="font-medium text-base">Shipped</p>
                           <p className="text-sm text-gray-500">Order is on the way</p>
                         </div>
                       </div>
                     )}

                     {selectedOrder.status === 'delivered' && (
                       <div className="flex items-start gap-3">
                         <div className="w-2 h-2 bg-green-600 rounded-full mt-2 shrink-0"></div>
                         <div className="min-w-0 flex-1">
                           <p className="font-medium text-base">Delivered</p>
                           <p className="text-sm text-gray-500">Order has been delivered</p>
                         </div>
                       </div>
                     )}
                   </div>
                 </CardContent>
               </Card>
             </div>
           </div>
         </DialogContent>
       </Dialog>
     )}
     {/* Quick Actions - All 4 buttons in one horizontal line */}
     <Card className="mt-8">
       <CardHeader className="pb-3">
         <CardTitle className="text-lg">Quick Actions</CardTitle>
       </CardHeader>
       <CardContent className="p-6">
         <div className="flex flex-row gap-3 justify-between">
           <Link to="/admin" className="flex-1">
             <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
               <Package className="h-6 w-6" />
               <span className="text-sm">Admin Dashboard</span>
             </Button>
           </Link>
           <Link to="/admin/products" className="flex-1">
             <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
               <Package className="h-6 w-6" />
               <span className="text-sm">Products</span>
             </Button>
           </Link>
           <Link to="/admin/orders?status=pending" className="flex-1">
             <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
               <ShoppingBag className="h-6 w-6" />
               <span className="text-sm">Process Orders</span>
             </Button>
           </Link>
           <Link to="/admin/users" className="flex-1">
             <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
               <Users className="h-6 w-6" />
               <span className="text-sm">Manage Users</span>
             </Button>
           </Link>
         </div>
       </CardContent>
     </Card>
    </div>
  );
}