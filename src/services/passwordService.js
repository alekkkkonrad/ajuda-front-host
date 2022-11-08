import {api} from '../utils/config'

const requestPassword = async(user) => {
    const config = {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try{
        const res = await fetch(api + "/users/request", config)
            .then((res) => res.json())
            .catch((err) => err)
        return res
    } catch(error){
        console.log(error)
    }
}

const setPassword = async(user) => {
    const config = {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try{
        const res = await fetch(api + "/users/reseta", config)
            .then((res) => res.json())
            .catch((err) => err)
        return res
    } catch(error){
        console.log(error)
    }
}

const passwordService = {
    requestPassword,
    setPassword
}

export default passwordService