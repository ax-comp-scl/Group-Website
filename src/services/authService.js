import { api } from '../lib/axios'

export async function loginUser(email, password) {

  try {
    const response = await api.post("/account/login", { email, password });
    if (!response.data) throw new Error("Erro na autenticação")

    const { user, token } = response.data;
    localStorage.setItem("authToken", token);
    localStorage.setItem("userData", JSON.stringify(user));

    return user;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}

export function logoutUser() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userData");
}

export function isAuthenticated() {
  return !!localStorage.getItem("authToken");
}