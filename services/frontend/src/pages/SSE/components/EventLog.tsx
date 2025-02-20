import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';

const EventLog: React.FC = () => {
    const events = useSelector((state: RootState) => state.sse.events);
    const [selectedType, setSelectedType] = useState<string>('all');

    // Get unique event types
    const eventTypes = useMemo(() => {
        const types = new Set(events.map(event => event.type));
        return ['all', ...Array.from(types)];
    }, [events]);

    // Filter events based on selected type
    const filteredEvents = useMemo(() => {
        if (selectedType === 'all') return events;
        return events.filter(event => event.type === selectedType);
    }, [events, selectedType]);

    return (
        <Paper sx={{ 
            mt: 2, 
            height: 'calc(100% - 16px)', // Full height minus margin-top
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden' // Prevent Paper overflow
        }}>
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                mb: 2,
                px: 2,
                pt: 2
            }}>
                <Typography variant="h6">
                    Event Log
                </Typography>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Event Type</InputLabel>
                    <Select
                        value={selectedType}
                        label="Event Type"
                        onChange={(e) => setSelectedType(e.target.value)}
                    >
                        {eventTypes.map((type) => (
                            <MenuItem key={type} value={type}>
                                {type}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <TableContainer 
                sx={{ 
                    flexGrow: 1,
                    overflow: 'auto',
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: 'background.paper',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'grey.400',
                        borderRadius: '4px',
                    },
                }}
            >
                <Table size="small" stickyHeader sx={{ tableLayout: 'fixed' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell width="15%">Type</TableCell>
                            <TableCell width="70%">Data</TableCell>
                            <TableCell width="15%">Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredEvents.map((event, index) => (
                            <TableRow key={index} 
                                sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}
                            >
                                <TableCell 
                                    sx={{ 
                                        fontWeight: 'medium',
                                        color: event.type === 'error' ? 'error.main' : 'inherit',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}
                                >
                                    {event.type}
                                </TableCell>
                                <TableCell>
                                    <Box
                                        component="pre"
                                        sx={{
                                            m: 0,
                                            fontSize: '0.75rem',
                                            fontFamily: 'monospace',
                                            whiteSpace: 'pre-wrap',
                                            wordBreak: 'break-word',
                                            overflowX: 'hidden'
                                        }}
                                    >
                                        {event.data}
                                    </Box>
                                </TableCell>
                                <TableCell 
                                    sx={{ 
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}
                                >
                                    {new Date(event.timestamp).toLocaleTimeString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default EventLog;