import { FC } from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Message } from '../../../../redux/slices/chatAppSlice';

interface QuestionProps {
    message: Message;
}

const Question: FC<QuestionProps> = ({ message }) => {
    return (
        <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            mb: 2,
            justifyContent: 'flex-end'
        }}>
            <Box sx={{ 
                maxWidth: '70%',
                backgroundColor: 'primary.main',
                color: 'white',
                borderRadius: '20px 20px 0 20px',
                padding: '12px 16px',
                position: 'relative',
                wordBreak: 'break-word',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                    width: '20px',
                    height: '20px',
                    backgroundColor: 'primary.main',
                    borderRadius: '20px 0 0 0',
                }
            }}>
                <Typography 
                    variant="body1" 
                    sx={{ 
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                        textAlign: 'left'
                    }}
                >
                    {message.question}
                </Typography>
            </Box>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
                <PersonIcon />
            </Avatar>
        </Box>
    );
};

export default Question; 