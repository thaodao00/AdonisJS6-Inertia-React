// src/store.js
import { configureStore, createStore } from '@reduxjs/toolkit';
import counterSlice from '~/reducers/counterSlice';

const store = createStoreHook({
    reducer: {
        counter: counterSlice,
      },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
