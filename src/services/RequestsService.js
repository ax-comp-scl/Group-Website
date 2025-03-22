import { api } from '../lib/axios'

const API_BASE_URL = 'http://127.0.0.1:8000'

export async function getData(endpoint){
    const response = await api.get(`${API_BASE_URL}/${endpoint}`)
    return response.data
}

export async function postData(endpoint, data = {}){
    const response = await api.post(`${API_BASE_URL}/${endpoint}`, data)
    return response.data
}

export async function putData(endpoint, data = {}){
    const response = await api.put(`${API_BASE_URL}/${endpoint}`, data)
    return response.data
}

export async function deleteData(endpoint){
    const response = await api.delete(`${API_BASE_URL}/${endpoint}`)
    return response.data
}