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
import hapusPengaduanku from "../views/hapusPengaduanku.vue";
import editAdmin from "../views/editAdmin.vue";
import DetailPengaduan from "../views/DetailPengaduan.vue";
import DetailPengaduanku from "../views/DetailPengaduanku.vue";
import DashboardLayout from "../views/layout/DashboardLayout.vue";
import LandingPage from "../views/LandingPage.vue";
import Thread from "../views/Thread.vue";
import NavbarHome from "../components/NavbarHome.vue";

const routes = [
  {
    path: "/",
    component: NavbarHome,
    name: "Home",
    children: [
      {
        path: "/",
        component: LandingPage,
        name: "LandingPage",
      },
      {
        path: "/Thread/:id",
        name: "Thread",
        component: Thread,
      },
    ],
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
        path: "pengaduan/detail/:id",
        name: "DetailPengaduan",
        component: DetailPengaduan,
        meta: {
          requiredAuth: true,
          role: "admin,superadmin",
        },
      },
      {
        path: "pengaduan/edit/:id",
        name: "editAdmin",
        component: editAdmin,
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
        name: "tambahPengaduanku",
        component: TambahPengaduanku,
        meta: {
          requiredAuth: true,
          role: "user,superadmin",
        },
      },
      {
        path: "pengaduanku/edit/:id",
        name: "editPengaduanku",
        component: EditPengaduanku,
        meta: {
          requiredAuth: true,
          role: "user,superadmin",
        },
      },
      {
        path: "pengaduanku/edit/:id",
        name: "hapusPengaduanku",
        component: hapusPengaduanku,
        meta: {
          requiredAuth: true,
          role: "user,superadmin",
        },
      },

      {
        path: "pengaduanku/detail/:id",
        name: "detailPengaduanku",
        component: DetailPengaduanku,
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
      // {
      //   path: "/",
      //   name: "Home",
      //   component: Home,
      // },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  // console.log("Navigating to:", to.name);
  // console.log("Navigating from:", from.name);
  const token = sessionStorage.getItem("smartdistrict-token") ?? null;
  const user_info = JSON.parse(
    sessionStorage.getItem("smartdistrict-userinfo") ?? null
  );

  if (to.name == "Signin") {
    if (token) return next({ name: "Dashboard" });
    else return next();
  }

  if (to?.meta?.requiredAuth) {
    if (token && user_info) {
      if (to?.meta?.role.split(",").includes(user_info?.role)) {
        next();
      } else {
        console.error("Unauthorized access. Role mismatch.");
        next(from);
      }
    } else {
      console.error("Unauthorized access. User not authenticated.");
      next({ name: "Signin" });
    }
  } else {
    next();
  }
});

router.afterEach((to, from) => {
  // Handle default route or invalid route
  if (!to.name) {
    console.error("Invalid route. Redirecting to default route.");
    router.push({ name: "Dashboard" });
  }
});

export default router;
