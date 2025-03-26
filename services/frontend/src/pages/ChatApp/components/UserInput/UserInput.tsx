import { FC, useState } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { websocketService } from './utils/websocket';
import { settings } from '../../constants/settings';
import { WebSocketRequest } from './utils/interface';
import { generateMessageId } from './utils/utils';

const UserInput: FC = () => {
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() && !isSending) {
            setIsSending(true);
            try {
                const request: WebSocketRequest = {
                    messageId: generateMessageId(),
                    userId: settings.DUMMY_USER_ID,
                    question: message
                };
                await websocketService.send(request);
                setMessage('');
            } catch (error) {
                console.error('Error sending message:', error);
            } finally {
                setIsSending(false);
            }
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 1 }}>
            <TextField
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                variant="outlined"
                disabled={isSending}
            />
            <IconButton 
                type="submit" 
                color="primary" 
                disabled={!message.trim() || isSending}
            >
                <SendIcon />
            </IconButton>
        </Box>
    );
};

export default UserInput; 