const API_BASE_URL = "https://seu_dominio.com/api";

export async function loginUser(username, password) {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const url = `${API_BASE_URL}/login/`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token;

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
