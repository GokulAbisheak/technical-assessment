import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Set token from localStorage if it exists
const token = localStorage.getItem('admin_token')
if (token) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

instance.interceptors.response.use(
  (response) => {
    if (response.config.url === '/login' && response.data.token) {
      const token = response.data.token
      localStorage.setItem('admin_token', token)
      instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    return response
  },
  (error) => {
    console.error('API Error:', error.response || error.message)
    return Promise.reject(error)
  }
)

export default instance
