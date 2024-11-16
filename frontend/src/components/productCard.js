import React from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  Box, 
  Rating,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

export default function ProductCard({ product, onAddToCart }) {
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="250"
          image={product.image}
          alt={product.title}
          sx={{ 
            objectFit: 'contain', 
            p: 2,
            backgroundColor: '#424242'
          }}
        />
        {product.discount && (
          <Chip
            label={`-${product.discount}%`}
            color="error"
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
            }}
          />
        )}
      </Box>

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box>
          <Typography 
            gutterBottom 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 'bold',
              height: '3em',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {product.title}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating value={product.rating?.rate || 0} precision={0.5} readOnly size="small" />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({product.rating?.count || 0})
            </Typography>
          </Box>

          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{
              height: '3em',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              mb: 2
            }}
          >
            {product.description}
          </Typography>
        </Box>

        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
              ${product.price.toFixed(2)}
            </Typography>
            <Box>
              <Tooltip title="Add to Wishlist">
                <IconButton size="small">
                  <FavoriteIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Share">
                <IconButton size="small">
                  <ShareIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              component={RouterLink}
              to={`/product/${product.id}`}
              variant="outlined"
              size="small"
              sx={{ flex: 1 }}
            >
              View Details
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => onAddToCart(product.id)}
              sx={{ flex: 1 }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}