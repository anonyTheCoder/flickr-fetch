import React, { useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  IconButton,
  Divider,
  Paper,
  Avatar,
  Chip,
  Alert
} from '@mui/material';
import {
  Add,
  Remove,
  Delete,
  ShoppingBag,
  ArrowBack,
  Payment
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { 
    cartItems, 
    updateCartItem, 
    removeFromCart, 
    clearCart, 
    getCartTotal, 
    fetchCartItems,
    loading 
  } = useCart();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchCartItems();
  }, [isAuthenticated]);

  // Mock cart items for demonstration
  const mockCartItems = [
    {
      _id: '1',
      productId: '1',
      productName: 'iPhone 15 Pro',
      price: 999,
      quantity: 1,
      image: 'https://via.placeholder.com/100x80?text=iPhone',
      brand: 'Apple'
    },
    {
      _id: '2',
      productId: '3',
      productName: 'Sony WH-1000XM5',
      price: 399,
      quantity: 2,
      image: 'https://via.placeholder.com/100x80?text=Sony',
      brand: 'Sony'
    }
  ];

  const displayItems = cartItems.length > 0 ? cartItems : mockCartItems;
  const subtotal = displayItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 25;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleQuantityUpdate = async (productId, increment = null, decrement = null) => {
    const result = await updateCartItem(productId, increment, decrement);
    if (!result.success) {
      // Handle error
      console.error('Failed to update cart item');
    }
  };

  const handleRemoveItem = async (productId) => {
    const result = await removeFromCart(productId);
    if (!result.success) {
      // Handle error
      console.error('Failed to remove cart item');
    }
  };

  const handleClearCart = async () => {
    const result = await clearCart();
    if (!result.success) {
      // Handle error
      console.error('Failed to clear cart');
    }
  };

  const handleCheckout = () => {
    // Navigate to checkout or payment page
    navigate('/checkout');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box display="flex" alignItems="center" mb={4}>
        <IconButton 
          onClick={() => navigate('/products')}
          sx={{ mr: 2 }}
          className="hover-lift"
        >
          <ArrowBack />
        </IconButton>
        <ShoppingBag sx={{ mr: 2, color: 'primary.main' }} />
        <Typography variant="h4" component="h1" fontWeight="bold">
          Shopping Cart
        </Typography>
      </Box>

      {displayItems.length === 0 ? (
        /* Empty Cart */
        <Paper 
          elevation={2} 
          sx={{ 
            textAlign: 'center', 
            py: 8, 
            px: 4,
            borderRadius: 3
          }}
          className="fade-in"
        >
          <ShoppingBag sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom color="text.secondary">
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Start shopping to add items to your cart
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/products')}
            className="pulse-button hover-lift"
            sx={{ mt: 2 }}
          >
            Continue Shopping
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={4}>
          {/* Cart Items */}
          <Grid item xs={12} md={8}>
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                  <Typography variant="h6" fontWeight="bold">
                    Cart Items ({displayItems.length})
                  </Typography>
                  <Button
                    color="error"
                    onClick={handleClearCart}
                    startIcon={<Delete />}
                    sx={{ textTransform: 'none' }}
                  >
                    Clear Cart
                  </Button>
                </Box>

                {displayItems.map((item, index) => (
                  <Box key={item._id}>
                    <Box display="flex" alignItems="center" py={2}>
                      <Avatar
                        src={item.image}
                        alt={item.productName}
                        variant="rounded"
                        sx={{ width: 80, height: 60, mr: 2 }}
                      />
                      
                      <Box flexGrow={1}>
                        <Typography variant="h6" fontWeight="600" gutterBottom>
                          {item.productName}
                        </Typography>
                        <Chip 
                          label={item.brand} 
                          size="small" 
                          variant="outlined"
                          sx={{ mb: 1 }}
                        />
                        <Typography variant="h6" color="primary" fontWeight="bold">
                          ${item.price}
                        </Typography>
                      </Box>

                      <Box display="flex" alignItems="center" gap={1}>
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityUpdate(item.productId, null, 1)}
                          disabled={item.quantity <= 1}
                          className="hover-lift"
                        >
                          <Remove />
                        </IconButton>
                        
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            minWidth: 40, 
                            textAlign: 'center',
                            fontWeight: 'bold'
                          }}
                        >
                          {item.quantity}
                        </Typography>
                        
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityUpdate(item.productId, 1, null)}
                          className="hover-lift"
                        >
                          <Add />
                        </IconButton>
                      </Box>

                      <Box textAlign="right" ml={2}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                          ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                        <IconButton
                          color="error"
                          onClick={() => handleRemoveItem(item.productId)}
                          className="hover-lift"
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </Box>
                    {index < displayItems.length - 1 && <Divider />}
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} md={4}>
            <Card 
              elevation={2} 
              sx={{ 
                borderRadius: 3,
                position: 'sticky',
                top: 100
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Order Summary
                </Typography>
                
                <Box py={2}>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography>Subtotal:</Typography>
                    <Typography fontWeight="600">${subtotal.toFixed(2)}</Typography>
                  </Box>
                  
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography>Shipping:</Typography>
                    <Typography fontWeight="600">
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </Typography>
                  </Box>
                  
                  <Box display="flex" justifyContent="space-between" mb={2}>
                    <Typography>Tax:</Typography>
                    <Typography fontWeight="600">${tax.toFixed(2)}</Typography>
                  </Box>
                  
                  <Divider />
                  
                  <Box display="flex" justifyContent="space-between" mt={2}>
                    <Typography variant="h6" fontWeight="bold">
                      Total:
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" color="primary">
                      ${total.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>

                {shipping > 0 && (
                  <Alert severity="info" sx={{ mb: 2 }}>
                    Add ${(500 - subtotal).toFixed(2)} more for free shipping!
                  </Alert>
                )}

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleCheckout}
                  startIcon={<Payment />}
                  className="pulse-button hover-lift"
                  sx={{ 
                    py: 1.5,
                    fontSize: '1.1rem',
                    background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)'
                  }}
                >
                  Proceed to Checkout
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => navigate('/products')}
                  sx={{ mt: 2, textTransform: 'none' }}
                >
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Cart;