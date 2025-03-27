import { FC, useState } from 'react';
import { Box, TextField, IconButton, useTheme } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch } from 'react-redux';
import { websocketService } from './utils/websocket';
import { settings } from '../../constants/settings';
import { WebSocketRequest } from './utils/interface';
import { generateMessageId } from './utils/utils';
import { addMessage, updateMessage, setRunning } from '../../../../redux/slices/pokegptSlice';
import { Message } from '../../../../redux/slices/pokegptSlice';

const UserInput: FC = () => {
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const theme = useTheme();

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
        <Box 
            component="form" 
            onSubmit={handleSubmit} 
            sx={{ 
                display: 'flex',
                gap: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#343541' : '#f0f0f0',
                borderRadius: '20px',
                padding: '10px 16px',
                width: '100%',
                alignItems: 'center'
            }}
        >
            <TextField
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                variant="standard"
                multiline
                maxRows={4}
                InputProps={{
                    disableUnderline: true,
                    sx: {
                        color: 'text.primary',
                        padding: '8px 12px',
                        fontSize: '16px',
                        '&::placeholder': {
                            color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'
                        }
                    }
                }}
                sx={{
                    '& .MuiInputBase-root': {
                        backgroundColor: 'transparent'
                    }
                }}
            />
            <IconButton 
                type="submit" 
                color="primary" 
                disabled={!message.trim()}
                sx={{
                    backgroundColor: message.trim() ? '#10A37F' : 'transparent',
                    borderRadius: '12px',
                    padding: '8px',
                    minWidth: '40px',
                    height: '40px',
                    '&:hover': {
                        backgroundColor: message.trim() ? '#0E906F' : 'transparent'
                    },
                    '&.Mui-disabled': {
                        backgroundColor: 'transparent'
                    }
                }}
            >
                <SendIcon sx={{ 
                    color: message.trim() ? 'white' : theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
                    fontSize: '20px'
                }} />
            </IconButton>
        </Box>
    );
};

export default UserInput; 