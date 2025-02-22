import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from 'react-router-dom';

export interface itemCardProps {
  path: string;
  name: string;
  description: string;
  img: string;
}

export const ItemCard = (props: itemCardProps) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(props.path)}>
      <Card sx={{ width: 345, height: 350 }}>
        <CardActionArea sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <CardMedia
            component="img"
            sx={{
              height: 250,  // Fixed height for the image
              objectFit: 'contain', // Ensures the whole image is visible without distortion
              width: '100%', // Image takes up full width of the card
            }}
            image={props.img}
            alt={props.name}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="div">
              {props.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {props.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};
