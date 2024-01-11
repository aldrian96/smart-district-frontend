<template>
  <div class="collapse navbar-collapse w-auto h-auto h-100" id="sidenav-collapse-main">
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-item url="/dashboard" navText="Dashboard">
          <template v-slot:icon>
            <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li v-if="user_role == 'admin' || user_role == 'superadmin'" class="nav-item">
        <sidenav-item url="/dashboard/pengaduan" navText="Pengaduan">
          <template v-slot:icon>
            <i class="ni ni-archive-2 text-warning text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li v-if="user_role == 'user' || user_role == 'superadmin'" class="nav-item">
        <sidenav-item url="/dashboard/pengaduanku" navText="Pengaduanku">
          <template v-slot:icon>
            <i class="ni ni-archive-2 text-warning text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="mt-3 nav-item">
        <h6 class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6">
          ACCOUNT PAGES
        </h6>
      </li>
      <li class="nav-item">
        <sidenav-item url="/dashboard/profile" navText="Profile">
          <template v-slot:icon>
            <i class="ni ni-single-02 text-dark text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
    </ul>
  </div>
  <div class="pt-3 mx-3 mt-3 sidenav-footer d-flex justify-content-center">
    <argon-button class="mt-12" variant="gradient" color="danger" size="lg" @click="logout"><i
        class="fa fa-sign-out me-1"></i>
      Logout
    </argon-button>
  </div>
</template>
<script setup>
/* eslint-disable */
import { computed } from "vue";
import { Logout } from "../../api";
import { useRouter } from "vue-router";
import SidenavItem from "./SidenavItem.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import Swal from "sweetalert2";
const router = useRouter();

const user_role = computed(() => {
  return JSON.parse(sessionStorage.getItem("smartdistrict-userinfo"))?.role;
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
</script>