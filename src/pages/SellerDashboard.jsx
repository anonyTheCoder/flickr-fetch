import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Avatar,
  Tabs,
  Tab
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Visibility,
  TrendingUp,
  ShoppingBag,
  AttachMoney,
  People,
  PhotoCamera
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SellerDashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', severity: 'success' });
  
  const [productForm, setProductForm] = useState({
    productName: '',
    description: '',
    price: '',
    category: '',
    brand: '',
    quantity: ''
  });

  // Mock products data
  const mockProducts = [
    {
      _id: '1',
      productName: 'Wireless Bluetooth Headphones',
      price: 79.99,
      category: 'Electronics',
      brand: 'TechBrand',
      quantity: 25,
      status: 'active',
      orders: 15,
      revenue: 1199.85,
      createdAt: '2024-01-15'
    },
    {
      _id: '2',
      productName: 'Gaming Mechanical Keyboard',
      price: 129.99,
      category: 'Gaming',
      brand: 'GamePro',
      quantity: 18,
      status: 'active',
      orders: 8,
      revenue: 1039.92,
      createdAt: '2024-01-10'
    },
    {
      _id: '3',
      productName: 'USB-C Fast Charger',
      price: 24.99,
      category: 'Accessories',
      brand: 'ChargeFast',
      quantity: 0,
      status: 'out_of_stock',
      orders: 32,
      revenue: 799.68,
      createdAt: '2024-01-05'
    }
  ];

  const mockStats = {
    totalProducts: 3,
    totalOrders: 55,
    totalRevenue: 3039.45,
    activeProducts: 2
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (user?.role !== 'seller') {
      navigate('/');
      return;
    }
    
    // In real implementation, fetch seller's products
    setProducts(mockProducts);
  }, [isAuthenticated, user, navigate]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      productName: '',
      description: '',
      price: '',
      category: '',
      brand: '',
      quantity: ''
    });
    setOpenDialog(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      productName: product.productName,
      description: product.description || '',
      price: product.price.toString(),
      category: product.category,
      brand: product.brand,
      quantity: product.quantity.toString()
    });
    setOpenDialog(true);
  };

  const handleSaveProduct = async () => {
    try {
      // In real implementation, make API call to save/update product
      console.log('Saving product:', productForm);
      
      setAlert({
        show: true,
        message: editingProduct ? 'Product updated successfully!' : 'Product added successfully!',
        severity: 'success'
      });
      
      setOpenDialog(false);
      // Refresh products list
    } catch (error) {
      setAlert({
        show: true,
        message: 'Failed to save product',
        severity: 'error'
      });
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        // In real implementation, make API call to delete product
        console.log('Deleting product:', productId);
        
        setAlert({
          show: true,
          message: 'Product deleted successfully!',
          severity: 'success'
        });
        
        // Remove from local state
        setProducts(prev => prev.filter(p => p._id !== productId));
      } catch (error) {
        setAlert({
          show: true,
          message: 'Failed to delete product',
          severity: 'error'
        });
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'out_of_stock': return 'error';
      case 'inactive': return 'default';
      default: return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active': return 'Active';
      case 'out_of_stock': return 'Out of Stock';
      case 'inactive': return 'Inactive';
      default: return status;
    }
  };

  if (!isAuthenticated || user?.role !== 'seller') {
    return null;
  }

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );

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

      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
            Seller Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome back, {user?.firstName}! Manage your products and track your sales.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddProduct}
          size="large"
          className="pulse-button hover-lift"
        >
          Add Product
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="hover-lift">
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="h6">
                    Total Products
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {mockStats.totalProducts}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                  <ShoppingBag />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card className="hover-lift">
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="h6">
                    Total Orders
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {mockStats.totalOrders}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'success.main', width: 56, height: 56 }}>
                  <People />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card className="hover-lift">
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="h6">
                    Total Revenue
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    ${mockStats.totalRevenue.toFixed(2)}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'warning.main', width: 56, height: 56 }}>
                  <AttachMoney />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card className="hover-lift">
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="h6">
                    Active Products
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {mockStats.activeProducts}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'info.main', width: 56, height: 56 }}>
                  <TrendingUp />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Paper elevation={2} sx={{ borderRadius: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange} sx={{ px: 3 }}>
            <Tab label="Products" />
            <Tab label="Orders" />
            <Tab label="Analytics" />
          </Tabs>
        </Box>

        {/* Products Tab */}
        <TabPanel value={activeTab} index={0}>
          <Box sx={{ px: 3 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Orders</TableCell>
                    <TableCell>Revenue</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product._id} hover>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Avatar variant="rounded" sx={{ width: 40, height: 40 }}>
                            {product.productName.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2" fontWeight="bold">
                              {product.productName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {product.brand}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>${product.price}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>
                        <Chip 
                          label={getStatusLabel(product.status)}
                          color={getStatusColor(product.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{product.orders}</TableCell>
                      <TableCell>${product.revenue.toFixed(2)}</TableCell>
                      <TableCell>
                        <Box display="flex" gap={1}>
                          <IconButton 
                            size="small" 
                            onClick={() => navigate(`/product/${product._id}`)}
                            className="hover-lift"
                          >
                            <Visibility />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            onClick={() => handleEditProduct(product)}
                            className="hover-lift"
                          >
                            <Edit />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            color="error"
                            onClick={() => handleDeleteProduct(product._id)}
                            className="hover-lift"
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </TabPanel>

        {/* Orders Tab */}
        <TabPanel value={activeTab} index={1}>
          <Box sx={{ px: 3, textAlign: 'center', py: 8 }}>
            <ShoppingBag sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Orders management coming soon
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Track and manage your product orders here
            </Typography>
          </Box>
        </TabPanel>

        {/* Analytics Tab */}
        <TabPanel value={activeTab} index={2}>
          <Box sx={{ px: 3, textAlign: 'center', py: 8 }}>
            <TrendingUp sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Analytics dashboard coming soon
            </Typography>
            <Typography variant="body2" color="text.secondary">
              View detailed analytics and insights about your sales
            </Typography>
          </Box>
        </TabPanel>
      </Paper>

      {/* Add/Edit Product Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editingProduct ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Product Name"
                name="productName"
                value={productForm.productName}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                name="description"
                value={productForm.description}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={productForm.price}
                onChange={handleInputChange}
                required
                InputProps={{ startAdornment: '$' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                type="number"
                value={productForm.quantity}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={productForm.category}
                  onChange={handleInputChange}
                  label="Category"
                >
                  <MenuItem value="Electronics">Electronics</MenuItem>
                  <MenuItem value="Gaming">Gaming</MenuItem>
                  <MenuItem value="Accessories">Accessories</MenuItem>
                  <MenuItem value="Smartphones">Smartphones</MenuItem>
                  <MenuItem value="Laptops">Laptops</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Brand"
                name="brand"
                value={productForm.brand}
                onChange={handleInputChange}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenDialog(false)}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSaveProduct}
            className="pulse-button"
          >
            {editingProduct ? 'Update' : 'Add'} Product
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SellerDashboard;