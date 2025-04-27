import { api } from '../lib/axios'

export async function getData(endpoint){
    const response = await api.get(`/${endpoint}`)
    return response.data
}

export async function postData(endpoint, data = {}){
    const response = await api.post(`/${endpoint}`, data)
    return response.data
}

export async function putData(endpoint, data = {}){
    const response = await api.put(`/${endpoint}`, data)
    return response.data
}

export async function deleteData(endpoint){
    const response = await api.delete(`/${endpoint}`)
    return response.data
}