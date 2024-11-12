import axios from "axios"

const API_BASE_URL = 'http://127.0.0.1:8000'

export async function getData(endpoint){
    const response = await axios.get(`${API_BASE_URL}/${endpoint}`)
    return response.data
}

export async function postData(endpoint, data, config = {}){
    const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data, config)
    return response.data
}

export async function putData(endpoint, data, config = {}){
    const response = await axios.put(`${API_BASE_URL}/${endpoint}`, data, config)
    return response.data
}

export async function deleteData(endpoint, config){
    const response = await axios.delete(`${API_BASE_URL}/${endpoint}`, config)
    return response.data
}