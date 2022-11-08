import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import pedidoService from '../services/pedidoService'

const initialState ={
    pedidos: [],
    pedido: {},
    error: false,
    success: false,
    loading: false,
    message: null
}

// publish pedido
export const publishPedido = createAsyncThunk(
    "pedido/publish",
    async(pedido, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token

        const data = await pedidoService.publishPedido(pedido, token)
        //check errors
        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0])
        }
        return data
    }
)

//get all pedidos
export const getAllPedidos = createAsyncThunk(
    "pedido/getall",
    async(skip) => {
        const data = await pedidoService.getAllPedidos(skip)
        return data
    }
)

//get user pedidos
export const getUserPedidos = createAsyncThunk(
    "pedidos/getuser",
    async(id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token
        const data = await pedidoService.getUserPedidos(id, token)
        return data
    }
)
//get pedido by id
export const getPedidoById = createAsyncThunk(
    "pedido/id",
    async(id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token
        const data = await pedidoService.getPedidoById(id, token)
        return data
    }
)

//delete pedido
export const deletePedido = createAsyncThunk(
    "pedido/delete",
    async(id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token
        const data = await pedidoService.deletePedido(id, token)
        
        //check for errors
        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0])
        }
        return data
    }
)

//update pedido
export const updatePedido = createAsyncThunk(
    "pedido/update",
    async(pedido, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token
        const data = await pedidoService.updatePedido(pedido, token)
        //check for errors
        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0])
        }
        return data
    }
)

//search pedido by local
export const searchByLocal = createAsyncThunk(
    "pedido/searchlocal",
    async(query) => {
        const data = await pedidoService.searchByLocal(query)

        return data
    }
)

export const makeContact = createAsyncThunk(
    "pedido/makeContact",
    async(users) => {
        await pedidoService.makeContact(users)
    }
)
export const pedidoSlice = createSlice({
    name: "pedido",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(publishPedido.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(publishPedido.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.error = null
                state.pedido = action.payload
                state.pedidos.unshift(state.pedido)
                state.message = "Pedido publicado com sucesso!!!"
            })
            .addCase(publishPedido.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.pedido = {}
            })
            .addCase(getAllPedidos.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(getAllPedidos.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.error = null
                state.pedidos = action.payload
            })
            .addCase(getUserPedidos.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(getUserPedidos.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.error = null
                state.pedidos = action.payload
            })
            .addCase(deletePedido.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.pedido = {}
            })
            .addCase(deletePedido.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(deletePedido.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.error = null
                state.pedidos = state.pedidos.filter((pedido) => {
                    return pedido._id !== action.payload.id
                })
                state.message = action.payload.message
            })
            .addCase(getPedidoById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.pedido = {}
            })
            .addCase(getPedidoById.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(getPedidoById.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.error = null
                state.pedido = action.payload
                state.message = action.payload.message
            })
            .addCase(updatePedido.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.pedido = {}
            })
            .addCase(updatePedido.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(updatePedido.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.error = null
                state.pedido = action.payload
                state.message = 'Pedido atualizado com sucesso'
            })
            .addCase(searchByLocal.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(searchByLocal.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.error = null
                state.pedidos = action.payload
            })
            .addCase(makeContact.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(makeContact.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.error = null
            })
    }
})

export const {resetMessage} = pedidoSlice.actions
export default pedidoSlice.reducer