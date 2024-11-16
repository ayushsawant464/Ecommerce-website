import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Button, Box, CircularProgress } from '@mui/material';
import ProductCard from '../components/productCard';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/heroSection';
import Header from '../components/header';
import { addToCart } from '../api/api';
export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {

  // haven't added products yet  to check visit /products
  //   try {
  //     const email = localStorage.getItem('email'); // Replace with actual email source
  // if (!email) {
  //   console.log('Please log in to add products to the cart.');
  //   return;
  // }
  //       const response = await addToCart(email, product.name, 1, product.price); // Assuming quantity is 1
  //       console.log('Cart response:', response); // Debugging log
        
  //     console.log(`${product.name} added to cart!`); // Placeholder alert for now
  //     navigate('/cart');
  //   } 
  //   catch (error) {
  //     console.error('Failed to add product to cart:', error);
  //     alert('Failed to add product to cart. Please try again.');
  //   }
    console.log(`Added product ${product.name} to cart`);
    navigate('/cart');
  };

  return (
    
    <Box>
      
    <Header/>
      <HeroSection />

      <Container sx={{ mt: 8, mb: 8 }}data-testid="browsing-section">
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
          Our Products
        </Typography>
        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={product} onAddToCart={handleAddToCart} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      <Box sx={{ bgcolor: '#424242', color: 'white', py: 3, mt: 'auto' }}data-testid="footer-section">
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                About Us
              </Typography>
              <Typography variant="body2">
                E-Shop is your one-stop destination for all your shopping needs.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body2">
                Email: support@eshop.com<br />
                Phone: (123) 456-7890
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                Follow Us
              </Typography>
              <Typography variant="body2">
                Facebook | Twitter | Instagram
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
            © 2024 E-Shop. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}