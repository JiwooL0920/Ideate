import { FC, useState } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch } from 'react-redux';
import { websocketService } from './utils/websocket';
import { settings } from '../../constants/settings';
import { WebSocketRequest } from './utils/interface';
import { generateMessageId } from './utils/utils';
import { addMessage, updateMessage, setRunning } from '../../../../redux/slices/chatAppSlice';
import { Message } from '../../../../redux/slices/chatAppSlice';

const UserInput: FC = () => {
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            const messageId = generateMessageId();
            const request: WebSocketRequest = {
                messageId,
                userId: settings.DUMMY_USER_ID,
                question: message
            };

            // Add pending message to store
            const pendingMessage: Message = {
                ...request,
                status: 'running'
            };
            dispatch(addMessage(pendingMessage));
            dispatch(setRunning(true));

            try {
                await websocketService.send(request, (response: Message) => {
                    dispatch(updateMessage(response));
                    dispatch(setRunning(false));
                });
                setMessage('');
            } catch (error) {
                console.error('Error sending message:', error);
                dispatch(setRunning(false));
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
            />
            <IconButton 
                type="submit" 
                color="primary" 
                disabled={!message.trim()}
            >
                <SendIcon />
            </IconButton>
        </Box>
    );
};

export default UserInput; 