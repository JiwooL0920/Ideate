import { FC, useState } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { websocketService } from './utils/websocket';
import { settings } from '../../utils/settings';

const UserInput: FC = () => {
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() && !isSending) {
            setIsSending(true);
            try {
                await websocketService.send(JSON.stringify({
                    type: 'message',
                    userId: settings.DUMMY_USER_ID,
                    content: message
                }));
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