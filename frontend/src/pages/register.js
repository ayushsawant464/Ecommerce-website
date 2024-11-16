

import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Link,
  Paper,
  InputAdornment,
  IconButton,
  Alert,
  ThemeProvider,
  createTheme,
} from '@mui/material'
import { Visibility, VisibilityOff, Email, Lock, ArrowBack } from '@mui/icons-material'
import { registerUser } from '../api/api' 
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
})

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/'

  useEffect(() => {

    const token = localStorage.getItem('token')
    if (token) {
      navigate(from, { replace: true })
    }
    
  }, [navigate, from])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match")
      setLoading(false)
      return
    }

    try {
      await registerUser({ email: formData.email, password: formData.password })
      const token = 'dummy_token' 
      localStorage.setItem('token', token)
      const email = formData.email
      localStorage.setItem('email',email)
        navigate(from, { replace: true })
    } catch (err) {
      setError('Registration failed. Please try again.')
    } finally {
      setLoading(false) 
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleReturnToPreviousPage = () => {
    navigate(-1)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="xs"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          py: 8,
          backgroundColor: 'background.default',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            borderRadius: 2,
            bgcolor: 'background.paper',
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: 'primary.main',
            }}
          >
            Create Account
          </Typography>

          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
            Please fill in your details to register
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" aria-label="toggle password visibility">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end" aria-label="toggle confirm password visibility">
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                borderRadius: '50px',
                textTransform: 'none',
                fontSize: '1.1rem',
              }}
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Link
                  href="/login"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 600,
                  }}
                >
                  Sign In
                </Link>
              </Typography>
            </Box>

            <Button
              startIcon={<ArrowBack />}
              onClick={handleReturnToPreviousPage}
              fullWidth
              sx={{
                mt: 2,
                py: 1,
                borderRadius: '50px',
                textTransform: 'none',
                fontSize: '1rem',
              }}
            >
              Return to Previous Page
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  )
}