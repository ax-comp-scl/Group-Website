const API_BASE_URL = 'http://127.0.0.1:8000'

export async function loginUser(username, password) {
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
      const user = data.user
      const token = data.token;
      localStorage.setItem("authToken", token); 
      localStorage.setItem("userData", JSON.stringify(user)); 

      return user;
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
  localStorage.removeItem("userData");
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
