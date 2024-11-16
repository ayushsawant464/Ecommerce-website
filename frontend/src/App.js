import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Home from './pages/home';
import ProductPage from './pages/productPage';
import Cart from './pages/cart';
import Login from './pages/login';
import Register from './pages/register';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem('token');
  return isLoggedIn ? children : <Navigate to="/cart" />;
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#424242',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

export default function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/cart" element={
                      <ProtectedRoute>
              <Cart />
              </ProtectedRoute>

          } />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}