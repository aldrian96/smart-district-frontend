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
                <input
                  class="form-control"
                  type="text"
                  v-model="model.title"
                  placeholder="Masukan Judul Pengaduan"
                  :class="{ 'is-invalid': errors.title }"
                />
                <div v-if="errors.title" class="invalid-feedback">
                  Judul Pengaduan harus diisi!
                </div>
              </div>
              <div class="mt-3">
                <label class="form-label">DESKRIPSI</label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Jelaskan Tentang Pengaduan Kamu"
                  v-model="model.body"
                  :class="{ 'is-invalid': errors.body }"
                ></textarea>
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
                  :src="
                    model.attachment
                      ? previewImage
                      : 'http://localhost:8000/api/image?attachment_path=' +
                        model?.attachment_path
                  "
                  height="400px"
                  alt=""
                />
              </div>
            </div>
            <div class="row mt-3">
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
                v-model:longitude="model.longitude"
                v-model:lattitude="model.lattitude"
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
              <button @click="updatePengaduan" class="btn btn-success">
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                Update
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
import { onMounted, reactive, watch, computed } from "vue";
import LeafletMap from "@/components/LeafletMap.vue";
import { useRouter, useRoute } from "vue-router";
import { updateReports, GetDetailsHeadless } from "../api.js";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import Swal from "sweetalert2";

const router = useRouter();
const route = useRoute();

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

const validateForm = (newModel) => {
  // console.log(newModel);
  if (newModel.title != null) {
    if (newModel.title?.length > 0) errors.title = false;
    else errors.title = true;
  }
  if (newModel.body != null) {
    if (newModel.body?.length > 0) errors.body = false;
    else errors.body = true;
  }
  if (newModel.attachment != null) {
    if (isImageFile(model.attachment)) errors.attachment = false;
    else errors.attachment = true;
  }
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

watch(model, validateForm, { deep: true });

function isImageFile(file) {
  const allowedExtensions = ["jpg", "jpeg", "png", "webp", "heic"];
  const extension = file.name.split(".").pop().toLowerCase();
  return allowedExtensions.includes(extension);
}

const updatePengaduan = async () => {
  // Validasi
  validateForm(model);
  if (Object.values(errors).some((error) => error)) {
    // Handle kesalahan validasi
    console.error("Harap isi semua kolom yang diperlukan");
    return;
  }

  try {
    // Panggil fungsi updateReports untuk menambahkan pengaduan
    const response = await updateReports(route.params.id, model);
    console.log(response);
    // Handle respon dari backend
    if (response.success === "OK") {
      console.log("Pengaduan berhasil ditambahkan");
      Swal.fire({
        title: "Hore!",
        text: "Berhasil Mengubah Laporan!",
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

onMounted(async () => {
  if (route.params.id) {
    let response = await GetDetailsHeadless(route.params.id);
    console.log("Hasil:", response);
    model.title = response.title;
    model.body = response.body;
    model.solution = response.solution;
    model.attachment_path = response.attachment_path;
    model.lattitude = response.lattitude;
    model.longitude = response.longitude;
  } else {
    router.back();
  }
});
</script>

<style></style>
