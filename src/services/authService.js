

// const API_BASE_URL = "https://seu_dominio.com/api";
// const API_BASE_URL = "http://127.0.0.1:8000/api/";
// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_BASE_URL = 'http://127.0.0.1:8000'

export async function loginUser(username, password) {
  // const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL
  const url = `${API_BASE_URL}/account/login`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username, password}),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      console.log(token)
      localStorage.setItem("authToken", token);

      return token;
    } else {
      const errorData = await response.json();
      throw new Error(errorData || "Erro de autenticação");
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}

export function logoutUser() {
  const token = localStorage.getItem("authToken");
  console.log(token)
  localStorage.removeItem("authToken");
}

export function isAuthenticated() {
  return !!localStorage.getItem("authToken");
}

// Método para obter dados protegidos
export async function fetchProtectedData(endpoint) {
  const token = localStorage.getItem("authToken");
  const url = `${API_BASE_URL}/${endpoint}`;

  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Erro ao acessar o endpoint protegido");
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}
