/* eslint-disable */
import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Pengaduan from "../views/Pengaduan.vue";
import Profile from "../views/Profile.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import PengaduanKu from "../views/PengaduanKu.vue";
import TambahPengaduanku from "../views/TambahPengaduanku.vue";
import EditPengaduanku from "../views/EditPengaduanku.vue";
import DetailPengaduan from "../views/DetailPengaduan.vue";
import DashboardLayout from "../views/layout/DashboardLayout.vue";
import LandingPage from "../views/LandingPage.vue";

const routes = [
  {
    path: "/",
    name: "LandingPage",
    component: LandingPage,
  },
  {
    path: "/dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "/dashboard/",
        name: "Dashboard",
        component: Dashboard,
        meta: {
          requiredAuth: true,
          role: "admin,user,superadmin",
        },
      },
      {
        path: "pengaduan",
        name: "Pengaduan",
        component: Pengaduan,
        meta: {
          requiredAuth: true,
          role: "admin,superadmin",
        },
      },
      {
        path: "pengaduan/detail",
        name: "DetailPengaduan",
        component: DetailPengaduan,
        meta: {
          requiredAuth: true,
          role: "admin,superadmin",
        },
      },

      {
        path: "pengaduanku",
        name: "Pengaduanku",
        component: PengaduanKu,
        meta: {
          requiredAuth: true,
          role: "user,superadmin",
        },
      },
      {
        path: "pengaduanku/tambah",
        name: "Tambah",
        component: TambahPengaduanku,
        meta: {
          requiredAuth: true,
          role: "user,superadmin",
        },
      },
      {
        path: "pengaduanku/edit",
        name: "Edit",
        component: EditPengaduanku,
        meta: {
          requiredAuth: true,
          role: "user,superadmin",
        },
      },
      {
        path: "profile",
        name: "Profile",
        component: Profile,
        meta: {
          requiredAuth: true,
          role: "admin,user,superadmin",
        },
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

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem("smartdistrict-token") ?? null;
  const user_info = JSON.parse(
    sessionStorage.getItem("smartdistrict-userinfo") ?? null
  );

  if (to.name == "Signin") {
    if (token) return next({ name: "Dashboard" });
    else return next();
  }

  if (to?.meta?.requiredAuth) {
    if (token && user_info)
      if (to?.meta?.role.split(",").includes(user_info?.role)) next();
      else next(from);
    else next({ name: "Signin" });
  } else next();
});

export default router;
