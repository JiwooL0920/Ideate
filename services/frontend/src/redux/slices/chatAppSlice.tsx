import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WebSocketRequest, WebSocketResponse } from '../../pages/ChatApp/components/UserInput/utils/interface';

// Message interface
export interface Message {
    messageId: string;
    userId: string;
    question: string;
    answer?: string;
    status: 'running' | 'completed' | 'error';
}

// State
export interface ChatAppState {
    messageIds: string[];
    messages: Record<string, Message>;
    isRunning: boolean;
}

const initialState: ChatAppState = {
    messageIds: [],
    messages: {},
    isRunning: false,
};

// Slice
export const chatAppSlice = createSlice({
    name: 'chat-app',
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
} = chatAppSlice.actions;

export default chatAppSlice.reducer;
