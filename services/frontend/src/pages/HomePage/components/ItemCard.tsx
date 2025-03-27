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
      <Card sx={{ width: 345, minHeight: 350 }}>
        <CardActionArea sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <CardMedia
            component="img"
            sx={{
              height: 200,  // Slightly reduced image height
              objectFit: 'contain',
              width: '100%',
            }}
            image={props.img}
            alt={props.name}
          />
          <CardContent sx={{ flexGrow: 1, p: 3 }}>
            <Typography gutterBottom variant="h5" component="div" sx={{ mb: 1 }}>
              {props.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'left' }}>
              {props.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};
