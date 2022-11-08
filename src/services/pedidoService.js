import {api, requestConfig} from '../utils/config'

//publish an pedido
const publishPedido = async(data, token) => {
    const config = requestConfig("POST", data, token, false)
    try{
        const res = await fetch(api + "/pedidos", config)
            .then((res) => res.json())
            .catch((err) => err)
        return res
    } catch(error){
        console.log(error)
    }
}

//get all pedidos
const getAllPedidos = async(query) => {
    const config = requestConfig("GET", null)

    try{
        const res = await fetch(api + "/pedidos?q=" + query, config)
            .then((res) => res.json())
            .catch(err => err)
        return res
    } catch(error){
        console.log(error)
    }
}

//get user pedidos
const getUserPedidos = async(id, token) => {
    const config = requestConfig("GET", null, token)

    try{
        const res = await fetch(api + "/pedidos/users/" + id, config)
            .then((res) => res.json())
            .catch((err) => err)
        return res
    } catch(error){
        console.log(error)
    }
}
//get pedido by id
const getPedidoById = async(id, token) => {
    const config = requestConfig("GET", null, token)

    try{
        const res = await fetch(api + "/pedidos/" + id, config)
            .then((res) => res.json())
            .catch((err) => err)
        return res
    } catch(error){
        console.log(error)
    }
}

//delete pedido
const deletePedido = async(id, token) => {
    const config = requestConfig("DELETE", null, token)

    try{
        const res = await fetch(api + "/pedidos/" + id, config)
            .then((res) => res.json())
            .catch((err) => err)
        return res
    } catch(error){
        console.log(error)
    }
}

//update pedido
const updatePedido = async(data, token) => {
    const config = requestConfig("PUT", data, token)
    try{
        const res = await fetch(api + "/pedidos/" + data.id, config)
            .then((res) => res.json())
            .catch((err) => err)
        return res
    } catch(error){
        console.log(error)
    }
}

//search by local
const searchByLocal = async(query) => {
    const config = requestConfig("GET", null)
    
    try{
        const res = await fetch(api + "/pedidos/search?q=" + query, config)
            .then((res) => res.json())
            .catch((err) => err)
        return res
    } catch(error){
        console.log(error)
    }
}

const makeContact = async(data) => {
    const config = requestConfig("POST", data)

    try{
        await fetch(api + "/pedidos/contact", config)
            .then((res) => res.json())
            .catch((err) => err)
    } catch(error){
        console.log(error)
    }
}
const pedidoService = {
    publishPedido,
    getAllPedidos,
    getUserPedidos,
    deletePedido,
    getPedidoById,
    searchByLocal,
    updatePedido,
    makeContact
}

export default pedidoService