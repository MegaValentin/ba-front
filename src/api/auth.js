import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true
})

export const  loginRequest = (credentials) => axiosInstance.post("/auth/login", credentials)


export const getMeRequest = () => axiosInstance.get('/auth/me')
