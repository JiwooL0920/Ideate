import { FC } from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { Message } from '../../../../redux/slices/chatAppSlice';

interface ResponseProps {
    message: Message;
}

const Response: FC<ResponseProps> = ({ message }) => {
    return (
        <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            mb: 2,
            justifyContent: 'flex-start'
        }}>
            <Avatar sx={{ bgcolor: 'secondary.main' }}>
                <SmartToyIcon />
            </Avatar>
            <Box sx={{ 
                maxWidth: '70%',
                backgroundColor: 'grey.100',
                color: 'text.primary',
                borderRadius: '20px 20px 20px 0',
                padding: '12px 16px',
                position: 'relative',
                wordBreak: 'break-word',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    width: '20px',
                    height: '20px',
                    backgroundColor: 'grey.100',
                    borderRadius: '0 20px 20px 0',
                }
            }}>
                <Typography 
                    variant="body1"
                    sx={{ 
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word'
                    }}
                >
                    {message.answer || 'Thinking...'}
                </Typography>
            </Box>
        </Box>
    );
};

export default Response;
