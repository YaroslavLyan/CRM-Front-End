import { createSlice } from '@reduxjs/toolkit';

const ordersSlice = createSlice({//createSlice Функция, которая принимает начальное состояние, объект функций-редюсеров и «имя среза»
    name: 'orders',
    initialState: {
      orderDial: [],
      orderStatus: [],
      orderEvents: [],

    },//объект, представляющий начальное состояние хранилища
    reducers: {
      dial: (state, { payload }) => {
        return {
          ...state,
          orderDial: payload,
        };
      },
      status: (state, { payload }) => {
        return {
          ...state,
          orderStatus: payload,
        };
      },
      events: (state, { payload }) => {
        return {
          ...state,
          orderEvents: payload,
        };
      },

    }
  })

  export const { dial, status, events } = ordersSlice.actions
  export default ordersSlice;