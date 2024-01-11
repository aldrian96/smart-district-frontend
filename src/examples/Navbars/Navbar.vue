<template>
  <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" :class="this.$store.state.isRTL ? 'top-0 position-sticky z-index-sticky' : ''
    " v-bind="$attrs" id="navbarBlur" data-scroll="true">
    <div class="px-3 py-1 container-fluid">
      <breadcrumbs :currentPage="currentRouteName" textWhite="text-white" />

      <div class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4"
        :class="this.$store.state.isRTL ? 'px-0' : 'me-sm-4'" id="navbar">
        <div class="pe-md-3 d-flex align-items-center" :class="this.$store.state.isRTL ? 'me-md-auto' : 'ms-md-auto'">
          <!-- <div class="input-group">
            <span class="input-group-text text-body">
              <i class="fas fa-search" aria-hidden="true"></i>
            </span>
            <input
              type="text"
              class="form-control"
              :placeholder="
                this.$store.state.isRTL ? 'أكتب هنا...' : 'Type here...'
              "
            />
          </div> -->
        </div>
        <ul v-if="user_role == 'user' || user_role == 'superadmin' || user_role == 'admin'" class="navbar-nav justify-content-end">
          <li class="nav-item d-flex align-items-center">
          </li>
          <li class="px-3 nav-item dropdown d-flex align-items-center" :class="this.$store.state.isRTL ? 'ps-2' : 'pe-2'">
            <a href="#" class="p-0 nav-link text-white" :class="[showMenu ? 'show dropdown-toggle' : 'dropdown-toggle']"
              id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" @click="showMenu = !showMenu">
              <i class="cursor-pointer fa fa-user me-1"></i> {{ user_name }}
            </a>
            <ul class="px-2 py-3 dropdown-menu dropdown-menu-end me-sm-n4" :class="showMenu ? 'show' : ''"
              aria-labelledby="dropdownMenuButton">
              <li class="mb-2">
                <a class="dropdown-item border-radius-md">
                  <div class="py-1 d-flex">
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-1 text-sm font-weight-normal">
                        <router-link :to="{ name: 'Dashboard' }" class="px-0 nav-link font-weight-bold text-white">
                          <i style="color: Dodgerblue;" class="ni ni-tv-2 me-1"
                            :class="this.$store.state.isRTL ? 'ms-sm-2' : 'me-sm-2'"></i>
                          <span style="color: Dodgerblue;" class="d-sm-inline d-none">Dashboard</span>
                        </router-link>
                      </h6>
                    </div>
                  </div>
                </a>
              </li>
              <li class="mb-2">
                <a class="dropdown-item border-radius-md">
                  <div class="py-1 d-flex">
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-1 text-sm font-weight-normal">
                        <router-link :to="{ name: 'Profile' }" class="px-0 nav-link font-weight-bold text-white">
                          <i style="color: Dodgerblue;" class="fa fa-user me-1"
                            :class="this.$store.state.isRTL ? 'ms-sm-2' : 'me-sm-2'"></i>
                          <span style="color: Dodgerblue;" class="d-sm-inline d-none">Profile</span>
                        </router-link>
                      </h6>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li class="mb-2">
                <a class="dropdown-item border-radius-md">
                  <div class="py-1 d-flex">
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-1 text-sm font-weight-normal">
                        <span @click="logout" class="nav-link">
                          <i class="fa fa-sign-out me-1"></i>
                          Logout
                        </span>
                      </h6>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </li>
          <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
            <a href="#" @click="toggleSidebar" class="p-0 nav-link text-white" id="iconNavbarSidenav">
              <div class="sidenav-toggler-inner">
                <i class="sidenav-toggler-line bg-white"></i>
                <i class="sidenav-toggler-line bg-white"></i>
                <i class="sidenav-toggler-line bg-white"></i>
              </div>
            </a>
          </li>
        </ul>
        <ul v-if="user_role == undefined" class="navbar-nav justify-content-end">
          <li class="nav-item d-flex align-items-center">
            <router-link :to="{ name: 'Signin' }" class="px-0 nav-link font-weight-bold text-white">
              <i style="color: Dodgerblue;" class="fa fa-sign-in me-1"
                :class="this.$store.state.isRTL ? 'ms-sm-2' : 'me-sm-2'"></i>
              <span style="color: Dodgerblue;" class="d-sm-inline d-none">Sign In</span>
            </router-link>
          </li>
          <li class="px-3 nav-item d-flex align-items-center">
            <router-link :to="{ name: 'Signup' }" class="px-0 nav-link font-weight-bold text-white">
              <i style="color: Dodgerblue;" class="fa fa-user-plus me-1"
                :class="this.$store.state.isRTL ? 'ms-sm-2' : 'me-sm-2'"></i>
              <span style="color: Dodgerblue;" class="d-sm-inline d-none">Sign Up</span>
            </router-link>
          </li>
          <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
            <a href="#" @click="toggleSidebar" class="p-0 nav-link text-white" id="iconNavbarSidenav">
              <div class="sidenav-toggler-inner">
                <i class="sidenav-toggler-line bg-white"></i>
                <i class="sidenav-toggler-line bg-white"></i>
                <i class="sidenav-toggler-line bg-white"></i>
              </div>
            </a>
          </li>
        </ul>
        <!-- <li class="px-3 nav-item d-flex align-items-center">
            <a class="p-0 nav-link text-white" @click="toggleConfigurator">
              <i class="cursor-pointer fa fa-cog fixed-plugin-button-nav"></i>
            </a>
          </li> -->
      </div>
    </div>
  </nav>
</template>
<script>
/* eslint-disable */
import Breadcrumbs from "../Breadcrumbs.vue";
import { mapMutations, mapActions } from "vuex";
import Swal from "sweetalert2";
import { Logout } from "../../api";

export default {
  name: "navbar",
  data() {
    return {
      showMenu: false,
    };
  },
  props: ["minNav", "textWhite"],
  created() {
    this.minNav;
  },
  methods: {
    ...mapMutations(["navbarMinimize", "toggleConfigurator"]),
    ...mapActions(["toggleSidebarColor"]),

    toggleSidebar() {
      this.toggleSidebarColor("bg-white");
      this.navbarMinimize();
    },
    logout() {
      Swal.fire({
        title: "Konfirmasi",
        text: "Apakah Anda Ingin Logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Logout",
        cancelButtonText: "Batal",
        // customClass: {
        //   confirmButton: "btn btn-success btn-sm", // Mengubah warna tombol "Ya, Logout"
        //   cancelButton: "btn btn-danger btn-sm", // Mengubah warna tombol "Batal"
        // },
      }).then(async (result) => {
        if (result.isConfirmed) {
          // Lakukan proses logout
          let hasil = await Logout();
          if (hasil) {
            // Redirect ke halaman login atau halaman awal setelah logout
            // location.reload(true);
            this.$router.push({ name: "Signin" });
          } else {
            console.error("Gagal Logout");
          }
        }
      });

    }
  },
  components: {
    Breadcrumbs,
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
    user_name() {
      return JSON.parse(sessionStorage.getItem("smartdistrict-userinfo"))?.name;
    },
    user_role() {
      return JSON.parse(sessionStorage.getItem("smartdistrict-userinfo"))?.role;
    },
  },
};
</script>
