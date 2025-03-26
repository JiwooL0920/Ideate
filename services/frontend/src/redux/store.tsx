import { configureStore } from '@reduxjs/toolkit';

// Slices
import sseSlice from './slices/sseSlice';
import chatAppSlice from './slices/chatAppSlice';

export const store = configureStore({
    reducer: {
        sse: sseSlice,
        chatApp: chatAppSlice,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        }) 
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
