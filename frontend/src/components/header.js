import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, TextField, InputAdornment } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token'); 

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   // Implement search functionality here
  //   console.log('Searching for:', searchQuery);
  // };

  const handleCartClick = () => {
    if (isLoggedIn) {
      navigate('/cart');
    } else {
      navigate('/login');
    }
  };

  return (
    <AppBar position="static" color="default" elevation={0} data-testid="navbar-section">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          <RouterLink to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            E-Shop
          </RouterLink>
        </Typography>
        {/* <Box 
        component="form" onSubmit={handleSearch} 
        sx={{ flexGrow: 1, mx: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box> */}
        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          <Button color="inherit" onClick={handleCartClick} data-testid="cart-button">
            <ShoppingCartIcon />
          </Button>
          {isLoggedIn ? (
            <Button color="inherit" onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('email');
              navigate('/login');
            }} data-testid="logout">
              Logout
            </Button>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/login" data-testid="login">
                Login
              </Button>
              <Button color="inherit" component={RouterLink} to="/register" data-testid="register">
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}