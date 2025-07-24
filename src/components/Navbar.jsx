import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
  TextField,
  InputAdornment,
  Avatar,
  Container
} from '@mui/material';
import {
  ShoppingCart,
  Search,
  AccountCircle,
  Store,
  Home,
  Logout,
  Person
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { cartCount } = useCart();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navigateToCart = () => {
    navigate('/cart');
  };

  const navigateToProfile = () => {
    navigate('/profile');
    handleMenuClose();
  };

  const navigateToSellerDashboard = () => {
    navigate('/seller-dashboard');
    handleMenuClose();
  };

  return (
    <AppBar position="sticky" elevation={0} className="fade-in">
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* Logo */}
          <Box 
            display="flex" 
            alignItems="center" 
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
            className="hover-lift"
          >
            <Store sx={{ mr: 1, fontSize: 28 }} />
            <Typography 
              variant="h5" 
              component="div" 
              fontWeight="bold"
              className="gradient-text"
              sx={{ color: 'white' }}
            >
              GadgetLoop
            </Typography>
          </Box>

          {/* Search Bar */}
          <Box 
            component="form" 
            onSubmit={handleSearch}
            sx={{ 
              flexGrow: 1, 
              maxWidth: 500, 
              mx: 3,
              display: { xs: 'none', md: 'block' }
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  opacity: 1,
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Navigation Items */}
          <Box display="flex" alignItems="center" gap={1}>
            <Button
              color="inherit"
              startIcon={<Home />}
              onClick={() => navigate('/')}
              sx={{ 
                display: { xs: 'none', sm: 'flex' },
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
              }}
            >
              Home
            </Button>

            <Button
              color="inherit"
              onClick={() => navigate('/products')}
              sx={{ 
                display: { xs: 'none', sm: 'flex' },
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
              }}
            >
              Products
            </Button>

            {/* Cart Icon */}
            <IconButton
              color="inherit"
              onClick={navigateToCart}
              className="hover-lift"
              sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
            >
              <Badge badgeContent={cartCount} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>

            {/* User Menu */}
            {isAuthenticated ? (
              <>
                <IconButton
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                  className="hover-lift"
                  sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
                >
                  <Avatar 
                    src={user?.profileImage} 
                    alt={user?.firstName}
                    sx={{ width: 32, height: 32 }}
                  >
                    {user?.firstName?.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  PaperProps={{
                    sx: {
                      mt: 1,
                      minWidth: 200,
                      borderRadius: 2,
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
                    }
                  }}
                >
                  <MenuItem onClick={navigateToProfile}>
                    <Person sx={{ mr: 2 }} />
                    Profile
                  </MenuItem>
                  {user?.role === 'seller' && (
                    <MenuItem onClick={navigateToSellerDashboard}>
                      <Store sx={{ mr: 2 }} />
                      Seller Dashboard
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleLogout}>
                    <Logout sx={{ mr: 2 }} />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box display="flex" gap={1}>
                <Button
                  color="inherit"
                  onClick={() => navigate('/login')}
                  sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate('/register')}
                  sx={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.3)' }
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;