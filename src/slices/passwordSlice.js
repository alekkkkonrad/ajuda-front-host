import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import passwordService from '../services/passwordService'

const initialState = {
    error: false,
    success: false,
    loading: false,
    message: null
}

export const requestPassword = createAsyncThunk(
    "user/Npass",
    async(user) => {
        const data = await passwordService.requestPassword(user)
        return data
    }
)

export const setPassword = createAsyncThunk(
    "user/Spass",
    async(user) => {
        const data = await passwordService.setPassword(user)
        return data
    }
)

export const passwordSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(requestPassword.pending, (state) => {
                state.error = false
                state.success = false
                state.loading = true
                state.message = "Email enviado!!!"
            })
            .addCase(requestPassword.fulfilled, (state) => {
                state.error = null
                state.success = true
                state.loading = null
                state.message = "Email enviado!!!"
            })
            .addCase(requestPassword.rejected, (state) => {
                state.error = true
                state.success = false
                state.loading = false
                state.message = 'Erro ao enviar email... Tente novamente mais tarde.'
            })
    }
})

export const {resetMessage} = passwordSlice.actions
export default passwordSlice.reducer