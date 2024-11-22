import axios from "axios";

const API_BASE_URL = 'http://127.0.0.1:8000'

export function getUser(){
    return JSON.parse(localStorage.getItem("userData"));
}

export async function getUserByUsername(username, config){
    const response = await axios.get(`${API_BASE_URL}/account/username/${username}`, config)
    return response.data
}