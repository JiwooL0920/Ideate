import { FC } from 'react';
import { Box, Typography, Container } from '@mui/material';
import UserInput from './components/UserInput/UserInput';

const ChatApp: FC = () => {
    return (
        <Container maxWidth="md">
            <Box sx={{ py: 4 }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Chat App
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" paragraph>
                    Start a conversation with our AI assistant
                </Typography>
                <UserInput />
            </Box>
        </Container>
    );
};

export default ChatApp;
