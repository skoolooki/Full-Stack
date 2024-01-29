import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
  console.log("token was set")
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
}

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const addLike = (id, updatedBlog) => {
  return axios.put(`${baseUrl}/${id}`, updatedBlog)
}

export default { getAll, create, setToken, addLike }