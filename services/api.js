import axios from 'axios'

// create singleton for axios
const service = axios.create({
  baseURL: process.env.BASE_API_URL,
  mode: 'cors',
  credentials: 'same-origin'
})

// service.interceptors.request.use((config) => {
//   if (!config.public) {
//     config.headers.Authorization = getToken()
//   }
//   return config
// })

// response interceptor
service.interceptors.response.use(
  (res) => {
    if (res.data.status === 401) {
      throw new Error(res.data)
    }
    return res.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service
