import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import imageReducer from './slices/imageSlice';
import bookingsReducer from './slices/bookingsSlice';

export const store = configureStore({
  reducer: { imageReducer, bookingsReducer },
});

type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();
