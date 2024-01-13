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
              <input
                v-model="model.name"
                type="text"
                class="form-control"
                :class="{
                  'is-invalid': errors.name,
                }"
                id="validationServer03"
                aria-describedby="validationServer03Feedback"
                placeholder="Name"
              />
              <div
                id="validationServer03Feedback"
                class="invalid-feedback"
                v-if="errors.name"
              >
                Please provide a valid Name.
              </div>
              <input
                v-model="model.email"
                type="text"
                class="form-control mt-3"
                id="validationServer03"
                aria-describedby="validationServer03Feedback"
                placeholder="Email"
                :class="{
                  'is-invalid': errors.email,
                }"
              />
              <div
                id="validationServer03Feedback"
                class="invalid-feedback"
                v-if="errors.email"
              >
                Please provide a valid Email.
              </div>
              <input
                v-model="model.password"
                type="password"
                class="form-control mt-3"
                id="validationServer03"
                aria-describedby="validationServer03Feedback"
                placeholder="Password"
                :class="{
                  'is-invalid': errors.password,
                }"
              />
              <div
                id="validationServer03Feedback"
                class="invalid-feedback"
                v-if="errors.password"
              >
                Please provide a valid Password.
              </div>
              <!-- {{ errors }}
              {{ model }} -->
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <app-footer />
</template>

<script setup>
/* eslint-disable */
import { useStore } from "vuex";
import { ref, watch, onBeforeMount, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { Register } from "../api";
import Swal from "sweetalert2";
import AppFooter from "@/examples/PageLayout/Footer.vue";

const body = document.getElementsByTagName("body")[0];
const router = useRouter();
const store = useStore();

const model = ref({
  name: null,
  email: null,
  password: null,
  role: "user",
});

const errors = ref({
  name: false,
  email: false,
  password: false,
});

watch(model.value, (newModel, oldModel) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // console.log(newModel.name);

  if (newModel.name != null) {
    if (newModel.name?.length > 4) errors.value.name = false;
    else errors.value.name = true;
  }

  if (newModel.email != null) {
    if (emailRegex.test(newModel.email)) errors.value.email = false;
    else errors.value.email = true;
  }

  if (newModel.password != null) {
    if (newModel.password?.length > 4) errors.value.password = false;
    else errors.value.password = true;
  }
});

async function registerUser() {
  const name = model.value.name;
  const email = model.value.email;
  const password = model.value.password;
  const role = model.value.role;

  if (!email || !password || !name) {
    console.error("Email dan password harus diisi");
    return;
  }

  try {
    const registrationResult = await Register(email, password, name, role);
    Swal.fire({
      title: "Berhasil!",
      text: "Kamu Berhasil Registrasi!",
      icon: "success",
    });
    console.log("Registration successful:", registrationResult);
    router.push("/dashboard/signin");
  } catch (error) {
    console.error("Registration failed:", error.message);
  }
}

onBeforeMount(() => {
  store.state.hideConfigButton = true;
  store.state.showNavbar = false;
  store.state.showSidenav = false;
  store.state.showFooter = false;
  body.classList.remove("bg-gray-100");
});

onBeforeUnmount(() => {
  store.state.hideConfigButton = false;
  store.state.showNavbar = true;
  store.state.showSidenav = true;
  store.state.showFooter = true;
  body.classList.add("bg-gray-100");
});
</script>
