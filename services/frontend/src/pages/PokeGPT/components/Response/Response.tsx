import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { Message } from '../../../../redux/slices/pokegptSlice';

interface ResponseProps {
    message: Message;
}

const Response: FC<ResponseProps> = ({ message }) => {
    return (
        <Box sx={{ 
            display: 'flex',
            justifyContent: 'flex-start',
            px: 2
        }}>
            <Box sx={{
                backgroundColor: '#343541',
                borderRadius: '25px',
                padding: '12px 18px',
                maxWidth: '65%'
            }}>
                <Typography 
                    variant="body1"
                    sx={{ 
                        color: 'white',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                        lineHeight: 1.5,
                        fontSize: '1.1rem',
                        textAlign: 'left'
                    }}
                >
                    {message.answer || 'Thinking...'}
                </Typography>
            </Box>
        </Box>
    );
};

export default Response;
