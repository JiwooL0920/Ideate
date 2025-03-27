import React from 'react';
import routes from '../../constants/routes';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { ItemCard, itemCardProps } from './components/ItemCard';


const HomePage = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <h1 style={{ textAlign: 'center', marginBottom: '32px' }}>Welcome to Ideate!</h1>
        <Grid
          container
          spacing={0} // Reset the built-in spacing
          justifyContent="center"
          alignItems="center"
          sx={{
            width: '100%',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)'
            },
            gap: '48px', // This ensures EXACT same spacing horizontally and vertically
          }}
        >
          {routes.map((route) => {
            if (route.name === "HomePage") return null;
            
            const props: itemCardProps = {
              path: route.path,
              name: route.name,
              description: route.description,
              img: route.img,
            };

            return (
              <Box 
                key={route.path}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <ItemCard {...props} />
              </Box>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;
