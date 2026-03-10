import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, UserCheck, UserX, Mail, Phone, Zap, Shield, Users, Package, ShoppingBag } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner@2.0.3';
import { mockOrders } from '../data/mockData';
import BroadTechLogo from '../BroadTechLogo';

// Mock users data
const mockUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@dunamis.com',
    role: 'admin',
    phone: '+254700000000',
    status: 'active',
    joinDate: '2024-01-01',
    totalOrders: mockOrders.filter(o => o.userId === '1').length,
    totalSpent: mockOrders.filter(o => o.userId === '1').reduce((sum, o) => sum + o.total, 0)
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'user@example.com',
    role: 'user',
    phone: '+254700000001',
    status: 'active',
    joinDate: '2024-01-15',
    totalOrders: mockOrders.filter(o => o.userId === '2').length,
    totalSpent: mockOrders.filter(o => o.userId === '2').reduce((sum, o) => sum + o.total, 0)
  },
  {
    id: '3',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'user',
    phone: '+254700000002',
    status: 'active',
    joinDate: '2024-01-20',
    totalOrders: 0,
    totalSpent: 0
  },
  {
    id: '4',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    role: 'user',
    phone: '+254700000003',
    status: 'inactive',
    joinDate: '2024-01-10',
    totalOrders: 5,
    totalSpent: 45000
  }
];

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const filteredUsers = mockUsers
    .filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime();
        case 'name':
          return a.name.localeCompare(b.name);
        case 'orders':
          return b.totalOrders - a.totalOrders;
        case 'spent':
          return b.totalSpent - a.totalSpent;
        default: // newest
          return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
      }
    });

  const getRoleColor = (role: string) => {
    return role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800';
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  const handleStatusToggle = (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    const user = mockUsers.find(u => u.id === userId);
    toast.success(`User ${user?.name} has been ${newStatus === 'active' ? 'activated' : 'deactivated'}!`);
    console.log(`Toggle user ${userId} status to ${newStatus}`);
  };

  const userStats = {
    total: mockUsers.length,
    active: mockUsers.filter(u => u.status === 'active').length,
    inactive: mockUsers.filter(u => u.status === 'inactive').length,
    admins: mockUsers.filter(u => u.role === 'admin').length,
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Dunamis Branded Header - kept exactly as original */}
      <div className="bg-gradient-to-r from-dunamis-primary to-dunamis-primary-dark text-white rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">

            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">

                User Management
              </h1>
              <p className="text-dunamis-accent mt-1">
                Manage user accounts and permissions with the power of Dunamis
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-white/20 backdrop-blur rounded-lg p-3 text-center">
              <Users className="h-6 w-6 mx-auto mb-1" />
              <p className="text-sm text-dunamis-accent">Active</p>
              <p className="font-bold">{userStats.active}</p>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-lg p-3 text-center">
              <Shield className="h-6 w-6 mx-auto mb-1" />
              <p className="text-sm text-dunamis-accent">Admins</p>
              <p className="font-bold">{userStats.admins}</p>
            </div>
          </div>
        </div>
      </div>

      {/* User Stats - Fitted properly */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{userStats.total}</p>
            <p className="text-xs text-gray-600">Total Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{userStats.active}</p>
            <p className="text-xs text-gray-600">Active Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-gray-600">{userStats.inactive}</p>
            <p className="text-xs text-gray-600">Inactive Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">{userStats.admins}</p>
            <p className="text-xs text-gray-600">Administrators</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters - Fitted properly */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-10"
                />
              </div>
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-48 h-10">
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Administrators</SelectItem>
                <SelectItem value="user">Users</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 h-10">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 h-10">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="orders">Most Orders</SelectItem>
                <SelectItem value="spent">Highest Spender</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table - Fitted properly */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="border rounded-lg p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-blue-600 font-medium text-sm">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-medium text-sm truncate">{user.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={`${getRoleColor(user.role)} text-xs px-2 py-0.5`}>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </Badge>
                          <Badge className={`${getStatusColor(user.status)} text-xs px-2 py-0.5`}>
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="min-w-0">
                        <p className="text-gray-600 flex items-center gap-1 text-xs">
                          <Mail className="h-3 w-3 shrink-0" />
                          Email
                        </p>
                        <p className="font-medium text-sm truncate">{user.email}</p>
                      </div>
                      <div className="min-w-0">
                        <p className="text-gray-600 flex items-center gap-1 text-xs">
                          <Phone className="h-3 w-3 shrink-0" />
                          Phone
                        </p>
                        <p className="font-medium text-sm truncate">{user.phone || 'Not provided'}</p>
                      </div>
                      <div className="min-w-0">
                        <p className="text-gray-600 text-xs">Join Date</p>
                        <p className="font-medium text-sm">
                          {new Date(user.joinDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-center min-w-[60px]">
                      <p className="text-lg font-bold">{user.totalOrders}</p>
                      <p className="text-xs text-gray-600">Orders</p>
                    </div>
                    <div className="text-center min-w-[100px]">
                      <p className="text-lg font-bold truncate">
                        KSH {user.totalSpent.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-600">Total Spent</p>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusToggle(user.id, user.status)}
                      className={`h-9 px-3 text-sm whitespace-nowrap ${
                        user.status === 'active' ? 'text-red-600' : 'text-green-600'
                      }`}
                    >
                      {user.status === 'active' ? (
                        <>
                          <UserX className="h-4 w-4 mr-1.5" />
                          Deactivate
                        </>
                      ) : (
                        <>
                          <UserCheck className="h-4 w-4 mr-1.5" />
                          Activate
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No users found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

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