import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Grid, CircularProgress, Box } from '@mui/material';
import { getProducts, addToCart } from '../api/api'; 
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';

export default function ProductPage() {
  const token = localStorage.getItem('token')
  const email = localStorage.getItem('email')
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const buttons = (
    <React.Fragment>
  <Grid item xs={6} sx={{ textAlign: 'right' }}>
  <Button onClick={handleClick({ vertical: 'bottom', horizontal: 'right' })}>
    Bottom-Right
  </Button>
</Grid>
</React.Fragment>
  )
  // Fetch products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts(); 
        setProducts(response); 
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false); 
      }
    };
    fetchProducts();
  }, []); 
  const navigate  = useNavigate()

  const handleAddToCart = async (product) => {
    try {
      const email = localStorage.getItem('email'); 
  if (!email) {
    console.log('Please log in to add products to the cart.');
    return;
  }
        const response = await addToCart(email, product.name, 1, product.price); 
        console.log('Cart response:', response); 
        
      console.log(`${product.name} added to cart!`);
      navigate('/cart');
    } 
    catch (error) {
      console.error('Failed to add product to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (products.length === 0) {
    return (
      <Container>
        <Typography variant="h5" component="h1">No Products Available</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }} data-testid="product-page">
      <Typography variant="h3" gutterBottom>
        All Products
      </Typography>
      <Grid container spacing={4}>

        {products.map(product => (
          <Grid item xs={12} md={4} key={product._id}>
            <Box border={1} borderRadius={2} p={2} display="flex" flexDirection="column" justifyContent="space-between">
              <img
                src={product.imageUrl} 
                alt={product.name} 
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
              <Typography variant="h6" component="h2" mt={2} gutterBottom>
                {product.name} 
              </Typography>
              <Typography variant="body2" paragraph>
                {product.description} 
              </Typography>
              <Typography variant="h5" color="primary" gutterBottom>

                ${typeof product.price === 'number' ? product.price.toFixed(2) : 'N/A'}
              </Typography>
             
              {(token && email ) && <Button variant="contained" color="primary" onClick={() => handleAddToCart(product)} data-testid="add-to-cart-button">
                Add to Cart
              </Button>}
              
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
