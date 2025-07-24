import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  TextField,
  InputAdornment,
  Chip,
  Pagination,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper
} from '@mui/material';
import {
  Search,
  ShoppingCart,
  Favorite,
  FavoriteBorder,
  Star,
  FilterList
} from '@mui/icons-material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Products = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();
  const { API_BASE_URL, isAuthenticated } = useAuth();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [alert, setAlert] = useState({ show: false, message: '', severity: 'success' });

  const categories = ['All', 'Electronics', 'Laptops', 'Smartphones', 'Accessories', 'Gaming'];

  // Mock products data (replace with actual API call)
  const mockProducts = [
    {
      _id: '1',
      productName: 'iPhone 15 Pro',
      description: 'Latest iPhone with advanced camera system and A17 Pro chip.',
      price: 999,
      category: 'Smartphones',
      brand: 'Apple',
      rating: 4.8,
      reviews: 1250,
      image: 'https://via.placeholder.com/300x200?text=iPhone+15+Pro',
      inStock: true,
      quantity: 25
    },
    {
      _id: '2',
      productName: 'MacBook Pro 14"',
      description: 'Powerful laptop with M3 chip for professional work.',
      price: 1999,
      category: 'Laptops',
      brand: 'Apple',
      rating: 4.9,
      reviews: 890,
      image: 'https://via.placeholder.com/300x200?text=MacBook+Pro',
      inStock: true,
      quantity: 15
    },
    {
      _id: '3',
      productName: 'Sony WH-1000XM5',
      description: 'Premium noise-canceling wireless headphones.',
      price: 399,
      category: 'Accessories',
      brand: 'Sony',
      rating: 4.7,
      reviews: 2100,
      image: 'https://via.placeholder.com/300x200?text=Sony+Headphones',
      inStock: true,
      quantity: 45
    },
    {
      _id: '4',
      productName: 'Gaming Laptop RTX 4080',
      description: 'High-performance gaming laptop with RTX 4080 graphics.',
      price: 2499,
      category: 'Gaming',
      brand: 'ASUS',
      rating: 4.6,
      reviews: 567,
      image: 'https://via.placeholder.com/300x200?text=Gaming+Laptop',
      inStock: true,
      quantity: 8
    },
    {
      _id: '5',
      productName: 'Samsung Galaxy S24 Ultra',
      description: 'Advanced Android smartphone with S Pen and AI features.',
      price: 1199,
      category: 'Smartphones',
      brand: 'Samsung',
      rating: 4.5,
      reviews: 890,
      image: 'https://via.placeholder.com/300x200?text=Galaxy+S24+Ultra',
      inStock: true,
      quantity: 30
    },
    {
      _id: '6',
      productName: 'iPad Pro 12.9"',
      description: 'Professional tablet with M2 chip and Liquid Retina display.',
      price: 1099,
      category: 'Electronics',
      brand: 'Apple',
      rating: 4.8,
      reviews: 1450,
      image: 'https://via.placeholder.com/300x200?text=iPad+Pro',
      inStock: true,
      quantity: 20
    }
  ];

  useEffect(() => {
    fetchProducts();
  }, [searchQuery, currentPage, sortBy]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // For demo purposes, using mock data
      // In real implementation, use:
      // const response = await axios.get(`${API_BASE_URL}/v3/product/list?page=${currentPage}&search=${searchQuery}`);
      
      let filteredProducts = [...mockProducts];
      
      // Filter by search query
      if (searchQuery) {
        filteredProducts = filteredProducts.filter(product =>
          product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Sort products
      switch (sortBy) {
        case 'price-low':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
        default:
          // newest - keep original order
          break;
      }

      setProducts(filteredProducts);
      setTotalPages(Math.ceil(filteredProducts.length / 6)); // 6 products per page
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setAlert({
        show: true,
        message: 'Failed to load products. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setSearchParams(searchQuery ? { search: searchQuery } : {});
  };

  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const result = await addToCart(product._id, 1);
    if (result.success) {
      setAlert({
        show: true,
        message: 'Product added to cart successfully!',
        severity: 'success'
      });
    } else {
      setAlert({
        show: true,
        message: result.error || 'Failed to add product to cart',
        severity: 'error'
      });
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Alert */}
      {alert.show && (
        <Alert 
          severity={alert.severity} 
          sx={{ mb: 3 }}
          onClose={() => setAlert({ show: false, message: '', severity: 'success' })}
        >
          {alert.message}
        </Alert>
      )}

      {/* Search and Filters */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box component="form" onSubmit={handleSearch}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                label="Sort By"
              >
                <MenuItem value="newest">Newest</MenuItem>
                <MenuItem value="price-low">Price: Low to High</MenuItem>
                <MenuItem value="price-high">Price: High to Low</MenuItem>
                <MenuItem value="rating">Highest Rated</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FilterList />}
              sx={{ height: 56 }}
            >
              More Filters
            </Button>
          </Grid>
        </Grid>

        {/* Categories */}
        <Box display="flex" gap={1} mt={2} flexWrap="wrap">
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              clickable
              variant="outlined"
              className="hover-lift"
            />
          ))}
        </Box>
      </Paper>

      {/* Products Grid */}
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <Card 
              className="product-card hover-lift"
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer'
              }}
            >
              <CardMedia
                component="img"
                height={200}
                image={product.image}
                alt={product.productName}
                onClick={() => handleProductClick(product._id)}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography 
                  variant="h6" 
                  component="h2" 
                  gutterBottom
                  sx={{ 
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {product.productName}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  gutterBottom
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}
                >
                  {product.description}
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <Star sx={{ color: '#ffc107', fontSize: 16 }} />
                  <Typography variant="body2">
                    {product.rating} ({product.reviews} reviews)
                  </Typography>
                </Box>
                <Typography variant="h6" color="primary" fontWeight="bold">
                  ${product.price}
                </Typography>
                <Chip 
                  label={product.brand} 
                  size="small" 
                  variant="outlined" 
                  sx={{ mt: 1 }}
                />
              </CardContent>
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<ShoppingCart />}
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                  className="pulse-button"
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* No Products Found */}
      {products.length === 0 && (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No products found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or filters
          </Typography>
        </Box>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={6}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(e, page) => setCurrentPage(page)}
            color="primary"
            size="large"
          />
        </Box>
      )}
    </Container>
  );
};

export default Products;
