import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import userReducer from './slices/userSlice'
import pedidoReducer from './slices/pedidoSlice'
import passwordReducer from './slices/passwordSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        pedido: pedidoReducer,
        password: passwordReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })
})