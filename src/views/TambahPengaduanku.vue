<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header pb-0">
            <div class="d-flex align-items-center">
              <p class="mb-0">Tambah Pengaduan</p>
              <hr />
            </div>
          </div>
          <div class="card-body">
            <!-- <p class="text-uppercase text-sm">Informasi Pengaduan</p> -->
            <div class="row mb-3">
              <div class="col-12">
                <label for="example-text-input" class="form-control-label"
                  >JUDUL PENGADUAN</label
                >
                <Input
                  type="text"
                  v-model="model.title"
                  v-model:errorList="errors"
                  name="title"
                  placeholder="Masukan Judul Pengaduan"
                  :class="{ 'is-invalid': errors.title }"
                  :isRequired="true"
                />
                <div v-if="errors.title" class="invalid-feedback">
                  Judul Pengaduan harus diisi!
                </div>
              </div>
              <div class="mt-3">
                <label class="form-label">DESKRIPSI</label>
                <Textarea
                  class="form-control"
                  name="body"
                  rows="3"
                  placeholder="Jelaskan Tentang Pengaduan Kamu"
                  v-model="model.body"
                  v-model:errorList="errors"
                  :class="{ 'is-invalid': errors.body }"
                  :isRequired="true"
                />
                <div v-if="errors.body" class="invalid-feedback">
                  Deskripsi harus diisi!
                </div>
              </div>
              <div class="mt-3">
                <label class="form-label">SARAN DAN SOLUSI (Opsional)</label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Jika Kamu Mempunyai Saran dan Solusi Bisa Tulis Disini Ya"
                  v-model="model.solution"
                ></textarea>
              </div>
              <div class="mt-3">
                <label for="formFile" class="form-label">BUKTI PENGADUAN</label>
                <input
                  @change="uploadFile"
                  class="form-control"
                  type="file"
                  accept="image/*"
                  id="formFile"
                />
                <p
                  v-if="errors.attachment && errors.attachmentMessage"
                  class="text-danger"
                >
                  {{ errors.attachmentMessage }}
                </p>
                <img
                  class="mt-3"
                  v-if="model.attachment"
                  :src="previewImage"
                  height="400px"
                  alt=""
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label for="example-text-input" class="form-control-label"
                  >LATITUDE
                </label>
                <input
                  v-model="model.lattitude"
                  class="form-control"
                  type="text"
                  disabled
                />
              </div>
              <div class="col-md-6">
                <label for="example-text-input" class="form-control-label"
                  >LONGITUDE</label
                >
                <input
                  v-model="model.longitude"
                  class="form-control"
                  type="text"
                  disabled
                />
              </div>
            </div>
            <div class="row mt-3 p-3">
              <LeafletMap
                v-model:lattitude="model.lattitude"
                v-model:longitude="model.longitude"
                mode="input"
              />
            </div>

            <hr class="horizontal dark" />

            <div class="d-flex align-items-center justify-content-end">
              <button
                to="/dashboard/pengaduanku"
                class="btn btn-secondary me-2"
                @click="router.push({ name: 'Pengaduanku' })"
              >
                <i class="fa fa-chevron-circle-left" aria-hidden="true"></i>
                Kembali
              </button>
              <button @click="tambahPengaduan" class="btn btn-success">
                <i class="fa fa-plus" aria-hidden="true"></i>
                Tambah
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { reactive, computed } from "vue";
import LeafletMap from "@/components/LeafletMap.vue";
import { useRouter } from "vue-router";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { createReports } from "../api.js";
import Swal from "sweetalert2";
import Input from "@/components/Input.vue";
import Textarea from "@/components/Textarea.vue";

const router = useRouter();

const model = reactive({
  title: null,
  body: null,
  solution: null,
  category: null,
  attachment: null,
  lattitude: null,
  longitude: null,
});

const errors = reactive({
  title: false,
  body: false,
  attachment: false,
});

const validateForm = () => {
  let errs = Object.keys(errors);
  let isError = false;
  errs.map((err) => {
    Object.keys(model).map((m) => {
      if (model[m] == null) {
        errors[m] = true;
        isError = true;
      } else {
        isError = false;
      }
    });
  });

  console.log(isError);
  if (isImageFile(model.attachment)) errors.attachment = false;
  else {
    errors.attachment = true;
    errors.attachmentMessage = "Tolong Sertakan Bukti Pengaduan!";
  }

  if (!isError && isImageFile(model.attachment)) return true;
  return false;
};
const previewImage = computed(() => {
  return URL.createObjectURL(model.attachment);
});

function uploadFile(e) {
  console.log("Gambar", e.target.files[0]);
  const file = e.target.files[0];

  // Reset pesan error
  errors.attachmentMessage = null;

  if (!file) {
    errors.attachment = true;
    errors.attachmentMessage = "Tolong Sertakan Bukti Pengaduan!";
    model.attachment = null;
    return;
  }

  if (!isImageFile(file)) {
    errors.attachment = true;
    errors.attachmentMessage =
      "Format file yang didukung: JPG, JPEG, PNG, WEBP, HEIC";
  } else {
    errors.attachment = false;
  }
  model.attachment = e.target.files[0];
  console.log(e.target.files);
}

function isImageFile(file) {
  const allowedExtensions = ["jpg", "jpeg", "png", "webp", "heic"];
  const extension = file?.name.split(".").pop().toLowerCase();
  return allowedExtensions.includes(extension);
}

const tambahPengaduan = async () => {
  if (!validateForm()) return;

  try {
    // Panggil fungsi createReports untuk menambahkan pengaduan
    const response = await createReports(model);
    console.log(response);
    // Handle respon dari backend
    if (response.success === "OK") {
      console.log("Pengaduan berhasil ditambahkan");
      Swal.fire({
        title: "Hore!",
        text: "Berhasil Menambahkan Laporan!",
        icon: "success",
      });
      // Redirect ke halaman Pengaduanku setelah berhasil menambahkan
      router.push({ name: "Pengaduanku" });
    } else {
      console.error("Gagal menambahkan pengaduan", response);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
</script>

<style></style>
