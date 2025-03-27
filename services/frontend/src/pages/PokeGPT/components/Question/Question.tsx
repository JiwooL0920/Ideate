import { FC } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { Message } from '../../../../redux/slices/pokegptSlice';

interface QuestionProps {
    message: Message;
}

const Question: FC<QuestionProps> = ({ message }) => {
    const theme = useTheme();
    
    return (
        <Box sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end',
            px: 2
        }}>
            <Box sx={{
                backgroundColor: theme.palette.mode === 'dark' ? '#343541' : '#f0f0f0',
                borderRadius: '25px',
                padding: '12px 18px',
                maxWidth: '65%'
            }}>
                <Typography 
                    variant="body1" 
                    sx={{ 
                        color: 'text.primary',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                        lineHeight: 1.5,
                        fontSize: '1.1rem',
                        textAlign: 'left'
                    }}
                >
                    {message.question}
                </Typography>
            </Box>
        </Box>
    );
};

export default Question; 