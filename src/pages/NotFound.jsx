import React from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper
} from '@mui/material';
import {
  Home,
  ArrowBack,
  SearchOff
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={8}
          className="scale-in"
          sx={{
            p: 6,
            textAlign: 'center',
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)'
          }}
        >
          {/* 404 Icon */}
          <SearchOff 
            sx={{ 
              fontSize: 120, 
              color: 'primary.main', 
              mb: 3,
              opacity: 0.7
            }} 
            className="fade-in"
          />

          {/* Error Message */}
          <Typography 
            variant="h1" 
            component="h1" 
            sx={{ 
              fontSize: { xs: '4rem', md: '6rem' },
              fontWeight: 'bold',
              color: 'primary.main',
              mb: 2,
              background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
            className="slide-in"
          >
            404
          </Typography>

          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom
            className="fade-in"
            sx={{ 
              fontWeight: 600,
              mb: 2,
              color: 'text.primary'
            }}
          >
            Oops! Page Not Found
          </Typography>

          <Typography 
            variant="h6" 
            color="text.secondary" 
            paragraph
            className="slide-in"
            sx={{ 
              mb: 4,
              maxWidth: '500px',
              mx: 'auto'
            }}
          >
            The page you're looking for doesn't exist or has been moved. 
            Don't worry, let's get you back on track!
          </Typography>

          {/* Action Buttons */}
          <Box 
            display="flex" 
            gap={2} 
            justifyContent="center" 
            flexWrap="wrap"
            className="scale-in"
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<Home />}
              onClick={() => navigate('/')}
              className="pulse-button hover-lift"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                boxShadow: '0 4px 20px rgba(25, 118, 210, 0.3)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 30px rgba(25, 118, 210, 0.4)'
                }
              }}
            >
              Go Home
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
              className="hover-lift"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  transform: 'translateY(-2px)'
                }
              }}
            >
              Go Back
            </Button>
          </Box>

          {/* Additional Links */}
          <Box mt={4} className="fade-in">
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Or explore these popular sections:
            </Typography>
            <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap" mt={2}>
              <Button 
                color="primary" 
                onClick={() => navigate('/products')}
                sx={{ textTransform: 'none' }}
              >
                Browse Products
              </Button>
              <Button 
                color="primary" 
                onClick={() => navigate('/cart')}
                sx={{ textTransform: 'none' }}
              >
                View Cart
              </Button>
              <Button 
                color="primary" 
                onClick={() => navigate('/profile')}
                sx={{ textTransform: 'none' }}
              >
                My Profile
              </Button>
            </Box>
          </Box>

          {/* Contact Info */}
          <Box mt={4} className="slide-in">
            <Typography variant="body2" color="text.secondary">
              Still having trouble? <br />
              Contact our support team for assistance.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default NotFound;