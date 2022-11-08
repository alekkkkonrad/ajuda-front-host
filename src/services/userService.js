import {api, requestConfig} from '../utils/config'

//get user details
const profile = async(data, token) => {
    const config = requestConfig("GET", data, token)

    try {
        const res = await fetch(api + "/users/profile", config)
        .then((res) => res.json())
        .catch((err) => err)
        
        return res
    } catch (error) {
        console.log(error)
    }
}

//get user by id
const getUserById = async(id, token) => {

    const userId = {
        id: id
    }
    const config = {
        method: "GET",
        body: JSON.stringify(userId),
        headers: {
            "Content-Type": "application/json"
        }
    }
    try{
        const res = await fetch(api + "/users/details", config)
            .then((res) => res.json())
            .catch((err) => err)
        return res
    } catch(error){
        console.log(error)
    }
}

//update profile
const updateProfile = async(data, token) => {
    const config = requestConfig("PUT", data, token, true)
    try {
        const res = await fetch(api + "/users/update", config)
                    .then((res) => res.json())
                    .catch((err) => err)
        return res
    } catch (err) {
        console.log(err)
    }
}

const userService = {
    profile,
    getUserById,
    updateProfile,
}

export default userService