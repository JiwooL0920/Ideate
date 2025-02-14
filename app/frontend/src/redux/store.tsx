import { configureStore } from '@reduxjs/toolkit';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

// Slices
// import project1Slice from './project1Slice';

// Suppress some error message
const customizedMiddleware = getDefaultMiddleware({
    seriaalizableCheck: false,
})

export const store = configureStore({
    reducer: {
        // project1: project1Slice,
    },
    middleware: customizedMiddleware,
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
