import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Divider,
  Alert,
  CircularProgress,
  Chip
} from '@mui/material';
import {
  Person,
  Edit,
  Save,
  Cancel,
  PhotoCamera,
  ShoppingBag,
  Favorite,
  Settings
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', severity: 'success' });
  
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || ''
      });
    }
  }, [user, isAuthenticated, navigate]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const result = await updateProfile({
        firstName: profileData.firstName,
        lastName: profileData.lastName
      });
      
      if (result.success) {
        setAlert({
          show: true,
          message: 'Profile updated successfully!',
          severity: 'success'
        });
        setEditMode(false);
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
        message: 'Failed to update profile',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || ''
      });
    }
    setEditMode(false);
  };

  // Mock order history
  const mockOrders = [
    {
      id: 'ORD001',
      date: '2024-01-15',
      total: 1299,
      status: 'Delivered',
      items: ['iPhone 15 Pro', 'Wireless Charger']
    },
    {
      id: 'ORD002',
      date: '2024-01-10',
      total: 89,
      status: 'Shipped',
      items: ['Phone Case', 'Screen Protector']
    }
  ];

  if (!isAuthenticated) {
    return null;
  }

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );

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

      <Grid container spacing={4}>
        {/* Profile Sidebar */}
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3, textAlign: 'center' }}>
            <Box position="relative" display="inline-block" mb={2}>
              <Avatar
                src={user?.profileImage}
                alt={user?.firstName}
                sx={{ 
                  width: 120, 
                  height: 120, 
                  mx: 'auto',
                  fontSize: '3rem'
                }}
              >
                {user?.firstName?.charAt(0).toUpperCase()}
              </Avatar>
              <Button
                variant="contained"
                size="small"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  minWidth: 0,
                  width: 36,
                  height: 36,
                  borderRadius: '50%'
                }}
              >
                <PhotoCamera fontSize="small" />
              </Button>
            </Box>
            
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {user?.firstName} {user?.lastName}
            </Typography>
            
            <Chip 
              label={user?.role?.toUpperCase() || 'BUYER'} 
              color="primary" 
              sx={{ mb: 2 }}
            />
            
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {user?.email}
            </Typography>
            
            <Typography variant="body2" color="text.secondary">
              Member since {new Date().getFullYear()}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box textAlign="left">
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Quick Stats
              </Typography>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2">Orders:</Typography>
                <Typography variant="body2" fontWeight="bold">12</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2">Wishlist:</Typography>
                <Typography variant="body2" fontWeight="bold">5</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2">Reviews:</Typography>
                <Typography variant="body2" fontWeight="bold">8</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Profile Content */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ borderRadius: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs 
                value={activeTab} 
                onChange={handleTabChange}
                sx={{ px: 3 }}
              >
                <Tab icon={<Person />} label="Profile Info" />
                <Tab icon={<ShoppingBag />} label="Order History" />
                <Tab icon={<Favorite />} label="Wishlist" />
                <Tab icon={<Settings />} label="Settings" />
              </Tabs>
            </Box>

            {/* Profile Info Tab */}
            <TabPanel value={activeTab} index={0}>
              <Box sx={{ px: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                  <Typography variant="h6" fontWeight="bold">
                    Personal Information
                  </Typography>
                  {!editMode ? (
                    <Button
                      startIcon={<Edit />}
                      onClick={() => setEditMode(true)}
                      className="hover-lift"
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <Box display="flex" gap={1}>
                      <Button
                        startIcon={<Save />}
                        variant="contained"
                        onClick={handleSave}
                        disabled={loading}
                        className="pulse-button"
                      >
                        {loading ? <CircularProgress size={20} /> : 'Save'}
                      </Button>
                      <Button
                        startIcon={<Cancel />}
                        onClick={handleCancel}
                        disabled={loading}
                      >
                        Cancel
                      </Button>
                    </Box>
                  )}
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      variant={editMode ? "outlined" : "filled"}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      variant={editMode ? "outlined" : "filled"}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      value={profileData.email}
                      disabled={true}
                      variant="filled"
                      helperText="Email cannot be changed here. Contact support if needed."
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      variant={editMode ? "outlined" : "filled"}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      name="address"
                      value={profileData.address}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      variant={editMode ? "outlined" : "filled"}
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>

            {/* Order History Tab */}
            <TabPanel value={activeTab} index={1}>
              <Box sx={{ px: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Order History
                </Typography>
                {mockOrders.map((order) => (
                  <Card key={order.id} sx={{ mb: 2, border: '1px solid #e0e0e0' }}>
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="start">
                        <Box>
                          <Typography variant="h6" fontWeight="bold">
                            Order #{order.id}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Placed on {new Date(order.date).toLocaleDateString()}
                          </Typography>
                          <Typography variant="body2">
                            Items: {order.items.join(', ')}
                          </Typography>
                        </Box>
                        <Box textAlign="right">
                          <Chip 
                            label={order.status} 
                            color={order.status === 'Delivered' ? 'success' : 'primary'}
                            sx={{ mb: 1 }}
                          />
                          <Typography variant="h6" fontWeight="bold">
                            ${order.total}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </TabPanel>

            {/* Wishlist Tab */}
            <TabPanel value={activeTab} index={2}>
              <Box sx={{ px: 3, textAlign: 'center', py: 8 }}>
                <Favorite sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Your wishlist is empty
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Start browsing products and add them to your wishlist
                </Typography>
                <Button 
                  variant="contained" 
                  onClick={() => navigate('/products')}
                  className="hover-lift"
                >
                  Browse Products
                </Button>
              </Box>
            </TabPanel>

            {/* Settings Tab */}
            <TabPanel value={activeTab} index={3}>
              <Box sx={{ px: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Account Settings
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                          Change Password
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          Update your password to keep your account secure
                        </Typography>
                        <Button variant="outlined">
                          Change Password
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                          Email Preferences
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          Manage your email notification settings
                        </Typography>
                        <Button variant="outlined">
                          Manage Preferences
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;