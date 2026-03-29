import axios from 'axios'

console.log(import.meta.env.VITE_API_URL)

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'x-api-key': import.meta.env.VITE_API_KEY,
  },
})

// Interceptor — agrega el token automáticamente a cada request
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default axiosClient