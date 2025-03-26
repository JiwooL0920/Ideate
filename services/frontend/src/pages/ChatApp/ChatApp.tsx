import { FC } from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import UserInput from './components/UserInput/UserInput';
import Response from './components/Response/Response';
import Question from './components/Question/Question';
import { RootState } from '../../redux/store';
import { Message } from '../../redux/slices/chatAppSlice';

const ChatApp: FC = () => {
    const { messageIds, messages } = useSelector((state: RootState) => state.chatApp);

    return (
        <Container maxWidth="md" sx={{ height: '100vh', py: 2 }}>
            <Paper 
                elevation={3} 
                sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    borderRadius: 2
                }}
            >
                {/* Header */}
                <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                    <Typography variant="h5" component="h1">
                        Chat with AI Assistant
                    </Typography>
                </Box>

                {/* Messages Container */}
                <Box sx={{ 
                    flex: 1, 
                    overflow: 'auto',
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}>
                    {messageIds.map((messageId) => {
                        const message: Message = messages[messageId];
                        return (
                            <Box key={messageId}>
                                <Question message={message} />
                                <Response message={message} />
                            </Box>
                        );
                    })}
                </Box>

                {/* Input Area */}
                <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                    <UserInput />
                </Box>
            </Paper>
        </Container>
    );
};

export default ChatApp;
