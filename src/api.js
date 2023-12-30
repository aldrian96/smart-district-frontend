/* eslint-disable */
import axios from "axios";
export async function GetReports() {
  try {
    const response = await axios.get("http://localhost:8000/api/reports", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(
          "smartdistrict-token"
        )}`,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function Login(email, password) {
  try {
    const response = await axios.post("http://localhost:8000/api/auth/login", {
      email,
      password,
    });

    sessionStorage.setItem("smartdistrict-token", response.data.token);
    return true;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}

export async function Logout() {
  try {
    // Panggil endpoint logout pada server
    await axios.post("http://localhost:8000/api/auth/logout", null, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(
          "smartdistrict-token"
        )}`,
      },
    });

    // Hapus token autentikasi dari sessionStorage
    sessionStorage.removeItem("smartdistrict-token");
    return true;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}
