import axios from 'axios'
const baseUrl = '/api/users'

const register = async (username, password) => {
  const response = await axios.post(baseUrl, { username, password })
  return response.data
}

export default { register }
