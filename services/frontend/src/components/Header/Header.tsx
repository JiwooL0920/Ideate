import { FC } from 'react';
import { Box, IconButton, Avatar } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import PersonIcon from '@mui/icons-material/Person';
import { useColorMode } from '../../theme/ThemeContext';

const Header: FC = () => {
    const { toggleColorMode, mode } = useColorMode();

    return (
        <Box sx={{
            position: 'fixed',
            top: 16,
            right: 16,
            zIndex: 1000,
            display: 'flex',
            gap: 1,
            alignItems: 'center'
        }}>
            <IconButton onClick={toggleColorMode} sx={{ color: 'text.primary' }}>
                {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <Avatar 
                sx={{ 
                    bgcolor: '#5436DA',
                    width: 32,
                    height: 32,
                    cursor: 'pointer'
                }}
            >
                <PersonIcon />
            </Avatar>
        </Box>
    );
};

export default Header; 