import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Search, Filter, Save, X, Zap, Package, ShoppingBag, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { toast } from 'sonner@2.0.3';
import { mockProducts, categories } from '../data/mockData';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import BroadTechLogo from '../BroadTechLogo';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  rating: number;
  reviews: number;
}

export default function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const filteredProducts = mockProducts
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'stock':
          return a.stock - b.stock;
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: 'Out of Stock', color: 'destructive' };
    if (stock < 10) return { label: 'Low Stock', color: 'secondary' };
    return { label: 'In Stock', color: 'default' };
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleAddProduct = () => {
    setSelectedProduct({
      id: '',
      name: '',
      description: '',
      price: 0,
      image: '',
      category: categories[0],
      stock: 0,
      rating: 0,
      reviews: 0
    });
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleSaveProduct = () => {
    if (isEditing) {
      toast.success('Product updated successfully!');
    } else {
      toast.success('Product added successfully!');
    }
    setIsDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = (productId: string, productName: string) => {
    toast.success(`Product "${productName}" deleted successfully!`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Dunamis Branded Header */}
      <div className="bg-gradient-to-r from-dunamis-primary to-dunamis-primary-dark text-white rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">

            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">

                Product Management
              </h1>
              <p className="text-dunamis-accent mt-1">
                Harness the power of Dunamis to manage your product inventory and details
              </p>
            </div>
          </div>
          <Button
            className="flex items-center gap-2 bg-white text-dunamis-primary hover:bg-white/90"
            onClick={handleAddProduct}
          >
            <Plus className="h-4 w-4" />
            Add New Product
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-2xl font-bold">{mockProducts.length}</p>
            <p className="text-sm text-gray-600">Total Products</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-600">
              {mockProducts.filter(p => p.stock === 0).length}
            </p>
            <p className="text-sm text-gray-600">Out of Stock</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {mockProducts.filter(p => p.stock > 0 && p.stock < 10).length}
            </p>
            <p className="text-sm text-gray-600">Low Stock</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              {mockProducts.filter(p => p.stock >= 10).length}
            </p>
            <p className="text-sm text-gray-600">In Stock</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="price">Price (Low to High)</SelectItem>
                <SelectItem value="stock">Stock Level</SelectItem>
                <SelectItem value="category">Category</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Products ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Product</th>
                  <th className="text-left p-4">Category</th>
                  <th className="text-left p-4">Price</th>
                  <th className="text-left p-4">Stock</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => {
                  const stockStatus = getStockStatus(product.stock);
                  return (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <ImageWithFallback
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <h4 className="font-medium line-clamp-1">{product.name}</h4>
                            <p className="text-sm text-gray-600 line-clamp-1">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="secondary">{product.category}</Badge>
                      </td>
                      <td className="p-4 font-medium">
                        KSH {product.price.toLocaleString()}
                      </td>
                      <td className="p-4">
                        <span className={product.stock < 10 ? 'text-red-600 font-medium' : ''}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="p-4">
                        <Badge variant={stockStatus.color as any}>
                          {stockStatus.label}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEditProduct(product)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700"
                            onClick={() => handleDeleteProduct(product.id, product.name)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No products found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Product Dialog */}
      {isDialogOpen && selectedProduct && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" placeholder="Enter product name" defaultValue={selectedProduct.name} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter product description" defaultValue={selectedProduct.description} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="price">Price</Label>
                <Input id="price" type="number" placeholder="Enter price" defaultValue={selectedProduct.price} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="category">Category</Label>
                <Select value={selectedProduct.category} onValueChange={(value) => setSelectedProduct({...selectedProduct, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="stock">Stock</Label>
                <Input id="stock" type="number" placeholder="Enter stock quantity" defaultValue={selectedProduct.stock} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="image">Image URL</Label>
                <Input id="image" placeholder="Enter image URL" defaultValue={selectedProduct.image} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => handleSaveProduct()}>
                <Save className="mr-2 h-4 w-4" />
                {isEditing ? 'Save Changes' : 'Add Product'}
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </DialogFooter>
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