import React from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Box, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <Card sx={{ display: 'flex', mb: 2, p: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 100, objectFit: 'contain' }}
        image={item.productId.image}
        alt={item.productId.name}
      />
      <CardContent sx={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" component="div">
            {item.productId.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            ${item.productId.price.toFixed(2)} each
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton 
              size="small" 
              onClick={() => onUpdateQuantity(item.productId._id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <RemoveIcon />
            </IconButton>
            <Typography>{item.quantity}</Typography>
            <IconButton 
              size="small" 
              onClick={() => onUpdateQuantity(item.productId._id, item.quantity + 1)}
            >
              <AddIcon />
            </IconButton>
          </Stack>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <Typography variant="h6" component="div" sx={{ mb: 2 }}>
            ${(item.quantity * item.productId.price).toFixed(2)}
          </Typography>
          <IconButton 
            color="error" 
            onClick={() => onRemove(item.productId._id)}
            sx={{ alignSelf: 'flex-end' }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}

export default CartItem;
