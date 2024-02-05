<script setup>
/* eslint-disable */
import { computed, defineProps } from "vue";
import { useRouter } from "vue-router";
import { Logout } from "../api";
import Swal from "sweetalert2";

const router = useRouter();

const user_name = computed(() => {
  return JSON.parse(sessionStorage.getItem("smartdistrict-userinfo"))?.name;
});

// const user_role = computed(() => {
//   return JSON.parse(sessionStorage.getItem("smartdistrict-userinfo"))?.role;
// });

const isLoggedIn = computed(() => {
  return !!user_name.value;
});

const logout = () => {
  // sweetalert
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
        router.push({ name: "Signin" });
      } else {
        console.error("Gagal Logout");
      }
    }
  });
};
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  navs: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-body-tertiary shadow-xs">
    <div class="container">
      <router-link to="/" class="navbar-brand">ADUINN</router-link>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link" exact>Home</router-link>
          </li>
        </ul>
        <ul v-if="isLoggedIn" class="navbar-nav ms-auto">
          <li class="nav-item dropdown">
            <button
              class="btn mb-0 btn-dark dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fa fa-user-circle me-1"></i> {{ user_name }}
            </button>
            <ul class="dropdown-menu dropdown-menu-light dropdown-menu-end">
              <li class="nav-item">
                <router-link to="/dashboard" class="nav-link">
                  <i class="fas fa-tachometer-alt me-1"></i> Beranda
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/dashboard/profile" class="nav-link">
                  <i class="fas fa-user-circle me-1"></i> Profile
                </router-link>
              </li>

              <li>
                <hr class="dropdown-divider" />
              </li>

              <li class="nav-item">
                <span @click="logout" class="nav-link">
                  <i class="fa fa-sign-out me-1"></i>
                  Logout
                </span>
              </li>
            </ul>
          </li>
        </ul>
        <!-- <ul class="navbar-nav">
          <li v-if="isLoggedIn" class="nav-item">
            <router-link to="/dashboard" class="nav-link">
              Dashboard
            </router-link>
          </li>
        </ul> -->
        <ul v-if="!isLoggedIn" class="navbar-nav d-flex ms-auto">
          <li class="nav-item">
            <router-link
              to="/dashboard/signin"
              class="btn btn-outline-dark me-2 mb-0"
            >
              <i class="fa fa-sign-in me-1"></i> SIGN IN
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/dashboard/signup" class="btn btn-dark mb-0">
              <i class="fa fa-user-plus me-1"></i> SIGN UP
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <transition name="slide-fade">
    <router-view />
  </transition>
</template>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
