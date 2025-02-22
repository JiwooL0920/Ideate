import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { controllersAPI } from '../../constants/requests';
import { TimesTableRequest, TimesTableResponse } from '../interfaces/sse';
import { statusBuilder } from '../utils/slices';


// State
export interface SSEState {
    number: number;
    isStreaming: boolean;
}

const initialState: SSEState = {
    number: 5,
    isStreaming: false,
};


// Slice
export const sseSlice = createSlice({
    name: 'sse-slice',
    initialState,
    reducers: {
        reset: () => initialState,
        setNumber: (state, action: PayloadAction<number>) => {
            state.number = action.payload;
        },
        setStreaming: (state, action: PayloadAction<boolean>) => {
            state.isStreaming = action.payload;
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
    setStreaming
} = sseSlice.actions;

export default sseSlice.reducer;
