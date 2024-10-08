import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    compra: {
        id: null,
        descripcion: null,
        valor: null,
        usuarioId: null,
        sesionId: null,
        createdAt: null
    },
    validate: null, 
    token: null,
}

export const compraSlice = createSlice({
    name: 'compra',
    initialState,
    reducers: {
        setCompra: (state, action) => {
            state.compra = action.payload.compra;
            state.validate = action.payload.validate
            state.token = action.payload.token
        },
    },
})

export const { setCompra} = compraSlice.actions

export default compraSlice.reducer