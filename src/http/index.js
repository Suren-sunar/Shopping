import axios from "axios"
import { config, getStorage } from "../lib"
import { toast } from "react-toastify"

const http = axios.create({
    baseURL: config('api_url'),
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})

http.interceptors.request.use(req => {
    const token = getStorage(config('token_name'))

    if(token) {
        req.headers.authorization = `Bearer ${token}`
    }

    return req
}, err => Promise.reject(err))

http.interceptors.response.use(resp => {
    if('success' in resp.data) {
        toast.success(resp.data.success)
    }

    return resp
}, err => {
    if('error' in err.response.data) {
        toast.error(err.response.data.error)
    }

    return Promise.reject(err)
})

export default http