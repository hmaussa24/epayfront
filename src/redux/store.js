import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import compraSlice from './slices/compraSlice'

export const store = configureStore({
  reducer: {
    usuario: userReducer,
    dataCompra: compraSlice,
  },
})