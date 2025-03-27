import { FC, useState } from 'react';
import { Box, Typography, Container, IconButton, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import UserInput from './components/UserInput/UserInput';
import Response from './components/Response/Response';
import Question from './components/Question/Question';
import { RootState } from '../../redux/store';
import { Message } from '../../redux/slices/chatAppSlice';
import PersonIcon from '@mui/icons-material/Person';

const ChatApp: FC = () => {
    const { messageIds, messages } = useSelector((state: RootState) => state.chatApp);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <Box sx={{ 
            display: 'flex', 
            height: '100vh',
            backgroundColor: '#202123',
            position: 'relative'
        }}>
            <Box sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                zIndex: 1000
            }}>
                <Avatar 
                    sx={{ 
                        bgcolor: '#5436DA',
                        width: 32,
                        height: 32,
                        cursor: 'pointer'
                    }}
                >
                    <PersonIcon />
                </Avatar>
            </Box>
            {/* Toggle Button */}
            <IconButton
                onClick={toggleSidebar}
                sx={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    color: 'white',
                    zIndex: 1200,
                    display: { xs: 'block', md: 'block' }
                }}
            >
                {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>

            {/* Sidebar */}
            <Box sx={{ 
                width: 260,
                backgroundColor: '#202123',
                borderRight: 1,
                borderColor: 'rgba(255,255,255,0.1)',
                p: 2,
                position: { xs: 'absolute', md: 'fixed' },
                height: '100%',
                left: 0,
                top: 0,
                zIndex: 1100,
                transform: {
                    xs: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
                    md: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)'
                },
                transition: 'transform 0.3s ease-in-out',
                pt: 6
            }}>
                <Typography variant="h6" sx={{ color: 'white', mb: 3 }}>
                    Chat History
                </Typography>
            </Box>

            {/* Overlay */}
            {isSidebarOpen && (
                <Box
                    onClick={toggleSidebar}
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 1050,
                        display: { xs: 'block', md: 'none' }
                    }}
                />
            )}

            {/* Main Content */}
            <Box sx={{ 
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                position: 'relative'
            }}>
                {/* Messages Container */}
                <Box sx={{ 
                    flex: 1, 
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    pt: { xs: 6, md: 6 }
                }}>
                    {messageIds.length === 0 ? (
                        <Box sx={{ 
                            display: 'flex', 
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            color: 'rgba(255,255,255,0.7)',
                            textAlign: 'center',
                            px: 2
                        }}>
                            <Typography variant="h4" sx={{ mb: 2, color: 'white' }}>
                                AI Assistant
                            </Typography>
                            <Typography variant="body1">
                                How can I help you today?
                            </Typography>
                        </Box>
                    ) : (
                        messageIds.map((messageId) => {
                            const message: Message = messages[messageId];
                            return (
                                <Box key={messageId}>
                                    <Box sx={{ 
                                        backgroundColor: '#202123',
                                        py: 3,
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}>
                                        <Box sx={{ 
                                            width: '100%',
                                            maxWidth: '48rem',
                                            px: { xs: 4, sm: 6, md: 8 }
                                        }}>
                                            <Question message={message} />
                                        </Box>
                                    </Box>
                                    <Box sx={{ 
                                        backgroundColor: '#202123',
                                        py: 3,
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}>
                                        <Box sx={{ 
                                            width: '100%',
                                            maxWidth: '48rem',
                                            px: { xs: 4, sm: 6, md: 8 }
                                        }}>
                                            <Response message={message} />
                                        </Box>
                                    </Box>
                                </Box>
                            );
                        })
                    )}
                </Box>

                {/* Input Area */}
                <Box sx={{ 
                    p: 2,
                    backgroundColor: '#202123',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <Box sx={{ 
                        width: '100%',
                        maxWidth: '48rem',
                        px: { xs: 4, sm: 6, md: 8 }
                    }}>
                        <UserInput />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ChatApp;
