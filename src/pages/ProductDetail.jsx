import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Rating,
  Chip,
  Divider,
  Avatar,
  TextField,
  IconButton,
  Alert,
  Paper,
  Breadcrumbs,
  Link
} from '@mui/material';
import {
  ShoppingCart,
  Favorite,
  FavoriteBorder,
  Share,
  Add,
  Remove,
  Star,
  Verified,
  ArrowBack
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [comment, setComment] = useState('');
  const [alert, setAlert] = useState({ show: false, message: '', severity: 'success' });

  // Mock product data
  const mockProduct = {
    _id: id,
    productName: 'iPhone 15 Pro',
    description: 'The iPhone 15 Pro is a premium smartphone featuring the powerful A17 Pro chip, advanced camera system with 5x optical zoom, and titanium design. Experience unparalleled performance and photography capabilities.',
    price: 999,
    originalPrice: 1099,
    category: 'Smartphones',
    brand: 'Apple',
    rating: 4.8,
    reviewCount: 1250,
    inStock: true,
    quantity: 25,
    images: [
      'https://via.placeholder.com/500x400?text=iPhone+15+Pro+Front',
      'https://via.placeholder.com/500x400?text=iPhone+15+Pro+Back',
      'https://via.placeholder.com/500x400?text=iPhone+15+Pro+Side'
    ],
    features: [
      'A17 Pro chip with 6-core GPU',
      'Pro camera system (48MP, 12MP, 12MP)',
      '5x optical zoom',
      'Titanium design',
      'Action Button',
      'USB-C connectivity'
    ],
    specifications: {
      'Display': '6.1" Super Retina XDR',
      'Storage': '128GB, 256GB, 512GB, 1TB',
      'Camera': 'Triple camera system',
      'Battery': 'Up to 23 hours video playback',
      'Colors': 'Natural Titanium, Blue Titanium, White Titanium, Black Titanium'
    },
    seller: {
      name: 'Apple Store Official',
      rating: 4.9,
      verified: true
    }
  };

  const mockReviews = [
    {
      id: 1,
      user: 'John D.',
      rating: 5,
      date: '2024-01-15',
      comment: 'Amazing phone! The camera quality is outstanding and the performance is incredibly smooth.',
      verified: true
    },
    {
      id: 2,
      user: 'Sarah M.',
      rating: 4,
      date: '2024-01-10',
      comment: 'Great upgrade from my previous iPhone. Love the new titanium design.',
      verified: true
    }
  ];

  useEffect(() => {
    // In real implementation, fetch product data from API
    setProduct(mockProduct);
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const result = await addToCart(product._id, quantity);
    if (result.success) {
      setAlert({
        show: true,
        message: `${quantity} item(s) added to cart!`,
        severity: 'success'
      });
    } else {
      setAlert({
        show: true,
        message: result.error || 'Failed to add to cart',
        severity: 'error'
      });
    }
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    // Add to cart and redirect to checkout
    addToCart(product._id, quantity);
    navigate('/cart');
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.quantity) {
      setQuantity(newQuantity);
    }
  };

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h6">Loading product...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
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

      {/* Breadcrumbs */}
      <Box mb={3}>
        <Breadcrumbs>
          <Link onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
            Home
          </Link>
          <Link onClick={() => navigate('/products')} sx={{ cursor: 'pointer' }}>
            Products
          </Link>
          <Typography color="text.primary">{product.productName}</Typography>
        </Breadcrumbs>
      </Box>

      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ borderRadius: 3 }}>
            <Box sx={{ p: 2 }}>
              <Box
                component="img"
                src={product.images[selectedImage]}
                alt={product.productName}
                sx={{
                  width: '100%',
                  height: 400,
                  objectFit: 'cover',
                  borderRadius: 2,
                  mb: 2
                }}
              />
              <Box display="flex" gap={1} justifyContent="center">
                {product.images.map((image, index) => (
                  <Box
                    key={index}
                    component="img"
                    src={image}
                    alt={`${product.productName} ${index + 1}`}
                    onClick={() => setSelectedImage(index)}
                    sx={{
                      width: 80,
                      height: 60,
                      objectFit: 'cover',
                      borderRadius: 1,
                      cursor: 'pointer',
                      border: selectedImage === index ? 2 : 1,
                      borderColor: selectedImage === index ? 'primary.main' : 'grey.300',
                      '&:hover': { borderColor: 'primary.main' }
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
              {product.productName}
            </Typography>

            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <Rating value={product.rating} precision={0.1} readOnly />
              <Typography variant="body2">
                {product.rating} ({product.reviewCount} reviews)
              </Typography>
              <Chip label={product.category} size="small" variant="outlined" />
            </Box>

            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Typography variant="h4" color="primary" fontWeight="bold">
                ${product.price}
              </Typography>
              {product.originalPrice > product.price && (
                <Typography 
                  variant="h6" 
                  sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
                >
                  ${product.originalPrice}
                </Typography>
              )}
              <Chip 
                label={`Save $${product.originalPrice - product.price}`} 
                color="error" 
                size="small"
              />
            </Box>

            <Typography variant="body1" paragraph color="text.secondary">
              {product.description}
            </Typography>

            {/* Seller Info */}
            <Paper variant="outlined" sx={{ p: 2, mb: 3, borderRadius: 2 }}>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar>{product.seller.name.charAt(0)}</Avatar>
                <Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {product.seller.name}
                    </Typography>
                    {product.seller.verified && (
                      <Verified color="primary" fontSize="small" />
                    )}
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Rating value={product.seller.rating} size="small" readOnly />
                    <Typography variant="body2">
                      {product.seller.rating} seller rating
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>

            {/* Quantity Selector */}
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Typography variant="body1" fontWeight="bold">
                Quantity:
              </Typography>
              <Box display="flex" alignItems="center" border={1} borderColor="grey.300" borderRadius={1}>
                <IconButton 
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Remove />
                </IconButton>
                <Typography sx={{ px: 2, py: 1, minWidth: 40, textAlign: 'center' }}>
                  {quantity}
                </Typography>
                <IconButton 
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.quantity}
                >
                  <Add />
                </IconButton>
              </Box>
              <Typography variant="body2" color="text.secondary">
                ({product.quantity} available)
              </Typography>
            </Box>

            {/* Action Buttons */}
            <Box display="flex" gap={2} mb={3}>
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCart />}
                onClick={handleAddToCart}
                className="pulse-button hover-lift"
                sx={{ 
                  flexGrow: 1,
                  py: 1.5,
                  background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)'
                }}
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={handleBuyNow}
                sx={{ flexGrow: 1, py: 1.5 }}
              >
                Buy Now
              </Button>
            </Box>

            <Box display="flex" gap={1}>
              <IconButton 
                onClick={() => setIsFavorite(!isFavorite)}
                className="hover-lift"
              >
                {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
              </IconButton>
              <IconButton className="hover-lift">
                <Share />
              </IconButton>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Product Details Tabs */}
      <Box mt={6}>
        <Grid container spacing={4}>
          {/* Features */}
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ borderRadius: 3, height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Key Features
                </Typography>
                <Box component="ul" sx={{ pl: 2 }}>
                  {product.features.map((feature, index) => (
                    <Typography key={index} component="li" variant="body2" sx={{ mb: 1 }}>
                      {feature}
                    </Typography>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Specifications */}
          <Grid item xs={12} md={6}>
            <Card elevation={2} sx={{ borderRadius: 3, height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Specifications
                </Typography>
                {Object.entries(product.specifications).map(([key, value], index) => (
                  <Box key={index}>
                    <Box display="flex" justifyContent="space-between" py={1}>
                      <Typography variant="body2" fontWeight="bold">
                        {key}:
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {value}
                      </Typography>
                    </Box>
                    {index < Object.entries(product.specifications).length - 1 && <Divider />}
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Reviews Section */}
      <Box mt={6}>
        <Card elevation={2} sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Customer Reviews
            </Typography>
            
            {mockReviews.map((review) => (
              <Box key={review.id} mb={3}>
                <Box display="flex" alignItems="center" gap={2} mb={1}>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {review.user.charAt(0)}
                  </Avatar>
                  <Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {review.user}
                      </Typography>
                      {review.verified && (
                        <Chip label="Verified Purchase" size="small" color="success" />
                      )}
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Rating value={review.rating} size="small" readOnly />
                      <Typography variant="caption" color="text.secondary">
                        {new Date(review.date).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ ml: 7 }}>
                  {review.comment}
                </Typography>
                <Divider sx={{ mt: 2 }} />
              </Box>
            ))}

            {/* Add Review */}
            {isAuthenticated && (
              <Box mt={3}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Write a Review
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Share your experience with this product..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button variant="contained" disabled={!comment.trim()}>
                  Submit Review
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default ProductDetail;