import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request
}

const getOne = async (id) => {
    const request = await axios.get(`${baseUrl}/${id}`)
    console.log(request.data.name)
    return request.data.name
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request
}

const poista = async (id) => {
    const request = await axios.delete(`${baseUrl}/${id}`)
    console.log(id)
    console.log(request)
    return request
}

export default {getAll, getOne, create, update, poista}