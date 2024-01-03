<template>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div
              class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0"
            >
              <argon-alert v-if="loginFailed" class="alert alert-danger">
                Email atau Password Anda salah.
              </argon-alert>
              <div class="card card-plain">
                <div class="pb-0 card-header text-start">
                  <h4 class="font-weight-bolder">Sign In</h4>
                  <p class="mb-0">Enter your email and password to sign in</p>
                </div>
                <div class="card-body">
                  <div class="mb-3">
                    <input
                      class="form-control"
                      type="email"
                      placeholder="Email"
                      name="email"
                      size="lg"
                      v-model="email"
                    />
                  </div>
                  <div class="mb-3">
                    <input
                      class="form-control"
                      type="password"
                      placeholder="Password"
                      name="password"
                      size="lg"
                      v-model="password"
                      @keyup.enter="Signin"
                    />
                  </div>

                  <div class="text-center">
                    <argon-button
                      class="mt-4"
                      variant="gradient"
                      color="success"
                      fullWidth
                      size="lg"
                      @click="Signin"
                      :disabled="isLoading"
                      >Sign in</argon-button
                    >
                  </div>
                </div>
                <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    Don't have an account?
                    <router-link
                      to="/dashboard/signup"
                      class="text-success text-gradient font-weight-bold"
                    >
                      Sign up
                    </router-link>
                  </p>
                </div>
                <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <hr />
                  <router-link
                    to="/"
                    class="text-info text-gradient font-weight-bold"
                  >
                    Kembali
                  </router-link>
                </div>
              </div>
            </div>
            <div
              class="top-0 my-auto text-center col-6 d-lg-flex d-none h-100 pe-0 position-absolute end-0 justify-content-center flex-column"
            >
              <div
                class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                style="
                  background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg');
                  background-size: cover;
                "
              >
                <span class="mask bg-gradient-success opacity-6"></span>
                <h4
                  class="mt-5 text-white font-weight-bolder position-relative"
                >
                  "Attention is the new currency"
                </h4>
                <p class="text-white position-relative">
                  The more effortless the writing looks, the more effort the
                  writer actually put into the process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
/* eslint-disable */

// import Navbar from "@/examples/PageLayout/Navbar.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonSwitch from "@/components/ArgonSwitch.vue";
import ArgonButton from "@/components/ArgonButton.vue";
const body = document.getElementsByTagName("body")[0];
import { Login } from "../api.js";

import ArgonAlert from "../components/ArgonAlert.vue";

export default {
  name: "signin",
  components: {
    // Navbar,
    ArgonInput,
    ArgonSwitch,
    ArgonButton,
  },
  data() {
    return {
      email: null,
      password: null,
      loginFailed: false,
      isLoading: false,
    };
  },
  created() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  methods: {
    async Signin() {
      try {
        if (this.isLoading) return;
        let result = await Login(this.email, this.password);
        this.isLoading = true;
        if (result) {
          console.log("Berhasil");

          this.$router.push("/dashboard");
        } else {
          console.log("Error");
          this.loginFailed = true;
        }
        this.isLoading = false;
      } catch (error) {
        console.error("Error:", error);
        this.loginFailed = true;
        this.isLoading = false;
      }
    },
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
};
</script>
