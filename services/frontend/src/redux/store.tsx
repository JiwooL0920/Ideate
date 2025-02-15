import { configureStore } from '@reduxjs/toolkit';

// Slices
// import project1Slice from './project1Slice';

export const store = configureStore({
    reducer: {
        // project1: project1Slice,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        }) 
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
