import type { AxiosError, AxiosRequestConfig } from 'axios';
import axios from 'axios';

export const controllersAPI = axios.create({
    baseURL: `/controllers`
})

