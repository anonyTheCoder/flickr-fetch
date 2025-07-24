import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Badge,
  TextField,
  InputAdornment,
  Avatar,
  Menu,
  MenuItem,
  Container,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Search,
  ShoppingCart,
  Person,
  Store,
  Home,
  Inventory,
  AccountCircle,
  Dashboard,
  ExitToApp
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user, logout } = useAuth();
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

  const navigateToCart = () => navigate('/cart');
  const navigateToProfile = () => {
    navigate('/profile');
    handleMenuClose();
  };
  const navigateToSellerDashboard = () => {
    navigate('/seller-dashboard');
    handleMenuClose();
  };

  return (
    <AppBar position="sticky" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Box 
            display="flex" 
            alignItems="center" 
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            <Store sx={{ fontSize: 32, mr: 1 }} />
            <Typography 
              variant="h5" 
              component="div" 
              fontWeight="bold"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              GadgetLoop
            </Typography>
          </Box>

          {/* Search Bar */}
          {!isMobile && (
            <Box component="form" onSubmit={handleSearch} sx={{ flexGrow: 1, maxWidth: 400, mx: 4 }}>
              <TextField
                fullWidth
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                  sx: {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none'
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.25)'
                    },
                    '&.Mui-focused': {
                      backgroundColor: 'rgba(255, 255, 255, 0.25)'
                    }
                  }
                }}
                sx={{
                  '& .MuiInputBase-input': {
                    color: 'white',
                    '&::placeholder': {
                      color: 'rgba(255, 255, 255, 0.7)',
                      opacity: 1
                    }
                  }
                }}
              />
            </Box>
          )}

          {/* Navigation */}
          <Box display="flex" alignItems="center" gap={1}>
            {user ? (
              <>
                {/* Navigation Buttons */}
                <Button
                  color="inherit"
                  startIcon={<Home />}
                  onClick={() => navigate('/')}
                  sx={{ 
                    display: { xs: 'none', md: 'flex' },
                    color: location.pathname === '/' ? 'secondary.main' : 'inherit'
                  }}
                >
                  Home
                </Button>
                <Button
                  color="inherit"
                  startIcon={<Inventory />}
                  onClick={() => navigate('/products')}
                  sx={{ 
                    display: { xs: 'none', md: 'flex' },
                    color: location.pathname === '/products' ? 'secondary.main' : 'inherit'
                  }}
                >
                  Products
                </Button>

                {/* Cart */}
                <IconButton
                  color="inherit"
                  onClick={navigateToCart}
                  sx={{ mr: 1 }}
                >
                  <Badge badgeContent={cartCount} color="secondary">
                    <ShoppingCart />
                  </Badge>
                </IconButton>

                {/* Profile Menu */}
                <IconButton
                  color="inherit"
                  onClick={handleProfileMenuOpen}
                  sx={{ p: 0 }}
                >
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                    {user.firstName?.charAt(0) || <AccountCircle />}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem onClick={navigateToProfile}>
                    <Person sx={{ mr: 1 }} />
                    Profile
                  </MenuItem>
                  {user.role === 'seller' && (
                    <MenuItem onClick={navigateToSellerDashboard}>
                      <Dashboard sx={{ mr: 1 }} />
                      Seller Dashboard
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleLogout}>
                    <ExitToApp sx={{ mr: 1 }} />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  onClick={() => navigate('/login')}
                  sx={{ mr: 1 }}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate('/register')}
                  sx={{ 
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.3)'
                    }
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;