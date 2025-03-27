import { FC, ReactNode } from 'react';
import { Box } from '@mui/material';
import Header from '../Header/Header';

interface LayoutProps {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <Box sx={{ 
            minHeight: '100vh',
            backgroundColor: 'background.default',
            color: 'text.primary'
        }}>
            <Header />
            {children}
        </Box>
    );
};

export default Layout; 