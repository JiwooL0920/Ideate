import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WebSocketRequest, WebSocketResponse } from '../../pages/PokeGPT/components/UserInput/utils/interface';

// Message interface
export interface Message {
    messageId: string;
    userId: string;
    question: string;
    answer?: string;
    status: 'running' | 'completed' | 'error';
}

// State
export interface PokeGPTState {
    messageIds: string[];
    messages: Record<string, Message>;
    isRunning: boolean;
}

const initialState: PokeGPTState = {
    messageIds: [],
    messages: {},
    isRunning: false,
};

// Slice
export const pokegptSlice = createSlice({
    name: 'poke-gpt',
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<Message>) => {
            state.messageIds.push(action.payload.messageId);
            state.messages[action.payload.messageId] = action.payload;
            console.log("[Redux] Added a new message to the store, ", action.payload);
        },
        updateMessage: (state, action: PayloadAction<Message>) => {
            state.messages[action.payload.messageId] = action.payload;
            console.log("[Redux] Updated message: ", action.payload);
        },
        setRunning: (state, action: PayloadAction<boolean>) => {
            state.isRunning = action.payload;
        },
        reset: () => initialState,
    },
});

export const {
    addMessage,
    updateMessage,
    setRunning,
    reset 
} = pokegptSlice.actions;

export default pokegptSlice.reducer;
