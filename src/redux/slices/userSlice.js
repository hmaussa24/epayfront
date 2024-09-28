import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: 0,
  documento: "",
  nombres: "",
  email: "",
  celular: ""
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id
      state.celular = action.payload.celular
      state.documento = action.payload.documento
      state.email = action.payload.email
      state.nombres = action.payload.nombres
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions

export default userSlice.reducer