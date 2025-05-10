import { api } from '../lib/axios'

export function getUser() {
  return JSON.parse(localStorage.getItem('userData'))
}

export async function getAllUsers() {
  const response = await api.get('/account/')
  return response.data
}

export async function getUserByUsername(username) {
  const response = await api.get(`/account/username/${username}`)
  return response.data
}
