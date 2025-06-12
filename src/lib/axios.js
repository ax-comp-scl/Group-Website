import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken')

  if (token) {
    config.headers.Authorization = `Token ${token}`
  }

  return config
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      const requestUrl = error.config.url

      if (requestUrl === '/login' || window.location.pathname === '/login') {
        return Promise.reject(error) // rejeita a promise sem redirecionar novamente para /login
      }

      localStorage.removeItem('authToken')
      localStorage.removeItem('userData')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
