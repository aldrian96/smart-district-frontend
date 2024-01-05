/* eslint-disable */
import axios from "axios";

// Pengaduan
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

// Pengaduanku
export async function GetReportById(reportId) {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/reports/${reportId}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem(
            "smartdistrict-token"
          )}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// Login
export async function Login(email, password) {
  try {
    const response = await axios.post("http://localhost:8000/api/auth/login", {
      email,
      password,
    });
    sessionStorage.setItem("smartdistrict-token", response.data.token);
    sessionStorage.setItem(
      "smartdistrict-userinfo",
      JSON.stringify(response.data.user_info)
    );
    return true;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}

// Logout
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
    sessionStorage.removeItem("smartdistrict-userinfo");
    return true;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}

// Register
export async function Register(email, password, name, role) {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/auth/register",
      {
        email,
        password,
        role,
        name,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}
