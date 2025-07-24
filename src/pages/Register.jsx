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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Grid
} from '@mui/material';
import { PersonAdd, Store } from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'buyer'
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

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

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

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.role) {
      newErrors.role = 'Please select a role';
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
      const { confirmPassword, ...registrationData } = formData;
      const result = await register(registrationData);
      
      if (result.success) {
        setAlert({
          show: true,
          message: 'Registration successful! Please login to continue.',
          severity: 'success'
        });
        setTimeout(() => {
          navigate('/login');
        }, 2000);
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
      <Container maxWidth="md">
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
              Create Your Account
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Join our community of buyers and sellers
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

          {/* Registration Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  autoComplete="given-name"
                  className="slide-in"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  autoComplete="family-name"
                  className="slide-in"
                />
              </Grid>
            </Grid>

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
              className="slide-in"
            />

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  autoComplete="new-password"
                  className="slide-in"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  autoComplete="new-password"
                  className="slide-in"
                />
              </Grid>
            </Grid>

            <FormControl fullWidth margin="normal" error={!!errors.role}>
              <InputLabel>I want to join as</InputLabel>
              <Select
                name="role"
                value={formData.role}
                onChange={handleChange}
                label="I want to join as"
                className="slide-in"
              >
                <MenuItem value="buyer">Buyer</MenuItem>
                <MenuItem value="seller">Seller</MenuItem>
              </Select>
              {errors.role && (
                <Typography variant="caption" color="error" sx={{ ml: 2, mt: 0.5 }}>
                  {errors.role}
                </Typography>
              )}
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <PersonAdd />}
              className="pulse-button hover-lift"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                fontSize: '1rem',
                background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)'
              }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>

            <Box textAlign="center" mt={2}>
              <Link
                component={RouterLink}
                to="/login"
                variant="body2"
                sx={{ textDecoration: 'none' }}
              >
                Already have an account? Sign in here
              </Link>
            </Box>

            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                By signing up, you agree to our terms and conditions
              </Typography>
            </Divider>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;