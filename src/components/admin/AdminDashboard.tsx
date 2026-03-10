import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, Users, Package, DollarSign, 
  TrendingUp, TrendingDown, Eye, MoreHorizontal, Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { mockProducts, mockOrders } from '../data/mockData';
import BroadTechLogo from '../BroadTechLogo';

export default function AdminDashboard() {
  // Calculate statistics
  const totalProducts = mockProducts.length;
  const totalOrders = mockOrders.length;
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = mockOrders.filter(order => order.status === 'pending').length;
  
  // Recent orders
  const recentOrders = mockOrders
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  // Low stock products
  const lowStockProducts = mockProducts
    .filter(product => product.stock < 10)
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = [
    {
      title: 'Total Revenue',
      value: `KSH ${totalRevenue.toLocaleString()}`,
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Total Orders',
      value: totalOrders.toString(),
      change: '+3.2%',
      trend: 'up',
      icon: ShoppingBag,
      color: 'text-blue-600'
    },
    {
      title: 'Total Products',
      value: totalProducts.toString(),
      change: '+2 new',
      trend: 'up',
      icon: Package,
      color: 'text-purple-600'
    },
    {
      title: 'Pending Orders',
      value: pendingOrders.toString(),
      change: '-1.3%',
      trend: 'down',
      icon: Users,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Admin Header with Dunamis Branding */}
            <div className="bg-gradient-to-r from-dunamis-primary to-dunamis-primary-dark text-white rounded-lg p-6 mb-8">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">

                  <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                      Admin Dashboard
                    </h1>
                    <p className="text-dunamis-accent mt-1">
                      Welcome back! Harness the power of Dunamis to manage your store.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Link to="/admin/products">
                    <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/20">
                      Manage Products
                    </Button>
                  </Link>
                  <Link to="/admin/orders">
                    <Button variant="secondary" className="bg-white text-dunamis-primary hover:bg-white/90">
                      View Orders
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <div className="flex items-center gap-1">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                    <span className={`text-sm ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-gray-50 ${stat.color} shrink-0`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-lg">Recent Orders</CardTitle>
            <Link to="/admin/orders">
              <Button variant="outline" size="sm" className="h-9">
                <Eye className="h-4 w-4 mr-2" />
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm truncate">Order #{order.id}</h4>
                      <Badge className={`${getStatusColor(order.status)} text-xs px-2 py-0.5 shrink-0`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {order.shippingAddress.name} • {order.items.length} items
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right flex items-center gap-2 ml-4 shrink-0">
                    <p className="font-medium text-sm whitespace-nowrap">KSH {order.total.toLocaleString()}</p>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Products */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-lg">Low Stock Alert</CardTitle>
            <Link to="/admin/products">
              <Button variant="outline" size="sm" className="h-9">
                <Eye className="h-4 w-4 mr-2" />
                Manage Stock
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {lowStockProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-medium text-sm truncate">{product.name}</h4>
                      <p className="text-xs text-gray-600 mt-0.5">{product.category}</p>
                    </div>
                  </div>
                  <div className="text-right ml-4 shrink-0">
                    <Badge variant={product.stock === 0 ? 'destructive' : 'secondary'} className="text-xs px-2 py-0.5 whitespace-nowrap">
                      {product.stock} left
                    </Badge>
                    <p className="text-xs text-gray-600 mt-1.5 whitespace-nowrap">
                      KSH {product.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

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