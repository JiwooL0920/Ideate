import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import * as sseSlice from '../../redux/slices/sseSlice';
import NumberDropdown from './components/NumberDropdown';
import SubmitButton from './components/SubmitButton';
import TimesTable from './components/TimesTable';
import { Container, Box, Typography } from '@mui/material';

const SSE = () => {
    const sseState = useSelector<RootState, sseSlice.SSEState>(state => state.sse);
    const dispatch = useDispatch();

    const handleNumberChange = (newValue: number) => {
        dispatch(sseSlice.setNumber(newValue));
    };

    return (
        <Container maxWidth="xl">
            <Box sx={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pt: 4,
                gap: 2
            }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    This is SSE page
                </Typography>
                <NumberDropdown 
                    value={sseState.number}
                    onChange={handleNumberChange}
                />
                <SubmitButton />
                <TimesTable />
            </Box>
        </Container>
    );
};

export default SSE;
