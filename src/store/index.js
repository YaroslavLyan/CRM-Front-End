import { configureStore } from '@reduxjs/toolkit';

import ordersSlice from '../reducers/reducer';
import authSlice from '../reducers/auth-reducer'


export const store = configureStore({//configureStore - function create and setting
    reducer: {
      auth: authSlice.reducer,
      orders: ordersSlice.reducer
    }
    
})