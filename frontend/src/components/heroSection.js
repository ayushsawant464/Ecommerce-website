import React, { useState, useEffect } from 'react';
import { IconButton, Box, Typography, Button, Container } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const HeroSection = () => {
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
      title: 'Summer Collection 2024',
      subtitle: 'Discover the latest trends and styles',
      cta: 'Shop Now'
    },
    {
      image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04',
      title: 'New Arrivals',
      subtitle: 'Be the first to shop our newest items',
      cta: 'View Collection'
    },
    {
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
      title: 'Special Offers',
      subtitle: 'Up to 50% off on selected items',
      cta: 'Shop Deals'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '600px', overflow: 'hidden' }}data-testid="hero-section">
      {slides.map((slide, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: currentSlide === index ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.7)',
            }}
          />
          <Container
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              color: 'white',
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              }}
            >
              {slide.title}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              }}
            >
              {slide.subtitle}
            </Typography>
           
          </Container>
        </Box>
      ))}
      
      <IconButton
        onClick={handlePrevSlide}
        sx={{
          position: 'absolute',
          left: 20,
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(255,255,255,0.3)',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.5)',
          },
        }}
      >
        <ArrowBackIos sx={{ color: 'white' }} />
      </IconButton>
      
      <IconButton
        onClick={handleNextSlide}
        sx={{
          position: 'absolute',
          right: 20,
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(255,255,255,0.3)',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.5)',
          },
        }}
      >
        <ArrowForwardIos sx={{ color: 'white' }} />
      </IconButton>
      
      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1,
        }}
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: currentSlide === index ? 'white' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
            }}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default HeroSection;