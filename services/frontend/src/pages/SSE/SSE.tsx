import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import * as sseSlice from '../../redux/slices/sseSlice';
import { Grid, Box } from '@mui/material';
import NumberDropdown from './components/NumberDropdown';
import SubmitButton from './components/SubmitButton';
import TimesTable from './components/TimesTable';
import EventLog from './components/EventLog';

const SSE = () => {
    const sseState = useSelector<RootState, sseSlice.SSEState>(state => state.sse);
    const dispatch = useDispatch();

    const handleNumberChange = (newValue: number) => {
        dispatch(sseSlice.setNumber(newValue));
    };

    return (
        <Box sx={{ 
            p: 2, 
            height: 'calc(100vh - 32px)', // Full viewport height minus padding
            display: 'flex',
            flexDirection: 'column'
        }}>
            <h1>This is SSE page</h1>
            <Box sx={{ mb: 2 }}>
                <NumberDropdown 
                    value={sseState.number}
                    onChange={handleNumberChange}
                />
                <SubmitButton />
            </Box>
            <Grid 
                container 
                spacing={2} 
                sx={{ 
                    flexGrow: 1,
                    minHeight: 0 // Important for proper flex behavior
                }}
            >
                <Grid item xs={12} md={6}>
                    <TimesTable />
                </Grid>
                <Grid item xs={12} md={6} sx={{ height: '100%' }}>
                    <Box sx={{ height: '100%' }}>
                        <EventLog />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SSE;
