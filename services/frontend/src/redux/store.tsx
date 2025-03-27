import { configureStore } from '@reduxjs/toolkit';

// Slices
import sseSlice from './slices/sseSlice';
import pokegptSlice from './slices/pokegptSlice';

export const store = configureStore({
    reducer: {
        sse: sseSlice,
        pokegpt: pokegptSlice,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        }) 
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
