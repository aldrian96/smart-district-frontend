<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <!-- <navbar isBtn="bg-gradient-light" /> -->
      </div>
    </div>
  </div>
  <main class="main-content mt-0">
    <div
      class="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg"
      style="
        background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg');
        background-position: top;
      "
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5 text-center mx-auto">
            <h1 class="text-white mb-2 mt-5">Welcome!</h1>
            <p class="text-lead text-white">
              Buat akun dan laporkan masalah di tempatmu dengan gratis.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
        <div class="col-xl-4 col-lg-5 col-md-7 mx-auto">
          <div class="card z-index-0">
            <div class="card-header text-center pt-4">
              <h5>Register</h5>
            </div>

            <div class="card-body">
              <!-- <form role="form"> -->
              <input
                v-model="name"
                class="form-control mb-3"
                type="name"
                placeholder="name"
                aria-label="name"
              />
              <input
                v-model="email"
                class="form-control mb-3"
                type="email"
                placeholder="Email"
                aria-label="Email"
              />
              <input
                v-model="password"
                class="form-control"
                type="password"
                placeholder="Password"
                aria-label="Password"
                @keyup.enter="registerUser"
              />
              <div class="text-center d-grid gap-2">
                <button
                  @click="registerUser"
                  fullWidth
                  color="dark"
                  variant="gradient"
                  class="my-4 mb-2 btn btn-dark"
                >
                  Sign up
                </button>
              </div>
              <p class="text-sm mt-3 mb-0 text-center">
                Already have an account?
                <router-link
                  to="/dashboard/signin"
                  class="text-dark font-weight-bolder"
                  >Sign in</router-link
                >
              </p>

              <div class="px-1 pt-0 text-center card-footer px-lg-2">
                <hr />
                <router-link
                  to="/"
                  class="text-info text-gradient font-weight-bold"
                >
                  <i class="fa fa-chevron-circle-left" aria-hidden="true"></i>
                  Kembali
                </router-link>
              </div>
              <!-- </form> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <app-footer />
</template>

<script>
/* eslint-disable */
import { Register } from "../api";
import Swal from "sweetalert2";
import AppFooter from "@/examples/PageLayout/Footer.vue";
const body = document.getElementsByTagName("body")[0];

export default {
  name: "signin",
  components: {
    // Navbar,
    AppFooter,
  },
  created() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      role: "user",
    };
  },

  methods: {
    async registerUser() {
      const name = this.name;
      const email = this.email;
      const password = this.password;

      if (!email || !password || !name) {
        console.error("Email dan password harus diisi");
        return;
      }

      try {
        const registrationResult = await Register(
          email,
          password,
          name,
          this.role
        );
        Swal.fire({
          title: "Berhasil!",
          text: "Kamu Berhasil Registrasi!",
          icon: "success",
        });
        console.log("Registration successful:", registrationResult);
        this.$router.push("/dashboard/signin");
      } catch (error) {
        console.error("Registration failed:", error.message);
      }
    },
  },
};
</script>
