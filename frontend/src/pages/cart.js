import React, { useState, useEffect } from 'react'
import { 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Box, 
  Button, 
  IconButton, 
  CircularProgress 
} from '@mui/material'
import { styled } from '@mui/system'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import CloseIcon from '@mui/icons-material/Close'
import { Link as RouterLink } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements , useStripe, useElements, CardElement} from '@stripe/react-stripe-js'

const STRIPE_PUBLIC_KEY='pk_test_51QL6AwLghG2tL7v5VTE5mhHiW1qB3DJeuQIfQogOiTXnkNYQ30H79t14hfwPq6gbh9L0Qo9jqSbnYaBuvTRKNTNY00UwmHuKbO' || process.env.STRIPE_PUBLIC_KEY
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY)

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
    padding: theme.spacing(3),
  },
}))

const ProductImage = styled('img')({
  width: '60px',
  height: '60px',
  objectFit: 'cover',
})

const QuantityButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.5),
}))

const RemoveButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.5),
}))

const CheckoutButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  width: '100%',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}))

function CartContent() {
  const stripe = useStripe()
  const elements = useElements()
  const [cart, setCart] = useState([])
  const [shipping, setShipping] = useState(5.00)
  const [clientSecret, setClientSecret] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(true)
  const email = localStorage.getItem('email')

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/cart/user?email=${email}`)
        console.log(email)
        if (!response.ok) {
          throw new Error('Failed to fetch cart')
        }
        const cartData = await response.json()
        setCart(cartData.items) 
      } catch (err) {
        setErrorMessage('Failed to load cart. Please try again.')
        console.error('Error fetching cart:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCart()
  }, [email])

  const clearCart = () => {
    setCart({ items: [] });
  };


  const calculateSubtotal = cart.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0
    const quantity = parseInt(item.quantity, 10) || 0
    return sum + (price * quantity)
  }, 0)

  const subtotal = calculateSubtotal
  const total = subtotal + shipping

  const handleQuantityChange = (id, change) => {
    setCart(cart.map(item => 
      item._id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
    ))
  }

  const handleRemoveItem = (id) => {
    setCart(cart.filter(item => item._id !== id))
  }

  const handleCheckout = async (event) => {
    event.preventDefault();
  
    setIsProcessing(true);
  
    if (!stripe || !elements) {
      setErrorMessage('Stripe has not loaded yet. Please try again.');
      setIsProcessing(false);
      return;
    }
  
    const cardElement = elements.getElement(CardElement);

    const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });
  
    if (paymentMethodError) {
      setErrorMessage(paymentMethodError.message || 'Error creating payment method.');
      setIsProcessing(false);
      return;
    }
  
    const response = await fetch(`http://localhost:5000/api/cart/create-payment-intent?email=${email}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({  }),
    });
  
    const data = await response.json();
  
    if (data.clientSecret) {

      const confirmResponse = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: paymentMethod.id,
      });
  
      if (confirmResponse.error) {
        setErrorMessage(confirmResponse.error.message || 'Payment confirmation failed.');
      } else {
        console.log('Payment successful:', confirmResponse.paymentIntent);
        alert('Payment successful!');
        clearCart()
      }
    } else {
      setErrorMessage(data.error || 'Payment creation failed. Please try again.');
    }
  
    setIsProcessing(false);
  };
  

  return (
    <Container maxWidth="lg" data-testid="checkout-container">
      <StyledPaper elevation={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              Shopping Cart
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {cart.length} items
            </Typography>
            {loading ? (
              <CircularProgress />
            ) : (
              cart.map((item) => (
                <Box key={item._id} sx={{ display: 'flex', py: 2, borderBottom: '1px solid #eee' }}>
                  <ProductImage src={item.image || 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'} alt={item.name} />
                  <Box sx={{ flex: 1, ml: 2 }}>
                    <Typography variant="subtitle1">{item.name}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <QuantityButton size="small" onClick={() => handleQuantityChange(item._id, -1)}>
                        <RemoveIcon fontSize="small" />
                      </QuantityButton>
                      <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                      <QuantityButton size="small" onClick={() => handleQuantityChange(item._id, 1)}>
                        <AddIcon fontSize="small" />
                      </QuantityButton>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <Typography variant="subtitle1">€{(item.price * item.quantity).toFixed(2)}</Typography>
                    <RemoveButton onClick={() => handleRemoveItem(item._id)}>
                      <CloseIcon fontSize="small" />
                    </RemoveButton>
                  </Box>
                </Box>
              ))
            )}
            <Button component={RouterLink} to="/" sx={{ mt: 2 }}>
              ← Back to shop
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Summary
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1">ITEMS {cart.length}</Typography>
              <Typography variant="subtitle1">€{subtotal.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1">TOTAL PRICE</Typography>
              <Typography variant="h6">€{total.toFixed(2)}</Typography>
            </Box>
            <form onSubmit={handleCheckout}>
              <CardElement />
              {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
              <Button 
                type="submit" 
                variant="contained"
                // disabled={isProcessing || !stripe || !elements || !clientSecret}
                color="primary"
                fullWidth
                data-testid="checkout-button"
              >
                {isProcessing ? <CircularProgress size={24} /> : `Checkout - €${total.toFixed(2)}`}
              </Button>
            </form>
          </Grid>
        </Grid>
      </StyledPaper>
    </Container>
  )
}

export default function Cart() {
  return (
    <Elements stripe={stripePromise}>
      <CartContent />
    </Elements>
  )
}
