import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, Grid, List, Star, SlidersHorizontal } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { Checkbox } from '../ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useCart } from '../context/CartContext';
import { mockProducts, categories } from '../data/mockData';
import { Product } from '../context/CartContext';

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState([0, 300000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showInStock, setShowInStock] = useState(false);

  useEffect(() => {
    let filtered = [...mockProducts];

    // Filter by search query
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category from URL
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      filtered = filtered.filter(product => product.category === categoryParam);
    }

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => selectedCategories.includes(product.category));
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Filter by stock
    if (showInStock) {
      filtered = filtered.filter(product => product.stock > 0);
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.id.localeCompare(a.id);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [searchParams, selectedCategories, priceRange, showInStock, sortBy]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 300000]);
    setShowInStock(false);
    setSortBy('name');
  };

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
              />
              <label htmlFor={category} className="text-sm cursor-pointer">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={300000}
            min={0}
            step={1000}
            className="mb-3"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>KSH {priceRange[0].toLocaleString()}</span>
            <span>KSH {priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="in-stock"
            checked={showInStock}
            onCheckedChange={setShowInStock}
          />
          <label htmlFor="in-stock" className="text-sm cursor-pointer">
            In Stock Only
          </label>
        </div>
      </div>

      <Button variant="outline" onClick={resetFilters} className="w-full">
        Reset Filters
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <h2 className="text-xl font-bold mb-6">Filters</h2>
            <FilterSidebar />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold">Products</h1>
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {mockProducts.length} products
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Mobile Filter Toggle */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterSidebar />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Sort By */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="price-low">Price (Low to High)</SelectItem>
                  <SelectItem value="price-high">Price (High to Low)</SelectItem>
                  <SelectItem value="rating">Customer Rating</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode Toggle */}
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="border-0 rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="border-0 rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">No products found</p>
              <Button onClick={resetFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }>
              {filteredProducts.map((product) => (
                <div key={product.id}>
                  {viewMode === 'grid' ? (
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <Link to={`/products/${product.id}`}>
                          <div className="relative">
                            <ImageWithFallback
                              src={product.image}
                              alt={product.name}
                              className="w-full h-48 object-cover rounded-t-lg"
                            />
                            {product.stock < 10 && product.stock > 0 && (
                              <Badge variant="destructive" className="absolute top-2 left-2">
                                Low Stock
                              </Badge>
                            )}
                            {product.stock === 0 && (
                              <Badge variant="secondary" className="absolute top-2 left-2">
                                Out of Stock
                              </Badge>
                            )}
                          </div>
                        </Link>
                        <div className="p-4">
                          <Link to={`/products/${product.id}`}>
                            <h3 className="font-semibold mb-2 line-clamp-2 hover:text-blue-600">
                              {product.name}
                            </h3>
                          </Link>
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
                              disabled={product.stock === 0}
                              className="text-xs"
                            >
                              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <Link to={`/products/${product.id}`} className="flex-shrink-0">
                            <ImageWithFallback
                              src={product.image}
                              alt={product.name}
                              className="w-24 h-24 object-cover rounded-lg"
                            />
                          </Link>
                          <div className="flex-1">
                            <Link to={`/products/${product.id}`}>
                              <h3 className="font-semibold mb-2 hover:text-blue-600">
                                {product.name}
                              </h3>
                            </Link>
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                              {product.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="flex items-center mr-3">
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
                                <span className="text-sm text-gray-600">
                                  ({product.reviews})
                                </span>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="text-lg font-bold text-blue-600">
                                  KSH {product.price.toLocaleString()}
                                </span>
                                <Button
                                  size="sm"
                                  onClick={() => addToCart(product)}
                                  disabled={product.stock === 0}
                                >
                                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}