import axios from 'axios'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

client.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response.data)
)

export default client
