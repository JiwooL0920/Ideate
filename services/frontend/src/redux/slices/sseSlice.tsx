import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { controllersAPI } from '../../constants/requests';
import { TimesTableRequest, TimesTableResponse, SSEEvent } from '../interfaces/sse';
import { statusBuilder } from '../utils/slices';


// State
export interface SSEState {
    number: number;
    isStreaming: boolean;
    events: SSEEvent[];
}

const initialState: SSEState = {
    number: 5,
    isStreaming: false,
    events: [],
};


// Slice
export const sseSlice = createSlice({
    name: 'sse-slice',
    initialState,
    reducers: {
        reset: () => initialState,
        setNumber: (state, action: PayloadAction<number>) => {
            state.number = action.payload;
            state.events = []; // Clear events when number changes
        },
        setStreaming: (state, action: PayloadAction<boolean>) => {
            state.isStreaming = action.payload;
        },
        addEvent: (state, action: PayloadAction<SSEEvent>) => {
            state.events.push(action.payload);
        },
        clearEvents: (state) => {
            state.events = [];
        }
    },
    extraReducers: (builder) => {
        statusBuilder(builder, getTimesTable, { field: 'timesTable' });
    }
});


// API Calls
const sseBaseURL = '/sse';

export const getTimesTable = createAsyncThunk<
    TimesTableResponse,
    TimesTableRequest 
>('sse', async (req: TimesTableRequest) => {
    const response = await controllersAPI.get(`${sseBaseURL}/${req.number}`);
    return response.data;
});


export const { 
    setNumber,
    setStreaming,
    addEvent,
    clearEvents
} = sseSlice.actions;

export default sseSlice.reducer;
