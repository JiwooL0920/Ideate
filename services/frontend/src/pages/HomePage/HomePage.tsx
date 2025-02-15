import React from 'react';
import routes from '../../routes';
import Grid from '@mui/material/Grid';
import { ItemCard, itemCardProps } from './components/ItemCard';

const HomePage = () => {
    return (
        <div>
            <h1>This is the Home Page</h1>
            <Grid container
                alignItems="center"
                justifyContent="center"
            >
                {routes.map((route) => {
                    var props:itemCardProps = {
                        path: route.path,
                        name: route.name,
                        description: route.description,
                        img: route.img
                    } 

                    return <ItemCard key={route.path} {...props}/>
                })}
            </Grid>
        </div>
    )
}

export default HomePage;
