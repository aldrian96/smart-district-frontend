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

export async function GetAllReport() {
  try {
    const response = await axios.get("http://localhost:8000/api/reports-all");
    return response.data.results;
  } catch (error) {
    console.error("Error:", error);
    console.error("Details:", error.response);
    return [];
  }
}
export async function GetDetailsHeadless(id) {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/reports-all/${id}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error:", error);
    console.error("Details:", error.response);
    return [];
  }
}

// Pengaduanku
export async function GetReportsByUser() {
  try {
    // Retrieve the logged-in user's ID from sessionStorage
    // const userId = JSON.parse(sessionStorage.getItem("smartdistrict-userinfo"))
    //   .id;

    // Fetch reports based on the logged-in user's ID
    const response = await axios.get(
      `http://localhost:8000/api/reports/user/`, //${userId}
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem(
            "smartdistrict-token"
          )}`,
        },
      }
    );

    return response.data.results;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

// Detail Pengaduan
export async function GetReportsDetailById(id) {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/reports/${id}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem(
            "smartdistrict-token"
          )}`,
        },
      }
    );
    return response.data.results;
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

// Create Laporan
export async function createReports(data) {
  try {
    const form = new FormData();
    Object.keys(data).map((item) => {
      form.append(item, data[item]);
    });
    const response = await axios.post(
      "http://localhost:8000/api/reports",
      form,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem(
            "smartdistrict-token"
          )}`,
        },
      }
    );

    // Jika respons berhasil, kembalikan data laporan yang baru dibuat
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
export async function createComment(data) {
  try {
    const form = new FormData();
    Object.keys(data).map((item) => {
      form.append(item, data[item]);
    });
    const response = await axios.post(
      "http://localhost:8000/api/comments",
      form,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem(
            "smartdistrict-token"
          )}`,
        },
      }
    );

    // Jika respons berhasil, kembalikan data laporan yang baru dibuat
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// Update
export async function updateReports(id, data) {
  try {
    const form = new FormData();
    Object.keys(data).map((item) => {
      if (item == "attachment" && !data[item]) {
        return;
      }
      form.append(item, data[item]);
    });
    const response = await axios.post(
      `http://localhost:8000/api/reports/${id}`,
      form,
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
    return false;
  }
}
