import type { AxiosError, AxiosRequestConfig } from 'axios';
import axios from 'axios';

export const baseURL = `http://127.0.0.1:8000`

export const controllersAPI = axios.create({
    baseURL: `${baseURL}`
})

