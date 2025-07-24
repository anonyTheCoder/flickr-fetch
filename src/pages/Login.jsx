import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Link,
  Divider
} from '@mui/material';
import { Login as LoginIcon, Store } from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', severity: 'error' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setAlert({ show: false, message: '', severity: 'error' });

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        setAlert({
          show: true,
          message: 'Login successful! Redirecting...',
          severity: 'success'
        });
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        setAlert({
          show: true,
          message: result.error,
          severity: 'error'
        });
      }
    } catch (error) {
      setAlert({
        show: true,
        message: 'An unexpected error occurred. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        py: 4
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={24}
          className="scale-in"
          sx={{
            p: 4,
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)'
          }}
        >
          {/* Header */}
          <Box textAlign="center" mb={4}>
            <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
              <Store sx={{ fontSize: 40, color: 'primary.main', mr: 1 }} />
              <Typography variant="h4" component="h1" fontWeight="bold" color="primary">
                GadgetLoop
              </Typography>
            </Box>
            <Typography variant="h5" gutterBottom>
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to your account to continue shopping
            </Typography>
          </Box>

          {/* Alert */}
          {alert.show && (
            <Alert 
              severity={alert.severity} 
              sx={{ mb: 3 }}
              onClose={() => setAlert({ show: false, message: '', severity: 'error' })}
            >
              {alert.message}
            </Alert>
          )}

          {/* Login Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              margin="normal"
              autoComplete="email"
              autoFocus
              className="slide-in"
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              margin="normal"
              autoComplete="current-password"
              className="slide-in"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <LoginIcon />}
              className="pulse-button hover-lift"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                fontSize: '1rem',
                background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)'
              }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>

            <Box textAlign="center" mt={2}>
              <Link
                component={RouterLink}
                to="/register"
                variant="body2"
                sx={{ textDecoration: 'none' }}
              >
                Don't have an account? Sign up here
              </Link>
            </Box>

            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                or
              </Typography>
            </Divider>

            <Box textAlign="center">
              <Link
                href="#"
                variant="body2"
                sx={{ color: 'primary.main', textDecoration: 'none' }}
              >
                Forgot your password?
              </Link>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;