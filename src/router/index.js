import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Pengaduan from "../views/Pengaduan.vue";
import Profile from "../views/Profile.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import Home from "../views/Home.vue";
import PengaduanKu from "../views/PengaduanKu.vue";
import TambahPengaduan from "../views/TambahPengaduan.vue";
import DashboardLayout from "../views/layout/DashboardLayout.vue";

const routes = [
  { path: '/', Name: "home", component: Home, },
  {
    path: "/dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "/dashboard/",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "pengaduan",
        name: "Pengaduan",
        component: Pengaduan,
      },
      {
        path: "pengaduanku",
        name: "Pengaduanku",
        component: PengaduanKu,
      },
      {
        path: "pengaduanku/tambah",
        name: "Tambah",
        component: TambahPengaduan,
      },

      {
        path: "profile",
        name: "Profile",
        component: Profile,
      },
      {
        path: "signin",
        name: "Signin",
        component: Signin,
      },
      {
        path: "signup",
        name: "Signup",
        component: Signup,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
