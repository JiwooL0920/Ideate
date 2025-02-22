import React from 'react';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setStreaming } from '../../../redux/slices/sseSlice';
import { RootState } from '../../../redux/store';

const SubmitButton: React.FC = () => {
    const dispatch = useDispatch();
    const isStreaming = useSelector((state: RootState) => state.sse.isStreaming);

    const handleClick = () => {
        if (isStreaming) {
            dispatch(setStreaming(false));
        } else {
            dispatch(setStreaming(true));
        }
    };

    return (
        <Button 
            variant="contained" 
            onClick={handleClick}
            color={isStreaming ? "error" : "primary"}
        >
            {isStreaming ? "Stop" : "Start"} Stream
        </Button>
    );
};

export default SubmitButton;