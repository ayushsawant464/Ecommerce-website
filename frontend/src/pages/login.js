
import { useNavigate, useLocation } from 'react-router-dom'
import { Visibility, VisibilityOff, Email, Lock, ArrowBack } from '@mui/icons-material'

import React, { useState } from 'react'
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
import { loginUser } from '../api/api'
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

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleReturnToPreviousPage = () => {
    navigate(-1)
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const token = await loginUser(formData)
      localStorage.setItem('token', token)
      const email = formData.email
      localStorage.setItem('email', email)
      navigate('/')
      console.log('Login successful')
    } catch (err) {
      setError('Login failed. Please check your credentials.')
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
        data-testid="login-page"
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
            Welcome Back
          </Typography>

          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
            Please sign in to continue
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
              data-testid="email"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
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
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              data-testid="password"
            
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
              data-testid="sign-in"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Link href="/forgot-password" variant="body2" sx={{ color: 'primary.main' }}>
                Forgot password?
              </Link>
            </Box>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Link
                  href="/register"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 600,
                  }}
                >
                  Sign Up
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