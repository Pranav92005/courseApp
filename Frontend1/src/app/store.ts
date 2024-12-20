import { configureStore } from '@reduxjs/toolkit';
import dataSlice from '../features/dataSlice';


// Configure the Redux store
export const store = configureStore({
  reducer: {
    data: dataSlice,         // Renamed reducer keys for clarity
    
  },
});

// Define TypeScript types for the store
export type RootState = ReturnType<typeof store.getState>; // Type for the entire Redux state
export type AppDispatch = typeof store.dispatch;          // Type for the Redux dispatch function

export default store;
