import axios from 'axios'

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
    // create an axios instance
const service = axios.create({
    baseURL: 'https://66fa7e4dafc569e13a9bf7f9.mockapi.io/api', // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 10000 // request timeout
})

export default service