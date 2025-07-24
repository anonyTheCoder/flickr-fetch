import React from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Chip,
  Paper
} from '@mui/material';
import {
  ShoppingBag,
  TrendingUp,
  Security,
  LocalShipping,
  Star,
  ArrowForward
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <ShoppingBag />,
      title: 'Vast Product Range',
      description: 'Discover thousands of gadgets and electronics from trusted sellers worldwide.'
    },
    {
      icon: <Security />,
      title: 'Secure Shopping',
      description: 'Shop with confidence using our secure payment system and buyer protection.'
    },
    {
      icon: <LocalShipping />,
      title: 'Fast Delivery',
      description: 'Get your favorite gadgets delivered quickly with our efficient shipping network.'
    },
    {
      icon: <TrendingUp />,
      title: 'Best Deals',
      description: 'Find amazing deals and discounts on the latest tech gadgets and accessories.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      avatar: 'S',
      rating: 5,
      review: 'Amazing platform! Found exactly what I was looking for at great prices.'
    },
    {
      name: 'Mike Chen',
      avatar: 'M',
      rating: 5,
      review: 'Fast delivery and excellent customer service. Highly recommended!'
    },
    {
      name: 'Emma Davis',
      avatar: 'E',
      rating: 5,
      review: 'Love the variety of products and the user-friendly interface.'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        className="hero-pattern fade-in"
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          textAlign: 'center'
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            className="scale-in"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              mb: 3
            }}
          >
            Welcome to GadgetLoop
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{
              mb: 4,
              opacity: 0.9,
              maxWidth: '600px',
              mx: 'auto',
              fontSize: { xs: '1.25rem', md: '1.5rem' }
            }}
            className="slide-in"
          >
            Your ultimate destination for the latest gadgets and electronics
          </Typography>
          <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap">
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/products')}
              className="pulse-button hover-lift"
              sx={{
                backgroundColor: 'white',
                color: 'primary.main',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)'
                }
              }}
              endIcon={<ArrowForward />}
            >
              Shop Now
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/register')}
              className="hover-lift"
              sx={{
                borderColor: 'white',
                color: 'white',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              Join as Seller
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          gutterBottom
          className="fade-in"
          sx={{ mb: 6, fontWeight: 600 }}
        >
          Why Choose GadgetLoop?
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                className="hover-lift product-card fade-in"
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  p: 2,
                  border: '1px solid rgba(25, 118, 210, 0.1)',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)'
                }}
              >
                <CardContent>
                  <Avatar
                    sx={{
                      bgcolor: 'primary.main',
                      width: 60,
                      height: 60,
                      mx: 'auto',
                      mb: 2
                    }}
                  >
                    {feature.icon}
                  </Avatar>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Statistics Section */}
      <Paper
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          py: 6
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} textAlign="center">
            <Grid item xs={12} sm={3}>
              <Typography variant="h3" color="primary" fontWeight="bold">
                10K+
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Products
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="h3" color="primary" fontWeight="bold">
                5K+
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Sellers
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="h3" color="primary" fontWeight="bold">
                50K+
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Happy Customers
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="h3" color="primary" fontWeight="bold">
                4.8
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Average Rating
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Paper>

      {/* Testimonials Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          gutterBottom
          className="fade-in"
          sx={{ mb: 6, fontWeight: 600 }}
        >
          What Our Customers Say
        </Typography>
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                className="hover-lift scale-in"
                sx={{
                  height: '100%',
                  p: 2,
                  border: '1px solid rgba(25, 118, 210, 0.1)'
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                      {testimonial.avatar}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">{testimonial.name}</Typography>
                      <Box display="flex" alignItems="center">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} sx={{ color: '#ffc107', fontSize: 16 }} />
                        ))}
                      </Box>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    "{testimonial.review}"
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: 'white',
          py: 8,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" gutterBottom>
            Ready to Start Shopping?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of satisfied customers and discover amazing deals today!
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/products')}
            className="pulse-button hover-lift"
            sx={{
              backgroundColor: 'white',
              color: 'primary.main',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)'
              }
            }}
          >
            Explore Products
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;