import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({//createSlice Функция, которая принимает начальное состояние, объект функций-редюсеров и «имя среза»
    name: 'authorization',
    initialState: {
      userAuth: null,
      userLoading: true,

    },
    reducers: {
        auth: (state, { payload }) => {
            return {
              ...state,
              userAuth: payload,
            };
          },
        loading: (state, { payload }) => {
            return {
            ...state,
            userLoading: payload,
          
        };
      },

    }
  })

  export const { auth, loading } = authSlice.actions
  export default authSlice;